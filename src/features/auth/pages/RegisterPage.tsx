import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, getAuthErrorMessage } from "../services/authService";
import ImageBackground from "../../../assets/image2.png";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await register(email, password);
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
          <div className="col-sm-10 col-md-9 col-xl-7">
            <div className="card shadow-lg border-0 overflow-hidden">
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-5 d-none d-lg-block">
                    <div
                      className="h-100"
                      style={{
                        backgroundImage: `url(${ImageBackground})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>

                  <div className="col-lg-7">
                    <div className="p-5">
                      <header className="text-center mb-4">
                        <h4 className="text-dark">¡Crea una cuenta!</h4>
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
                              placeholder="Dirección de email"
                              onChange={(e) => setEmail(e.target.value)}
                              name="email"
                              required
                            />
                          </div>
                          <div className="row mb-3 g-2">
                            <div className="col-sm-6">
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
                            <div className="col-sm-6">
                              <label
                                htmlFor="confirmPassword"
                                className="visually-hidden"
                              >
                                Repetir contraseña
                              </label>
                              <input
                                className="form-control"
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                placeholder="Repetir contraseña"
                                required
                                name="confirmPassword"
                              />
                            </div>
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
                          {loading ? "Creando cuenta..." : "Registrarse"}
                        </button>
                      </form>

                      <hr />

                      <footer className="text-center">
                        <small>
                          ¿Ya tienes cuenta?{" "}
                          <Link to="/login">Inicia sesión</Link>
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
