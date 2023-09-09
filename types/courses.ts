export enum RoleCourse {
  LEADER = 'LEADER', // value case follow by RoleCourse enum defined in prisma
  SUPPORT = 'SUPPORT',
  MEMBER = 'MEMBER',
}

export enum CourseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface UserOnCourse {
  courseId: number
  userId: number
  role: RoleCourse
  status: CourseStatus
  user: User
}

export interface Course {
  id: number
  name: string
  description?: string
  media: any // TODO: update media type later
  type: string
  coverImage: string | null | File
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
  users: UserOnCourse[]
}

export type CreateCourseForm = Pick<
  Course,
  'name' | 'description' | 'startDate' | 'endDate' | 'coverImage'
> &
Pick<UserOnCourse, 'userId'>

export type ProcessCourseRegistrationDto = Pick<
  UserOnCourse,
  'userId' | 'status'
>
