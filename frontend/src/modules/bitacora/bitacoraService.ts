import api from "../../api/axios";

export type Bitacora = {
  id_bitacora: number;
  id_login: number;
  id_empleado: number;
  fecha: string;
  accion: string;
  detalle: string | null;
};

export const listarBitacora = async (): Promise<Bitacora[]> => {
  const res = await api.get("bitacora/");
  return res.data;
};

export const eliminarBitacora = async (id: number) => {
  const res = await api.delete(`bitacora/${id}/`);
  return res.data;
};