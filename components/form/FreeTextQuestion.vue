<script setup lang="ts">
import type { Question } from '~/types'

withDefaults(
  defineProps<{
    question: Question
    modelValue?: string | number
    error?: string
  }>(),
  {
    modelValue: '',
    error: '',
  },
)

defineEmits<{
  (e: 'update:modelValue', answer: string | number): void
}>()
</script>

<template>
  <FormQuestion
    class="form-question -free-text"
    :question="question"
    :error="error"
  >
    <input
      :id="question.field"
      type="text"
      class="answer-text"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    >
  </FormQuestion>
</template>

<style lang="scss" scoped>
.answer-text {
  @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 focus:outline-primary-500 block w-full p-2;

  &.-error {
    @apply bg-red-50 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500;
  }
}
</style>
