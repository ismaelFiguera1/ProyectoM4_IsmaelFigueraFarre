import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/context/AuthContext";
import { logout } from "../../../features/auth/services/authService";

export function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  const sidebarNav = (
    <nav aria-label="Navegación lateral">
      <ul className="nav flex-column flex-grow-1 pt-2">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              `nav-link text-white px-4 py-3 ${isActive ? "fw-semibold" : "opacity-75"}`
            }
          >
            Inicio
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/tasks"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `nav-link text-white px-4 py-3 ${isActive ? "fw-semibold" : "opacity-75"}`
            }
          >
            Tareas
          </NavLink>
        </li>
      </ul>
    </nav>
  );

  return (
    <div className="d-flex min-vh-100">

      {/* Sidebar desktop — siempre visible en lg+ */}
      <aside
        className="d-none d-lg-flex flex-column bg-primary text-white flex-shrink-0"
        style={{ width: "220px" }}
      >
        <div className="d-flex align-items-center justify-content-center py-4 border-bottom border-white border-opacity-25">
          <span className="fw-bold fs-5">TaskApp</span>
        </div>
        {sidebarNav}
      </aside>

      {/* Sidebar mobile — overlay al pulsar hamburguesa */}
      {sidebarOpen && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1040 }}
            onClick={closeSidebar}
          />
          <aside
            className="d-flex flex-column bg-primary text-white position-fixed top-0 start-0 h-100"
            style={{ width: "220px", zIndex: 1050 }}
          >
            <div className="d-flex align-items-center justify-content-between px-4 py-4 border-bottom border-white border-opacity-25">
              <span className="fw-bold fs-5">TaskApp</span>
              <button
                className="btn-close btn-close-white"
                onClick={closeSidebar}
                aria-label="Cerrar menú"
              />
            </div>
            {sidebarNav}
          </aside>
        </>
      )}

      {/* Contenido principal */}
      <div className="d-flex flex-column flex-grow-1 bg-light overflow-hidden">

        <header>
          <nav className="navbar bg-white shadow-sm px-4 py-2">
            <button
              className="btn btn-outline-secondary btn-sm d-lg-none me-3"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menú"
            >
              <span>☰</span>
            </button>

            <span className="text-muted small">{user?.email}</span>

            <button
              className="btn btn-outline-secondary btn-sm ms-auto"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </nav>
        </header>

        <main className="flex-grow-1 p-4 overflow-auto">
          <Outlet />
        </main>

        <footer className="bg-white border-top py-3 text-center">
          <small className="text-muted">TaskApp &copy; 2026</small>
        </footer>

      </div>
    </div>
  );
}
