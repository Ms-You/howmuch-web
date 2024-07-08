<template>
  <div class="app">
    <Header />
    <div class="content">
      <RouterView />
    </div>
    <Footer />
  </div>
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
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}
</style>
