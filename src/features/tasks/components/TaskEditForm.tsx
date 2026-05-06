import { useState } from 'react'
import type { Task } from '../types/task'

interface TaskEditFormProps {
  task: Task
  onSave: (title: string, description: string) => void
  onCancel: () => void
}

export function TaskEditForm({ task, onSave, onCancel }: TaskEditFormProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onSave(title.trim(), description.trim())
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="mb-2">
          <label htmlFor="edit-title" className="form-label small">Título</label>
          <input
            className="form-control form-control-sm"
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="edit-description" className="form-label small">Descripción</label>
          <textarea
            className="form-control form-control-sm"
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
        </div>
      </fieldset>

      <footer className="d-flex gap-2">
        <button className="btn btn-primary btn-sm" type="submit">Guardar</button>
        <button className="btn btn-outline-secondary btn-sm" type="button" onClick={onCancel}>Cancelar</button>
      </footer>
    </form>
  )
}
