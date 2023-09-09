<script setup lang="ts">
const { getUser, logout } = useAuthStore()
await getUser()
</script>

<template>
  <div class="dashboard-layout">
    <LayoutDashboardNavbar @logout="logout" />
    <LayoutDashboardSidebar />
    <main class="main-content">
      <div class="slot-content">
        <div class="content">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.dashboard-layout {
  > .main-content {
    @apply p-4 sm:ml-64;

    > .slot-content {
      @apply p-4 mt-14 rounded-lg;
    }

    > .slot-content > .content {
      @apply overflow-x-auto shadow-md sm:rounded-lg;
    }
  }
}
</style>
