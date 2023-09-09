<script setup lang="ts">
import defaultUserAvatar from '~/assets/images/logoHIT.png'
import {
  CURRENT_GENERATION_NUMBER,
  GENERATIONS,
} from '~/constants/generations'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const usersStore = useUsersStore()
const { filterUsersByGeneration } = usersStore
const { users } = storeToRefs(usersStore)

onMounted(async () => {
  await usersStore.fetchUsers()
})

const { userTableColumns } = useUsers()

const {
  isVisible: isVisibleGenerationFilterDropdown,
  openModal: openGenerationFilterDropdown,
  closeModal: closeGenerationFilterDropdown,
} = useModal()

const filterBarRef = ref()
onClickOutside(filterBarRef, closeGenerationFilterDropdown)

const selectedGeneration = ref(CURRENT_GENERATION_NUMBER)
const filteredUsers = ref(filterUsersByGeneration(CURRENT_GENERATION_NUMBER))
watchEffect(() => {
  filteredUsers.value = filterUsersByGeneration(selectedGeneration.value)
  closeGenerationFilterDropdown()
})

const searchUserInput = ref('')
const usersByGeneration = computed(() => {
  return users.value.filter(
    user => user.generation === selectedGeneration.value,
  )
})
watchEffect(() => {
  filteredUsers.value = usersByGeneration.value.filter((user) => {
    return Object.values(user).some((value) => {
      return String(value)
        .toLowerCase()
        .includes(searchUserInput.value.toLowerCase())
    })
  })
})
</script>

