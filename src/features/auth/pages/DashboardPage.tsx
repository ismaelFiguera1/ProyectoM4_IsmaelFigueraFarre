import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <section>
      <h4 className="text-dark mb-4">Inicio</h4>

      <article className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h5 className="card-title text-primary mb-3">
            ¡Bienvenido/a a TaskApp!
          </h5>
          <p className="text-muted mb-4">
            Desde aquí puedes gestionar tus tareas de forma simple y efectiva.
          </p>

          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item px-0">
              <span className="text-muted small">Email</span>
              <p className="fw-semibold mb-0">{user?.email}</p>
            </li>
            <li className="list-group-item px-0">
              <span className="text-muted small">ID de usuario</span>
              <p
                className="fw-semibold mb-0 text-truncate"
                style={{ maxWidth: "400px" }}
              >
                {user?.uid}
              </p>
            </li>
            <li className="list-group-item px-0">
              <span className="text-muted small">Cuenta creada</span>
              <p className="fw-semibold mb-0">
                {user?.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString("es-ES")
                  : "—"}
              </p>
            </li>
          </ul>

          <Link className="btn btn-primary" to="/tasks">
            Ver mis tareas
          </Link>
        </div>
      </article>
    </section>
  );
}
