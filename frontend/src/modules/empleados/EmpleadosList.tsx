import { useEffect, useState } from "react";
import {
  listarEmpleados,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
} from "./empleadoService";
import type { Empleado, EmpleadoFormData } from "./empleadoService";
import EmpleadoForm from "./EmpleadoForm";

import {
  listarTurnos,
  listarEstadosCiviles,
  listarNacionalidades,
  listarEstados,
  listarTiposContacto,
  listarSalarios,
} from "../catalogos/catalogoService";
import type { CatalogoSimple, Salario } from "../catalogos/catalogoService";

const emptyForm: EmpleadoFormData = {
  nombre_empleado: "",
  ci: "",
  tel_fijo: "",
  cel: "",
  tel_contacto: "",
  nombre_contacto: "",
  email: "",
  direccion: "",
  fecha_ingreso: new Date().toISOString().split("T")[0],
  id_turno: 1,
  id_estado_civil: 1,
  id_nacionalidad: 1,
  id_estado: 1,
  id_tipo_contacto: 1,
  id_salario: 1,
};

function EmpleadosList() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Empleado | null>(null);
  const [form, setForm] = useState<EmpleadoFormData>(emptyForm);

  const [turnos, setTurnos] = useState<CatalogoSimple[]>([]);
  const [estadosCiviles, setEstadosCiviles] = useState<CatalogoSimple[]>([]);
  const [nacionalidades, setNacionalidades] = useState<CatalogoSimple[]>([]);
  const [estados, setEstados] = useState<CatalogoSimple[]>([]);
  const [tiposContacto, setTiposContacto] = useState<CatalogoSimple[]>([]);
  const [salarios, setSalarios] = useState<Salario[]>([]);

  const cargarEmpleados = async () => {
    const data = await listarEmpleados();
    setEmpleados(data);
  };

  const cargarCatalogos = async () => {
    const [
      turnosData,
      estadosCivilesData,
      nacionalidadesData,
      estadosData,
      tiposContactoData,
      salariosData,
    ] = await Promise.all([
      listarTurnos(),
      listarEstadosCiviles(),
      listarNacionalidades(),
      listarEstados(),
      listarTiposContacto(),
      listarSalarios(),
    ]);

    setTurnos(turnosData);
    setEstadosCiviles(estadosCivilesData);
    setNacionalidades(nacionalidadesData);
    setEstados(estadosData);
    setTiposContacto(tiposContactoData);
    setSalarios(salariosData);
  };

  useEffect(() => {
    cargarEmpleados();
    cargarCatalogos();
  }, []);

  const obtenerTurno = (id: number) =>
    turnos.find((x) => x.id_turno === id)?.descripcion || "Sin turno";

  const obtenerEstado = (id: number) =>
    estados.find((x) => x.id_estado === id)?.descripcion || "Sin estado";

  const obtenerSalario = (id: number) => {
    const salario = salarios.find((x) => x.id_salario === id);
    return salario ? `${salario.descripcion} - Bs ${salario.monto}` : "Sin salario";
  };

  const abrirCrear = () => {
    setEditando(null);
    setForm({
      ...emptyForm,
      id_turno: turnos[0]?.id_turno || 1,
      id_estado_civil: estadosCiviles[0]?.id_estado_civil || 1,
      id_nacionalidad: nacionalidades[0]?.id_nacionalidad || 1,
      id_estado: estados[0]?.id_estado || 1,
      id_tipo_contacto: tiposContacto[0]?.id_tipo_contacto || 1,
      id_salario: salarios[0]?.id_salario || 1,
    });
    setModalOpen(true);
  };

  const abrirEditar = (empleado: Empleado) => {
    setEditando(empleado);

    setForm({
      nombre_empleado: empleado.nombre_empleado,
      ci: empleado.ci || "",
      tel_fijo: empleado.tel_fijo || "",
      cel: empleado.cel || "",
      tel_contacto: empleado.tel_contacto || "",
      nombre_contacto: empleado.nombre_contacto || "",
      email: empleado.email || "",
      direccion: empleado.direccion || "",
      fecha_ingreso: empleado.fecha_ingreso,
      id_turno: empleado.id_turno,
      id_estado_civil: empleado.id_estado_civil,
      id_nacionalidad: empleado.id_nacionalidad,
      id_estado: empleado.id_estado,
      id_tipo_contacto: empleado.id_tipo_contacto,
      id_salario: empleado.id_salario,
    });

    setModalOpen(true);
  };

  const guardarEmpleado = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editando) {
      await actualizarEmpleado(editando.id_empleado, form);
    } else {
      await crearEmpleado(form);
    }

    setModalOpen(false);
    setEditando(null);
    setForm(emptyForm);
    await cargarEmpleados();
  };

  const eliminar = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este empleado?")) return;

    await eliminarEmpleado(id);
    await cargarEmpleados();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Empleados</h1>
          <p className="text-muted">Gestión de empleados registrados.</p>
        </div>

        <button className="btn btn-create" onClick={abrirCrear}>
          Crear empleado
        </button>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Empleado</th>
                <th>CI</th>
                <th>Celular</th>
                <th>Email</th>
                <th>Turno</th>
                <th>Estado</th>
                <th>Salario</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {empleados.length > 0 ? (
                empleados.map((empleado) => (
                  <tr key={empleado.id_empleado}>
                    <td>{empleado.id_empleado}</td>
                    <td>{empleado.nombre_empleado}</td>
                    <td>{empleado.ci || "-"}</td>
                    <td>{empleado.cel || "-"}</td>
                    <td>{empleado.email || "-"}</td>
                    <td>{obtenerTurno(empleado.id_turno)}</td>
                    <td>{obtenerEstado(empleado.id_estado)}</td>
                    <td>{obtenerSalario(empleado.id_salario)}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn btn-edit"
                          onClick={() => abrirEditar(empleado)}
                        >
                          Editar
                        </button>

                        <button
                          className="btn btn-delete"
                          onClick={() => eliminar(empleado.id_empleado)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>No hay empleados registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <EmpleadoForm
          form={form}
          setForm={setForm}
          onSubmit={guardarEmpleado}
          onClose={() => setModalOpen(false)}
          editando={editando !== null}
          turnos={turnos}
          estadosCiviles={estadosCiviles}
          nacionalidades={nacionalidades}
          estados={estados}
          tiposContacto={tiposContacto}
          salarios={salarios}
        />
      )}
    </div>
  );
}

export default EmpleadosList;