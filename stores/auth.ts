export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()

  const user = ref<User>()
  const accessToken = useLocalStorage('accessToken', '')

  const login = async (userCredentials: UserCredentials) => {
    const response = await $api<LoginResponse>('/api/v1/auth/sign-in', {
      method: 'POST',
      body: userCredentials,
    })

    if (response) {
      accessToken.value = response.accessToken
      useNotification({
        message: 'Welcome to HIT CLUB!',
      })
      return navigateTo('/dashboard')
    }
  }

  const getUser = async () => {
    const authUser = await $api<User>('/api/v1/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })

    user.value = authUser
  }

  const logout = () => {
    accessToken.value = ''
    user.value = undefined
  }

  const isAuthenticated = computed(() => !!user.value || accessToken.value)

  return { login, getUser, logout, user, isAuthenticated, accessToken }
})
