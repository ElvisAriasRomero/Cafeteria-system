import api from "../../api/axios";

export type Categoria = {
  id_categoria: number;
  nombre: string;
  descripcion: string | null;
};

export type CategoriaFormData = {
  nombre: string;
  descripcion: string;
};

export const listarCategorias = async (): Promise<Categoria[]> => {
  const res = await api.get("categorias/");
  return res.data;
};

export const crearCategoria = async (data: CategoriaFormData) => {
  const res = await api.post("categorias/", data);
  return res.data;
};

export const actualizarCategoria = async (
  id: number,
  data: CategoriaFormData
) => {
  const res = await api.put(`categorias/${id}/`, data);
  return res.data;
};

export const eliminarCategoria = async (id: number) => {
  const res = await api.delete(`categorias/${id}/`);
  return res.data;
};