export enum QuestionType {
  FreeText,
  MultipleChoice,
  SingleChoice,
}

export interface FormQuestion {
  name: string
  field: string
  description?: string
  isRequired: boolean
  type: QuestionType
  options?: any[]
}
