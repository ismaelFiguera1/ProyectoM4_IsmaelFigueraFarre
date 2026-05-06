import { useState } from 'react'
import type { Task } from '../types/task'
import { TaskEditForm } from './TaskEditForm'

interface TaskListProps {
  tasks: Task[]
  onToggle: (taskId: string, currentValue: boolean) => void
  onUpdate: (taskId: string, title: string, description: string) => void
  onDelete: (taskId: string) => void
  actionLoading: boolean
}

export function TaskList({ tasks, onToggle, onUpdate, onDelete, actionLoading }: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function handleSave(taskId: string, title: string, description: string) {
    onUpdate(taskId, title, description)
    setEditingId(null)
  }

  function confirmDelete() {
    if (!deletingId) return
    onDelete(deletingId)
    setDeletingId(null)
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <p className="mb-0">No tienes tareas todavía.</p>
        <small>Pulsa "+ Nueva tarea" para empezar.</small>
      </div>
    )
  }

  return (
    <>
      <section>
        {tasks.map((task) => (
          <article key={task.id} className="card shadow-sm border-0 mb-3">
            <div className="card-body">
              {editingId === task.id ? (
                <TaskEditForm
                  task={task}
                  onSave={(title, description) => handleSave(task.id, title, description)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <>
                  <header className="d-flex align-items-center gap-2 mb-1">
                    <h6
                      className={`mb-0 fw-semibold ${task.completed ? 'text-decoration-line-through text-muted' : 'text-dark'}`}
                    >
                      {task.title}
                    </h6>
                    <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {task.completed ? 'Completada' : 'Pendiente'}
                    </span>
                  </header>

                  {task.description && (
                    <p className="text-muted small mb-3">{task.description}</p>
                  )}

                  <footer className="d-flex gap-2 flex-wrap mt-2">
                    <button
                      className={`btn btn-sm ${task.completed ? 'btn-outline-secondary' : 'btn-outline-success'}`}
                      onClick={() => onToggle(task.id, task.completed)}
                      disabled={actionLoading}
                    >
                      {task.completed ? 'Marcar pendiente' : 'Marcar completada'}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setEditingId(task.id)}
                      disabled={actionLoading}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setDeletingId(task.id)}
                      disabled={actionLoading}
                    >
                      Eliminar
                    </button>
                  </footer>
                </>
              )}
            </div>
          </article>
        ))}
      </section>

      {deletingId && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={() => setDeletingId(null)}
          />
          <div className="modal fade show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <header className="modal-header">
                  <h5 className="modal-title">Eliminar tarea</h5>
                  <button
                    className="btn-close"
                    onClick={() => setDeletingId(null)}
                    aria-label="Cerrar"
                  />
                </header>
                <section className="modal-body">
                  <p className="mb-0">¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.</p>
                </section>
                <footer className="modal-footer">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setDeletingId(null)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={confirmDelete}
                  >
                    Eliminar
                  </button>
                </footer>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
