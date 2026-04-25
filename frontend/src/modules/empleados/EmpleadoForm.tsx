import type { EmpleadoFormData } from "./empleadoService";
import type { CatalogoSimple, Salario } from "../catalogos/catalogoService";

type Props = {
  form: EmpleadoFormData;
  setForm: React.Dispatch<React.SetStateAction<EmpleadoFormData>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  editando: boolean;
  turnos: CatalogoSimple[];
  estadosCiviles: CatalogoSimple[];
  nacionalidades: CatalogoSimple[];
  estados: CatalogoSimple[];
  tiposContacto: CatalogoSimple[];
  salarios: Salario[];
};

function EmpleadoForm({
  form,
  setForm,
  onSubmit,
  onClose,
  editando,
  turnos,
  estadosCiviles,
  nacionalidades,
  estados,
  tiposContacto,
  salarios,
}: Props) {
  const handleChange = (name: keyof EmpleadoFormData, value: string) => {
    setForm({
      ...form,
      [name]: name.startsWith("id_") ? Number(value) : value,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-large">
        <h2>{editando ? "Editar empleado" : "Crear empleado"}</h2>

        <form onSubmit={onSubmit} className="form-grid">
          <div>
            <label>Nombre empleado</label>
            <input
              value={form.nombre_empleado}
              onChange={(e) => handleChange("nombre_empleado", e.target.value)}
              required
            />
          </div>

          <div>
            <label>CI</label>
            <input
              value={form.ci}
              onChange={(e) => handleChange("ci", e.target.value)}
            />
          </div>

          <div>
            <label>Teléfono fijo</label>
            <input
              value={form.tel_fijo}
              onChange={(e) => handleChange("tel_fijo", e.target.value)}
            />
          </div>

          <div>
            <label>Celular</label>
            <input
              value={form.cel}
              onChange={(e) => handleChange("cel", e.target.value)}
            />
          </div>

          <div>
            <label>Teléfono contacto</label>
            <input
              value={form.tel_contacto}
              onChange={(e) => handleChange("tel_contacto", e.target.value)}
            />
          </div>

          <div>
            <label>Nombre contacto</label>
            <input
              value={form.nombre_contacto}
              onChange={(e) => handleChange("nombre_contacto", e.target.value)}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div>
            <label>Fecha ingreso</label>
            <input
              type="date"
              value={form.fecha_ingreso}
              onChange={(e) => handleChange("fecha_ingreso", e.target.value)}
              required
            />
          </div>

          <div className="form-full">
            <label>Dirección</label>
            <textarea
              value={form.direccion}
              onChange={(e) => handleChange("direccion", e.target.value)}
            />
          </div>

          <div>
            <label>Turno</label>
            <select
              value={form.id_turno}
              onChange={(e) => handleChange("id_turno", e.target.value)}
            >
              {turnos.map((item) => (
                <option key={item.id_turno} value={item.id_turno}>
                  {item.descripcion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Estado civil</label>
            <select
              value={form.id_estado_civil}
              onChange={(e) =>
                handleChange("id_estado_civil", e.target.value)
              }
            >
              {estadosCiviles.map((item) => (
                <option
                  key={item.id_estado_civil}
                  value={item.id_estado_civil}
                >
                  {item.descripcion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Nacionalidad</label>
            <select
              value={form.id_nacionalidad}
              onChange={(e) =>
                handleChange("id_nacionalidad", e.target.value)
              }
            >
              {nacionalidades.map((item) => (
                <option
                  key={item.id_nacionalidad}
                  value={item.id_nacionalidad}
                >
                  {item.descripcion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Estado</label>
            <select
              value={form.id_estado}
              onChange={(e) => handleChange("id_estado", e.target.value)}
            >
              {estados.map((item) => (
                <option key={item.id_estado} value={item.id_estado}>
                  {item.descripcion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Tipo contacto</label>
            <select
              value={form.id_tipo_contacto}
              onChange={(e) =>
                handleChange("id_tipo_contacto", e.target.value)
              }
            >
              {tiposContacto.map((item) => (
                <option
                  key={item.id_tipo_contacto}
                  value={item.id_tipo_contacto}
                >
                  {item.descripcion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Salario</label>
            <select
              value={form.id_salario}
              onChange={(e) => handleChange("id_salario", e.target.value)}
            >
              {salarios.map((item) => (
                <option key={item.id_salario} value={item.id_salario}>
                  {item.descripcion} - Bs {item.monto}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-actions form-full">
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

export default EmpleadoForm;