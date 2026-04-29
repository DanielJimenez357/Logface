from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from backend.services.ldap_service import ldap_register
from .models import Usuario
from .serializers import UsuarioSerializer
import os, json, requests

# Create your views here.


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


# funcion para registrar a usarios desde el frontend en el servidor dlap
class LDAPRegister(APIView):
    # actuaa ante una peticion post
    def post(self, request):
        # recogemos los datos de la peticion
        data = request.data
        username = data.get("username")
        password = data.get("password")
        email = data.get("email")
        name = data.get("first_name")
        last_name = data.get("last_name")

        # registramos al usuario en le servidor
        ldap_succes = ldap_register(username, password, email, name, last_name)

        if ldap_succes:
            # comprobamos is el usuario existe en la base de datos para crearlo
            if not Usuario.objects.filter(username=username).exists():
                Usuario.objects.create_user(
                    username=username,
                    email=email,
                    name=name,
                    last_name=last_name,
                    password=password,
                )

            return Response(
                {"msj": "Usuario registrado en LDAP y Django"},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"error": "No se pudo registrar en LDAP"},
            status=status.HTTP_400_BAD_REQUEST,
        )
