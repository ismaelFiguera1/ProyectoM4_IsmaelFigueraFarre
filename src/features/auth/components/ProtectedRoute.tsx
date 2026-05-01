// Componente de protección de rutas privadas.
// Equivalente al middleware de auth en backend: comprueba si hay usuario
// antes de renderizar la página. Si no hay usuario, redirige al login.
// Si Firebase todavía está cargando, no hace nada hasta saber el estado real.

import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute() {
  const { user, loading } = useAuth()

  // Mientras Firebase comprueba la sesión, no renderizamos nada.
  // Esto evita redirigir al login por error cuando sí hay sesión guardada.
  if (loading) return null

  // Si no hay usuario autenticado, redirige al login.
  // replace evita que /dashboard quede en el historial del navegador.
  if (!user) return <Navigate to="/login" replace />

  // Si hay usuario, renderiza la página protegida.
  return <Outlet />
}
