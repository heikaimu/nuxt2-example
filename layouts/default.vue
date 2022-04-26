<!--
 * @Date: 2022-04-22 16:40:15
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-26 13:22:50
 * @FilePath: /my-first-app/layouts/default.vue
-->
<template>
  <div>
    <WebHeader />
    <main class="web-main-container">
      <Nuxt />
    </main>
    <WebFooter />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.web-main-container {
  min-height: calc(100vh - 44px);
  box-sizing: border-box;
  padding-top: 80px;
}
</style>
