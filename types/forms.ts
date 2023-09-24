import type { Event } from './events'

export enum QuestionType {
  FreeText,
  MultipleChoice,
  SingleChoice,
}

export interface Question {
  name: string
  field: string
  description?: string
  isRequired: boolean
  type: QuestionType
  options?: any[]
}

export interface Form {
  id: number
  name: string
  isActive: boolean
  coverImage: string | null | File
  createdAt: string
  updatedAt: string
  eventId: number
  event: Pick<Event, 'name' | 'category'>
}

export interface FormDetails extends Form {
  questions: Question[]
}

export interface FormAnswer {
  [key: string]: string | number[]
}

export type CreateForm = Pick<Form, 'name' | 'eventId' | 'coverImage'> 