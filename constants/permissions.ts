import { Page, RoleType } from '~/types'
import type { PagePermission } from '~/types'

export const PAGE_PERMISSION: PagePermission = {
  [Page.FormManagement]: [RoleType.Admin, RoleType.Board, RoleType.BoardOfDirector],
}
