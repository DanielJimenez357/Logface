from django.shortcuts import render
from .models import Tarea, Departamento
from .serializers import TareaSerializer, DepartamentoSerializer
from rest_framework import viewsets


# Create your views here.


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer
