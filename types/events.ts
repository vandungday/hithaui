export interface Event {
  id: number
  name: string
  description?: string
  coverImage?: string | File
  createdAt: string
  updatedAt: string
}
