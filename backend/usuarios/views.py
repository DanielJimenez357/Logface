from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from backend.services.ldap_service import ldap_register, change_password_ldap
from .models import Usuario
from departamentos.models import Departamento
from .serializers import UserProfile, UsuarioSerializer
from django.core.mail import send_mail
import os, json, requests
from .models import VerificationCode
import random
from django.utils import timezone
from datetime import timedelta
import resend
import csv
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser, FormParser
# Create your views here.


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["departamento"]
    permission_classes = [IsAuthenticated]


# funcion para registrar a usarios desde el frontend en el servidor dlap
class LDAPRegister(APIView):
    # actuaa ante una peticion post
    def post(self, request):
        print(request.data)
        # recogemos los datos de la peticion
        data = request.data
        username = data.get("username")
        password = data.get("password")
        email = data.get("email")
        name = data.get("first_name")
        last_name = data.get("last_name")
        departamento_id = data.get("departamento")
        role = data.get("role")
        # registramos al usuario en le servidor
        ldap_succes = ldap_register(username, password, email, name, last_name)

        if ldap_succes:
            # comprobamos is el usuario existe en la base de datos para crearlo
            if not Usuario.objects.filter(username=username).exists():
                try:
                    department = Departamento.objects.get(id=departamento_id)
                except:
                    return Response(
                        {"error": "El departamento no existe"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                Usuario.objects.create_user(
                    username=username,
                    email=email,
                    first_name=name,
                    last_name=last_name,
                    password=password,
                    departamento=department,
                    role=role,
                )

            return Response(
                {"msj": "Usuario registrado en LDAP y Django"},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"error": "No se pudo registrar en LDAP"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class Profile(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        user = request.user
        serializer = UserProfile(user)
        print(serializer.data)
        return Response(serializer.data)

    def patch(self, request):
        user = request.user
        photo = request.FILES.get("foto")
        if not photo:
            return Response({"error": "No se ha enviado ninguna imagen"}, status=400)
        user.foto = photo
        user.save()
        serializer = UserProfile(user)
        return Response(serializer.data, status=200)


class ChangePassword(APIView):
    def get(self, request):
        user = request.user
        VerificationCode.objects.filter(user=user, used=False).update(used=True)
        code = str(random.randint(100000, 999999))
        VerificationCode.objects.create(
            user=user, code=code, expires_at=timezone.now() + timedelta(minutes=10)
        )
        try:
            resend.api_key = os.getenv("RESEND_API_KEY")
            params = {
                "from": "Logface Security <onboarding@resend.dev>",
                "to": [user.email],
                "subject": "Código de Verificación - Cambio de Contraseña",
                "html": f"""
                    <h2>Hola {user.first_name},</h2>
                    <p>Has solicitado cambiar tu contraseña en Logface.</p>
                    <p>Tu codigo de seguridad es: <strong style="font-size:24px; color:red;">{code}</strong></p>
                    <p><i>Este codigo caducara en 10 minutos.</i></p>
                """,
            }

            email_response = resend.Emails.send(params)
            print(f"API de Resend devolvió: {email_response}")

            return Response(
                {"message": "Codigo enviado al correo (Vía API)"},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            print(f"Error consumiendo la API de Resend: {e}")
            return Response(
                {"error": "Fallo de conexion con el proveedor de correo"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request):
        user = request.user
        code_input = request.data.get("code")
        new_password = request.data.get("new_password")
        if not code_input or not new_password:
            return Response(
                {"error": "Se requiere codigo y nueva contraseña"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            record = VerificationCode.objects.filter(user=user, used=False).latest(
                "created_at"
            )
        except VerificationCode.DoesNotExist:
            return Response(
                {"error": "No hay ningún código activo"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if not record.is_valid():
            return Response(
                {"error": "El codigo ha expirado"}, status=status.HTTP_400_BAD_REQUEST
            )

        if record.code != code_input:
            return Response(
                {"error": "Codigo incorrecto"}, status=status.HTTP_400_BAD_REQUEST
            )

        succes_ldap = change_password_ldap(user.username, new_password)

        if not succes_ldap:
            print(f"Aviso: No se pudo actualizar LDAP para {user.username}")

        record.used = True
        record.save()
        user.set_password(new_password)
        user.save()

        return Response(
            {"message": "Contraseña cambiada correctamente"}, status=status.HTTP_200_OK
        )


class ExportEmployee(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="lista_empleados.csv"'
        writer = csv.writer(response)
        writer.writerow(["ID", "Username", "Nombre", "Apellidos", "Email", "Estado"])
        employees = Usuario.objects.all()
        for employee in employees:
            state = "Activo" if employee.is_active else "Inactivo"
            writer.writerow(
                [
                    employee.id,
                    employee.username,
                    employee.first_name,
                    employee.last_name,
                    employee.email,
                    state,
                ]
            )

        return response
