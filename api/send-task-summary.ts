// Vercel Function para enviar el resumen de tareas por email.
// Vive en /api para que Vercel la ejecute como función serverless.
// Las credenciales AWS nunca llegan al frontend — solo existen aquí,
// en servidor, leídas desde variables de entorno.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

type SendTaskSummaryBody = {
  to?: string
  summary?: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[API] Petición recibida — método:', req.method)

  if (req.method !== 'POST') {
    console.log('[API] Método no permitido:', req.method)
    return res.status(405).json({ message: 'Método no permitido' })
  }

  const { to, summary } = req.body as SendTaskSummaryBody
  console.log('[API] Body recibido — to:', to, '| summary (primeros 100 chars):', summary?.slice(0, 100))

  if (!to || !summary) {
    console.log('[API] Faltan datos en el body')
    return res.status(400).json({ message: 'Faltan datos para enviar el email' })
  }

  const region = process.env.AWS_REGION
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  const fromEmail = process.env.AWS_SES_FROM_EMAIL

  console.log('[API] Variables de entorno — region:', region, '| fromEmail:', fromEmail, '| accessKeyId existe:', !!accessKeyId, '| secretAccessKey existe:', !!secretAccessKey)

  if (!region || !accessKeyId || !secretAccessKey || !fromEmail) {
    console.log('[API] Faltan variables de entorno AWS')
    return res.status(500).json({ message: 'Faltan variables de entorno del servidor' })
  }

  const sesClient = new SESClient({
    region,
    credentials: { accessKeyId, secretAccessKey },
  })

  const command = new SendEmailCommand({
    Source: fromEmail,
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: 'Resumen de tus tareas', Charset: 'UTF-8' },
      Body: {
        Text: { Data: summary, Charset: 'UTF-8' },
      },
    },
  })

  try {
    console.log('[API] Enviando email con AWS SES...')
    await sesClient.send(command)
    console.log('[API] Email enviado correctamente a:', to)
    return res.status(200).json({ message: 'Email enviado correctamente' })
  } catch (error) {
    console.error('[API] Error enviando email con AWS SES:', error)
    const message = error instanceof Error ? error.message : 'No se pudo enviar el email'
    const code = error instanceof Error ? (error as Error & { name: string }).name : 'UnknownError'
    return res.status(500).json({ message, code })
  }
}
