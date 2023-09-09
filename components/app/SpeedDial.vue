<script setup lang="ts">
defineProps<{
  actions: AppSpeedDialItem[]
}>()

const { isVisible, openModal, closeModal } = useModal()
</script>

<template>
  <div
    class="speed-dial"
    @mouseleave="closeModal"
    @mouseover="openModal"
  >
    <div v-if="isVisible" class="menu-actions">
      <button
        v-for="action in actions"
        :key="action.id"
        type="button"
        class="action-item"
        v-on="action.events"
      >
        <Icon :name="action.icon" class="icon" />
        <span class="label">{{ action.label }}</span>
      </button>
    </div>
    <button type="button" class="control-button">
      <Icon name="uil:plus" class="icon" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.speed-dial {
  @apply fixed bottom-6 right-6;

  &:hover > .control-button > .icon {
    @apply rotate-45;
  }

  > .control-button {
    @apply flex items-center justify-center text-white bg-primary-500 rounded-full w-14 h-14 hover:bg-primary-600;

    > .icon {
      @apply w-8 h-8 transition-transform;
    }
  }

  > .menu-actions {
    @apply flex flex-col items-center mb-4 space-y-2;

    > .action-item {
      @apply w-[56px] h-[56px] text-gray-500 bg-white rounded-full border border-gray-200 hover:text-gray-900 shadow-sm hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 focus:outline-none;
    }

    > .action-item > .icon {
      @apply w-4 h-4 mx-auto mb-1;
    }

    > .action-item > .label {
      @apply block mb-px text-xs font-medium;
    }
  }
}
</style>
