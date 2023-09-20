<script lang="ts" setup>
definePageMeta({
  middleware: 'permission',
})

const formsStore = useFormsStore()
const { forms } = storeToRefs(formsStore)

onMounted(async () => {
  await formsStore.fetchForms()
})
</script>

<template>
  <div class="forms-page">
    <section class="form-list">
      <FormList :forms="forms" />
    </section>
    <footer class="form-footer">
      <p class="showing-form">
        Showing <span class="label"> {{ forms?.length || 0 }}</span> of
        <span class="value">{{ forms.length }}</span>
      </p>
      <p class="total-form">
        <span class="label">Total forms: </span>
        <span class="value">{{ forms.length }}</span>
      </p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.forms-page {
  > .form-footer {
    @apply flex flex-row items-center justify-between p-4 font-normal;

    > .showing-form,
    > .total-form {
      @apply text-sm text-gray-500;
    }

    > .showing-form > .value,
    > .total-form > .value {
      @apply text-gray-900;
    }

    > .showing-form > .label {
      @apply font-semibold text-gray-900;
    }
  }
}
</style>
