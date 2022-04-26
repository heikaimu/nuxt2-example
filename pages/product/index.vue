<!--
 * @Date: 2022-04-22 16:21:38
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-26 13:55:53
 * @FilePath: /my-first-app/pages/product/index.vue
-->
<!--
 * @Date: 2022-04-19 18:02:50
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-22 16:19:00
 * @FilePath: /my-first-app/pages/list.vue
-->
<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-10 mx-auto">
      <div class="flex flex-wrap m-4">
        <div class="lg:w-1/4 md:w-1/2 p-4 w-full" v-for="item in products">
          <NuxtLink :to="{ path: `/product/${item.handle}` }" class="block relative rounded overflow-hidden">
            <img alt="ecommerce" class="object-cover object-center w-full h-full block" :src="item.images[0].src">
          </NuxtLink>
          <div class="mt-4">
            <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{{ item.vendor }}</h3>
            <h2 class="text-gray-900 title-font text-lg font-medium truncate ...">{{ item.title }}</h2>
            <p class="mt-1 text-red-600">$ {{ item.variants[0].price }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="py-4 flex justify-center gap-4">
      <button v-if="page > 1" @click="handlePrev"
        class="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
        &nbsp;
        Prev Page
      </button>

      <button @click="handleNext"
        class="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
        &nbsp;
        Next Page
      </button>
    </div> -->
  </section>
</template>

<script lang="ts">
import { getList } from '~/api/product';

export default {
  watchQuery: true,

  transition: 'fade',
  // transition(to, from) {
  //   if (!from) {
  //     return 'slide-left'
  //   }
  //   return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  // },

  async asyncData(ctx) {
    const page = Math.max(1, ctx.query.page || 1);
    const list = await getList({
      page,
      pageSize: 20
    });
    return {
      page,
      products: list
    };
  },

  methods: {
    handlePrev() {
      this.$router.push({
        path: '/product',
        query: {
          page: Math.max(+this.page - 1, 1)
        }
      })
    },

    handleNext() {
      this.$router.push({
        path: '/product',
        query: {
          page: +this.page + 1
        }
      })
    }
  }
}
</script>

<style>
</style>
