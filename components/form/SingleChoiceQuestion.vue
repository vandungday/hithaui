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
  (e: 'update:modelValue', answer: number): void
}>()
</script>

<template>
  <FormQuestion
    class="form-question --single-choice"
    :question="question"
    :error="error"
  >
    <div
      v-for="option in question.options"
      :key="option.id"
      class="answer-options"
    >
      <input
        :id="`${option.id}${option.name}`"
        :value="option.name"
        :checked="modelValue === option.id"
        :name="question.field"
        type="radio"
        class="input --radio"
        @change="$emit('update:modelValue', option.id)"
      >
      <label :for="`${option.id}${option.name}`" class="label">{{ option.name }}</label>
    </div>
  </FormQuestion>
</template>

<style lang="scss" scoped>
.answer-options {
  @apply flex items-center mb-2;

  > .input {
    @apply w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 focus:ring-primary-500;
  }

  > .label {
    @apply ml-2 text-sm font-medium text-gray-900;
  }
}
</style>
