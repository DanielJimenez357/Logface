from rest_framework import serializers
from .models import Tarea, Departamento


class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = "__all__"


class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = "__all__"
