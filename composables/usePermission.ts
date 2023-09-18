import type { Page } from '~/types'
import { PAGE_PERMISSION } from '~/constants/permissions'

export function usePermission(page: Page) {
  const currentPage = ref(page)

  const authStore = useAuthStore()
  const { userRoles } = storeToRefs(authStore)

  const isAccessible = computed(() => {
    return PAGE_PERMISSION[currentPage.value].some((roleId: number) =>
      userRoles.value.includes(roleId),
    )
  })

  return { isAccessible }
}
