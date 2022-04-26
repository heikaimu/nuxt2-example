<!--
 * @Date: 2022-04-26 09:33:38
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-26 13:23:57
 * @FilePath: /my-first-app/pages/cart.vue
-->
<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 py-10 mx-auto">

      <div v-for="item in list" class="lg:w-4/5 pb-6 mx-auto mb-10 flex flex-wrap border-b mb-6 border-gray-200">
        <img alt="ecommerce" class="w-32 h-32 object-cover object-center rounded" :src="item.product.images[0].src">
        <div class="flex-1 lg:pl-10 pl-5 mb-6 lg:mb-0">
          <h1 class="text-gray-900 text-xl title-font font-medium mb-3">{{ item.product.title }}</h1>
          <p class="leading-relaxed mb-3">{{ item.variant.title }}</p>
          <div class="flex items-center justify-between mb-3 border-t border-b border-gray-200 py-2">
            <span class="text-gray-500">Quantity</span>
            <span class="ml-auto text-gray-900">{{ item.quantity }}</span>
          </div>
          <div class="flex">
            <span class="right title-font font-medium text-2xl text-gray-900">${{ item.variant.price }}</span>
            <button @click="handleDelete(item)" class="flex ml-auto text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    list() {
      return this.$store.state.cart.list;
    }
  },

  methods: {
    handleDelete(item) {
      this.$store.dispatch('cart/setProductQuantity', {
        id: item.id,
        quantity: 0
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
