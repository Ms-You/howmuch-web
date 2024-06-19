<template>
  <div class="container">
    <router-link to="/" class="item home">홈</router-link>
    <div class="item">처음이신가요?</div>
    <div class="item sign" v-if="!isAuthenticated">
      <Sign />
    </div>
    <div class="item sign" v-else @click="logout">로그아웃</div>
  </div>
</template>

<script>
import { computed } from 'vue'
import store from '../store/index'
import Sign from '../views/auth/Sign.vue'
import instance from '../axios/index'

  export default {
    name: 'Header',
    components: {
      Sign
    },
    setup() {
      const isAuthenticated = computed(() => store.state.isAuthenticated);

      /**
       * 로그아웃
       */
      const logout = () => {
        instance.post('/api/member/logout').then((res) => {
          console.log(res.data);
          store.dispatch('logout');
        }).catch((error) => {
          if(error.response.status === 401) {
            store.dispatch('logout');
          } else {
            console.log(error.response.data.message);
          }
        });
      };

      return {
        isAuthenticated,
        logout,
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