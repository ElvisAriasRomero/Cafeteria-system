import { useEffect, useState } from "react";
import {
  listarClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} from "./clienteService";
import type { Cliente, ClienteFormData } from "./clienteService";
import ClienteForm from "./ClienteForm";

const emptyForm: ClienteFormData = {
  ci_o_nit: "",
  nombre: "",
  fecha_nacimiento: "",
  celular: "",
  email: "",
  direccion: "",
};

function ClientesList() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Cliente | null>(null);
  const [form, setForm] = useState<ClienteFormData>(emptyForm);

  const cargarClientes = async () => {
    const data = await listarClientes();
    setClientes(data);
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const abrirCrear = () => {
    setEditando(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const abrirEditar = (cliente: Cliente) => {
    setEditando(cliente);
    setForm({
      ci_o_nit: cliente.ci_o_nit || "",
      nombre: cliente.nombre,
      fecha_nacimiento: cliente.fecha_nacimiento || "",
      celular: cliente.celular || "",
      email: cliente.email || "",
      direccion: cliente.direccion || "",
    });
    setModalOpen(true);
  };

  const guardarCliente = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editando) {
      await actualizarCliente(editando.id_cliente, form);
    } else {
      await crearCliente(form);
    }

    setModalOpen(false);
    setEditando(null);
    setForm(emptyForm);
    await cargarClientes();
  };

  const eliminar = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;
    await eliminarCliente(id);
    await cargarClientes();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Clientes</h1>
          <p className="text-muted">Gestión de clientes registrados.</p>
        </div>

        <button className="btn btn-create" onClick={abrirCrear}>
          Crear cliente
        </button>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>CI/NIT</th>
                <th>Nombre</th>
                <th>Celular</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {clientes.length > 0 ? (
                clientes.map((cliente) => (
                  <tr key={cliente.id_cliente}>
                    <td>{cliente.id_cliente}</td>
                    <td>{cliente.ci_o_nit || "-"}</td>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.celular || "-"}</td>
                    <td>{cliente.email || "-"}</td>
                    <td>{cliente.direccion || "-"}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn btn-edit"
                          onClick={() => abrirEditar(cliente)}
                        >
                          Editar
                        </button>

                        <button
                          className="btn btn-delete"
                          onClick={() => eliminar(cliente.id_cliente)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No hay clientes registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <ClienteForm
          form={form}
          setForm={setForm}
          onSubmit={guardarCliente}
          onClose={() => setModalOpen(false)}
          editando={editando !== null}
        />
      )}
    </div>
  );
}

export default ClientesList;