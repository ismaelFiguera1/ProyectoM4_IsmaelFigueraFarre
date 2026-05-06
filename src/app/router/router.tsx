// Este archivo define las rutas principales de la SPA.
// Se separa del punto de entrada para que la configuración del router
// esté aislada y pueda crecer sin ensuciar main.tsx ni App.tsx.
//
// Estructura de rutas:
// - Rutas públicas con AppLayout: home, login, register
// - Rutas privadas con ProtectedRoute: dashboard (y más en Fase 2)
// - Ruta 404 sin layout

import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../../shared/components/layout/AppLayout'
import { DashboardLayout } from '../../shared/components/layout/DashboardLayout'
import { ProtectedRoute } from '../../features/auth/components/ProtectedRoute'
import { HomePage } from '../../features/home/pages/HomePage'
import { LoginPage } from '../../features/auth/pages/LoginPage'
import { RegisterPage } from '../../features/auth/pages/RegisterPage'
import { DashboardPage } from '../../features/auth/pages/DashboardPage'
import { TasksPage } from '../../features/tasks/pages/TasksPage'
import { NotFoundPage } from '../../features/not-found/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    // Rutas privadas: ProtectedRoute actúa como middleware de auth.
    // Si no hay usuario, redirige a /login antes de renderizar.
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'tasks',
            element: <TasksPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
