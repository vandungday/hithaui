<script setup lang="ts">
const notificationStore = useNotificationStore()
const { notifications } = storeToRefs(notificationStore)
</script>

<template>
  <div class="notification-container">
    <AppNotification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<style lang="scss" scoped>
.notification-container {
  @apply fixed top-0 right-0 mr-[32px] mt-[80px] z-50;
}
</style>
