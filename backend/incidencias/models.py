from django.db import models
from usuarios.models import Usuario

# Create your models here.


class incidencias(models.Model):
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, related_name="incidencias"
    )
    asunto = models.CharField(max_length=50)
    contenido = models.CharField(max_length=500)
    resuelto = models.BooleanField(default=False)
    prioridad = models.CharField(max_length=10, default="baja")

    class Meta:
        ordering = ["-fecha_creacion"]


class respuesta(models.Model):
    usuario = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, related_name="respuesta"
    )
    incidencia = models.ForeignKey(
        incidencias, on_delete=models.CASCADE, related_name="respuesta"
    )
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    contenido = models.CharField(max_length=500)

    class Meta:
        ordering = ["-fecha_creacion"]
