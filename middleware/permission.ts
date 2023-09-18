import type { Page } from '~/types'

export default defineNuxtRouteMiddleware((to) => {
  const { isAccessible } = usePermission(to.path as Page)

  if (!isAccessible.value) {
    useNotification({
      message: 'You do not have permission to access this resource!',
      type: 'error',
    })
    return navigateTo('/dashboard')
  }
})
