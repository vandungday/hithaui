import type { Page } from '~/types'
import { PAGE_PERMISSION } from '~/constants/permissions'

export function usePermission(page: Page) {
  const currentPage = ref(page)

  const authStore = useAuthStore()
  const { userRoles } = storeToRefs(authStore)

  const isAccessible = computed(() => {
    if (PAGE_PERMISSION[currentPage.value]) {
      return PAGE_PERMISSION[currentPage.value]?.some((roleId: number) => {
        return userRoles.value.includes(roleId)
      })
    }

    return true
  })

  return { isAccessible }
}
