import { Page } from '~/types'
import type { PagePermission } from '~/types'

export const PAGE_PERMISSION: PagePermission = {
  [Page.Dashboard]: [],
  [Page.ClassManagement]: [],
  [Page.UserManagement]: [],
  [Page.DocumentManagement]: [],
  [Page.EventManagement]: [],
  [Page.Login]: [],
  [Page.Profile]: [],
  [Page.Home]: [],
  [Page.Contributors]: [],
}
