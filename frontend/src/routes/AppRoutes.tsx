import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../modules/auth/Login";
import Register from "../modules/auth/Register";
import Dashboard from "../modules/dashboard/Dashboard";
import ProductosList from "../modules/productos/ProductosList";
import CategoriasList from "../modules/categorias/CategoriasList";
import ClientesList from "../modules/clientes/ClientesList";
import EmpleadosList from "../modules/empleados/EmpleadosList";
import PedidosList from "../modules/pedidos/PedidosList";
import MainLayout from "../layouts/MainLayout";
import BitacoraList from "../modules/bitacora/BitacoraList";

function PrivateRoute() {
  const usuario = localStorage.getItem("usuario");

  if (!usuario) {
    return <Navigate to="/" />;
  }

  return <MainLayout />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productos" element={<ProductosList />} />
          <Route path="/categorias" element={<CategoriasList />} />
          <Route path="/clientes" element={<ClientesList />} />
          <Route path="/empleados" element={<EmpleadosList />} />
          <Route path="/pedidos" element={<PedidosList />} />
          <Route path="/bitacora" element={<BitacoraList />} />
          <Route path="/pedidos" element={<h1>Pedidos</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;