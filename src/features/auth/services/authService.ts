// Servicio de autenticación.
// Encapsula todas las operaciones con Firebase Auth para que las páginas
// y hooks no dependan directamente de Firebase. Si cambiara el proveedor
// de auth, solo se modificaría este archivo.

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../../../shared/lib/firebase'

export function register(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function logout() {
  return signOut(auth)
}

// Traduce los códigos de error de Firebase a mensajes en español.
// Se centraliza aquí para no duplicar la lógica en cada página.
export function getAuthErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    'auth/email-already-in-use': 'Este email ya está registrado.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/invalid-email': 'El formato del email no es válido.',
    'auth/user-not-found': 'No existe una cuenta con ese email.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/invalid-credential': 'Email o contraseña incorrectos.', //funciona
    'auth/too-many-requests': 'Demasiados intentos. Espera un momento e inténtalo de nuevo.',
  }

  return messages[code] ?? 'Ha ocurrido un error. Inténtalo de nuevo.'
}
