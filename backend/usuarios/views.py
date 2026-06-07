from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from backend.services.ldap_service import ldap_register
from .models import Usuario
from departamentos.models import Departamento
from .serializers import UserProfile, UsuarioSerializer
import os, json, requests

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

    def get(self, request):
        user = request.user
        serializer = UserProfile(user)
        print(serializer.data)
        return Response(serializer.data)
