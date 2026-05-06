import { getSESErrorMessage } from '../utils/getSESErrorMessage'

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

  if (!response.ok) {
    throw new Error(getSESErrorMessage(data.code ?? ''))
  }
}
