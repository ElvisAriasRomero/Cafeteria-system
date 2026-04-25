import api from "../../api/axios";

export type PedidoDetalle = {
  id_detalle: number;
  id_pedido: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: string;
  subtotal: string;
};

export const listarPedidoDetalles = async (): Promise<PedidoDetalle[]> => {
  const res = await api.get("pedido-detalles/");
  return res.data;
};