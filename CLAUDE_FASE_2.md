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

Pero en este momento SOLO se trabaja la FASE 2.
No implementar todavía edición, eliminación, marcado como completada, AWS SES, tests ni deploy.

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
- Estilos simples; se puede usar CSS modular/simple, pero sin montar una arquitectura de estilos compleja.
- Nombres claros y consistentes.
- TypeScript estricto pero práctico.
- Evitar `any` salvo que sea totalmente necesario y esté justificado.
- Documentar el código con comentarios útiles, especialmente en partes nuevas para el usuario.

---

## Alcance actual: FASE 2

Objetivo: conectar Firestore y dejar funcionando la base de tareas del usuario autenticado.

### Qué sí hay que hacer

Implementar únicamente esto:

1. Preparar Firestore en el proyecto.
2. Mantener la configuración sensible en variables de entorno.
3. Crear la base de la feature `tasks` dentro de la estructura del proyecto.
4. Definir el tipo o modelo de tarea.
5. Crear un formulario mínimo para crear tareas.
6. Guardar tareas en Firestore.
7. Listar las tareas del usuario autenticado.
8. Filtrar por `userId` desde el principio.
9. Mostrar estados básicos de carga, error y estado vacío.
10. Mantener comentarios útiles que expliquen el porqué y el flujo importante.

### Qué NO hay que hacer todavía

No implementar:

- editar tarea
- eliminar tarea
- marcar tarea como completada
- filtros por estado
- drag and drop
- fechas de vencimiento o prioridades
- AWS SES
- Vercel Functions
- tests de componentes
- deploy final
- refactors grandes no necesarios para esta fase

---

## Resultado esperado de la Fase 2

Al terminar esta fase, el proyecto debe cumplir esto:

- Un usuario autenticado puede crear una tarea.
- La tarea se guarda en Firestore.
- La tarea vuelve a aparecer al recargar.
- El usuario ve solo sus propias tareas.
- La UI muestra estados claros de carga, error y vacío.
- Existe una base limpia para implementar después edición, eliminación y completado.
- El código sigue siendo pequeño, revisable y bien comentado.

---

## Estructura deseada para esta fase

Usar la estructura ya definida del proyecto, manteniendo separación por dominio y carpetas compartidas.

```txt
src/
  app/
    router/
      index.tsx
      routes.tsx
    providers/
    styles/

  features/
    home/
      pages/
        HomePage.tsx
      index.ts

    not-found/
      pages/
        NotFoundPage.tsx
      index.ts

    auth/
      components/
      hooks/
      services/
      types/
      pages/
      index.ts

    tasks/
      components/
      hooks/
      services/
      types/
      pages/
      index.ts

  shared/
    components/
      layout/
        AppLayout.tsx
        index.ts
    ui/
    hooks/
    lib/
    utils/
    types/
    constants/
    assets/

  main.tsx
```

Si alguna carpeta no es necesaria todavía, no forzarla.

---

## Modelo mínimo de tarea

La tarea debe ser simple y suficiente para esta fase. Como base, usar algo equivalente a:

- `id`
- `title`
- `description`
- `completed`
- `userId`
- `createdAt`

Notas:

- `userId` debe venir del usuario autenticado actual.
- No usar el email como clave principal de relación.
- Usar el `uid` del usuario autenticado.
- `completed` puede existir ya en el modelo aunque todavía no haya UI para cambiarlo.

---

## Criterios técnicos de esta fase

- Usar Firestore, no inventar backend propio para tareas.
- Mantener la integración de Firebase limpia en una capa de `shared/lib` o similar.
- Separar UI, lógica de tareas y acceso a Firestore.
- No meter toda la lógica en páginas gigantes.
- Los comentarios deben explicar decisiones, flujo y relación entre piezas, no describir obviedades.
- La lectura de tareas debe estar ligada al usuario autenticado actual.
- No traer tareas de todos para luego filtrar en frontend.
- Consultar solo las tareas del usuario actual.
- Mantener el flujo fácil de entender para alguien que está aprendiendo React, Firebase Auth y Firestore.

---

## Orden recomendado de trabajo en Fase 2

1. Preparar Firestore base.
2. Crear el tipo de tarea.
3. Crear servicio o módulo de tareas.
4. Crear formulario mínimo de creación.
5. Guardar tareas en Firestore con `userId`.
6. Listar tareas del usuario actual.
7. Añadir loading, error y estado vacío.
8. Revisar limpieza y comentarios.

---

## Forma de entregar cada paso

En cada intervención:

- di qué paso pequeño vas a hacer
- indica qué archivos vas a tocar
- explica por qué esos archivos
- modifica solo lo necesario
- deja el proyecto funcional tras cada cambio
- añade comentarios útiles cuando la parte sea importante para entender el flujo

Ejemplo de estilo esperado:

- “Voy a preparar Firestore y la base del servicio de tareas.”
- “Archivos a tocar: ...”
- implementación
- “Resultado: ya existe la base técnica para empezar a guardar tareas.”

---

## Prioridad máxima

La prioridad de esta fase es:

1. crear tarea
2. listar tareas del usuario actual
3. guardar correctamente en Firestore
4. mantener separación por `userId`
5. código simple
6. comentarios que enseñen
7. no adelantarse todavía a edición, eliminación ni completado

---

## Recordatorio importante

Estamos SOLO en Fase 2.

No anticipes todavía la fase de edición, eliminación o completado.
No añadas AWS SES.
No añadas tests.
No prepares deploy todavía.
No metas complejidad innecesaria.
