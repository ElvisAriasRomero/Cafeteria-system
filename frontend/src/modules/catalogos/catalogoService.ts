import api from "../../api/axios";

export type CatalogoSimple = {
  id_turno?: number;
  id_estado_civil?: number;
  id_nacionalidad?: number;
  id_estado?: number;
  id_tipo_contacto?: number;
  descripcion: string;
};

export type Salario = {
  id_salario: number;
  descripcion: string;
  monto: string;
};

export const listarTurnos = async () => {
  const res = await api.get("turnos/");
  return res.data;
};

export const listarEstadosCiviles = async () => {
  const res = await api.get("estados-civiles/");
  return res.data;
};

export const listarNacionalidades = async () => {
  const res = await api.get("nacionalidades/");
  return res.data;
};

export const listarEstados = async () => {
  const res = await api.get("estados/");
  return res.data;
};

export const listarTiposContacto = async () => {
  const res = await api.get("tipos-contacto/");
  return res.data;
};

export const listarSalarios = async () => {
  const res = await api.get("salarios/");
  return res.data;
};