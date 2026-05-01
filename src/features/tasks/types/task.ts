// Modelo de tarea. Define la estructura que tendrá cada documento
// en la colección 'tasks' de Firestore.
// userId vincula la tarea al usuario que la creó. Es la clave
// que usamos para filtrar y garantizar que cada usuario ve solo las suyas.

export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  userId: string
  createdAt: number
}
