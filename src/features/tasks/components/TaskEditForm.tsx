// Formulario de edición de una tarea existente.
// Se muestra inline cuando el usuario pulsa "Editar" en TaskList.
// No sabe nada de Firestore: recibe los valores actuales y llama
// a onSave con los nuevos valores para que el padre los guarde.

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
      <div>
        <label htmlFor="edit-title">Título</label>
        <input
          id="edit-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="edit-description">Descripción</label>
        <textarea
          id="edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  )
}
