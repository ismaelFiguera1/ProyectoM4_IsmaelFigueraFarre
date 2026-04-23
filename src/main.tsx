// Punto de entrada de la aplicación.
// Monta el árbol React en el div#root del index.html.
// StrictMode activa advertencias extra en desarrollo; no afecta producción.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
