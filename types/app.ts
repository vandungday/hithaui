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

export enum Page {
  Dashboard = '/dashboard',
  ClassManagement = '/dashboard/classes',
  UserManagement = '/dashboard/users',
  EventManagement = '/dashboard/events',
  DocumentManagement = '/dashboard/documents',
  FormManagement = '/dashboard/forms',
  Contributors = '/contributors',
  Login = '/login',
  Profile = '/profile',
  Home = '/',
}

export type PagePermission = {
  [key in Page]?: RoleType[];
}
