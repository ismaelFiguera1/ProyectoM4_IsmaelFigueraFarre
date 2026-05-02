// Lista de tareas del usuario autenticado.
// Recibe las tareas y los handlers desde DashboardPage.
// Gestiona qué tarea está en modo edición, pero delega
// el formulario a TaskEditForm y el guardado al padre.

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
  // id de la tarea en modo edición. null = ninguna.
  const [editingId, setEditingId] = useState<string | null>(null)

  function handleSave(taskId: string, title: string, description: string) {
    onUpdate(taskId, title, description)
    setEditingId(null)
  }

  function handleDelete(taskId: string) {
    if (!confirm('¿Eliminar esta tarea?')) return
    onDelete(taskId)
  }

  if (tasks.length === 0) {
    return <p>No tienes tareas todavía. ¡Crea una!</p>
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {editingId === task.id ? (
            <TaskEditForm
              task={task}
              onSave={(title, description) => handleSave(task.id, title, description)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div>
              <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </h3>
              {task.description && <p>{task.description}</p>}
              <button onClick={() => onToggle(task.id, task.completed)} disabled={actionLoading}>
                {task.completed ? 'Marcar pendiente' : 'Marcar completada'}
              </button>
              <button onClick={() => setEditingId(task.id)} disabled={actionLoading}>Editar</button>
              <button onClick={() => handleDelete(task.id)} disabled={actionLoading}>
                {actionLoading ? 'Guardando...' : 'Eliminar'}
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
