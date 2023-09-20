import type { Form, FormDetails } from '~/types'

export const useFormsStore = defineStore('forms', () => {
  const { $api } = useNuxtApp()

  const forms = ref<Form[]>([])
  const form = ref<FormDetails>()

  const authStore = useAuthStore()
  const { accessToken } = storeToRefs(authStore)

  const fetchForms = async () => {
    const response = await $api<Form[]>('/api/v1/forms', {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })

    forms.value = response
  }

  const fetchForm = async (formId: number) => {
    try {
      const response = await $api<FormDetails>(`/api/v1/forms/${formId}`)
      form.value = response
    }
    catch (error) {
      throw createError('Page not found!')
    }
  }

  return { fetchForms, fetchForm, forms, form }
})
