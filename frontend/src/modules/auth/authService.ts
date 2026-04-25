import api from "../../api/axios";

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  nombre_empleado: string;
  ci: string;
  email: string;
  password: string;
  id_turno: number;
  id_estado_civil: number;
  id_nacionalidad: number;
  id_estado: number;
  id_tipo_contacto: number;
  id_salario: number;
};

export const login = async (data: LoginData) => {
  const response = await api.post("auth/login/", data);
  return response.data;
};

export const register = async (data: RegisterData) => {
  const response = await api.post("auth/registro/", data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("auth/logout/");
  return response.data;
};