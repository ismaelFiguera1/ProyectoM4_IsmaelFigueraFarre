import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="flex-grow-1 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center px-4">
        <h1 className="display-4 fw-bold text-success mb-3">TaskApp</h1>
        <p className="lead text-muted mb-4">
          Gestiona tus tareas de forma simple y efectiva.
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link className="btn btn-success btn-lg" to="/login">
            Iniciar sesión
          </Link>
          <Link className="btn btn-outline-success btn-lg" to="/register">
            Regístrate
          </Link>
        </div>
      </div>
    </section>
  );
}
