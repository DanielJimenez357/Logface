from django.shortcuts import render
from .models import incidencias, respuesta
from .serializers import IncidenciasSerializer, RespuestaSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.


class IncidenciaViewSet(viewsets.ModelViewSet):
    queryset = incidencias.objects.all()
    serializer_class = IncidenciasSerializer


class RepsuestaViewSet(viewsets.ModelViewSet):
    queryset = respuesta.objects.all()
    serializer_class = RespuestaSerializer
