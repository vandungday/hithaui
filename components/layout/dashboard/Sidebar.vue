<script setup lang="ts">
import type { Page } from '~/types'

const currentRoute = useRoute()

function isActiveRoute(routePath: string) {
  return currentRoute.path === routePath
}

const { dashboardRoutes, devRoutes } = useRoutes()
</script>

<template>
  <aside class="sidebar">
    <div class="content">
      <ul class="menu">
        <li v-for="route in dashboardRoutes" :key="route.path" class="menu-item">
          <NuxtLink
            v-if="usePermission(route.path as Page).isAccessible.value"
            :to="route.path"
            class="link"
            :class="{ '-active': isActiveRoute(route.path) }"
          >
            <Icon :name="route.icon" class="icon" />
            <span class="ml-3">{{ route.label }}</span>
          </NuxtLink>
        </li>
      </ul>
      <ul class="menu -dev">
        <li v-for="route in devRoutes" :key="route.path" class="menu-item">
          <NuxtLink :to="route.path" class="link" :target="route.target">
            <Icon :name="route.icon" class="icon" />
            <span class="ml-4">{{ route.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="settings">
      <a href="#" class="item">
        <Icon name="uil:brightness" class="icon" />
      </a>
      <a href="#" class="item">
        <Icon name="uil:setting" class="icon" />
      </a>
      <a href="#" class="item">
        <Icon name="uil:language" class="icon" />
      </a>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  @apply fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200;

  > .content {
    @apply h-full px-3 pb-4 overflow-y-auto bg-white;
  }

  > .content > .menu {
    @apply space-y-2 font-medium;
  }

  > .content > .menu.-dev {
    @apply pt-4 mt-4 border-t border-gray-200;
  }

  > .content > .menu > .menu-item > .link {
    @apply flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100;
  }

  > .content > .menu > .menu-item > .link.-active {
    @apply bg-gray-100;
  }

  > .content > .menu > .menu-item > .link > .icon {
    @apply w-5 h-5 transition duration-75 text-primary-500;
  }

  > .content > .menu > .menu-item > .link > .target {
    @apply flex-1 ml-3 whitespace-nowrap;
  }

  > .settings {
    @apply hidden absolute bottom-0 left-0 border-t border-gray-200 justify-center px-4 py-2 space-x-4 w-full lg:flex bg-white z-20;
  }

  > .settings > .item {
    @apply inline-flex justify-center p-2 rounded text-primary-500 cursor-pointer hover:bg-gray-100;
  }

  > .settings > .item > .icon {
    @apply h-6 w-6;
  }
}
</style>
