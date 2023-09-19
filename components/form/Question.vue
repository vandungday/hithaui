<script setup lang="ts">
import type { Question } from '~/types'

withDefaults(
  defineProps<{
    question: Question
    error?: string
  }>(),
  {
    error: '',
  },
)
</script>

<template>
  <div class="form-question">
    <label :for="question.field" class="name" :class="{ '-error': error }">{{ question.name }}
      <span v-if="question.isRequired" class="-required">*</span>
    </label>
    <slot />
    <p v-if="question.description" class="description">
      {{ question.description }}
    </p>
    <p v-if="error" class="error">
      <Icon name="uil:exclamation-triangle" /> {{ error }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.form-question {
  @apply px-4 pt-4 pb-6 shadow-sm border-gray-200 border-solid border-[1px] rounded-md;
  > .name {
    @apply block mb-2 text-sm font-medium;

    &.-error {
      @apply text-red-700;
    }

    > .-required {
      @apply text-red-500;
    }
  }

  > .description {
    @apply text-gray-500 text-sm pt-2;
  }

  > .error {
    @apply mt-2 text-xs text-red-600 flex items-center gap-1;
  }
}
</style>
