// Lista de tareas del usuario autenticado.
// Recibe las tareas ya cargadas como prop, no las carga ella misma.
// La responsabilidad de cargar datos está en la página (DashboardPage),
// este componente solo se encarga de mostrarlos.

import type { Task } from '../types/task'

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No tienes tareas todavía. ¡Crea una!</p>
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
        </li>
      ))}
    </ul>
  )
}
