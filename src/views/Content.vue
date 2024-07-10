<template>
  <div class="container">
    <div class="left-section">
      <!-- 메뉴 입력 컴포넌트 -->
      <MenuInput @add-menu="addMenu" />

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
              <span :class="getAttendeeSelectedMenusClass(attendee)">{{ getAttendeeSelectedMenus(attendee) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="submit-section">
        <button class="calculate-button" @click="dutchPay()">계산하기</button>
      </div>

      <!-- 더치페이 결과 컴포넌트 -->
      <DutchPayResult />
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
import { computed, reactive, ref } from 'vue';
import MenuInput from './menu/MenuInput.vue';
import MenuList from './menu/MenuList.vue';
import MenuCheck from './MenuCheck.vue';
import lib from '../scripts/lib';
import axios from 'axios';
import store from '../store/index';
import DutchPayResult from './DutchPayResult.vue';

export default {
  name: 'Content',
  components: {
    MenuInput,
    MenuList,
    MenuCheck,
    DutchPayResult,
  },
  setup() {
    // 참석자
    const attendees = ref([]);
    const newAttendee = ref('');

    // 메뉴 목록
    const menus = ref([]);

    // 참석자 추가 함수
    const addAttendee = () => {
      if(newAttendee.value.trim() !== '') {
        attendees.value.push(newAttendee.value);
        newAttendee.value = '';
      }
    };

    // 참석자 삭제 함수
    const removeAttendee = (idx, event) => {
      event.stopPropagation();  // 이벤트 버블링 중지하기 위함
      const removedAttendee = attendees.value.splice(idx, 1)[0];
      delete attendeeMenus.value[removedAttendee];  // 참석자가 선택한 메뉴 정보도 삭제
    };

    // 메뉴 추가 함수
    const addMenu = (menu) => {
        menus.value.push(menu);
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

    // 참석자가 선택한 메뉴 목록 보여주기 위함
    const getAttendeeSelectedMenus = (attendee) => {
      const menus = attendeeMenus.value[attendee] || [];
      
      if(menus.length === 0) {
        return '선택한 메뉴 없음';
      } else if(menus.length === 1) {
        return `${menus[0].name}`;
      } else {
        return `${menus[0].name} 외 ${menus.length-1}개`;
      }
    };

    // 메뉴 선택 여부에 따라 텍스트 색 변경
    const getAttendeeSelectedMenusClass = (attendee) => {
      const menus = attendeeMenus.value[attendee] || [];

      return menus.length === 0 ? 'no-menu' : 'select-menu';
    }

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
      attendees,
      newAttendee,
      menus,
      addAttendee,
      removeAttendee,
      addMenu,
      removeMenu,
      lib,
      attendeeMenus,
      isMenuCheckModalOpen,
      selectedAttendee,
      openMenuCheckModal,
      handleMenuSelection,
      handleMenuReset,
      getAttendeeSelectedMenus,
      getAttendeeSelectedMenusClass,
      dutchPay,
    }
  }
}
</script>

<style scoped>
@import url(../assets/content.css);

</style>
