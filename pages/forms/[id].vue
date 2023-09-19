<script setup lang="ts">
import {
  FormFreeTextQuestion,
  FormMultipleChoiceQuestion,
  FormSingleChoiceQuestion,
} from '#components'
import type { FormAnswer } from '~/types'

const formsStore = useFormsStore()
const { fetchForm } = formsStore
const { form } = storeToRefs(formsStore)

onMounted(async () => {
  await fetchForm(+useRoute().params.id)
})

function initFormState() {
  const state: FormAnswer = {}

  for (const question of form.value?.questions || []) {
    state[question.field]
      = question.type === QuestionType.MultipleChoice ? [] : ''
  }

  return state
}

const formAnswer = reactive<FormAnswer>(initFormState())

const formQuestionType: Record<string, any> = {
  [QuestionType.SingleChoice]: FormSingleChoiceQuestion,
  [QuestionType.MultipleChoice]: FormMultipleChoiceQuestion,
  [QuestionType.FreeText]: FormFreeTextQuestion,
}

function clearForm() {
  Object.assign(formAnswer, initFormState())
}
</script>

<template>
  <div class="form-page">
    <FormLayout
      v-if="form"
      class="form-layout"
      :name="form.name"
      :cover-image="form.coverImage"
      @clear="clearForm"
    >
      <component
        :is="formQuestionType[question.type]"
        v-for="question in form.questions"
        :key="question.field"
        v-model="formAnswer[question.field]"
        :question="question"
      />
    </FormLayout>
  </div>
</template>

<style lang="scss" scoped>
.form-page {
  @apply h-screen flex md:w-[80%] xl:w-[53%] mx-auto px-8;
}
</style>
