import { useEffect, useState } from "react";
import {
  listarCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "./categoriaService";
import type { Categoria, CategoriaFormData } from "./categoriaService";
import CategoriaForm from "./CategoriaForm";

const emptyForm: CategoriaFormData = {
  nombre: "",
  descripcion: "",
};

function CategoriasList() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Categoria | null>(null);
  const [form, setForm] = useState<CategoriaFormData>(emptyForm);

  const cargar = async () => {
    const data = await listarCategorias();
    setCategorias(data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const abrirCrear = () => {
    setEditando(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const abrirEditar = (c: Categoria) => {
    setEditando(c);

    setForm({
      nombre: c.nombre,
      descripcion: c.descripcion || "",
    });

    setModalOpen(true);
  };

  const guardar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editando) {
      await actualizarCategoria(editando.id_categoria, form);
    } else {
      await crearCategoria(form);
    }

    setModalOpen(false);
    setEditando(null);
    setForm(emptyForm);
    await cargar();
  };

  const eliminar = async (id: number) => {
    if (!confirm("¿Eliminar categoría?")) return;

    await eliminarCategoria(id);
    await cargar();
  };

  return (
    <div>
      <div className="page-header">
        <h1>Categorías</h1>

        <button className="btn btn-create" onClick={abrirCrear}>
          Crear categoría
        </button>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {categorias.map((c) => (
              <tr key={c.id_categoria}>
                <td>{c.id_categoria}</td>
                <td>{c.nombre}</td>
                <td>{c.descripcion || "-"}</td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => abrirEditar(c)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-delete"
                    onClick={() => eliminar(c.id_categoria)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <CategoriaForm
          form={form}
          setForm={setForm}
          onSubmit={guardar}
          onClose={() => setModalOpen(false)}
          editando={editando !== null}
        />
      )}
    </div>
  );
}

export default CategoriasList;