<template>
  <div class="users-management-page">
    <div class="header">
      <h2 class="title">
        Our HITers
      </h2>
      <p class="description">
        List of members of the great HIT family through generations until now!
      </p>
    </div>
    <div class="toolbar">
      <div ref="filterBarRef" class="filter-bar">
        <button
          class="dropdown-button"
          type="button"
          @click="openGenerationFilterDropdown"
        >
          <Icon name="uil:filter" class="icon-left" />
          HIT {{ selectedGeneration }}
          <Icon name="uil:angle-down" class="icon-right" />
        </button>
        <div v-if="isVisibleGenerationFilterDropdown" class="dropdown-content">
          <ul class="generation-list">
            <li
              v-for="generation in GENERATIONS"
              :key="generation.value"
              class="item"
            >
              <input
                :id="generation.label"
                v-model="selectedGeneration"
                type="radio"
                :value="generation.value"
                class="radio"
              >
              <label :for="generation.label" class="label">{{
                generation.label
              }}</label>
            </li>
          </ul>
        </div>
      </div>
      <div class="search-bar">
        <div class="search-icon">
          <Icon name="uil:search" class="icon" />
        </div>
        <input
          v-model="searchUserInput"
          type="text"
          class="input"
          placeholder="Search for users"
        >
      </div>
    </div>
    <table class="table">
      <thead class="head">
        <tr class="row">
          <th class="checkbox-head">
            <div class="checkbox">
              <input id="checkbox-all-search" type="checkbox" class="input">
            </div>
          </th>
          <template v-for="column in userTableColumns" :key="column.value">
            <th class="head" :class="{ '-action': column.value === 'action' }">
              {{ column.label }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody class="body">
        <template v-if="filteredUsers?.length">
          <tr v-for="user in filteredUsers" :key="user.id" class="row">
            <td class="cell-checkbox">
              <div class="checkbox">
                <input type="checkbox" class="input">
              </div>
            </td>
            <th class="cell -info">
              <img
                class="avatar"
                :src="user.avatar || defaultUserAvatar"
                :alt="user.name || 'HITer avatar'"
              >
              <div class="text">
                <div class="name">
                  {{ user.name }}
                </div>
                <div class="email">
                  {{ user.email }}
                </div>
              </div>
            </th>
            <td class="cell">
              {{ user.studentCode }}
            </td>
            <td class="cell">
              Member
            </td>
            <td class="cell">
              HIT {{ `${user.generation}` }}
            </td>
            <td class="cell -action">
              <Icon
                size="15"
                name="uil:eye"
                class="text-blue-500 cursor-pointer"
              />
              |
              <Icon
                size="15"
                name="uil:edit"
                class="text-primary-500 cursor-pointer"
              />
              |
              <Icon
                size="15"
                name="uil:trash"
                class="text-red-500 cursor-pointer"
              />
            </td>
          </tr>
        </template>

        <tr v-else class="row w-full">
          <td />
          <p class="p-4 w-full">
            No data matching!
          </p>
        </tr>
      </tbody>
    </table>
    <div class="footer">
      <div class="content">
        <span class="showing">Showing
          <span class="label"> {{ filteredUsers?.length || 0 }}</span> of
          <span class="value">{{ users.length }}</span>
        </span>
        <p class="total">
          <span class="label">Total users: </span>
          <span class="value">{{ users.length }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.users-management-page {
  .header {
    @apply p-4;
  }

  .header > .title {
    @apply text-lg font-semibold text-left text-gray-900;
  }

  .header > .description {
    @apply mt-1 text-sm font-normal text-gray-500;
  }

  .table {
    @apply w-full text-sm text-left text-gray-500 relative;
  }

  .table > .head {
    @apply text-xs text-gray-700 uppercase bg-gray-50;
  }

  .table > .head > .row > .checkbox-head {
    @apply p-4;

    > .checkbox {
      @apply flex items-center;
    }

    > .checkbox > .input {
      @apply w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded;
    }
  }

  .table > .head > .row > .head {
    @apply px-6 py-3;
  }

  .table > .head > .row > .head.-action {
    @apply text-right;
  }

  .table > .body > .row {
    @apply bg-white border-b hover:bg-gray-50;
  }

  .table > .body > .row > .cell-checkbox {
    @apply w-4 p-4;

    > .checkbox {
      @apply flex items-center;
    }

    > .checkbox > .input {
      @apply w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded;
    }
  }

  .table > .body > .row > .cell {
    @apply px-6 py-4;
  }

  .table > .body > .row > .cell.-info {
    @apply flex items-center text-gray-900 whitespace-nowrap;

    > .avatar {
      @apply w-10 h-10 rounded-full;
    }

    > .text {
      @apply ml-4;
    }

    > .text > .name {
      @apply text-base font-semibold;
    }

    > .text > .email {
      @apply font-normal text-gray-500;
    }
  }

  .table > .body > .row > .cell.-action {
    @apply text-right gap-2;
  }

  .footer {
    @apply relative overflow-hidden bg-white rounded-b-lg shadow-md;

    > .content {
      @apply flex flex-row items-center justify-between p-4;
    }

    .total {
      @apply text-sm;
    }

    .total > .label {
      @apply font-normal text-gray-500;
    }

    .total > .value {
      @apply font-normal text-gray-900;
    }

    .showing {
      @apply text-sm font-normal text-gray-500;
    }

    .showing > .label {
      @apply font-semibold text-gray-900;
    }
    .showing > .value {
      @apply font-normal text-gray-900;
    }
  }
}

.toolbar {
  @apply flex items-center justify-between pb-4 bg-white p-4;
  > .filter-bar {
    > .dropdown-button {
      @apply inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5;
    }

    > .dropdown-button > .icon-left {
      @apply w-4 h-4 mr-2.5;
    }

    > .dropdown-button > .icon-right {
      @apply w-4 h-4 ml-2.5;
    }

    > .dropdown-content {
      @apply absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow h-[140px] overflow-y-scroll mt-2;
    }

    > .dropdown-content > .generation-list {
      @apply p-3 space-y-1 text-sm text-gray-700;
    }

    > .dropdown-content > .generation-list > .item {
      @apply flex items-center p-2 rounded hover:bg-gray-100;
    }

    > .dropdown-content > .generation-list > .item > .radio {
      @apply w-4 h-4 text-primary-500 bg-gray-100 border-gray-300;
    }

    > .dropdown-content > .generation-list > .item > .label {
      @apply w-full ml-2 text-sm font-medium text-gray-900 rounded;
    }
  }

  > .search-bar {
    @apply relative;

    > .search-icon {
      @apply absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none;

      > .icon {
        @apply w-4 h-4 text-gray-500;
      }
    }

    > .input {
      @apply block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-primary-500 focus:border-primary-500 focus:outline-primary-500;
    }
  }
}
</style>
