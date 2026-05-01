// Formulario de creación de tareas.
// Recibe onTaskCreated como callback para que el componente padre
// pueda recargar la lista cuando se cree una tarea nueva.
// No sabe nada de Firestore directamente, delega en taskService.

import { useState } from 'react'
import { createTask } from '../services/taskService'

interface TaskFormProps {
  userId: string
  onTaskCreated: () => void
}

export function TaskForm({ userId, onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await createTask(userId, title, description)
      setTitle('')
      setDescription('')
      onTaskCreated()
    } catch {
      setError('No se pudo crear la tarea. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Crear tarea'}
      </button>
    </form>
  )
}
