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

Pero en este momento SOLO se trabaja la FASE 3.

No implementar todavía AWS SES, tests ni deploy.

---

## Estado actual del proyecto

La FASE 2 ya está terminada.

Actualmente el proyecto debe tener:

- Firebase Auth funcionando.
- Firestore configurado.
- Usuario autenticado disponible.
- Feature `tasks` creada.
- Modelo o tipo de tarea definido.
- Formulario mínimo para crear tareas.
- Guardado de tareas en Firestore.
- Listado de tareas del usuario autenticado.
- Consulta filtrada por `userId`.
- Estados básicos de carga, error y vacío.

La FASE 3 parte de esa base y añade acciones sobre tareas existentes.

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

## Preferencias de implementación

- Proyecto simple, defendible y escalable de forma realista.
- Estructura clara, sin patrones enterprise artificiales.
- Nada de Redux, CQRS, DDD, Clean Architecture compleja, microfrontends ni historias raras.
- Componentes simples y bien separados.
- Routing claro con React Router.
- Estilos simples.
- No hacer todavía rediseño visual grande.
- No integrar todavía plantilla Bootstrap completa.
- Se pueden usar clases básicas si ya existen, pero no convertir esta fase en una fase de diseño.
- Nombres claros y consistentes.
- TypeScript estricto pero práctico.
- Evitar `any` salvo que sea totalmente necesario y esté justificado.
- Comentarios útiles solo donde ayuden a entender el flujo o una decisión importante.

---

## Alcance actual: FASE 3

Objetivo: completar las acciones básicas de una tarea existente.

La FASE 3 debe permitir:

1. Marcar una tarea como completada o pendiente.
2. Editar una tarea existente.
3. Eliminar una tarea existente.
4. Mantener siempre la separación por `userId`.
5. Evitar que un usuario pueda modificar tareas de otro usuario.
6. Mantener estados de carga, error y vacío.
7. Mantener el código simple y revisable.

---

## Qué sí hay que hacer

Implementar únicamente esto:

### 1. Marcar tarea como completada

- Añadir una acción para cambiar `completed`.
- Si la tarea está pendiente, debe poder marcarse como completada.
- Si la tarea está completada, debe poder volver a pendiente.
- Actualizar Firestore.
- Reflejar el cambio en pantalla.

### 2. Editar tarea

- Permitir editar al menos:
  - `title`
  - `description`

- Puede hacerse con un formulario simple.
- No hace falta modal complejo.
- No hace falta diseño avanzado.
- Validar que el título no esté vacío.
- Guardar los cambios en Firestore.
- Reflejar los cambios en pantalla.

### 3. Eliminar tarea

- Añadir botón para eliminar.
- Pedir confirmación simple antes de borrar.
- Borrar la tarea de Firestore.
- Reflejar el cambio en pantalla.

### 4. Seguridad básica por usuario

- Todas las operaciones deben trabajar sobre tareas del usuario autenticado.
- No confiar solo en la UI.
- Antes de actualizar o eliminar, comprobar que existe usuario autenticado.
- Mantener el uso de `uid` como relación con la tarea.
- No usar email como clave principal de relación.

### 5. Estados de UI

Mantener o añadir estados básicos:

- cargando
- error
- lista vacía
- guardando
- editando
- eliminando

No hace falta que sean perfectos visualmente, pero deben ser claros.

---

## Qué NO hay que hacer todavía

No implementar:

- filtros por estado
- búsqueda
- orden avanzado
- drag and drop
- prioridades
- fechas de vencimiento
- categorías
- subtareas
- comentarios en tareas
- dashboard avanzado
- notificaciones
- AWS SES
- Vercel Functions
- tests
- deploy
- plantilla Bootstrap completa
- rediseño visual grande
- refactor global del proyecto

---

## Resultado esperado de la Fase 3

Al terminar esta fase, el proyecto debe cumplir esto:

- Un usuario autenticado puede crear tareas.
- El usuario puede ver solo sus propias tareas.
- El usuario puede marcar una tarea como completada.
- El usuario puede volver a marcar una tarea como pendiente.
- El usuario puede editar título y descripción de una tarea.
- El usuario puede eliminar una tarea.
- Los cambios se guardan en Firestore.
- Los cambios se mantienen al recargar la página.
- La app no muestra tareas de otros usuarios.
- La app no modifica tareas de otros usuarios.
- La UI muestra estados básicos y comprensibles.
- El código sigue siendo pequeño, revisable y fácil de explicar.

