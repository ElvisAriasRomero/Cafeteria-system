import api from "../../api/axios";

export type Cliente = {
  id_cliente: number;
  ci_o_nit: string | null;
  nombre: string;
  fecha_nacimiento: string | null;
  celular: string | null;
  email: string | null;
  direccion: string | null;
  fecha_registro: string;
};

export type ClienteFormData = {
  ci_o_nit: string;
  nombre: string;
  fecha_nacimiento: string;
  celular: string;
  email: string;
  direccion: string;
};

const limpiarCliente = (data: ClienteFormData) => ({
  ...data,
  fecha_nacimiento: data.fecha_nacimiento || null,
});

export const listarClientes = async (): Promise<Cliente[]> => {
  const res = await api.get("clientes/");
  return res.data;
};

export const crearCliente = async (data: ClienteFormData) => {
  const res = await api.post("clientes/", limpiarCliente(data));
  return res.data;
};

export const actualizarCliente = async (id: number, data: ClienteFormData) => {
  const res = await api.put(`clientes/${id}/`, limpiarCliente(data));
  return res.data;
};

export const eliminarCliente = async (id: number) => {
  const res = await api.delete(`clientes/${id}/`);
  return res.data;
};