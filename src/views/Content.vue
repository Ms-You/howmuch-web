<template>
  <div class="category">
    <div class="row">
      <div class="border-box dutch-pay">
        <span>단순 더치페이</span>
      </div>
      
      <div class="border-box drink">
        <span>술</span>
      </div>
    </div>

    <div class="row">
      <div class="border-box restaurant">
        <span>식당</span>
      </div>

      <div class="border-box grocery">
        <span>식료품</span>
      </div>
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