import { useState } from "react";
import type { Cliente } from "../clientes/clienteService";
import type { Empleado } from "../empleados/empleadoService";
import type { Producto } from "../productos/productoService";

type ProductoSeleccionado = {
  producto: Producto;
  cantidad: number;
};

type Props = {
  clientes: Cliente[];
  empleados: Empleado[];
  productos: Producto[];
  seleccionados: ProductoSeleccionado[];
  setSeleccionados: React.Dispatch<React.SetStateAction<ProductoSeleccionado[]>>;
  idCliente: number;
  setIdCliente: (id: number) => void;
  idEmpleado: number;
  setIdEmpleado: (id: number) => void;
  cancelado: boolean;
  setCancelado: (value: boolean) => void;
  total: number;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function PedidoForm({
  clientes,
  empleados,
  productos,
  seleccionados,
  setSeleccionados,
  idCliente,
  setIdCliente,
  idEmpleado,
  setIdEmpleado,
  cancelado,
  setCancelado,
  total,
  onSubmit,
}: Props) {
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarProducto = (producto: Producto) => {
    const existe = seleccionados.find(
      (item) => item.producto.id_producto === producto.id_producto
    );

    if (existe) {
      setSeleccionados(
        seleccionados.map((item) =>
          item.producto.id_producto === producto.id_producto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
      return;
    }

    setSeleccionados([...seleccionados, { producto, cantidad: 1 }]);
    setBusqueda("");
  };

  const cambiarCantidad = (idProducto: number, cantidad: number) => {
    setSeleccionados(
      seleccionados.map((item) =>
        item.producto.id_producto === idProducto
          ? { ...item, cantidad: cantidad < 1 ? 1 : cantidad }
          : item
      )
    );
  };

  const quitarProducto = (idProducto: number) => {
    setSeleccionados(
      seleccionados.filter((item) => item.producto.id_producto !== idProducto)
    );
  };

  return (
    <div className="card pedido-form-card">
      <h2>Crear pedido</h2>

      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <div>
            <label>Cliente</label>
            <select
              value={idCliente}
              onChange={(e) => setIdCliente(Number(e.target.value))}
              required
            >
              {clientes.map((cliente) => (
                <option key={cliente.id_cliente} value={cliente.id_cliente}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Empleado que vende</label>
            <select
              value={idEmpleado}
              onChange={(e) => setIdEmpleado(Number(e.target.value))}
              required
            >
              {empleados.map((empleado) => (
                <option key={empleado.id_empleado} value={empleado.id_empleado}>
                  {empleado.nombre_empleado}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h3>Buscar producto</h3>

        <div className="product-search-box">
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar producto por nombre..."
          />

          {busqueda && (
            <div className="product-results">
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto) => (
                  <button
                    type="button"
                    key={producto.id_producto}
                    className="product-result-item"
                    onClick={() => agregarProducto(producto)}
                  >
                    <span>{producto.nombre}</span>
                    <strong>{producto.precio} Bs</strong>
                  </button>
                ))
              ) : (
                <p className="text-muted">No se encontraron productos.</p>
              )}
            </div>
          )}
        </div>

        <h3>Productos seleccionados</h3>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Quitar</th>
              </tr>
            </thead>

            <tbody>
              {seleccionados.length > 0 ? (
                seleccionados.map((item) => {
                  const subtotal =
                    item.cantidad * Number(item.producto.precio);

                  return (
                    <tr key={item.producto.id_producto}>
                      <td>{item.producto.nombre}</td>
                      <td>{item.producto.precio} Bs</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.cantidad}
                          onChange={(e) =>
                            cambiarCantidad(
                              item.producto.id_producto,
                              Number(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td>{subtotal.toFixed(2)} Bs</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-delete"
                          onClick={() =>
                            quitarProducto(item.producto.id_producto)
                          }
                        >
                          Quitar
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5}>Aún no agregaste productos.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pedido-total-box">
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={cancelado}
              onChange={(e) => setCancelado(e.target.checked)}
            />
            Cliente canceló el pedido
          </label>

          <h2>Total: {total.toFixed(2)} Bs</h2>
        </div>

        <div className="modal-actions">
          <button type="submit" className="btn btn-create">
            Guardar pedido
          </button>
        </div>
      </form>
    </div>
  );
}

export default PedidoForm;