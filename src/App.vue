<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<script>
import Header from './layouts/Header.vue'
import Footer from './layouts/Footer.vue'
import { RouterView } from 'vue-router'

  export default {
    name: 'App',
    components: {
      Header,
      Footer,
    }
  }
</script>

<style scoped>

</style>
