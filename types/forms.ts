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
  coverImage: string
  createdAt: string
  updatedAt: string
  eventId: number
}

export interface FormDetails extends Form {
  event: Pick<Event, 'name' | 'category'>
  questions: Question[]
}

export interface FormAnswer {
  [key: string]: string | number[]
}
