import { useState, useEffect } from 'react'
import { useAuth } from '../../auth/context/AuthContext'
import { getUserTasks, toggleTaskCompleted, updateTask, deleteTask } from '../services/taskService'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { SendTaskSummaryButton } from '../components/SendTaskSummaryButton'
import type { Task } from '../types/task'

export function TasksPage() {
  const { user } = useAuth()

  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

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

  function handleTaskCreated() {
    setShowModal(false)
    loadTasks()
  }

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

  return (
    <section>
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-dark mb-0">Mis tareas</h4>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Nueva tarea
        </button>
      </header>

      {!loading && !error && user?.email && (
        <div className="mb-3">
          <SendTaskSummaryButton userEmail={user.email} tasks={tasks} />
        </div>
      )}

      {loading && <p className="text-muted">Cargando tareas...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          actionLoading={actionLoading}
        />
      )}

      {showModal && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowModal(false)}
          />
          <div className="modal fade show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <header className="modal-header">
                  <h5 className="modal-title">Nueva tarea</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Cerrar"
                  />
                </header>
                <section className="modal-body">
                  <TaskForm userId={user!.uid} onTaskCreated={handleTaskCreated} />
                </section>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
