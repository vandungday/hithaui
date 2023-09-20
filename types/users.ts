export interface User {
  id: number
  email?: string | null
  name?: string | null
  studentCode: string
  avatar?: string | null
  generation: number
  createdAt: Date
  updatedAt?: Date | null
  bio?: string
  github?: string
  facebook?: string
  linkedIn?: string
  dateOfBirth?: string
  phone?: string
  class?: string
  address?: string
  rolesOnUsers: RoleOnUser[]
}

export interface Contributor {
  name: string
  avatar: string
  github: string
  commits: number
}

export type UserGeneralInfoForm = Partial<
  Omit<
    User,
    'id' |
    'createdAt' |
    'updatedAt' |
    'avatar' |
    'github' |
    'facebook' |
    'linkedIn'
  >
>

export interface RoleOnUser {
  userId: number
  roleId: number
}
