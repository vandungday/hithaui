<script setup lang="ts">
import { FormQuestion } from '~/types'

withDefaults(
  defineProps<{
    question: FormQuestion
    error?: string
    modelValue?: number[]
  }>(),
  {
    modelValue: () => [],
    error: '',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', answer: number[]): void
}>()

const selectedOptions = ref(new Set<number>([]))
function handleSelectOption(option: number) {
  if (selectedOptions.value.has(option))
    selectedOptions.value.delete(option)
  else selectedOptions.value.add(option)

  emit('update:modelValue', [...selectedOptions.value])
}
</script>

<template>
  <FormQuestion
    class="form-question --multiple-choice"
    :question="question"
    :error="error"
  >
    <div
      v-for="option in question.options"
      :key="option.id"
      class="answer-options"
    >
      <input
        :id="option.id"
        type="checkbox"
        :value="modelValue"
        class="input -checkbox"
        @change="handleSelectOption(option.id)"
      >
      <label :for="option.id" class="label">{{ option.name }}</label>
    </div>
  </FormQuestion>
</template>

<style lang="scss" scoped>
.form-question.--multiple-choice {
  > .answer-options {
    @apply flex items-center mb-4;

    > .input {
      @apply w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded;
    }

    > .label {
      @apply ml-2 text-sm font-medium;
    }
  }
}
</style>
