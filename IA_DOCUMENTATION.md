# Documentación del uso de IA — Proyecto M4

## Herramienta utilizada

**Claude Code** (Anthropic) y **Codex** (OpenAI)

---

## Forma de trabajo

Se configuró Claude Code con dos archivos de instrucciones:

- `CLAUDE.md`: define el alcance del proyecto, las fases, las reglas de implementación y las preferencias técnicas.
- `AGENTS.md`: define el rol de la IA (guía técnico-práctica), el perfil del usuario, el orden de prioridades y las reglas de comportamiento durante el desarrollo.

La IA no actúa de forma autónoma. Cada acción fue solicitada explícitamente por el usuario. Antes de implementar cualquier cambio, se explicó qué se iba a hacer y por qué.

---

## Sesión: Fase 0 — Base del proyecto

**Fecha:** 22/04/2026

### Qué se pidió

Construir la base limpia del proyecto para la Fase 0:
- Entender el estado actual del proyecto (ya tenía Vite + React + TypeScript inicializado)
- Limpiar los archivos de demo generados por Vite
- Crear la estructura de carpetas basada en features
- Instalar y configurar React Router
- Crear el layout base, la página Home y la página 404
- Conectar todo a través del router

### Cómo se construyó la estructura

El proyecto ya tenía Vite + React + TypeScript inicializado, pero solo con los archivos de demo por defecto de Vite. La IA leyó el estado actual (`main.tsx`, `App.tsx`, `package.json`, `index.html`) y a partir de ahí construyó la base real del proyecto.

**Paso 1 — Limpieza**

Se reemplazó el `App.tsx` de demo por un componente limpio que únicamente monta el router. Se eliminó el import de `App.css` de `main.tsx`. Los archivos de estilos de demo (`App.css`, `index.css`) los eliminó el usuario manualmente.

**Paso 2 — Estructura de carpetas por features**

Se creó una organización basada en dominios funcionales:

```
src/
  app/router/           → infraestructura global del router
  features/home/        → todo lo relacionado con la página de inicio
  features/not-found/   → todo lo relacionado con el 404
  shared/components/layout/  → piezas visuales reutilizables entre features
```

La idea detrás de esta estructura es que cada funcionalidad viva junta. Lo específico de cada página va en `features/`. Lo que comparten todas las páginas va en `shared/`. Esto no importa mucho con 2 páginas, pero escala bien cuando el proyecto crece.

**Paso 3 — Router**

Se creó `src/app/router/router.tsx` con `createBrowserRouter` de React Router. Define dos reglas:
- `/` → renderiza `AppLayout` con `HomePage` dentro
- `*` → cualquier URL desconocida → renderiza `NotFoundPage`

Se separó en su propio archivo para que la configuración del router no ensucie `App.tsx` ni `main.tsx`.

**Paso 4 — Layout base**

Se creó `AppLayout.tsx` con la estructura visual común: header, main y footer. El elemento clave es `<Outlet />`, que es el hueco donde React Router inyecta la página activa según la URL. Cualquier página futura que use este layout solo tiene que registrarse como `children` en el router.

**Paso 5 — Páginas**

Se crearon `HomePage.tsx` y `NotFoundPage.tsx` como componentes simples. No saben nada del layout ni del router, solo devuelven su contenido. `NotFoundPage` incluye un `<Link to="/">` para volver al inicio sin recargar la página.

### Explicación del flujo

Tras implementar la estructura, la IA explicó el flujo completo de arranque de la app archivo por archivo, cubriendo cada concepto nuevo que aparecía (SPA, componentes, JSX, router, layout, `<Outlet />`, `<Link />`).

![Explicación 1](./README_Images/1.png)
![Explicación 2](./README_Images/2.png)
![Explicación 3](./README_Images/3.png)
![Explicación 4](./README_Images/4.png)
![Explicación 5](./README_Images/5.png)


---

## Criterio de uso

La IA se usa como **par técnico y guía de aprendizaje**, no como generador automático de código.

El usuario revisa, entiende y aprueba cada cambio antes de aplicarlo.

El código generado por la IA es revisado por el usuario y forma parte del proyecto bajo su responsabilidad.
