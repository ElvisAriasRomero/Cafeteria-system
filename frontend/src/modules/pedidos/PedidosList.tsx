import { useEffect, useState } from "react";
import {
  listarPedidos,
  crearPedido,
  eliminarPedido,
  crearPedidoDetalle,
} from "./pedidoService";
import type { Pedido } from "./pedidoService";
import PedidoForm from "./PedidoForm";

import { listarClientes } from "../clientes/clienteService";
import type { Cliente } from "../clientes/clienteService";

import { listarEmpleados } from "../empleados/empleadoService";
import type { Empleado } from "../empleados/empleadoService";

import { listarProductos } from "../productos/productoService";
import type { Producto } from "../productos/productoService";

type ProductoSeleccionado = {
  producto: Producto;
  cantidad: number;
};

function PedidosList() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [seleccionados, setSeleccionados] = useState<ProductoSeleccionado[]>([]);

  const [idCliente, setIdCliente] = useState(1);
  const [idEmpleado, setIdEmpleado] = useState(1);
  const [cancelado, setCancelado] = useState(false);

  const cargarDatos = async () => {
    const [pedidosData, clientesData, empleadosData, productosData] =
      await Promise.all([
        listarPedidos(),
        listarClientes(),
        listarEmpleados(),
        listarProductos(),
      ]);

    setPedidos(pedidosData);
    setClientes(clientesData);
    setEmpleados(empleadosData);
    setProductos(productosData);

    setIdCliente(clientesData[0]?.id_cliente || 1);
    setIdEmpleado(empleadosData[0]?.id_empleado || 1);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const total = seleccionados.reduce((acc, item) => {
    return acc + item.cantidad * Number(item.producto.precio);
  }, 0);

  const obtenerNombreCliente = (id: number) => {
    return clientes.find((c) => c.id_cliente === id)?.nombre || "Sin cliente";
  };

  const obtenerNombreEmpleado = (id: number) => {
    return (
      empleados.find((e) => e.id_empleado === id)?.nombre_empleado ||
      "Sin empleado"
    );
  };

  const guardarPedido = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (seleccionados.length === 0) {
      alert("Debes agregar al menos un producto.");
      return;
    }

    const pedidoCreado = await crearPedido({
      id_cliente: idCliente,
      id_empleado: idEmpleado,
      estado: cancelado ? "Cancelado" : "Pendiente",
      total: total.toFixed(2),
    });

    for (const item of seleccionados) {
      const precio = Number(item.producto.precio);
      const subtotal = item.cantidad * precio;

      await crearPedidoDetalle({
        id_pedido: pedidoCreado.id_pedido,
        id_producto: item.producto.id_producto,
        cantidad: item.cantidad,
        precio_unitario: precio.toFixed(2),
        subtotal: subtotal.toFixed(2),
      });
    }

    setSeleccionados([]);
    setCancelado(false);
    await cargarDatos();
  };

  const eliminar = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este pedido?")) return;

    await eliminarPedido(id);
    await cargarDatos();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Pedidos</h1>
          <p className="text-muted">
            Registro de pedidos con búsqueda de productos, cliente, vendedor y total.
          </p>
        </div>
      </div>

      <PedidoForm
        clientes={clientes}
        empleados={empleados}
        productos={productos}
        seleccionados={seleccionados}
        setSeleccionados={setSeleccionados}
        idCliente={idCliente}
        setIdCliente={setIdCliente}
        idEmpleado={idEmpleado}
        setIdEmpleado={setIdEmpleado}
        cancelado={cancelado}
        setCancelado={setCancelado}
        total={total}
        onSubmit={guardarPedido}
      />

      <div className="card pedidos-list-card">
        <h2>Pedidos registrados</h2>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Vendedor</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {pedidos.length > 0 ? (
                pedidos.map((pedido) => (
                  <tr key={pedido.id_pedido}>
                    <td>{pedido.id_pedido}</td>
                    <td>{obtenerNombreCliente(pedido.id_cliente)}</td>
                    <td>{obtenerNombreEmpleado(pedido.id_empleado)}</td>
                    <td>{new Date(pedido.fecha).toLocaleString()}</td>
                    <td>{pedido.estado}</td>
                    <td>{pedido.total} Bs</td>
                    <td>
                      <button
                        className="btn btn-delete"
                        onClick={() => eliminar(pedido.id_pedido)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No hay pedidos registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PedidosList;