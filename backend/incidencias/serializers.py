from rest_framework import serializers
from .models import incidencias, respuesta


class IncidenciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = incidencias
        fields = "__all__"


class RespuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = respuesta
        fields = "__all__"
