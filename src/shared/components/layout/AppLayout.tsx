// Layout base compartido por todas las páginas de la app.
// Usa <Outlet /> de React Router para renderizar la página activa
// dentro de una estructura visual común (header, main, footer).
// Cuando añadamos auth, el header con nav irá aquí.

import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <>
      <header>
        <span>TaskApp</span>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>TaskApp &copy; 2025</p>
      </footer>
    </>
  );
}
