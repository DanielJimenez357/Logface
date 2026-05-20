from django.shortcuts import render
from .models import Tarea, Departamento
from .serializers import TareaSerializer, DepartamentoSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["departamento"]


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer
