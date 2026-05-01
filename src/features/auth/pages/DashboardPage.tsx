// Página privada mínima. Solo accesible si hay usuario autenticado.
// En la Fase 2 aquí aparecerá el listado de tareas del usuario.
// Por ahora sirve para validar que el login, el registro y la
// protección de rutas funcionan correctamente.

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { logout } from '../services/authService'

export function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido, {user?.email}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  )
}
