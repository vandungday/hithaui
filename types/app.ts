import type { RoleType } from '~/types'

export interface AppSpeedDialItem {
  id: number
  label: string
  icon: string
  events: any
}

export interface AppTabBarItem {
  id: number
  name: string
  path: string
  icon: string
}

export interface FormQuestion {
  id: number
  name: string
  description?: string | null
  required: boolean
  field: string
}

export interface ApplicationForm {
  id: number
  title: string
  coverImage: string
  description: string
  isActive: boolean
}

export enum Page {
  Dashboard = '/dashboard',
  ClassManagement = '/dashboard/classes',
  UserManagement = '/dashboard/users',
  EventManagement = '/dashboard/events',
  DocumentManagement = '/dashboard/documents',
  Contributors = '/contributors',
  Login = '/login',
  Profile = '/profile',
  Home = '/',
}

export type PagePermission = {
  [key in Page]: RoleType[];
}
