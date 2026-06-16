from .models import RegistroAsistencia
from .serializers import RegistroAsistenciaSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


class RegistroAsistenciaViewSet(viewsets.ModelViewSet):
    serializer_class = RegistroAsistenciaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return RegistroAsistencia.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
