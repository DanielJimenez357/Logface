from django.db import models
from usuarios.models import Usuario

# Create your models here.

class Departamento(models.Model):
    nombre = models.CharField(max_length=30)

class Tarea(models.Model):
    departamento = models.ForeignKey(
        Departamento,
        on_delete=models.CASCADE,
    )
    nombre = models.CharField(max_length=50)
    implicados = models.ManyToManyField(
        Usuario,
        related_name='tareas',
        blank=True
    )
    descripcion = models.TextField()
