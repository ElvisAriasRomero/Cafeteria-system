import api from "../../api/axios";

export type Empleado = {
  id_empleado: number;
  nombre_empleado: string;
  ci: string | null;
  tel_fijo: string | null;
  cel: string | null;
  tel_contacto: string | null;
  nombre_contacto: string | null;
  email: string | null;
  direccion: string | null;
  fecha_ingreso: string;
  id_turno: number;
  id_estado_civil: number;
  id_nacionalidad: number;
  id_estado: number;
  id_tipo_contacto: number;
  id_salario: number;
};

export type EmpleadoFormData = {
  nombre_empleado: string;
  ci: string;
  tel_fijo: string;
  cel: string;
  tel_contacto: string;
  nombre_contacto: string;
  email: string;
  direccion: string;
  fecha_ingreso: string;
  id_turno: number;
  id_estado_civil: number;
  id_nacionalidad: number;
  id_estado: number;
  id_tipo_contacto: number;
  id_salario: number;
};

export const listarEmpleados = async (): Promise<Empleado[]> => {
  const res = await api.get("empleados/");
  return res.data;
};

export const crearEmpleado = async (data: EmpleadoFormData) => {
  const res = await api.post("empleados/", data);
  return res.data;
};

export const actualizarEmpleado = async (id: number, data: EmpleadoFormData) => {
  const res = await api.put(`empleados/${id}/`, data);
  return res.data;
};

export const eliminarEmpleado = async (id: number) => {
  const res = await api.delete(`empleados/${id}/`);
  return res.data;
};