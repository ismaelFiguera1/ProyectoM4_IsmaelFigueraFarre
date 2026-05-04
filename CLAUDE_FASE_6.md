# CLAUDE.md

## Proyecto

Proyecto integrador M4 HENRY.

Aplicación web SPA para gestión de tareas.

La aplicación se está construyendo de forma incremental, fase por fase.

El stack final del proyecto será:

- React
- TypeScript
- Firebase Auth
- Cloud Firestore
- AWS SES
- Vercel
- Vercel Functions
- Vitest
- React Testing Library

En este momento SOLO se trabaja la FASE 6.

---

## FASE ACTUAL

FASE 6: envío de resumen de tareas por email usando AWS SES.

Esta fase NO es de diseño.

Esta fase NO es de testing.

Esta fase NO es de deploy final.

Esta fase se centra únicamente en añadir el flujo de email exigido por el proyecto.

---

## Estado actual del proyecto

Las fases anteriores ya están terminadas.

El proyecto ya debe tener:

- React funcionando.
- TypeScript configurado.
- Firebase inicializado.
- Firebase Auth funcionando.
- Registro de usuario.
- Login.
- Logout.
- Rutas protegidas.
- Dashboard o página privada de tareas.
- Firestore configurado.
- CRUD completo de tareas.
- Crear tareas.
- Listar tareas.
- Editar tareas.
- Eliminar tareas.
- Marcar tareas como completadas o pendientes.
- Filtrado de tareas por `userId`.
- Cada usuario ve solo sus propias tareas.
- Reglas de seguridad de Firestore publicadas.
- Prueba manual con dos usuarios funcionando.
- Commits realizados hasta la Fase 5.

La FASE 6 parte de esa base.

No rehacer funcionalidades anteriores.

No tocar Firestore salvo que sea estrictamente necesario.

No tocar reglas de seguridad si no hay un motivo claro.

---

## Objetivo principal de la Fase 6

Añadir un botón que permita al usuario enviar por email un resumen de sus tareas.

El flujo esperado es:

```txt
Usuario autenticado
  ↓
Entra al dashboard de tareas
  ↓
Tiene sus tareas cargadas
  ↓
Pulsa "Enviar resumen por email"
  ↓
React genera el resumen de tareas
  ↓
React llama a una Vercel Function
  ↓
La Vercel Function usa AWS SES
  ↓
AWS SES envía el email
  ↓
La UI muestra éxito o error
```

La idea clave es esta:

```txt
El frontend NO debe usar AWS SES directamente.
El frontend NO debe tener credenciales AWS.
Las claves AWS deben quedarse en servidor.
```

---

## Requisito que se quiere cubrir

El proyecto pide:

- Envío de notificaciones por email.
- Enviar un resumen del estado de todas las tareas.
- Usar AWS SES.
- Invocar AWS SES desde Vercel Functions.
- No exponer secretos en el frontend.
- Manejar variables de entorno correctamente.

Por tanto, la solución debe tener:

- Botón en React.
- Servicio frontend para llamar al endpoint.
- Endpoint serverless en `/api`.
- Integración con AWS SES.
- Variables de entorno privadas.
- `.env.example` sin secretos.
- `.gitignore` protegiendo `.env`.
- Documentación posterior en README.

---

## Qué se debe construir

En esta fase se deben construir estas piezas:

1. Configuración de AWS SES.
2. Variables de entorno para AWS.
3. Vercel Function para enviar email.
4. Helper para construir el resumen de tareas.
5. Servicio frontend para llamar a la función.
6. Componente botón para enviar resumen.
7. Integración del botón en la página de tareas.
8. Estados visuales básicos de envío.
9. Revisión de seguridad de variables.
10. Notas para documentar en README.

---

## Qué NO se debe construir

No implementar todavía:

- Tests.
- Deploy final.
- Bootstrap.
- Plantilla visual.
- Rediseño completo.
- Filtros avanzados.
- Drag and drop.
- Prioridades.
- Fechas de vencimiento.
- Categorías.
- Dashboard avanzado.
- Firebase Admin.
- Backend grande.
- API compleja.
- Plantillas HTML profesionales.
- Envíos automáticos.
- Emails al crear tarea.
- Emails al editar tarea.
- Emails programados.
- Colas de mensajes.
- Cron jobs.
- Roles de usuario.
- Panel de administración.

Esta fase solo debe hacer:

