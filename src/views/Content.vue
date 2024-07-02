<template>
  <div class="container">
    <div class="left-section">
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

      <div class="attendee">
        <div class="input-section">
          <div class="input-group">
            <label for="attendee-name">참석자</label>
            <div class="input-and-button">
              <input type="text" id="attendee-name" placeholder="참석자 이름을 입력해주세요" v-model="newAttendee" @keyup.enter="addAttendee">
              <button @click="addAttendee">추가</button>
            </div>
          </div>
        </div>
        <div class="attendees-list">
          <div v-for="(attendee, idx) in attendees" :key="idx" class="attendee-card" @click="openMenuCheckModal(attendee)">
            <span class="attendee-name">{{ attendee }}</span>
            <span @click="removeAttendee(idx, $event)" class="close">&times;</span>
            <div class="attendee-total-price">
              {{ lib.getPriceFormat(getAttendeeTotalPrice(attendee)) }}원
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="right-section">
      <div class="total-price">
        총 금액: {{ lib.getPriceFormat(totalPrice) }}원
      </div>

      <div class="menu-list">
        <div v-for="(menu, idx) in menus" :key="idx" class="menu-card">
          <span class="menu-name">{{ menu.name }}</span>
          <span class="menu-price">{{ lib.getPriceFormat(menu.price) }}원</span>
          <span class="menu-quantity">{{ menu.quantity }}개</span>
          <span @click="removeMenu(idx)" class="close">&times;</span>
        </div>
      </div>
    </div>
    
    <!-- MenuCheck 모달 추가 -->
    <MenuCheck 
      v-if="isMenuCheckModalOpen && selectedAttendee !== null" 
      :attendeeName="selectedAttendee"
      :menus="menus"
      :selectedMenus="attendeeMenus[selectedAttendee] || []"
      @close="isMenuCheckModalOpen = false" 
      @confirm="handleMenuSelection"
      @reset="handleMenuReset" />

  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import MenuCheck from './MenuCheck.vue';
import lib from '../scripts/lib';

export default {
  name: 'Content',
  components: {
    MenuCheck
  },
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

    // 총 금액 계산
    const totalPrice = computed(() => {
      return menus.value.reduce((total, menu) => {
        return total + (menu.price * menu.quantity);
      }, 0);
    });

    // 참석자 추가 함수
    const addAttendee = () => {
      if (newAttendee.value.trim() !== '') {
        attendees.value.push(newAttendee.value);
        newAttendee.value = '';
      }
    };

    // 참석자 삭제 함수
    const removeAttendee = (idx, event) => {
      event.stopPropagation();  // 이벤트 버블링 중지하기 위함
      attendees.value.splice(idx, 1);
    };

    // 가격 검사 함수
    const checkPrice = () => {
      if (newMenu.price < 0) {
        newMenu.price = 0;
      }
    };

    // 수량 검사 함수
    const checkQuantity = () => {
      if (newMenu.quantity < 0) {
        newMenu.quantity = 0;
      }
    };

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
    };


    // 참석자가 선택한 메뉴 데이터
    const attendeeMenus = ref({});

    // 메뉴 체크 모달창 클릭 여부
    const isMenuCheckModalOpen = ref(false);
    // 메뉴 선택을 위해 선택된 참석자
    const selectedAttendee = ref(null);

    // 메뉴 체크 모달창 상태 수정
    const openMenuCheckModal = (attendee) => {
      selectedAttendee.value = attendee;
      isMenuCheckModalOpen.value = true;
    };

    // 참석자 별 선택된 메뉴 목록
    const handleMenuSelection = (selectedMenus) => {
      attendeeMenus.value[selectedAttendee.value] = selectedMenus;
      isMenuCheckModalOpen.value = false;
    };

    // 참석자 별 선택된 메뉴 목록 초기화
    const handleMenuReset = () => {
      attendeeMenus.value[selectedAttendee.value] = [];
      isMenuCheckModalOpen.value = false;
    };

    // 참석자가 소비한 메뉴 총 가격 계산
    const getAttendeeTotalPrice = (attendee) => {
      const menus = attendeeMenus.value[attendee] || [];

      return menus.reduce((total, menu) => {
        return total + menu.price;
      }, 0);
    };

    return {
      attendees,
      newAttendee,
      menus,
      newMenu,
      totalPrice,
      addAttendee,
      removeAttendee,
      checkPrice,
      checkQuantity,
      addMenu,
      removeMenu,
      lib,
      attendeeMenus,
      isMenuCheckModalOpen,
      selectedAttendee,
      openMenuCheckModal,
      handleMenuSelection,
      handleMenuReset,
      getAttendeeTotalPrice,
    }
  }
}
</script>

<style scoped>
@import url(../assets/content.css);

</style>
