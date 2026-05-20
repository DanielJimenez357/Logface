from django.db import models
from usuarios.models import Usuario


class Departamento(models.Model):
    nombre = models.CharField(max_length=30)


class Tarea(models.Model):
    class State(models.TextChoices):
        PENDING = "pending", "Pendiente"
        ACTIVE = "active", "Activo"
        COMPLETED = "completed", "Completada"

    departamento = models.ForeignKey(
        Departamento,
        on_delete=models.CASCADE,
    )
    state = models.CharField(
        choices=State.choices, default=State.PENDING, max_length=20
    )
    nombre = models.CharField(max_length=50)
    implicados = models.ManyToManyField(Usuario, related_name="tareas", blank=True)
    descripcion = models.TextField()
