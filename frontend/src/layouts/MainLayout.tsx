import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../modules/auth/authService";
import logo from "../assets/logo.png";

function MainLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const cerrarSesion = async () => {
    await logout();
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <div className="layout">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="logo-box">
          <img src={logo} alt="Cafetéa Logo" />
        </div>

        <button className="sidebar-toggle" type="button" onClick={() => setCollapsed(!collapsed)}>
          ☰
        </button>

        <nav>
          <Link to="/dashboard"><span className="nav-text">Dashboard</span></Link>
          <Link to="/productos"><span className="nav-text">Productos</span></Link>
          <Link to="/clientes"><span className="nav-text">Clientes</span></Link>
          <Link to="/empleados"><span className="nav-text">Empleados</span></Link>
          <Link to="/pedidos"><span className="nav-text">Pedidos</span></Link>
          <Link to="/bitacora"><span className="nav-text">Bitácora</span></Link>
        </nav>

        <div className="sidebar-footer">
          <button type="button" onClick={cerrarSesion}>
            <span className="logout-text">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;