```txt
Botón → resumen → Vercel Function → AWS SES → email
```

---

## Forma de trabajar

Trabaja siempre en pasos pequeños.

No hacer cambios gigantes.

No tocar muchos archivos sin explicar por qué.

Antes de modificar código, explicar:

- qué se va a hacer
- qué archivos se van a tocar
- por qué se tocan
- qué resultado se espera

Después de modificar código, explicar:

- qué quedó hecho
- cómo probarlo
- qué revisar si falla

Mantener el proyecto funcionando después de cada paso.

No avanzar al siguiente paso si el anterior no funciona.

---

## Preferencias de implementación

El proyecto debe mantenerse:

- simple
- claro
- defendible
- fácil de explicar
- sin sobreingeniería
- sin dependencias innecesarias
- con TypeScript práctico
- con servicios separados
- con componentes pequeños
- con lógica de negocio clara
- con comentarios útiles solo donde aporten

No usar `any` salvo necesidad real.

No duplicar lógica.

No meter el `fetch` directamente en la página si se puede crear un servicio.

No meter la lógica de resumen directamente dentro del botón si se puede crear un helper.

---

## Arquitectura esperada

Estructura orientativa:

```txt
project-root/
  api/
    send-task-summary.ts

  src/
    features/
      tasks/
        components/
          SendTaskSummaryButton.tsx
        services/
          taskEmailService.ts
        utils/
          buildTaskSummary.ts
        types/
          task.ts
        pages/
          TasksPage.tsx

  .env
  .env.example
  .gitignore
```

Si el proyecto ya usa otros nombres, respetar los nombres existentes.

No renombrar archivos sin necesidad.

No crear carpetas vacías.

No mover código ya funcional sin motivo claro.

---

## Decisión técnica importante

Para esta fase, el frontend puede generar el resumen de tareas.

Motivo:

- React ya tiene cargadas las tareas del usuario.
- Las tareas ya vienen filtradas por `userId`.
- Firestore ya tiene reglas de seguridad.
- El objetivo actual es enviar un email.
- No hace falta montar Firebase Admin.
- No hace falta que la función consulte Firestore todavía.
- Es más simple y suficiente para el alcance del proyecto.

Flujo elegido:

```txt
React recibe tasks desde useTasks
React genera summary con buildTaskSummary
React manda summary a /api/send-task-summary
La Vercel Function envía el email con AWS SES
```

No implementar en esta fase:

```txt
Vercel Function consulta Firestore
Vercel Function valida Firebase ID Token
Firebase Admin SDK
```

Eso sería una mejora posible, pero no es necesario ahora.

---

## Seguridad de credenciales

Regla máxima:

```txt
Las credenciales AWS jamás deben estar en React.
```

No usar variables con prefijo `VITE_` para AWS.

Incorrecto:

```env
VITE_AWS_ACCESS_KEY_ID=
VITE_AWS_SECRET_ACCESS_KEY=
```

Correcto:

```env
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_SES_FROM_EMAIL=
```

Motivo:

```txt
Las variables VITE_ pueden exponerse al frontend.
Las variables sin VITE_ solo deben usarse en servidor.
```

La Vercel Function puede leer variables con `process.env`.

React no debe leer claves AWS.

---

## Variables de entorno necesarias

Crear o actualizar `.env`.

Este archivo es local.

NO debe subirse a GitHub.

Ejemplo:

```env
AWS_REGION=eu-west-1
AWS_ACCESS_KEY_ID=TU_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=TU_SECRET_KEY
AWS_SES_FROM_EMAIL=tu-email-verificado@example.com
```

Opcional para pruebas:

```env
AWS_SES_TO_EMAIL=tu-email-verificado@example.com
```

Si el email se envía al usuario autenticado, no hace falta `AWS_SES_TO_EMAIL`.

---

## Archivo .env.example

Crear o actualizar `.env.example`.

Este archivo SÍ se sube.

Debe quedar sin valores reales:

```env
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_SES_FROM_EMAIL=
AWS_SES_TO_EMAIL=
```

También puede incluir variables de Firebase si ya existen:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Las variables de Firebase en frontend pueden llevar `VITE_`.

Las credenciales AWS no.

---

## Archivo .gitignore

Revisar que `.gitignore` contiene:

```txt
.env
.env.local
.env.*.local
```

No subir:

- claves AWS
- secretos
- archivos `.env`
- credenciales personales

Sí subir:

