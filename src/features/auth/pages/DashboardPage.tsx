// Página principal privada. Solo accesible si hay usuario autenticado.
// Coordina la carga de tareas, el formulario de creación y el listado.
// Es el componente contenedor: gestiona el estado y se lo pasa a los hijos.

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { logout } from '../services/authService'
import { getUserTasks, toggleTaskCompleted, updateTask, deleteTask } from '../../tasks/services/taskService'
import { TaskForm } from '../../tasks/components/TaskForm'
import { TaskList } from '../../tasks/components/TaskList'
import { SendTaskSummaryButton } from '../../tasks/components/SendTaskSummaryButton'
import type { Task } from '../../tasks/types/task'

export function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  async function loadTasks() {
    if (!user) return
    setLoading(true)
    setError('')

    try {
      const userTasks = await getUserTasks(user.uid)
      setTasks(userTasks)
    } catch (err) {
      console.error('Error al cargar tareas:', err)
      setError('No se pudieron cargar las tareas.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [user])

  async function handleToggle(taskId: string, currentValue: boolean) {
    if (!user) return
    setActionLoading(true)
    try {
      await toggleTaskCompleted(taskId, currentValue)
      loadTasks()
    } finally {
      setActionLoading(false)
    }
  }

  async function handleUpdate(taskId: string, title: string, description: string) {
    if (!user) return
    setActionLoading(true)
    try {
      await updateTask(taskId, title, description)
      loadTasks()
    } finally {
      setActionLoading(false)
    }
  }

  async function handleDelete(taskId: string) {
    if (!user) return
    setActionLoading(true)
    try {
      await deleteTask(taskId)
      loadTasks()
    } finally {
      setActionLoading(false)
    }
  }

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div>
      <div>
        <h1>Mis tareas</h1>
        <p>{user?.email}</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <TaskForm userId={user!.uid} onTaskCreated={loadTasks} />

      {/* Solo se muestra si el usuario tiene email y las tareas ya cargaron */}
      {!loading && !error && user?.email && (
        <SendTaskSummaryButton userEmail={user.email} tasks={tasks} />
      )}

      {loading && <p>Cargando tareas...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          actionLoading={actionLoading}
        />
      )}
    </div>
  )
}
