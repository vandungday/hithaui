<script setup lang="ts">
defineProps<{
  name: string
  coverImage: string
}>()

defineEmits<{
  (e: 'submit'): void
  (e: 'clear'): void
}>()
</script>

<template>
  <div class="forms-layout">
    <img class="image" :src="coverImage">
    <h4 class="name">
      {{ name }}
    </h4>
    <div class="question-list">
      <slot />
    </div>
    <div class="form-action">
      <button type="button" class="action -submit" @click="$emit('submit')">
        Submit
      </button>
      <button type="button" class="action -clear" @click="$emit('clear')">
        Clear
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.forms-layout {
  > .image {
    @apply w-full;
  }

  > .name {
    @apply text-3xl font-semibold mt-8 max-md:px-8 max-md:text-2xl;
  }

  > .question-list {
    @apply py-4 flex flex-col gap-4 max-md:px-8;
  }

  > .form-action {
    @apply flex justify-between pb-8;

    > .action.-submit {
      @apply text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none;
    }

    > .action.-clear {
      @apply text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 px-5 py-2.5 text-sm font-medium rounded-lg;
    }
  }
}
</style>
