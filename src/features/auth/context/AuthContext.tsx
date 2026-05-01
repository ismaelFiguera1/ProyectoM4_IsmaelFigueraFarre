// Contexto de autenticación.
// Expone el usuario autenticado a toda la app sin pasar props manualmente.
// Cualquier componente puede leer el usuario actual usando el hook useAuth.
//
// onAuthStateChanged es el listener de Firebase que detecta cambios de sesión:
// login, logout, y también la recuperación de sesión al recargar la página.

import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../../../shared/lib/firebase'

interface AuthContextValue {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Firebase llama a este callback cada vez que cambia el estado de auth.
    // Devuelve una función unsubscribe que se ejecuta al desmontar el provider.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
