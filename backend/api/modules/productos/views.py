from rest_framework import viewsets
from api.models import Producto
from .serializers import ProductoSerializer
from api.utils.bitacora import registrar_bitacora


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def perform_create(self, serializer):
        producto = serializer.save()
        registrar_bitacora(
            self.request,
            "Crear producto",
            f"Se creó el producto: {producto.nombre}"
        )

    def perform_update(self, serializer):
        producto = serializer.save()
        registrar_bitacora(
            self.request,
            "Editar producto",
            f"Se editó el producto: {producto.nombre}"
        )

    def perform_destroy(self, instance):
        nombre = instance.nombre
        instance.delete()
        registrar_bitacora(
            self.request,
            "Eliminar producto",
            f"Se eliminó el producto: {nombre}"
        )