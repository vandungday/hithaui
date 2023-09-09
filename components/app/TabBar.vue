<script setup lang="ts">
defineProps<{
  tabs: AppTabBarItem[]
}>()
</script>

<template>
  <div class="app-tab-bar">
    <ul class="tab-list">
      <li v-for="{ name, path, icon, id } in tabs" :key="id" class="tab-item">
        <NuxtLink :to="path" class="link" :class="{ '-active': $route.path.includes(path) }">
          <Icon :name="icon" class="icon" />
          {{ name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.app-tab-bar {
  @apply border-b border-gray-200;

  > .tab-list {
    @apply flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500;
    > .tab-item {
      @apply mr-2;
    }

    > .tab-item > .link {
      @apply inline-flex items-center justify-center py-4 lg:px-8 md:px-4 sm:px-2 rounded-t-lg;
    }
    > .tab-item > .link.-active {
      @apply text-primary-500 border-b-2 border-primary-500
    }

    > .tab-item > .link > .icon {
      @apply w-4 h-4 mr-2 text-primary-500;
    }
  }
}
</style>