- `.env.example`
- código fuente
- README
- configuración sin secretos

---

## AWS SES

Antes de programar, revisar AWS SES.

Hay que tener:

- región elegida
- email emisor verificado
- credenciales IAM
- permisos para enviar email con SES

Si SES está en modo sandbox:

- el email destinatario también debe estar verificado
- si no, el envío fallará

Para pruebas, usar el mismo email verificado como emisor y destinatario.

Ejemplo:

```txt
FROM: tu-email-verificado@example.com
TO: tu-email-verificado@example.com
```

Esto facilita probar sin liarse.

---

## Dependencia necesaria

Instalar solo el cliente de SES:

```bash
npm install @aws-sdk/client-ses
```

No instalar SDKs innecesarios.

No instalar librerías de email extra.

No instalar nodemailer en esta fase si se usa AWS SDK directamente.

---

## Vercel Function

Crear archivo:

```txt
api/send-task-summary.ts
```

Esta función debe ser backend.

Debe usar `process.env`.

Debe recibir una petición `POST`.

Debe validar datos.

Debe llamar a AWS SES.

Debe devolver JSON.

---

## Endpoint esperado

Ruta:

```txt
POST /api/send-task-summary
```

Body esperado:

```json
{
  "to": "usuario@example.com",
  "summary": "Resumen de tareas..."
}
```

No enviar credenciales en el body.

No enviar claves AWS desde React.

---

## Validaciones mínimas del endpoint

La función debe validar:

- método HTTP
- body existente
- email destino
- resumen existente
- región AWS
- access key
- secret key
- email emisor
- error de AWS SES

Debe responder:

```txt
200 → email enviado correctamente
400 → faltan datos
405 → método no permitido
500 → error interno
```

No devolver secretos en la respuesta.

No hacer `console.log` de claves.

---

## Ejemplo conceptual de Vercel Function

Adaptar al proyecto real.

```ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

type SendTaskSummaryBody = {
  to?: string;
  summary?: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Método no permitido",
    });
  }

  const { to, summary } = req.body as SendTaskSummaryBody;

  if (!to || !summary) {
    return res.status(400).json({
      message: "Faltan datos para enviar el email",
    });
  }

  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const fromEmail = process.env.AWS_SES_FROM_EMAIL;

  if (!region || !accessKeyId || !secretAccessKey || !fromEmail) {
    return res.status(500).json({
      message: "Faltan variables de entorno del servidor",
    });
  }

  const sesClient = new SESClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const command = new SendEmailCommand({
    Source: fromEmail,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: "Resumen de tus tareas",
        Charset: "UTF-8",
      },
      Body: {
        Text: {
          Data: summary,
          Charset: "UTF-8",
        },
      },
    },
  });

  try {
    await sesClient.send(command);

    return res.status(200).json({
      message: "Email enviado correctamente",
    });
  } catch (error) {
    console.error("Error enviando email con AWS SES:", error);

    return res.status(500).json({
      message: "No se pudo enviar el email",
    });
  }
}
```

---

## Servicio frontend

Crear archivo:

```txt
src/features/tasks/services/taskEmailService.ts
```

Responsabilidad:

- llamar al endpoint
- enviar `to`
- enviar `summary`
- manejar respuesta
- lanzar error si falla

No debe construir el resumen.

No debe tener claves AWS.

No debe importar AWS SDK.

Ejemplo conceptual:

```ts
type SendTaskSummaryEmailParams = {
  to: string;
  summary: string;
};

export async function sendTaskSummaryEmail({
  to,
  summary,
}: SendTaskSummaryEmailParams) {
  const response = await fetch("/api/send-task-summary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to,
      summary,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo enviar el resumen");
  }

  return data;
}
```

---

## Helper para construir resumen

Crear archivo:

```txt
src/features/tasks/utils/buildTaskSummary.ts
```

Responsabilidad:

- recibir tareas
- contar total
- contar completadas
- contar pendientes
- listar pendientes
- listar completadas
- devolver texto plano

Ejemplo conceptual:

```ts
import type { Task } from "../types/task";

export function buildTaskSummary(tasks: Task[]) {
  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  const pendingList = pendingTasks.length
    ? pendingTasks.map((task) => `- ${task.title}`).join("\n")
    : "No hay tareas pendientes.";

  const completedList = completedTasks.length
    ? completedTasks.map((task) => `- ${task.title}`).join("\n")
    : "No hay tareas completadas.";

  return `
