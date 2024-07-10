<!-- 메뉴 입력 컴포넌트 -->
<template>
  <div class="menu-section">
    <div class="input-group">
      <label for="menu-name">메뉴</label>
      <div class="input-and-button">
        <input type="text" id="menu-name" placeholder="메뉴를 입력해주세요" v-model="newMenu.name">
      </div>
    </div>
    <div class="input-group">
      <label for="menu-price">가격</label>
      <div class="input-and-button">
        <input type="number" id="menu-price" placeholder="가격" v-model.number="newMenu.price" min="0" @input="checkPrice">
      </div>
    </div>
    <div class="input-group">
      <label for="menu-quantity">수량</label>
      <div class="input-and-button">
        <input type="number" id="menu-quantity" placeholder="수량" v-model.number="newMenu.quantity" min="0" @input="checkQuantity" @keyup.enter="addMenu">
        <button @click="addMenu">추가</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

  export default {
    name: 'MenuInput',
    emits: ['add-menu'],
    setup(props, { emit }) {
      // 새로운 메뉴
      const newMenu = reactive({
        name: '',
        price: 0,
        quantity: 0
      });
      
      // 가격 검사 함수
      const checkPrice = () => {
        if(newMenu.price < 0) {
          newMenu.price = 0;
        }
      };

      // 수량 검사 함수
      const checkQuantity = () => {
        if(newMenu.quantity < 0) {
          newMenu.quantity = 0;
        }
      };

      // 메뉴 추가 함수
      const addMenu = () => {
        if(newMenu.name.trim() !== '' && newMenu.price > 0 && newMenu.quantity > 0) {
          emit('add-menu', { ...newMenu });
          newMenu.name = '';
          newMenu.price = 0;
          newMenu.quantity = 0;
        }
      };

      return {
        newMenu,
        checkPrice,
        checkQuantity,
        addMenu,
      }
    }
  }
</script>

<style scoped>
@import url(../../assets/menu-input.css);
</style>