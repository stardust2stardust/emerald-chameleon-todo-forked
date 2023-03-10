export type Categories = {
  id: number
  name: string
}

export type Items = {
  id: number
  description: string
  dueDate: string
  priority: string
  isDone: boolean
  categoryId: number
}
