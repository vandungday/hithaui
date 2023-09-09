<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})

const authStore = useAuthStore()

const userCredentials = reactive({
  username: '',
  password: '',
})

const isInvalidLoginForm = computed(
  () => !userCredentials.username || !userCredentials.password,
)

async function handleLogin() {
  if (isInvalidLoginForm.value)
    return

  await authStore.login(userCredentials)
}
</script>

<template>
  <div class="login-page">
    <form class="login-form">
      <h2 class="title">
        HIT CLUB
      </h2>
      <div class="form-item">
        <label for="username" class="label">Username</label>
        <input id="username" v-model="userCredentials.username" class="input">
      </div>
      <div class="form-item">
        <label for="password" class="label">Password</label>
        <input
          id="password"
          v-model="userCredentials.password"
          type="password"
          class="input"
        >
      </div>
      <div class="form-item">
        <button type="button" class="login-button" @click="handleLogin">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  @apply w-full min-h-[100vh] flex justify-center items-center gap-[5%];

  > .login-form {
    @apply flex flex-col justify-center gap-4 w-[400px] bg-white p-4;
  }

  > .login-form > .form-item {
    @apply mb-4;
  }

  > .login-form > .form-item > .label {
    @apply block mb-2 text-sm font-medium text-gray-900;
  }

  > .login-form > .form-item > .input {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-primary-500;
  }

  > .login-form > .form-item > .login-button {
    @apply text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-100 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center;
  }

  > .login-form > .title {
    @apply text-primary-500 text-5xl font-bold text-center;
  }
}
</style>
