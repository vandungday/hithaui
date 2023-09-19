import type { FormDetails } from '~/types'

export const useFormsStore = defineStore('forms', () => {
  const { $api } = useNuxtApp()

  const form = ref<FormDetails>()

  const fetchForm = async (formId: number) => {
    try {
      const response = await $api<FormDetails>(`/api/v1/forms/${formId}`)
      form.value = response
    }
    catch (error) {
      throw createError('Page not found!')
    }
  }

  return { form, fetchForm }
})
