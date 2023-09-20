<script setup lang="ts">
import type { Form } from '~/types'

defineProps<{
  forms: Form[]
}>()
const { formTableColumns } = useForms()
</script>

<template>
  <div class="form-list">
    <table class="form-table">
      <thead class="table-head">
        <tr class="row">
          <th
            v-for="{ value, label } in formTableColumns"
            :key="value"
            class="cell"
            :class="`-${value}`"
          >
            {{ label }}
          </th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="form in forms" :key="form.id" class="row">
          <td class="cell -name">
            {{ form.name }}
          </td>
          <td class="cell -eventName">
            {{ form.event.name }}
          </td>
          <td class="cell -status">
            <span
              :class="{ '-active': form.isActive, '-unactive': !form.isActive }"
            >
              {{ form.isActive ? "Active" : "Unactive" }}
            </span>
          </td>
          <td class="cell -createdAt">
            {{ formatDate(form.createdAt) }}
          </td>
          <td class="cell -updatedAt">
            {{ formatDate(form.updatedAt) }}
          </td>
          <td class="cell -action">
            <Icon size="15" name="uil:eye" class="-detail" /> |
            <Icon size="15" name="uil:edit" class="-edit" /> |
            <Icon size="15" name="uil:trash" class="-delete" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.form-list {
  > .form-table {
    @apply w-full text-sm text-left text-gray-700;
  }

  > .form-table > .table-head {
    @apply text-xs text-gray-700 uppercase bg-gray-100;
  }

  > .form-table > .table-body > .row {
    @apply bg-white border-b hover:bg-gray-50;
  }

  > .form-table > .table-head > .row > .cell,
  > .form-table > .table-body > .row > .cell {
    @apply px-6 py-4;

    &.-action {
      @apply text-right;
    }
  }

  > .form-table > .table-body > .row > .cell.-name {
    @apply min-w-[300px] font-semibold;
  }

  > .form-table > .table-body > .row > .cell.-eventName {
    @apply min-w-[200px];
  }

  > .form-table > .table-body > .row > .cell.-createdAt,
  > .form-table > .table-body > .row > .cell.-updatedAt {
    @apply min-w-[120px];
  }

  > .form-table > .table-body > .row > .cell.-action {
    @apply min-w-[120px];

    > .-detail {
      @apply text-blue-500 cursor-pointer;
    }
    > .-edit {
      @apply text-primary-500 cursor-pointer;
    }
    > .-delete {
      @apply text-red-500 cursor-pointer;
    }
  }

  > .form-table > .table-body > .row > .cell.-status {
    > .-active {
      @apply bg-green-200 text-green-800 text-xs text-center font-medium px-3 py-1 rounded-full;
    }
    > .-unactive {
      @apply bg-red-200 text-red-800 text-xs text-center font-medium px-3 py-1 rounded-full;
    }
  }
}
</style>
