import { Outlet, Link } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
          <div className="container">
            <Link className="navbar-brand fw-semibold" to="/">
              TaskApp
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarMain"
              aria-controls="navbarMain"
              aria-expanded="false"
              aria-label="Alternar navegación"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav ms-auto align-items-center gap-2">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-sm" to="/register">
                    Regístrate
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow-1 d-flex flex-column">
        <Outlet />
      </main>

      <footer className="bg-light border-top py-3 mt-auto">
        <div className="container text-center">
          <small className="text-muted">TaskApp &copy; 2026</small>
        </div>
      </footer>
    </div>
  );
}
