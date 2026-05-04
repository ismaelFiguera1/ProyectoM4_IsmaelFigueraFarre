// Genera el texto plano del resumen de tareas que se enviará por email.
// Es una función pura: recibe tareas y devuelve texto.
// No sabe nada de fetch, Firebase ni AWS — solo transforma datos en texto.

import type { Task } from '../types/task'

export function buildTaskSummary(tasks: Task[]): string {
  // Separamos las tareas en dos grupos según su estado
  const completed = tasks.filter((t) => t.completed)
  const pending = tasks.filter((t) => !t.completed)

  // Si no hay tareas en un grupo, mostramos un mensaje claro en vez de una lista vacía
  const pendingList = pending.length
    ? pending.map((t) => `- ${t.title}`).join('\n')
    : 'No hay tareas pendientes.'

  const completedList = completed.length
    ? completed.map((t) => `- ${t.title}`).join('\n')
    : 'No hay tareas completadas.'

  return `
Resumen de tus tareas

Total de tareas: ${tasks.length}
Completadas: ${completed.length}
Pendientes: ${pending.length}

Pendientes:
${pendingList}

Completadas:
${completedList}
`.trim()
}
