<!--
 * @Date: 2022-04-22 16:21:45
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-26 13:29:03
 * @FilePath: /my-first-app/pages/product/_handle.vue
-->
<!--
 * @Date: 2022-04-21 17:22:20
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-22 16:18:43
 * @FilePath: /my-first-app/pages/details/_handle.vue
-->
<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 py-10 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img alt="ecommerce" class="lg:w-1/2 w-full h-auto object-cover object-center rounded"
          :src="product.images[0].src">
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest">{{ product.vendor }}</h2>
          <h1 class="text-gray-900 text-2xl title-font font-medium mb-1">{{ product.product_type }}</h1>
          <div class="flex mb-4">
            <span class="flex items-center">
              <svg v-for="i in 4" fill="currentColor" stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <span class="text-gray-600 ml-3">4 Reviews</span>
            </span>
          </div>
          <p class="leading-relaxed">{{ product.title }}</p>

          <div class="mt-6 pb-5 border-b-2 border-gray-100 mb-5">
            <div class="flex mb-2 items-center" v-for="item in product.options">
              <span class="w-20 mr-3">{{ item.name | name }}</span>
              <div class="relative flex-auto">
                <select v-model="form[`option${item.position}`]" @change="handleChange($event, item)"
                  class="w-full rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                  <option v-for="o in item.values">{{ o }}</option>
                </select>
                <span
                  class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    class="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="flex">
            <span class="title-font font-medium text-2xl text-red-600">${{ variant.price }}</span>
            <button @click="handleAddToCart"
              class="flex items-center ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              &nbsp;
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { getDetails } from '~/api/product';

export default {
  transition: 'fade',

  // 校验参数
  validate({ params }) {
    return /(\w+\-)*\w+/.test(params.handle);
  },

  async asyncData({ params, error }) {
    const product = await getDetails(params.handle);
    if (product) {
      return {
        product
      };
    } else {
      error('当前商品不存在')
    }
  },

  filters: {
    name(val) {
      return val.split(/[\:\?\s]/g)[0];
    }
  },

  data() {
    return {
      form: {},
      product: {},
      variant: {},
    }
  },

  // 如果当前query无id，则取第一个SKU，有id则取对应的SKU
  mounted() {
    const id = this.$route.query.id;
    this.variant = this.getVariant(id);
    this.$nextTick(() => {
      this.optionForEach(this.variant, (key, value) => {
        this.$set(this.form, key, value);
      })
    })
  },

  methods: {
    handleChange() {
      const variant = this.product.variants.find(variant => {
        let match = 0;
        this.optionForEach(variant, (key, value) => {
          if (this.form[key] && value && this.form[key] === value) {
            match += 1;
          }
        })
        return match === Object.keys(this.form).filter(key => this.form[key]).length;
      })
      this.variant = variant || {
        price: '-',
        title: '-'
      }
    },

    handleAddToCart() {
      this.$store.dispatch('cart/addToCart', {
        id: this.variant.id,
        product: this.product,
        variant: this.variant
      })
    },

    getVariant(id) {
      if (!id) {
        return this.product.variants[0];
      } else {
        const variant = this.product.variants.find(item => Number(item.id) === Number(id));
        return variant;
      }
    },

    optionForEach(variant, cb) {
      Object.keys(variant).forEach(key => {
        if (/option\d/.test(key)) {
          cb(key, variant[key])
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
