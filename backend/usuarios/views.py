from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from .models import Usuario
from .serializers import UsuarioSerializer
import os, json, requests

# Create your views here.

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
