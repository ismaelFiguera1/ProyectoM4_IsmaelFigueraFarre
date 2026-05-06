import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light text-center px-4">
      <section>
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <p className="lead text-muted mb-4">La página que buscas no existe.</p>
        <Link className="btn btn-primary" to="/">Volver al inicio</Link>
      </section>
    </main>
  );
}
