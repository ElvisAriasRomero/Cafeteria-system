import type { ProductoFormData } from "./productoService";
import type { Categoria } from "../categorias/categoriaService";

type Props = {
  form: ProductoFormData;
  setForm: React.Dispatch<React.SetStateAction<ProductoFormData>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  editando: boolean;
  categorias: Categoria[];
};

function ProductoForm({
  form,
  setForm,
  onSubmit,
  onClose,
  editando,
  categorias,
}: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editando ? "Editar producto" : "Crear producto"}</h2>

        <form onSubmit={onSubmit}>
          <label>Nombre</label>
          <input
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />

          <label>Descripción</label>
          <textarea
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />

          <label>Precio</label>
          <input
            type="number"
            step="0.01"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
            required
          />

          <label>Categoría</label>
          <select
            value={form.id_categoria}
            onChange={(e) =>
              setForm({ ...form, id_categoria: Number(e.target.value) })
            }
            required
          >
            {categorias.map((categoria) => (
              <option
                key={categoria.id_categoria}
                value={categoria.id_categoria}
              >
                {categoria.nombre}
              </option>
            ))}
          </select>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={form.disponible}
              onChange={(e) =>
                setForm({ ...form, disponible: e.target.checked })
              }
            />
            Disponible
          </label>

          <div className="modal-actions">
            <button type="button" className="btn btn-delete" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit" className="btn btn-create">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductoForm;