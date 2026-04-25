import type { ClienteFormData } from "./clienteService";

type Props = {
  form: ClienteFormData;
  setForm: React.Dispatch<React.SetStateAction<ClienteFormData>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  editando: boolean;
};

function ClienteForm({ form, setForm, onSubmit, onClose, editando }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editando ? "Editar cliente" : "Crear cliente"}</h2>

        <form onSubmit={onSubmit}>
          <label>CI / NIT</label>
          <input
            value={form.ci_o_nit}
            onChange={(e) => setForm({ ...form, ci_o_nit: e.target.value })}
          />

          <label>Nombre</label>
          <input
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />

          <label>Fecha nacimiento</label>
          <input
            type="date"
            value={form.fecha_nacimiento}
            onChange={(e) =>
              setForm({ ...form, fecha_nacimiento: e.target.value })
            }
          />

          <label>Celular</label>
          <input
            value={form.celular}
            onChange={(e) => setForm({ ...form, celular: e.target.value })}
          />

          <label>Email</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label>Dirección</label>
          <textarea
            value={form.direccion}
            onChange={(e) => setForm({ ...form, direccion: e.target.value })}
          />

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

export default ClienteForm;