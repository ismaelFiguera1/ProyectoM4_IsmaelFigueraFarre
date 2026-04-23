// Página 404. Se muestra cuando ninguna ruta coincide con la URL visitada.
// React Router la captura con el path '*' definido en el router.

import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <>
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </>
  );
}
