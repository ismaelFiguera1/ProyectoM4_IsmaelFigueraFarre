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
      <fieldset>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título</label>
          <input
            className="form-control"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nombre de la tarea"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción opcional"
            rows={3}
          />
        </div>
      </fieldset>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <footer>
        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Crear tarea'}
        </button>
      </footer>
    </form>
  )
}
