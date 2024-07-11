<template>
  <div class="container">
    <div class="left-section">
      <!-- 메뉴 추가 컴포넌트 -->
      <MenuInput @add-menu="addMenu" />

      <div class="attendee">
        <!-- 참석자 추가 컴포넌트 -->
        <AttendeeInput @add-attendee="addAttendee" />

        <!-- 참석자 목록 컴포넌트 -->
        <AttendeeList 
          :attendees="attendees"
          :attendeeMenus="attendeeMenus"
          @remove-attendee="removeAttendee"
          @open-menu-check-modal="openMenuCheckModal"
        />
      </div>
      
      <div class="submit-section">
        <button class="calculate-button" @click="dutchPay()">계산하기</button>
      </div>

      <!-- 더치페이 결과 컴포넌트 -->
      <DutchPayResult />
      <div class="dutch-pay-result-section" v-if="dutchPayResultState">
        <button class="reset-button" @click="resetInput()">초기화</button>
      </div>
    </div>

    <div class="right-section">
      <!-- 메뉴 목록 컴포넌트 -->
      <MenuList :menus="menus" @remove-menu="removeMenu" />
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
import { ref, computed } from 'vue';
import MenuInput from './menu/MenuInput.vue';
import MenuList from './menu/MenuList.vue';
import MenuCheck from './MenuCheck.vue';
import AttendeeInput from './attendee/AttendeeInput.vue';
import AttendeeList from './attendee/AttendeeList.vue';
import DutchPayResult from './DutchPayResult.vue';
import lib from '../scripts/lib';
import axios from 'axios';
import store from '../store/index';

export default {
  name: 'Content',
  components: {
    MenuInput,
    MenuList,
    MenuCheck,
    AttendeeInput,
    AttendeeList,
    DutchPayResult,
  },
  setup() {
    // 메뉴 목록
    const menus = ref([]);
    // 참석자 목록
    const attendees = ref([]);

    // 참석자가 선택한 메뉴 데이터
    const attendeeMenus = ref({});
    // 메뉴 체크 모달창 클릭 여부
    const isMenuCheckModalOpen = ref(false);
    // 메뉴 선택을 위해 선택된 참석자
    const selectedAttendee = ref(null);
    // 더치페이 결과 존재 여부 확인
    const dutchPayResultState = computed(() => store.getters.dutchPayResult);

    // 메뉴 추가 함수
    const addMenu = (menu) => {
        menus.value.push(menu);
    };

    // 메뉴 삭제 함수
    const removeMenu = (idx) => {
      menus.value.splice(idx, 1);
    };

    // 참석자 추가 함수
    const addAttendee = (attendee) => {
      attendees.value.push(attendee);
    };

    // 참석자 삭제 함수
    const removeAttendee = (idx) => {
      const removedAttendee = attendees.value.splice(idx, 1)[0];
      delete attendeeMenus.value[removedAttendee];  // 참석자가 선택한 메뉴 정보도 삭제
    };

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

    // 모든 입력 데이터 초기화
    const resetInput = () => {
      const res = window.confirm("초기화 하시겠습니까?");

      if(res === true) {
        menus.value = [];
        attendees.value = [];
        attendeeMenus.value = {};
        store.dispatch('updateDutchPayResult', null);
        handleMenuReset();
      }
    };

    /**
     * 더치페이 API 호출
     */
    const dutchPay = async () => {
      try {
        // 참석자 명 전달을 위함
        const formattedAttendees = attendees.value.map(name => ({ name }));

        const res = await axios.post('/api/dutch-pay', {
          attendees: formattedAttendees,
          menus: menus.value,
          attendeeMenus: attendeeMenus.value
        });

        // 받아온 응답을 참석자 별 내야할 금액으로 보여줌
        store.dispatch('updateDutchPayResult', res.data.result);
        console.log(res.data.result);

      } catch (error) {
        if(error.response || error.response.data) {
          console.log(error.response.data.message);
        } else {
          console.log('더치페이 수행 중 오류가 발생했습니다.');
        }
      }
    }

    return {
      menus,
      attendees,
      attendeeMenus,
      isMenuCheckModalOpen,
      selectedAttendee,
      dutchPayResultState,
      addMenu,
      removeMenu,
      addAttendee,
      removeAttendee,
      openMenuCheckModal,
      handleMenuSelection,
      handleMenuReset,
      resetInput,
      dutchPay,
      lib,
    }
  }
}
</script>

<style scoped>
@import url(../assets/content.css);
</style>
