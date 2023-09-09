<script setup lang="ts">
defineProps<{
  title: string
}>()

const { isVisible, openModal, closeModal } = useModal()

defineExpose({
  openModal,
  closeModal,
})
</script>

<template>
  <Transition name="slide-fade">
    <div v-if="isVisible" class="app-drawer">
      <h5 class="drawer-label">
        <Icon name="uil:setting" class="icon" />
        {{ title }}
      </h5>
      <button type="button" class="button-close" @click="closeModal">
        <Icon name="uil:multiply" class="icon" />
      </button>
      <div class="content">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.app-drawer {
   @apply fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 shadow-2xl;

   > .drawer-label {
      @apply inline-flex items-center mb-6 text-base font-semibold uppercase;

      > .icon {
         @apply text-primary-500 mr-2;
      }
   }

   > .button-close {
      @apply text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center;

      > .icon {
         @apply w-4 h-4;
      }
   }
}

.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.5, 0.5, 0.5, 0.5);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
