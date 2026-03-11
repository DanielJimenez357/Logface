from django.db import models
from usuarios.models import Usuario
# Create your models here.

class RegistroAsistencia (models.Model):
    TIPO_CHOICES = [
        ('ENTRADA', 'Entrada'),
        ('SALIDA', 'Salida'),
    ]

    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name='historial_asistencia'
    )
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)

    fecha_hora = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-fecha_hora']

class Horario (models.Model):
    nombre = models.CharField(max_length=50)
    minutos_cortesia = models.IntegerField(default=5)

class TramoHorario (models.Model):
    horario = models.ForeignKey(
        Horario,
        on_delete=models.CASCADE,
        related_name='tramos'
    )
    hora_entrada =models.TimeField()
    hora_salida = models.TimeField()

    class Meta:
        ordering = ['hora_entrada']

