export interface Event {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  category: EventCategory
}

export enum EventCategory {
  MemberRecruitment,
  CollaboratorRecruitment,
  MemberOffline,
  HITOpenDay,
  BirthdayAnniversary,
  Other,
}
