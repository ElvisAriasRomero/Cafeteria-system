from django.utils import timezone
from api.models import Bitacora, Login, Empleado


def registrar_bitacora(request, accion, detalle=""):
    id_login = request.headers.get("X-Login-Id")
    id_empleado = request.headers.get("X-Empleado-Id")

    if not id_login or not id_empleado:
        return

    if not Login.objects.filter(id_login=id_login).exists():
        return

    if not Empleado.objects.filter(id_empleado=id_empleado).exists():
        return

    Bitacora.objects.create(
        id_login_id=id_login,
        id_empleado_id=id_empleado,
        fecha=timezone.now(),
        accion=accion,
        detalle=detalle
    )