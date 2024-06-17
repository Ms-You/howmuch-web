<template>
  <div class="category">
    <span class="category-text">계산할 카테고리를 선택해주세요</span>
    <div class="row">
      <router-link to="/dutch-pay" class="border-box dutch-pay">
        <span>단순 더치페이</span>
      </router-link>
      
      <router-link to="/drink" class="border-box drink">
        <span>술</span>
      </router-link>
    </div>

    <div class="row">
      <router-link to="/restaurant" class="border-box restaurant">
        <span>식당</span>
      </router-link>

      <router-link to="/grocery" class="border-box grocery">
        <span>식료품</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Content',
    setup() {
      

      return {

      }
    }
  }
</script>

<style scoped>
.category {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.category-text {
  font-size: 18px;
  margin-bottom: 1.5rem;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.border-box {
  position: relative;
  width: 250px;
  height: 250px;
  box-sizing: border-box;
  border-radius: 10px;
  text-align: center;
  color: white;
  font-size: 25px;
  font-weight: bold;
  font-family: "Gowun Dodum", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-decoration: none;
}

.border-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  z-index: 1;
  transition: background-color 0.5s ease; /* 부드러운 전환 효과 추가 */
}

.border-box:hover::before {
  background: rgba(0, 0, 0, 0.7); /* 마우스 오버 시 더 어둡게 변경 */
}

.border-box span {
  position: relative;
  z-index: 2;
}

.dutch-pay {
  background-image: url('/img/students.png');
}

.drink {
  background-image: url('/img/drunk.jpg');
}

.restaurant {
  background-image: url('/img/restaurant.png');
}

.grocery {
  background-image: url('/img/grocery.jpg');
}
</style>