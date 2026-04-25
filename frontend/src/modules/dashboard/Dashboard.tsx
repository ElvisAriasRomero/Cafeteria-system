import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { listarPedidos } from "../pedidos/pedidoService";
import type { Pedido } from "../pedidos/pedidoService";

import { listarProductos } from "../productos/productoService";
import type { Producto } from "../productos/productoService";

import { listarPedidoDetalles } from "../pedido_detalles/pedidoDetalleService";
import type { PedidoDetalle } from "../pedido_detalles/pedidoDetalleService";

function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [detalles, setDetalles] = useState<PedidoDetalle[]>([]);

  const cargarDatos = async () => {
    const [pedidosData, productosData, detallesData] = await Promise.all([
      listarPedidos(),
      listarProductos(),
      listarPedidoDetalles(),
    ]);

    setPedidos(pedidosData);
    setProductos(productosData);
    setDetalles(detallesData);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const pedidosCancelados = pedidos.filter((p) => p.estado === "Cancelado");
  const pedidosVendidos = pedidos.filter((p) => p.estado !== "Cancelado");

  const gananciaTotal = pedidosVendidos.reduce(
    (acc, pedido) => acc + Number(pedido.total),
    0
  );

  const perdidaTotal = pedidosCancelados.reduce(
    (acc, pedido) => acc + Number(pedido.total),
    0
  );

  const cantidadVendida = detalles.reduce(
    (acc, detalle) => acc + Number(detalle.cantidad),
    0
  );

  const ventasPorProducto = productos.map((producto) => {
    const detallesProducto = detalles.filter(
      (detalle) => detalle.id_producto === producto.id_producto
    );

    const cantidad = detallesProducto.reduce(
      (acc, detalle) => acc + Number(detalle.cantidad),
      0
    );

    const total = detallesProducto.reduce(
      (acc, detalle) => acc + Number(detalle.subtotal),
      0
    );

    return {
      producto: producto.nombre,
      cantidad,
      total,
    };
  });

  const productosMasVendidos = [...ventasPorProducto]
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5);

  const productosMenosVendidos = [...ventasPorProducto]
    .filter((p) => p.cantidad > 0)
    .sort((a, b) => a.cantidad - b.cantidad)
    .slice(0, 5);

  const resumenPedidos = [
    { name: "Vendidos", value: pedidosVendidos.length },
    { name: "Cancelados", value: pedidosCancelados.length },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted">Bienvenido, {usuario.nombre}</p>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <span>Ganancia</span>
          <h2>{gananciaTotal.toFixed(2)} Bs</h2>
        </div>

        <div className="dashboard-card danger-card">
          <span>Pérdida</span>
          <h2>{perdidaTotal.toFixed(2)} Bs</h2>
        </div>

        <div className="dashboard-card">
          <span>Pedidos realizados</span>
          <h2>{pedidos.length}</h2>
        </div>

        <div className="dashboard-card">
          <span>Productos vendidos</span>
          <h2>{cantidadVendida}</h2>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card chart-card">
          <h2>Productos más vendidos</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productosMasVendidos}>
              <XAxis dataKey="producto" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#198754" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card">
          <h2>Pedidos vendidos vs cancelados</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={resumenPedidos}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                <Cell fill="#198754" />
                <Cell fill="#dc3545" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card">
          <h2>Productos menos vendidos</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productosMenosVendidos}>
              <XAxis dataKey="producto" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#f4a261" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card">
          <h2>Ventas por producto</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ventasPorProducto}>
              <XAxis dataKey="producto" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#014f37" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;