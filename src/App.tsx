// Punto de entrada del árbol de componentes React.
// Por ahora solo renderiza el router. No contiene lógica propia.

import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'

function App() {
  return <RouterProvider router={router} />
}

export default App
