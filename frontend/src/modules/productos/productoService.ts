import api from "../../api/axios";

export type Producto = {
  id_producto: number;
  nombre: string;
  descripcion: string | null;
  precio: string;
  disponible: boolean;
  id_categoria: number;
};

export type ProductoFormData = {
  nombre: string;
  descripcion: string;
  precio: string;
  disponible: boolean;
  id_categoria: number;
};

export const listarProductos = async (): Promise<Producto[]> => {
  const response = await api.get<Producto[]>("productos/");
  return response.data;
};

export const crearProducto = async (data: ProductoFormData) => {
  const response = await api.post("productos/", data);
  return response.data;
};

export const actualizarProducto = async (
  id: number,
  data: ProductoFormData
) => {
  const response = await api.put(`productos/${id}/`, data);
  return response.data;
};

export const eliminarProducto = async (id: number) => {
  const response = await api.delete(`productos/${id}/`);
  return response.data;
};