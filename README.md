# TaskApp

Aplicación web de gestión de tareas personales.

Permite a cada usuario registrarse, iniciar sesión, crear y gestionar sus propias tareas, y recibir un resumen de ellas por correo electrónico. Los datos se almacenan en la nube por usuario y el envío de emails se realiza de forma segura desde el servidor, sin exponer credenciales en el frontend.

---

## Stack tecnológico

| Tecnología       | Versión | Rol en el proyecto                |
| ---------------- | ------- | --------------------------------- |
| React            | 19      | Framework de UI                   |
| TypeScript       | 5       | Tipado estático                   |
| Vite             | 6       | Bundler y servidor de desarrollo  |
| React Router     | 7       | Navegación SPA y rutas protegidas |
| Bootstrap        | 5.3     | Estilos y componentes visuales    |
| Firebase Auth    | 11      | Autenticación de usuarios         |
| Cloud Firestore  | 11      | Base de datos NoSQL por usuario   |
| AWS SES          | 3       | Envío de emails transaccionales   |
| Vercel Functions | —       | Capa de servidor para AWS SES     |

---

## Requisitos previos

Antes de instalar el proyecto necesitas tener configuradas estas cuentas y herramientas:

### Herramientas locales

- [Node.js](https://nodejs.org) v18 o superior
- [npm](https://www.npmjs.com) v9 o superior (viene con Node)
- [Vercel CLI](https://vercel.com/docs/cli) — para levantar las functions en local

```bash
npm install -g vercel
```

### Cuentas externas

- **Firebase** — para Auth y Firestore. Necesitas un proyecto en [Firebase Console](https://console.firebase.google.com) con Authentication (proveedor Email/Password) y Firestore habilitados.
- **AWS** — para SES. Necesitas una cuenta en [AWS](https://aws.amazon.com) con un usuario IAM que tenga permisos `ses:SendEmail`.
- **Vercel** — para el deploy. Puedes crear una cuenta gratuita en [vercel.com](https://vercel.com).

---

## Variables de entorno

Copia el archivo de ejemplo y rellena los valores:

```bash
cp .env.example .env
```

### Variables de Firebase (frontend)

Las variables `VITE_` son accesibles en el frontend porque Vite las inyecta en el bundle. Se obtienen en **Firebase Console → tu proyecto → Configuración del proyecto → Aplicaciones web**.

| Variable                            | Descripción                                              |
| ----------------------------------- | -------------------------------------------------------- |
| `VITE_FIREBASE_API_KEY`             | Clave pública de la app web de Firebase                  |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Dominio de autenticación (`tu-proyecto.firebaseapp.com`) |
| `VITE_FIREBASE_PROJECT_ID`          | ID del proyecto de Firebase                              |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Bucket de Storage (`tu-proyecto.appspot.com`)            |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ID del remitente de Cloud Messaging                      |
| `VITE_FIREBASE_APP_ID`              | ID de la aplicación web                                  |
| `VITE_FIREBASE_MEASUREMENT_ID`      | ID de Analytics (opcional)                               |

### Variables de AWS SES (servidor)

Estas variables **nunca llegan al frontend** — solo las usa la Vercel Function en `api/send-task-summary.ts`. Se obtienen en **AWS Console → IAM → tu usuario → Credenciales de seguridad**.

| Variable                | Descripción                                            |
| ----------------------- | ------------------------------------------------------ |
| `AWS_REGION`            | Región de SES (p.ej. `us-east-1` o `eu-west-1`)        |
| `AWS_ACCESS_KEY_ID`     | ID de la clave de acceso del usuario IAM               |
| `AWS_SECRET_ACCESS_KEY` | Clave secreta del usuario IAM                          |
| `AWS_SES_FROM_EMAIL`    | Dirección verificada en SES que aparece como remitente |

> **Importante:** el archivo `.env` está en `.gitignore`. Nunca lo subas al repositorio.

---

## Instalación y arranque local

### 1. Clonar el repositorio

```bash
git clone https://github.com/ismaelFiguera1/ProyectoM4_IsmaelFigueraFarre.git
cd ProyectoM4_IsmaelFigueraFarre
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Sigue el paso anterior para crear y rellenar el archivo `.env`.

### 4. Arrancar en local

```bash
vercel dev
```

Se usa `vercel dev` en lugar de `npm run dev` porque levanta tanto el frontend de Vite como las Vercel Functions del directorio `api/`. Sin esto, el botón de enviar resumen por email fallará en local.

El `npm run dev` solamente levantara la aplicacion react, funcionara react, firebase **MENOS** el vercel function i entonces no podras enviar emails.

La aplicación estará disponible en `http://localhost:3000`.

---

## Estructura del proyecto

El proyecto sigue una arquitectura **feature-based**: cada dominio funcional (auth, tasks, home…) agrupa sus propias páginas, componentes, servicios y tipos. Lo reutilizable entre features vive en `shared/`. Esto evita carpetas planas con decenas de archivos mezclados y facilita localizar cualquier pieza por contexto de negocio, no por tipo técnico.

```
Proyecto_M4/
│
├── api/                              # Funciones de servidor (Vercel Functions)
│   └── send-task-summary.ts          # Único endpoint: recibe el resumen y lo envía con AWS SES.
│                                     # Vive aquí y no en el frontend para que las credenciales
│                                     # de AWS nunca lleguen al navegador.
│
├── src/
│   ├── main.tsx                      # Punto de entrada de React. Monta la app en el DOM
│   │                                 # e importa Bootstrap CSS y JS bundle.
│   │
│   ├── App.tsx                       # Componente raíz. Envuelve la app con el RouterProvider.
│   │
│   ├── app/                          # Infraestructura global de la aplicación
│   │   └── router/
│   │       ├── router.tsx            # Define todas las rutas: públicas, protegidas y 404.
│   │       │                         # Usa createBrowserRouter de React Router v7.
│   │       └── index.ts              # Re-exporta el router para importarlo limpiamente.
│   │
│   ├── features/                     # Un directorio por dominio funcional del negocio
│   │   │
│   │   ├── auth/                     # Todo lo relacionado con autenticación
│   │   │   ├── components/
│   │   │   │   └── ProtectedRoute.tsx  # Componente guardia: si no hay usuario autenticado,
│   │   │   │                           # redirige automáticamente a /login.
│   │   │   ├── context/
│   │   │   │   └── AuthContext.tsx   # Contexto de React que expone el usuario actual
│   │   │   │                         # y el estado de carga a toda la app. Usa onAuthStateChanged
│   │   │   │                         # de Firebase para mantenerse sincronizado.
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.tsx     # Formulario de inicio de sesión con email y contraseña.
│   │   │   │   ├── RegisterPage.tsx  # Formulario de registro con validación de contraseña.
│   │   │   │   └── DashboardPage.tsx # Primera página tras iniciar sesión: bienvenida
│   │   │   │                         # con email, UID y fecha de creación de la cuenta.
│   │   │   └── services/
│   │   │       └── authService.ts    # Funciones login(), register() y logout() que
│   │   │                             # llaman a Firebase Auth. Los componentes no tocan
│   │   │                             # Firebase directamente, solo llaman a este servicio.
│   │   │
│   │   ├── tasks/                    # Todo lo relacionado con la gestión de tareas
│   │   │   ├── components/
│   │   │   │   ├── TaskList.tsx          # Renderiza la lista de tareas como tarjetas Bootstrap.
│   │   │   │   │                         # Incluye modal de confirmación para eliminar.
│   │   │   │   ├── TaskForm.tsx          # Formulario de creación de tarea (título + descripción).
│   │   │   │   │                         # Se usa dentro del modal de TasksPage.
│   │   │   │   ├── TaskEditForm.tsx      # Formulario de edición inline que aparece dentro
│   │   │   │   │                         # de la tarjeta al pulsar "Editar".
│   │   │   │   └── SendTaskSummaryButton.tsx  # Botón que construye el resumen y llama
│   │   │   │                                  # al servicio de email. Muestra feedback
│   │   │   │                                  # de éxito o error al usuario.
│   │   │   ├── pages/
│   │   │   │   └── TasksPage.tsx     # Página principal de tareas. Carga las tareas del usuario,
│   │   │   │                         # muestra el modal de crear tarea y pasa los datos a TaskList.
│   │   │   ├── services/
│   │   │   │   ├── taskService.ts    # CRUD completo contra Firestore: getTasks(), createTask(),
│   │   │   │   │                     # updateTask(), deleteTask(), toggleTask(). Cada operación
│   │   │   │   │                     # filtra por userId para que los datos sean privados.
│   │   │   │   └── taskEmailService.ts  # Llama al endpoint /api/send-task-summary con fetch.
│   │   │   │                            # Traduce el código de error de AWS al mensaje amigable.
│   │   │   ├── types/
│   │   │   │   └── task.ts           # Interfaz Task: id, userId, title, description,
│   │   │   │                         # completed, createdAt. Compartida por toda la feature.
│   │   │   └── utils/
│   │   │       ├── buildTaskSummary.ts   # Función pura que convierte un array de Task[]
│   │   │       │                         # en un texto formateado para el email.
│   │   │       └── getSESErrorMessage.ts # Diccionario code → mensaje en español.
│   │   │                                 # Cubre los errores más comunes de AWS SES.
│   │   │
│   │   ├── home/                     # Página pública de inicio
│   │   │   ├── pages/
│   │   │   │   └── HomePage.tsx      # Hero verde con botones de login y registro.
│   │   │   │                         # Solo visible sin sesión activa.
│   │   │   └── index.ts
│   │   │
│   │   └── not-found/                # Página de error 404
│   │       ├── pages/
│   │       │   └── NotFoundPage.tsx  # Pantalla Bootstrap de 404 con enlace a inicio.
│   │       └── index.ts
│   │
│   └── shared/                       # Piezas reutilizables entre varias features
│       ├── components/
│       │   └── layout/
│       │       ├── AppLayout.tsx     # Layout para páginas públicas: navbar superior + footer.
│       │       │                     # Envuelve Home, Login y Register.
│       │       ├── DashboardLayout.tsx  # Layout para páginas privadas: sidebar de navegación
│       │       │                        # lateral (fijo en escritorio, overlay en móvil)
│       │       │                        # con el email del usuario y botón de cerrar sesión.
│       │       └── index.ts
│       └── lib/
│           └── firebase.ts           # Inicializa la app de Firebase con las variables VITE_
│                                     # y exporta auth y db (Firestore) listos para usar.
│
├── .env.example                      # Plantilla de variables de entorno (sin valores reales)
├── .env                              # Variables reales — NO se sube al repositorio
├── vercel.json                       # Configuración de Vercel: rewrites para las functions
├── vite.config.ts                    # Configuración de Vite
└── tsconfig.json                     # Configuración de TypeScript
```

---

## Fases del desarrollo

El proyecto se construyó en fases incrementales. Cada fase entregó algo visible, usable y sin romper lo anterior.

### Fase 0 — Base del proyecto

Creación de la estructura de carpetas feature-based, configuración de React Router, layout base con navbar y páginas iniciales (Home y 404). Sin Firebase ni servicios externos. El objetivo fue tener una SPA navegable desde el primer día.

### Fase 1 — Autenticación con Firebase

Integración de Firebase Auth con email y contraseña. Se implementaron las páginas de login y registro, el servicio `authService.ts` y el contexto `AuthContext` para que el usuario autenticado esté disponible en toda la app sin pasar props manualmente.

### Fase 2 — Inicialización de Firestore

Configuración de Cloud Firestore como base de datos. Se creó `firebase.ts` en `shared/lib/` para inicializar la conexión una sola vez y exportar `auth` y `db` listos para usar. Se estableció la estructura de colecciones: cada tarea es un documento dentro de `users/{userId}/tasks`.

### Fase 3 — CRUD de tareas

Implementación completa de crear, leer, actualizar y eliminar tareas en Firestore. Se crearon `taskService.ts`, `TaskForm`, `TaskList` y `TaskEditForm`. Todas las operaciones filtran por `userId` para que cada usuario solo acceda a sus propios datos.

### Fase 4 — Rutas protegidas

Creación del componente `ProtectedRoute` que intercepta las rutas privadas y redirige a `/login` si no hay sesión activa. A partir de esta fase, `/dashboard` y `/tasks` son inaccesibles sin autenticación.

### Fase 5 — Reglas de seguridad en Firestore

Configuración de las reglas de seguridad de Firestore directamente en Firebase Console. Aunque el frontend ya filtraba por `userId`, sin reglas cualquier usuario podía acceder a los datos de otro haciendo peticiones directas a la API de Firestore. Las reglas cierran esa brecha a nivel de base de datos.

### Fase 6 — Envío de email con AWS SES

Implementación del endpoint `api/send-task-summary.ts` como Vercel Function. El frontend construye el resumen de tareas con `buildTaskSummary` y lo envía al endpoint, que lo reenvía a AWS SES usando las credenciales almacenadas como variables de entorno del servidor. Las credenciales de AWS nunca llegan al navegador.

### Fase 7 — UI con Bootstrap 5 y HTML semántico

Rediseño visual completo con Bootstrap 5.3: navbar responsive, sidebar con overlay en móvil, formularios con tarjetas de dos columnas, modales para crear tarea y confirmar eliminación. Se aplicó HTML semántico en todos los componentes (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `fieldset`). Se añadió también el diccionario de errores de AWS SES para mostrar mensajes en español en lugar del error crudo del SDK.
