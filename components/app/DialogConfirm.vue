<script setup lang="ts">
const { dialogConfirm, closeDialog, handleConfirm } = useDialogConfirm()
</script>

<template>
  <Transition name="dialog-confirm">
    <div v-if="dialogConfirm.isVisible" class="dialog-confirm">
      <div class="content-wrapper">
        <div class="dialog-body">
          <button type="button" class="action -close" @click="closeDialog">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
          <div class="dialog-content">
            <svg class="icon -warning" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" @click="closeDialog">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h3 class="message">
              {{ dialogConfirm.content!.message }}
            </h3>
            <button type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" @click="handleConfirm">
              {{ dialogConfirm.content!.confirmationText || "Yes, I'm sure" }}
            </button>
            <button type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" @click="closeDialog">
              {{ dialogConfirm.content!.cancellationText || "No, cancel" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.dialog-confirm {
  @apply fixed top-0 left-0 right-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full;

  > .content-wrapper {
    @apply relative w-full max-w-md max-h-full;

    > .dialog-body {
      @apply relative bg-white rounded-lg shadow;
    }

    > .dialog-body > .action.-close {
      @apply absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center;
    }

    > .dialog-body > .dialog-content {
      @apply p-6 text-center;
    }

    > .dialog-body > .dialog-content > .icon.-warning {
      @apply mx-auto mb-4 text-gray-400 w-12 h-12;
    }

    > .dialog-body > .dialog-content > .message {
      @apply mb-5 text-lg font-normal text-gray-500;
    }
  }

}

.dialog-confirm-enter-from {
  opacity: 0;
}

.dialog-confirm-leave-to {
  opacity: 0;
}

.dialog-confirm-enter-active,
.dialog-confirm-leave-active {
  transition: opacity 0.15s ease-in;
}
</style>
