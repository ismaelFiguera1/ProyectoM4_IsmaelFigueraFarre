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

Pero en este momento SOLO se trabaja la FASE 1.
No implementar todavía Firestore para tareas, CRUD de tareas, AWS SES, tests avanzados ni deploy.

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

## Alcance actual: FASE 1

Objetivo: implementar la autenticación base de la aplicación y dejar preparada la base de la zona privada.

### Qué sí hay que hacer

Implementar únicamente esto:

1. Preparar Firebase para autenticación.
2. Preparar variables de entorno locales y ejemplo sin secretos reales.
3. Crear la base de la feature de auth dentro de la estructura del proyecto.
4. Implementar registro con email y password.
5. Implementar login con email y password.
6. Implementar logout.
7. Mantener la sesión del usuario autenticado al recargar.
8. Crear protección de rutas privadas.
9. Mostrar estados básicos de carga y errores de autenticación.
10. Dejar una página privada mínima o dashboard vacío solo para comprobar que la autenticación y la protección de rutas funcionan.
11. Documentar el código con comentarios que expliquen el porqué y el flujo importante.

### Qué NO hay que hacer todavía

No implementar:

- CRUD de tareas
- Firestore para tareas
- listado real de tareas
- creación, edición o eliminación de tareas
- AWS SES
- Vercel Functions
- deploy final
- tests de componentes
- extras como filtros, prioridades o drag and drop
- refactors grandes no necesarios para auth

---

## Resultado esperado de la Fase 1

Al terminar esta fase, el proyecto debe cumplir esto:

- Un usuario puede registrarse.
- Un usuario puede iniciar sesión.
- Un usuario puede cerrar sesión.
- La sesión persiste correctamente al recargar.
- Las rutas privadas están protegidas.
- Si el usuario no está autenticado, no puede acceder a la zona privada.
- Los errores de autenticación se muestran de forma clara.
- Existe una base limpia y preparada para conectar la gestión de tareas en la siguiente fase.
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

## Criterios técnicos de esta fase

- Usar Firebase Auth, no inventar backend propio para autenticación.
- Mantener las credenciales fuera del código fuente.
- Crear una integración limpia para Firebase en una capa de `shared/lib` o similar.
- Separar UI, lógica de autenticación y protección de rutas.
- No meter toda la lógica en páginas gigantes.
- Los comentarios deben explicar decisiones, flujo y relación entre piezas, no describir obviedades.
- Mantener el flujo fácil de entender para alguien que está aprendiendo React y Firebase.

---

## Orden recomendado de trabajo en Fase 1

1. Preparar variables de entorno.
2. Configurar Firebase base.
3. Crear servicio o módulo de autenticación.
4. Crear contexto, provider o mecanismo equivalente para exponer el usuario autenticado.
5. Crear páginas de Register y Login.
6. Crear ProtectedRoute.
7. Conectar login, registro, logout y persistencia de sesión.
8. Crear una página privada mínima para validar el flujo.
9. Revisar errores, limpieza y comentarios.

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

- “Voy a preparar la configuración base de Firebase y las variables de entorno.”
- “Archivos a tocar: ...”
- implementación
- “Resultado: ya existe la base técnica para empezar auth.”

---

## Prioridad máxima

La prioridad de esta fase es:

1. autenticación funcional
2. rutas privadas correctas
3. código simple
4. comentarios que enseñen
5. no adelantarse a tareas ni Firestore todavía

---

## Recordatorio importante

Estamos SOLO en Fase 1.

No anticipes la fase de tareas.
No añadas Firestore para CRUD todavía.
No añadas AWS SES.
No prepares deploy todavía.
No metas complejidad innecesaria.
