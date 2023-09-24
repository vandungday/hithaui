import type { Form, FormDetails, CreateForm } from '~/types'

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

  const createForm = async (form: FormData) => {
      const response = await $api<Form>('/api/v1/forms', {
          method: 'POST',
          body: form,
          headers: {
              Authorization: `Bearer ${accessToken.value}`,
          },
      })

      return response
  }

  return { fetchForms, fetchForm, createForm, forms, form }
})
