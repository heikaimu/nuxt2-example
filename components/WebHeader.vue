<!--
 * @Date: 2022-04-20 14:20:34
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-26 13:30:47
 * @FilePath: /my-first-app/components/WebHeader.vue
-->
<template>
  <header class="fixed left-0 right-0 top-0 z-20 bg-white shadow-lg text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round"
          stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
          viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl">Nuxt Shop</span>
      </a>
      <nav
        class="mr-auto ml-4 py-1 pl-4 border-l border-gray-400	flex flex-wrap items-center text-base justify-center">
        <NuxtLink to="/" class="mr-5 hover:text-gray-900">Home</NuxtLink>
        <NuxtLink to="/product" class="mr-5 hover:text-gray-900">Product</NuxtLink>
      </nav>
      <button @click="$router.push({ path: '/cart' })"
        class="relative inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>

        <span v-show="cartCount" class="text-sm text-white px-1 py-0.5 bg-red-500 rounded-full absolute left-8 -top-2">{{ cartCount }}</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'WebHeader',

  computed: {
    cartCount() {
      return this.$store.state.cart.list.map(item => item.quantity).reduce((prev, cur) => cur + prev, 0);
    }
  }
}
</script>

<style scoped>
/* home route and active route will show in bold as it matches / and /about */
a.nuxt-link-active {
  font-weight: bold;
}

/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #00c58e;
}
</style>
