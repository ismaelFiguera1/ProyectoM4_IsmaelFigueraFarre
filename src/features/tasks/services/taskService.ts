// Servicio de tareas.
// Encapsula todas las operaciones con Firestore para que los componentes
// y hooks no dependan directamente de Firebase.
// Todas las operaciones filtran por userId para garantizar que cada
// usuario solo accede a sus propias tareas.

import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../../../shared/lib/firebase'
import type { Task } from '../types/task'

// Referencia a la colección 'tasks' en Firestore.
// Equivalente a apuntar a una tabla en SQL.
const tasksCollection = collection(db, 'tasks')

export async function createTask(
  userId: string,
  title: string,
  description: string
): Promise<void> {
  await addDoc(tasksCollection, {
    title,
    description,
    completed: false,
    userId,
    createdAt: Date.now(),
  })
}

// Consulta solo las tareas del usuario actual, ordenadas por fecha de creación.
// El filtro where('userId', '==', userId) se ejecuta en Firestore,
// nunca se traen tareas de otros usuarios al cliente.
export async function getUserTasks(userId: string): Promise<Task[]> {
  const q = query(
    tasksCollection,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Task[]
}

// doc(db, 'tasks', taskId) apunta al documento concreto dentro de la colección.
// Es el equivalente a WHERE id = taskId en SQL.
export async function toggleTaskCompleted(
  taskId: string,
  currentValue: boolean
): Promise<void> {
  await updateDoc(doc(db, 'tasks', taskId), { completed: !currentValue })
}

export async function updateTask(
  taskId: string,
  title: string,
  description: string
): Promise<void> {
  await updateDoc(doc(db, 'tasks', taskId), { title, description })
}

export async function deleteTask(taskId: string): Promise<void> {
  await deleteDoc(doc(db, 'tasks', taskId))
}
