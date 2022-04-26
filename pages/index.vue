<!--
 * @Date: 2022-04-19 18:02:50
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-24 09:46:59
 * @FilePath: /my-first-app/pages/index.vue
-->
<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto flex flex-wrap">
      <div v-for="(item, index) in products" class="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
        <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div
          class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
          {{ index + 1 }}</div>
        <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
          <div class="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full overflow-hidden">
            <img class="w-full h-full object-cover" :src="item.image" alt="" srcset="">
          </div>
          <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
            <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">{{ item.title }}</h2>
            <!-- <p class="text-md">created_at: <strong class="text-red-900">{{ item.created_at }}</strong></p> -->
            <div class="flex justify-between">
              <p class="text-md text-gray-500">最近更新: {{ item.updated_at }}</p>
              <p class="text-md text-blue-500">SKU: <strong>{{ item.variants.length }}</strong></p>
            </div>
            <!-- <p class="text-md">updated_at: <strong class="text-red-900">{{ item.updated_at }}</strong></p> -->
            <!-- 
            <ul class="pl-20">
              <li class="mt-5" v-for="i in item.variants">
                <p class="text-sm">created_at: <strong class="text-red-900">{{ i.created_at }}</strong></p>
                <p class="text-sm">published_at: <strong class="text-red-900">{{ i.published_at }}</strong></p>
                <p class="text-sm">updated_at: <strong class="text-red-900">{{ i.updated_at }}</strong></p>
              </li>
            </ul> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getSaleList } from '~/api/product';

export default {
  transition: 'fade',

  async asyncData(ctx) {
    const list = await getSaleList();
    return {
      products: list
    };
  },
}
</script>

<style lang="scss" scoped>
</style>
