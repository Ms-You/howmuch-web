<template>
  <div class="container">
    <router-link to="/" class="item home">홈</router-link>
    <div class="item">처음이신가요?</div>
    <div class="item sign" v-if="!isAuthenticated">
      <Sign />
    </div>
    <div class="item" v-else>로그아웃</div>
  </div>
</template>

<script>
import { computed } from 'vue'
import store from '../store/index'
import Sign from '../views/auth/Sign.vue'

  export default {
    name: 'Header',
    components: {
      Sign
    },
    setup() {
      const isAuthenticated = computed(() => store.state.isAuthenticated);

      return {
        isAuthenticated,
      }
    }
  }
</script>

<style scoped>
.container {
  font-family: "Jua", sans-serif;
  font-style: normal;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.item {
  margin: 5rem;
  font-size: 20px;
}

.home {
  color: black;
  text-decoration: none;
}

.sign {
  cursor: pointer;
}
</style>