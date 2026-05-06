# CLAUDE.md

## Proyecto

Proyecto integrador M4 HENRY.

Aplicación web SPA para gestión de tareas.

Stack actual:

- React
- TypeScript
- Firebase Auth
- Cloud Firestore
- AWS SES
- Vercel Functions
- Vercel CLI
- Firestore Security Rules

En este momento SOLO se trabaja la FASE 7.

---

## FASE ACTUAL

FASE 7: mejora visual, UI responsive y presentación final de la aplicación.

Esta fase se centra en que la app deje de verse como HTML básico sin estilo.

La app ya funciona, pero visualmente está demasiado cruda.

El objetivo es dejarla presentable, clara, responsive y defendible para la entrega.

---

## Estado actual del proyecto

Las fases anteriores ya están terminadas:

- Auth con Firebase funcionando.
- Registro/login/logout funcionando.
- Rutas protegidas funcionando.
- Firestore funcionando.
- CRUD completo de tareas funcionando:
  - crear
  - listar
  - editar
  - eliminar
  - marcar como completada/pendiente
- Cada usuario ve solo sus propias tareas.
- Reglas de seguridad de Firestore aplicadas.
- AWS SES configurado.
- Vercel Function para email creada.
- Botón o flujo de envío de resumen de tareas por email funcionando.
- Variables de entorno configuradas.
- `.env` protegido.
- `.env.example` actualizado.

La Fase 7 NO debe rehacer la lógica anterior.

---

## Objetivo principal de la Fase 7

Transformar la interfaz actual, que ahora parece HTML básico, en una app visualmente decente usando Bootstrap y CSS simple.

Debe quedar una aplicación:

- más profesional
- más ordenada
- más clara
- responsive
- usable en móvil
- fácil de navegar
- con formularios más limpios
- con botones bien colocados
- con tareas visualmente claras
- con estados de carga/error/vacío bien presentados

No se busca una app espectacular ni una plantilla compleja.

Se busca una app correcta, limpia y defendible.

---

## Decisión visual

Usar Bootstrap como base visual.

Motivo:

- el proyecto no es de diseño avanzado
- Bootstrap acelera mucho
- permite mejorar formularios, botones, cards y layout
- evita escribir demasiado CSS desde cero
- es fácil de explicar
- es suficiente para una entrega de proyecto

No usar Tailwind.

No usar Material UI.

No usar React Bootstrap salvo que ya esté instalado y justificado.

Preferencia:

```txt
Bootstrap CSS + clases en JSX + CSS propio mínimo