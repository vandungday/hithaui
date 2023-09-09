<template>
  <div class="coming-section">
    <div class="main-content">
      <h1 class="title">
        COMING SOON
      </h1>
      <p class="description">
        Sorry, we can't find that page. You'll find lots to explore on the dashboard.
      </p>
      <NuxtLink to="/dashboard" class="navigation-link">
        Back to Dashboard
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.coming-section {
  @apply h-[85vh] py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6;

  > .main-content {
    @apply mx-auto max-w-screen-sm text-center;
  }

  > .main-content > .title {
    @apply mb-4 text-7xl tracking-tight font-extrabold lg:text-7xl text-primary-500;
  }

  > .main-content > .description {
    @apply mb-4 text-lg font-light text-gray-500;
  }

  > .main-content > .navigation-link {
    @apply inline-flex text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4;
  }
}
</style>
