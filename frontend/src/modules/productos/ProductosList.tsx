import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "./productoService";
import type { Producto, ProductoFormData } from "./productoService";
import ProductoForm from "./ProductoForm";

import { listarCategorias } from "../categorias/categoriaService";
import type { Categoria } from "../categorias/categoriaService";

const emptyForm: ProductoFormData = {
  nombre: "",
  descripcion: "",
  precio: "",
  disponible: true,
  id_categoria: 1,
};

function ProductosList() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Producto | null>(null);
  const [form, setForm] = useState<ProductoFormData>(emptyForm);

  const cargarProductos = async () => {
    const data = await listarProductos();
    setProductos(data);
  };

  const cargarCategorias = async () => {
    const data = await listarCategorias();
    setCategorias(data);
  };

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
  }, []);

  const obtenerNombreCategoria = (id: number) => {
    const categoria = categorias.find((c) => c.id_categoria === id);
    return categoria ? categoria.nombre : "Sin categoría";
  };

  const abrirCrear = () => {
    setEditando(null);
    setForm({
      ...emptyForm,
      id_categoria: categorias[0]?.id_categoria || 1,
    });
    setModalOpen(true);
  };

  const abrirEditar = (producto: Producto) => {
    setEditando(producto);

    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion || "",
      precio: producto.precio,
      disponible: producto.disponible,
      id_categoria: producto.id_categoria,
    });

    setModalOpen(true);
  };

  const guardarProducto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editando) {
      await actualizarProducto(editando.id_producto, form);
    } else {
      await crearProducto(form);
    }

    setModalOpen(false);
    setEditando(null);
    setForm(emptyForm);
    await cargarProductos();
    await cargarCategorias();
  };

  const eliminar = async (id: number) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmar) return;

    await eliminarProducto(id);
    await cargarProductos();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Productos</h1>
          <p className="text-muted">Gestión de productos registrados.</p>
        </div>

        <div className="actions">
          <button className="btn btn-create" onClick={abrirCrear}>
            Crear producto
          </button>

          <button className="btn btn-edit" onClick={() => navigate("/categorias")}>
            Crear categoría
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Disponible</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.length > 0 ? (
                productos.map((producto) => (
                  <tr key={producto.id_producto}>
                    <td>{producto.id_producto}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion || "-"}</td>
                    <td>{producto.precio} Bs</td>
                    <td>{producto.disponible ? "Sí" : "No"}</td>
                    <td>{obtenerNombreCategoria(producto.id_categoria)}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn btn-edit"
                          onClick={() => abrirEditar(producto)}
                        >
                          Editar
                        </button>

                        <button
                          className="btn btn-delete"
                          onClick={() => eliminar(producto.id_producto)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No hay productos registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <ProductoForm
          form={form}
          setForm={setForm}
          onSubmit={guardarProducto}
          onClose={() => setModalOpen(false)}
          editando={editando !== null}
          categorias={categorias}
        />
      )}
    </div>
  );
}

export default ProductosList;