Resumen de tus tareas

Total de tareas: ${tasks.length}
Completadas: ${completedTasks.length}
Pendientes: ${pendingTasks.length}

Pendientes:
${pendingList}

Completadas:
${completedList}
`.trim();
}
```

---

## Contenido esperado del email

El email puede ser texto plano.

No hace falta HTML.

Formato esperado:

```txt
Resumen de tus tareas

Total de tareas: 4
Completadas: 2
Pendientes: 2

Pendientes:
- Revisar README
- Probar deploy

Completadas:
- Configurar Firebase Auth
- Configurar Firestore
```

Esto es suficiente para el proyecto.

---

## Botón de envío

Crear componente:

```txt
src/features/tasks/components/SendTaskSummaryButton.tsx
```

Responsabilidad:

- recibir `userEmail`
- recibir `tasks`
- generar resumen
- llamar al servicio
- mostrar estado de envío
- mostrar éxito
- mostrar error

Estados mínimos:

- normal
- enviando
- éxito
- error

Texto sugerido:

```txt
Enviar resumen por email
Enviando...
Resumen enviado correctamente.
No se pudo enviar el resumen.
```

---

## Ejemplo conceptual del botón

```tsx
import { useState } from "react";
import type { Task } from "../types/task";
import { buildTaskSummary } from "../utils/buildTaskSummary";
import { sendTaskSummaryEmail } from "../services/taskEmailService";

type SendTaskSummaryButtonProps = {
  userEmail: string;
  tasks: Task[];
};

export function SendTaskSummaryButton({
  userEmail,
  tasks,
}: SendTaskSummaryButtonProps) {
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSendSummary() {
    setIsSending(true);
    setMessage(null);

    try {
      const summary = buildTaskSummary(tasks);

      await sendTaskSummaryEmail({
        to: userEmail,
        summary,
      });

      setMessage("Resumen enviado correctamente.");
    } catch (error) {
      setMessage("No se pudo enviar el resumen.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div>
      <button type="button" onClick={handleSendSummary} disabled={isSending}>
        {isSending ? "Enviando..." : "Enviar resumen por email"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
```

---

## Integración en TasksPage

En la página de tareas:

- obtener usuario desde `useAuth`
- obtener tareas desde `useTasks`
- renderizar botón solo si hay email
- pasar `tasks`
- pasar `user.email`

Ejemplo conceptual:

```tsx
{user?.email && (
  <SendTaskSummaryButton
    userEmail={user.email}
    tasks={tasks}
  />
)}
```

No mostrar el botón si:

- no hay usuario
- no hay email
- auth sigue cargando

---

## Comportamiento esperado de la UI

Cuando el usuario pulsa el botón:

```txt
1. El botón se desactiva.
2. El texto cambia a "Enviando...".
3. Se genera el resumen.
4. Se llama al endpoint.
5. Si todo va bien, muestra éxito.
6. Si falla, muestra error.
7. El botón vuelve a estar disponible.
```

No bloquear toda la app.

No borrar tareas.

No recargar la página.

No redirigir al usuario.

---

## Orden de trabajo recomendado

Trabajar en este orden:

1. Verificar email en AWS SES.
2. Confirmar región de AWS SES.
3. Crear credenciales AWS.
4. Revisar permisos IAM.
5. Crear o actualizar `.env`.
6. Crear o actualizar `.env.example`.
7. Revisar `.gitignore`.
8. Instalar `@aws-sdk/client-ses`.
9. Crear `api/send-task-summary.ts`.
10. Probar endpoint con datos simples.
11. Crear `buildTaskSummary.ts`.
12. Crear `taskEmailService.ts`.
13. Crear `SendTaskSummaryButton.tsx`.
14. Integrar botón en `TasksPage.tsx`.
15. Probar desde la app.
16. Probar con tareas pendientes.
17. Probar con tareas completadas.
18. Probar con lista vacía.
19. Revisar errores.
20. Preparar nota para README.

---

## Prueba manual 1: AWS SES

Comprobar:

```txt
1. Entrar en AWS SES.
2. Confirmar región correcta.
3. Confirmar email emisor verificado.
4. Confirmar email receptor verificado si SES está en sandbox.
5. Confirmar que las credenciales existen.
6. Confirmar que la región en .env coincide con SES.
```

---

## Prueba manual 2: app

