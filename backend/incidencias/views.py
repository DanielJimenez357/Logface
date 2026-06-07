from django.shortcuts import render
from .models import incidencias, respuesta
from .serializers import IncidenciasSerializer, RespuestaSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated


# Create your views here.


class IncidenciaViewSet(viewsets.ModelViewSet):
    queryset = incidencias.objects.all()
    serializer_class = IncidenciasSerializer
    permission_classes = [IsAuthenticated]


class RepsuestaViewSet(viewsets.ModelViewSet):
    queryset = respuesta.objects.all()
    serializer_class = RespuestaSerializer
    permission_classes = [IsAuthenticated]
