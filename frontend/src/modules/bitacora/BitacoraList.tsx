import { useEffect, useState } from "react";
import {
  listarBitacora,
  eliminarBitacora,
} from "./bitacoraService";
import type { Bitacora } from "./bitacoraService";

function BitacoraList() {
  const [bitacoras, setBitacoras] = useState<Bitacora[]>([]);

  const cargarBitacora = async () => {
    const data = await listarBitacora();
    setBitacoras(data);
  };

  useEffect(() => {
    cargarBitacora();
  }, []);

  const eliminar = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este registro?")) return;

    await eliminarBitacora(id);
    await cargarBitacora();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Bitácora</h1>
          <p className="text-muted">
            Registro de acciones realizadas en el sistema.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Login</th>
                <th>Empleado</th>
                <th>Fecha</th>
                <th>Acción</th>
                <th>Detalle</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {bitacoras.length > 0 ? (
                bitacoras.map((item) => (
                  <tr key={item.id_bitacora}>
                    <td>{item.id_bitacora}</td>
                    <td>{item.id_login}</td>
                    <td>{item.id_empleado}</td>
                    <td>{new Date(item.fecha).toLocaleString()}</td>
                    <td>{item.accion}</td>
                    <td>{item.detalle || "-"}</td>
                    <td>
                      <button
                        className="btn btn-delete"
                        onClick={() => eliminar(item.id_bitacora)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No hay registros en la bitácora.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BitacoraList;