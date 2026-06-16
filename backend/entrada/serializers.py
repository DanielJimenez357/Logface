from .models import RegistroAsistencia
from rest_framework import serializers


class RegistroAsistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroAsistencia
        fields = ["id", "tipo", "fecha_hora"]
