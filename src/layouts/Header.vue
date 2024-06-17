<template>
  <div class="container">
    <div class="item">
      <router-link to="/" class="home">홈</router-link>
    </div>
    <div class="item">처음이신가요?</div>
    <div class="item">로그인</div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    setup() {


      return {

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
</style>