```txt
1. Iniciar sesión.
2. Crear 3 tareas.
3. Marcar una como completada.
4. Dejar dos pendientes.
5. Pulsar "Enviar resumen por email".
6. Ver "Enviando...".
7. Ver mensaje de éxito.
8. Revisar bandeja de entrada.
9. Confirmar asunto del email.
10. Confirmar contenido del resumen.
```

---

## Prueba manual 3: errores

Probar errores controlados:

```txt
1. Quitar temporalmente AWS_SES_FROM_EMAIL.
2. Reiniciar servidor.
3. Pulsar el botón.
4. Confirmar que la app muestra error.
5. Volver a poner la variable.
```

No dejar el proyecto roto después.

---

## Errores comunes

Error típico:

```txt
Email address is not verified
```

Causa probable:

```txt
El email emisor no está verificado.
O el destinatario no está verificado en sandbox.
```

Otro error:

```txt
Missing credentials
```

Causa probable:

```txt
AWS_ACCESS_KEY_ID o AWS_SECRET_ACCESS_KEY no están cargadas.
```

Otro error:

```txt
Region is missing
```

Causa probable:

```txt
Falta AWS_REGION.
```

Otro error:

```txt
404 al llamar a /api/send-task-summary
```

Causa probable:

```txt
La función no está en la carpeta correcta.
O el servidor local no está usando entorno compatible con Vercel Functions.
```

Otro error:

```txt
No se pudo enviar el resumen
```

Causa probable:

```txt
La función devuelve 500.
Revisar consola del servidor.
```

---

## Importante sobre desarrollo local

En Vite puro, las Vercel Functions pueden no ejecutarse con `npm run dev`.

Para probar funciones de Vercel en local puede ser necesario usar:

```bash
vercel dev
```

No hacer deploy final en esta fase.

Solo usarlo si hace falta para probar la función.

Si el proyecto todavía no tiene Vercel configurado, explicar antes de tocar.

---

## Seguridad mínima esperada

La fase queda mal si:

- AWS SDK está importado en React.
- Las claves AWS están en componentes.
- Se usan variables `VITE_AWS_*`.
- `.env` se sube a GitHub.
- El botón llama directamente a AWS.
- El endpoint devuelve secretos.
- Se hace `console.log` de credenciales.

La fase queda bien si:

- React llama solo a `/api/send-task-summary`.
- AWS SES solo se usa en `/api`.
- Las claves están en `process.env`.
- `.env.example` no tiene secretos.
- `.gitignore` protege `.env`.
- El email se envía correctamente.

---

## README pendiente para esta fase

Añadir después una sección en README con:

- qué hace el botón de email
- qué endpoint usa
- qué servicio externo usa
- qué variables de entorno necesita
- que AWS SES se ejecuta desde servidor
- que las credenciales no están en frontend
- cómo probar el envío

No hace falta escribir el README completo ahora.

Pero dejar anotado lo necesario.

---

## Commits recomendados

Commits pequeños.

Ejemplos:

```txt
feat: add AWS SES email function
feat: add task summary email service
feat: add send task summary button
chore: add email environment example
docs: document task summary email flow
```

No hacer un único commit gigante si se puede evitar.

---

## Checklist final

La Fase 6 queda terminada cuando:

```txt
1. Existe una función /api/send-task-summary.
2. La función acepta POST.
3. La función valida datos mínimos.
4. La función usa AWS SES.
5. La función envía un email real.
6. Las credenciales AWS están en variables de entorno.
7. Las credenciales AWS no están en React.
8. No se usa VITE_ para claves AWS.
9. Existe .env.example sin secretos.
10. .gitignore excluye .env.
11. Existe helper para construir resumen.
12. Existe servicio frontend de email.
13. Existe botón para enviar resumen.
14. El botón muestra estado de envío.
15. El botón muestra éxito.
16. El botón muestra error si falla.
17. El email contiene total de tareas.
18. El email contiene tareas completadas.
19. El email contiene tareas pendientes.
20. La app sigue funcionando después del cambio.
```

---

## Recordatorio final

Estamos SOLO en Fase 6.

No hacer UI final.

No hacer tests todavía.

No hacer deploy final todavía.

No meter Bootstrap.

No meter extras.

No meter backend grande.

No cambiar Firestore si no hace falta.

No cambiar Auth si no hace falta.

La prioridad absoluta es:

```txt
Enviar un resumen de tareas por email usando AWS SES desde una Vercel Function sin exponer secretos.
```