export interface Event {
  id: number
  title: string
  description?: string
  files?: any
  coverImage?: string | null | File
  startTime: string
  endTime: string
  createdBy: number
  updatedBy?: number
  createdAt: string
  updatedAt: string
  userCreated?: User
}

export type CreateEventForm = Pick<
  Event,
  'title' | 'description' | 'startTime' | 'endTime' | 'coverImage'
>
