from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Usuario(AbstractUser):
    foto = models.CharField(blank=True, max_length=50)

    def __str__(self):
        return self.username
