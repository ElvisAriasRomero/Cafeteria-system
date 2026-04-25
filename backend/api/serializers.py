from rest_framework import serializers
from .models import (
    Login,
    CategoriaProducto,
    Producto,
    Cliente,
    Empleado,
    Pedido,
    PedidoDetalle,
    NotaVenta,
    Bitacora,
    Turno,
    EstadoCivil,
    Nacionalidad,
    Estado,
    TipoContacto,
    Salario,
)


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = [
            'id_login',
            'id_empleado',
            'nombre',
            'email',
            'estado',
            'fecha_creacion',
            'fecha_login',
        ]


class CategoriaProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaProducto
        fields = '__all__'


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'
        read_only_fields = ['id_cliente', 'fecha_registro']


class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'


class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'


class PedidoDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = PedidoDetalle
        fields = '__all__'


class NotaVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotaVenta
        fields = '__all__'


class BitacoraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bitacora
        fields = '__all__'


class TurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno
        fields = '__all__'


class EstadoCivilSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoCivil
        fields = '__all__'


class NacionalidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nacionalidad
        fields = '__all__'


class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = '__all__'


class TipoContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoContacto
        fields = '__all__'


class SalarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salario
        fields = '__all__'