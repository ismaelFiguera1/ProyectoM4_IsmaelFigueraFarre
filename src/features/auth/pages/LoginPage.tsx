import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, getAuthErrorMessage } from "../services/authService";
import imageBackground from "../../../assets/image1.png";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(getAuthErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex-grow-1 bg-secondary d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-8 col-xl-6">
            <div className="card shadow-lg border-0 overflow-hidden">
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-5 d-none d-lg-block">
                    <div
                      className="h-100"
                      style={{
                        backgroundImage: `url(${imageBackground})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>

                  <div className="col-lg-7">
                    <div className="p-5">
                      <header className="text-center mb-4">
                        <h4 className="text-dark">¡Bienvenido de vuelta!</h4>
                      </header>

                      <form onSubmit={handleSubmit}>
                        <fieldset>
                          <div className="mb-3">
                            <label htmlFor="email" className="visually-hidden">
                              Email
                            </label>
                            <input
                              className="form-control"
                              type="email"
                              id="email"
                              value={email}
                              placeholder="Introduce tu email..."
                              onChange={(e) => setEmail(e.target.value)}
                              name="email"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="password"
                              className="visually-hidden"
                            >
                              Contraseña
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Contraseña"
                              required
                              name="password"
                            />
                          </div>
                        </fieldset>

                        {error && (
                          <div className="alert alert-danger py-2" role="alert">
                            {error}
                          </div>
                        )}

                        <button
                          className="btn btn-primary d-block w-100"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? "Entrando..." : "Iniciar sesión"}
                        </button>
                      </form>

                      <hr />

                      <footer className="text-center">
                        <small>
                          ¿No tienes cuenta?{" "}
                          <Link to="/register">Regístrate</Link>
                        </small>
                      </footer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
