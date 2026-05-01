// Punto de entrada de la aplicación.
// Monta el árbol React en el div#root del index.html.
// AuthProvider envuelve toda la app para que cualquier componente
// pueda acceder al usuario autenticado a través del hook useAuth.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './features/auth/context/AuthContext'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
