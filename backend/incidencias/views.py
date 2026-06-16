from django.shortcuts import render
from .models import incidencias, respuesta
from .serializers import IncidenciasSerializer, RespuestaSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
import logging
import io
from django.http import FileResponse
from rest_framework.views import APIView
from .models import incidencias
from django.utils import timezone
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from usuarios.services.ai_service import classify_priority_ai

logger = logging.getLogger("logface_events")


class IncidenciaViewSet(viewsets.ModelViewSet):
    serializer_class = IncidenciasSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["resuelto"]

    def get_queryset(self):
        user = self.request.user
        if user.role == "manager" or user.is_superuser:
            return incidencias.objects.all()
        return incidencias.objects.filter(usuario=user)

    def perform_create(self, serializer):
        ticket_subject = self.request.data.get("asunto", "")
        ticket_content = self.request.data.get("contenido", "")
        full_text = f"Subject: {ticket_subject}. Description: {ticket_content}"
        calculated_priority = classify_priority_ai(full_text)
        ticket = serializer.save(
            usuario=self.request.user, prioridad=calculated_priority
        )
        logger.info(
            f"TICKET_CREADO | User '{self.request.user.username}' (ID: {self.request.user.id}) "
            f"created ticket ID: {ticket.id} - '{ticket.asunto}' [AI Priority: {calculated_priority}]"
        )


class RepsuestaViewSet(viewsets.ModelViewSet):
    queryset = respuesta.objects.all()
    serializer_class = RespuestaSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        resp = serializer.save(usuario=self.request.user)
        logger.info(
            f"TICKET_RESUELTO | El manager '{self.request.user.username}' (ID: {self.request.user.id}) "
            f"resolvió la incidencia ID: {resp.incidencia.id} con la respuesta ID: {resp.id}"
        )


class TicketsExportPDF(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tickets = incidencias.objects.filter(resuelto=True).select_related("usuario")

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=40,
            leftMargin=40,
            topMargin=40,
            bottomMargin=40,
        )
        story = []
        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            "TituloReporte",
            parent=styles["Heading1"],
            fontSize=22,
            textColor=colors.HexColor("#991B1B"),
            spaceAfter=10,
            alignment=1,
        )
        subtitle_style = ParagraphStyle(
            "SubtituloReporte",
            parent=styles["Normal"],
            fontSize=10,
            textColor=colors.HexColor("#4B5563"),
            spaceAfter=20,
            alignment=1,
        )
        text_cell_bold = ParagraphStyle(
            "CeldaBold", parent=styles["Normal"], fontSize=9, fontName="Helvetica-Bold"
        )
        text_cell = ParagraphStyle("CeldaNormal", parent=styles["Normal"], fontSize=9)
        story.append(Paragraph("LOGFACE - REPORTE DE INCIDENCIAS", title_style))
        time_now = timezone.now().strftime("%d/%m/%Y %H:%M")
        story.append(
            Paragraph(
                f"Historial de Casos Resueltos - Generado el {time_now}", subtitle_style
            )
        )
        story.append(Spacer(1, 10))

        data_table = [
            [
                Paragraph("<b>ID</b>", text_cell_bold),
                Paragraph("<b>Asunto</b>", text_cell_bold),
                Paragraph("<b>Empleado</b>", text_cell_bold),
                Paragraph(
                    "<b>Descripción del Caso / Solución Aportada</b>", text_cell_bold
                ),
            ]
        ]

        for ticket in tickets:
            response_obj = ticket.respuesta.first()
            solution_text = (
                response_obj.contenido if response_obj else "Sin solución registrada."
            )
            manager_text = response_obj.usuario.username if response_obj else "Soporte"

            details_html = f"<b>Caso:</b> {ticket.contenido}<br/><br/><b>Solución:</b> {solution_text} (por {manager_text})"

            data_table.append(
                [
                    Paragraph(str(ticket.id), text_cell),
                    Paragraph(ticket.asunto, text_cell),
                    Paragraph(ticket.usuario.username, text_cell),
                    Paragraph(details_html, text_cell),
                ]
            )

        t = Table(data_table, colWidths=[30, 110, 80, 310])

        t.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#847373")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("ALIGN", (0, 0), (-1, -1), "LEFT"),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
                    ("TOPPADDING", (0, 0), (-1, 0), 8),
                    (
                        "ROWBACKGROUNDS",
                        (0, 1),
                        (-1, -1),
                        [colors.HexColor("#F3F4F6"), colors.white],
                    ),
                    ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#E5E7EB")),
                ]
            )
        )
        story.append(t)
        doc.build(story)
        buffer.seek(0)
        return FileResponse(
            buffer, as_attachment=True, filename="reporte_incidencias_resueltas.pdf"
        )
