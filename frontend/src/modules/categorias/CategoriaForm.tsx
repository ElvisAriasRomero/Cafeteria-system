import type { CategoriaFormData } from "./categoriaService";

type Props = {
  form: CategoriaFormData;
  setForm: React.Dispatch<React.SetStateAction<CategoriaFormData>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  editando: boolean;
};

function CategoriaForm({ form, setForm, onSubmit, onClose, editando }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editando ? "Editar categoría" : "Crear categoría"}</h2>

        <form onSubmit={onSubmit}>
          <label>Nombre</label>
          <input
            value={form.nombre}
            onChange={(e) =>
              setForm({ ...form, nombre: e.target.value })
            }
            required
          />

          <label>Descripción</label>
          <textarea
            value={form.descripcion}
            onChange={(e) =>
              setForm({ ...form, descripcion: e.target.value })
            }
          />

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-delete"
              onClick={onClose}
            >
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

export default CategoriaForm;