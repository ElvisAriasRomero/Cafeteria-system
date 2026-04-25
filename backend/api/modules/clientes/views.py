from rest_framework import viewsets
from django.utils import timezone
from api.models import Cliente
from .serializers import ClienteSerializer


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

    def perform_create(self, serializer):
        serializer.save(fecha_registro=timezone.now())