from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    foto = models.CharField(blank=True, max_length=50)
    role = models.CharField(default='manager', max_length=50)
    departamento = models.ForeignKey(
        "departamentos.Departamento",
        on_delete=models.CASCADE,
        null=True,
    )
    # phone_number = models.CharField(blank=True, max_length=20)

    def __str__(self):
        return self.username
