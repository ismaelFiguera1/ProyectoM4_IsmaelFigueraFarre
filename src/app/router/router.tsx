// Este archivo define las rutas principales de la SPA.
// Se separa del punto de entrada para que la configuración del router
// esté aislada y pueda crecer sin ensuciar main.tsx ni App.tsx.

import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../../shared/components/layout/AppLayout'
import { HomePage } from '../../features/home/pages/HomePage'
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
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
