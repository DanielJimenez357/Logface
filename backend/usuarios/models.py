from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class Usuario(AbstractUser):
    foto = models.FileField(upload_to="perfil/", null=True, blank=True)
    role = models.CharField(default="manager", max_length=50)
    departamento = models.ForeignKey(
        "departamentos.Departamento",
        on_delete=models.CASCADE,
        null=True,
    )
    # phone_number = models.CharField(blank=True, max_length=20)

    def __str__(self):
        return self.username


class VerificationCode(models.Model):
    user = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def is_valid(self):
        return not self.used and timezone.now() < self.expires_at
