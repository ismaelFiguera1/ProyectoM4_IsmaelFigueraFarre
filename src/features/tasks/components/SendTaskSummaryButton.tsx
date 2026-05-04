// Botón para enviar el resumen de tareas por email.
// Recibe el email del usuario y las tareas desde el padre.
// Gestiona internamente los estados: normal, enviando, éxito y error.
// No sabe nada de Firestore ni de AWS — delega en buildTaskSummary y taskEmailService.

import { useState } from 'react'
import type { Task } from '../types/task'
import { buildTaskSummary } from '../utils/buildTaskSummary'
import { sendTaskSummaryEmail } from '../services/taskEmailService'

interface SendTaskSummaryButtonProps {
  userEmail: string
  tasks: Task[]
}

export function SendTaskSummaryButton({ userEmail, tasks }: SendTaskSummaryButtonProps) {
  const [isSending, setIsSending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSendSummary() {
    setIsSending(true)
    setMessage(null)

    try {
      const summary = buildTaskSummary(tasks)
      await sendTaskSummaryEmail({ to: userEmail, summary })
      setMessage('Resumen enviado correctamente.')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'No se pudo enviar el resumen.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div>
      <button type="button" onClick={handleSendSummary} disabled={isSending}>
        {isSending ? 'Enviando...' : 'Enviar resumen por email'}
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}
