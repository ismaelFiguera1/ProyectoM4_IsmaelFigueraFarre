# CLAUDE.md

## Proyecto

Proyecto integrador M4 HENRY.

Aplicación web SPA para gestión de tareas, construida de forma incremental.

El proyecto final usará:

- React + TypeScript
- Firebase Auth + Firestore
- AWS SES
- Vercel
- Vitest + React Testing Library

Pero en este momento SOLO se trabaja la FASE 5.

No implementar todavía AWS SES, tests, deploy ni rediseño visual con Bootstrap.

---

## Estado actual del proyecto

Las fases anteriores ya deberían estar terminadas.

Actualmente el proyecto debe tener:

- Firebase Auth funcionando.
- Firestore configurado.
- Usuario autenticado disponible.
- Crear tareas.
- Listar tareas del usuario autenticado.
- Marcar tareas como completadas o pendientes.
- Editar título y descripción de tareas.
- Eliminar tareas.
- Rutas protegidas.
- Redirecciones correctas según sesión.
- Logout funcionando correctamente.
- Loading inicial mientras Firebase comprueba la sesión.

La FASE 5 parte de esa base y se centra en cerrar la seguridad real de Firestore.

---

## Objetivo de la FASE 5

El objetivo principal es que Firestore no dependa solo del frontend para proteger los datos.

Hasta ahora la app puede estar filtrando correctamente por `userId`, pero eso no basta como seguridad real.

En esta fase hay que configurar reglas de Firestore para que:

- un usuario no autenticado no pueda leer tareas
- un usuario no autenticado no pueda crear tareas
- un usuario no pueda ver tareas de otro usuario
- un usuario no pueda editar tareas de otro usuario
- un usuario no pueda eliminar tareas de otro usuario
- un usuario no pueda crear una tarea fingiendo ser otro usuario
- un usuario no pueda cambiar el `userId` de una tarea existente

---

## Forma de trabajar

Trabaja siempre en cambios pequeños, controlados y fáciles de revisar.

Reglas obligatorias:

- No hacer cambios gigantes.
- No sobreingenierizar.
- No preparar arquitectura para “por si acaso”.
- Hacer solo lo necesario para la fase actual.
- Cada cambio debe dejar el proyecto funcionando.
- Mantener el código simple, claro y profesional.
- Priorizar legibilidad y orden.
- Evitar dependencias innecesarias.
- No inventar requisitos fuera de lo pedido.
- Antes de tocar varias cosas a la vez, dividir en pasos pequeños.

Cuando propongas cambios:

1. Explica brevemente qué vas a hacer.
2. Indica qué archivos vas a crear o modificar.
3. Haz la implementación.
4. Resume qué quedó hecho.

---

## Alcance actual: FASE 5

Implementar únicamente esto:

1. Revisar la estructura actual de Firestore.
2. Revisar cómo se guarda cada tarea.
3. Crear o ajustar las reglas de seguridad de Firestore.
4. Asegurar que las tareas solo pertenecen al usuario autenticado.
5. Bloquear lectura/escritura a usuarios no autenticados.
6. Bloquear acceso cruzado entre usuarios.
7. Evitar que `userId` pueda modificarse.
8. Revisar que las consultas del frontend siguen funcionando con las reglas.
9. Documentar brevemente cómo probar las reglas.

---

## Qué sí hay que hacer

### 1. Revisar colección de tareas

Confirmar cómo se llama la colección.

Ejemplos posibles:

```txt
tasks