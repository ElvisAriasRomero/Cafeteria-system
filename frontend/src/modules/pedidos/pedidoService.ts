import api from "../../api/axios";

export type Pedido = {
  id_pedido: number;
  id_cliente: number;
  id_empleado: number;
  fecha: string;
  estado: string;
  total: string;
};

export type PedidoDetalleData = {
  id_pedido: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: string;
  subtotal: string;
};

export type PedidoFormData = {
  id_cliente: number;
  id_empleado: number;
  estado: string;
  total: string;
};

export const listarPedidos = async (): Promise<Pedido[]> => {
  const res = await api.get("pedidos/");
  return res.data;
};

export const crearPedido = async (data: PedidoFormData) => {
  const res = await api.post("pedidos/", {
    id_cliente: data.id_cliente,
    id_empleado: data.id_empleado,
    fecha: new Date().toISOString(),
    estado: data.estado,
    total: data.total,
  });

  return res.data;
};

export const eliminarPedido = async (id: number) => {
  const res = await api.delete(`pedidos/${id}/`);
  return res.data;
};

export const crearPedidoDetalle = async (data: PedidoDetalleData) => {
  const res = await api.post("pedido-detalles/", data);
  return res.data;
};