from django.forms import fields
from rest_framework import serializers
from .models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "username"]


class UserProfile(serializers.ModelSerializer):
    department_name = serializers.ReadOnlyField(source="departamento.nombre")

    class Meta:
        model = Usuario
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
            "departamento",
            "department_name",
        ]
