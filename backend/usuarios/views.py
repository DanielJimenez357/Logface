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
from django.core.mail import send_mail
import os, json, requests
from .models import VerificationCode
import random
from django.utils import timezone
from datetime import timedelta

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


class ChangePassword(APIView):
    def get(self, request):
        user = request.user
        VerificationCode.objects.filter(user=user, used=False).update(used=True)
        code = str(random.randint(100000, 999999))

        VerificationCode.objects.create(
            user=user, code=code, expires_at=timezone.now() + timedelta(minutes=10)
        )

        send_mail(
            subject="Tu codigo de verificacion",
            message=f"Tu código es: {code}",
            from_email="noreply@tuapp.com",
            recipient_list=[user.email],
        )

        return Response(
            {"message": "Código enviado al correo"}, status=status.HTTP_200_OK
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
                {"error": "El código ha expirado"}, status=status.HTTP_400_BAD_REQUEST
            )

        if record.code != code_input:
            return Response(
                {"error": "Código incorrecto"}, status=status.HTTP_400_BAD_REQUEST
            )
        record.used = True
        record.save()
        user.set_password(new_password)
        user.save()

        return Response(
            {"message": "Contraseña cambiada correctamente"}, status=status.HTTP_200_OK
        )
