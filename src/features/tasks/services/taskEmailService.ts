// Servicio de email para tareas.
// Responsabilidad única: llamar al endpoint /api/send-task-summary.
// No construye el resumen ni sabe nada de AWS — solo hace el fetch
// y lanza un error si la respuesta no es correcta.

type SendTaskSummaryParams = {
  to: string
  summary: string
}

export async function sendTaskSummaryEmail({ to, summary }: SendTaskSummaryParams): Promise<void> {
  const response = await fetch('/api/send-task-summary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, summary }),
  })

  const data = await response.json()

  // Si el servidor devuelve cualquier código distinto de 2xx, lanzamos error
  // para que el componente pueda mostrar el mensaje de fallo al usuario.
  if (!response.ok) {
    throw new Error(data.message || 'No se pudo enviar el resumen')
  }
}
