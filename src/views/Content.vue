<template>
  <div class="container">
    <div class="attendee">
      <div class="input-section">
        <input type="text" placeholder="참석자 이름을 입력해주세요" v-model="newAttendee" @keyup.enter="addAttendee">
        <button @click="addAttendee">추가</button>
      </div>
      <div class="attendees-list">
        <div v-for="(attendee, idx) in attendees" :key="idx" class="attendee-card">
          <span class="attendee-name">{{ attendee }}</span>
          <span @click="removeAttendee(idx)" class="close">&times;</span>
        </div>
      </div>
    </div>

    <div class="menu">
      <div class="menu-section">
        <input type="text" placeholder="메뉴를 입력해주세요" v-model="newMenu.name">
        <input type="number" placeholder="가격" v-model.number="newMenu.price" min="0" @input="checkPrice">
        <input type="number" placeholder="수량" v-model.number="newMenu.quantity" min="0" @input="checkQuantity" @keyup.enter="addMenu">
        <button @click="addMenu">추가</button>
      </div>
      <div class="menu-list">
        <div v-for="(menu, idx) in menus" :key="idx" class="menu-card">
          <span class="menu-name">{{ menu.name }}</span>
          <span class="menu-price">{{ menu.price }}원</span>
          <span class="menu-quantity">{{ menu.quantity }}개</span>
          <span @click="removeMenu(idx)" class="close">&times;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  name: 'Content',
  setup() {
    // 참석자
    const attendees = ref([]);
    const newAttendee = ref('');

    // 메뉴
    const menus = ref([]);
    const newMenu = reactive({
      name: '',
      price: 0,
      quantity: 0,
    });

    // 참석자 추가 함수
    const addAttendee = () => {
      if (newAttendee.value.trim() !== '') {
        attendees.value.push(newAttendee.value);
        newAttendee.value = '';
      }
    }

    // 참석자 삭제 함수
    const removeAttendee = (idx) => {
      attendees.value.splice(idx, 1);
    }

    // 가격 검사 함수
    const checkPrice = () => {
      if (newMenu.price < 0) {
        newMenu.price = 0;
      }
    }

    // 수량 검사 함수
    const checkQuantity = () => {
      if (newMenu.quantity < 0) {
        newMenu.quantity = 0;
      }
    }

    // 메뉴 추가 함수
    const addMenu = () => {
      if (newMenu.name.trim() !== '' && newMenu.price > 0 && newMenu.quantity > 0) {
        menus.value.push({ ...newMenu });
        newMenu.name = '';
        newMenu.price = 0;
        newMenu.quantity = 0;
      }
    };

    // 메뉴 삭제 함수
    const removeMenu = (idx) => {
      menus.value.splice(idx, 1);
    }

    return {
      attendees,
      newAttendee,
      menus,
      newMenu,
      addAttendee,
      removeAttendee,
      checkPrice,
      checkQuantity,
      addMenu,
      removeMenu,
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.input-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.menu-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

input[type="number"] {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  width: 25%;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.attendee {
  margin-bottom: 3rem;
}

.attendees-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-height: 300px;
  overflow-y: auto;
}

.attendee-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f9fa;
  width: 150px; /* 카드 크기 조절 */
}

.menu-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f9fa;
  width: 267px;
}

.attendee-name {
  flex: 1;
  font-size: 16px;
  margin-right: 10px;
}

.menu-list {
  display: flex;
  flex-wrap: wrap;
}

.item-name,
.item-price,
.item-quantity {
  font-size: 16px;
}

.close {
  color: #aaa;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 25px;
}

.close:hover {
  color: black;
}
</style>
