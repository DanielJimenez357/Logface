from rest_framework import serializers
from .models import Tarea, Departamento


class TareaSerializer(serializers.ModelSerializer):
    department_name = serializers.ReadOnlyField(source="departamento.nombre")
    implicated_names = serializers.StringRelatedField(many=True, source="implicados")

    class Meta:
        model = Tarea
        fields = "__all__"


class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = "__all__"
