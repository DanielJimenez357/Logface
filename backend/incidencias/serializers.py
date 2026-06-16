from rest_framework import serializers
from .models import incidencias, respuesta


class RespuestaSerializer(serializers.ModelSerializer):
    usuario_username = serializers.ReadOnlyField(source="usuario.username")

    class Meta:
        model = respuesta
        fields = [
            "id",
            "contenido",
            "usuario_username",
            "fecha_creacion",
            "incidencia",
            "usuario",
        ]


class IncidenciasSerializer(serializers.ModelSerializer):
    usuario_username = serializers.ReadOnlyField(source="usuario.username")
    respuesta = RespuestaSerializer(many=True, read_only=True)

    class Meta:
        model = incidencias
        fields = "__all__"
