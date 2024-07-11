<template>
  <div class="attendees-list">
    <div v-for="(attendee, idx) in attendees" :key="idx" class="attendee-card" @click="openMenuCheckModal(attendee)">
      <span class="attendee-name">{{ attendee }}</span>
      <span @click="removeAttendee(idx, $event)" class="close">&times;</span>
      <div class="attendee-total-price">
        <span :class="getAttendeeSelectedMenusClass(attendee)">{{ getAttendeeSelectedMenus(attendee) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AttendeeList',
    emits: ['remove-attendee', 'open-menu-check-modal'],
    props: {
      attendees: {
        type: Array,
        required: true,
      },
      attendeeMenus: {
        type: Object,
        required: true,
      },
    },
    setup(props, { emit }) {
      // 참석자 삭제 함수
      const removeAttendee = (idx, event) => {
        event.stopPropagation();  // 이벤트 버블링 중지하기 위함
        emit('remove-attendee', idx);
      };

      // 메뉴 체크 모달창 상태 수정
      const openMenuCheckModal = (attendee) => {
        emit('open-menu-check-modal', attendee);
      };

      // 참석자가 선택한 메뉴 목록 보여주는 함수
      const getAttendeeSelectedMenus = (attendee) => {
        const menus = props.attendeeMenus[attendee] || [];

        if(menus.length === 0) {
          return '선택한 메뉴 없음';
        } else {
          // 참석자가 선택한 메뉴 명을 오름차순 정렬
          const sortedMenu = menus.slice().sort((a, b) => a.name < b.name ? -1 : 1);

          if(sortedMenu.length === 1) {
            return `${sortedMenu[0].name}`;
          } else {
            return `${sortedMenu[0].name} 외 ${sortedMenu.length-1}개`;
          }
        }
      };

      // 메뉴 선택 여부에 따라 텍스트 색 변경
      const getAttendeeSelectedMenusClass = (attendee) => {
        const menus = props.attendeeMenus[attendee] || [];

        return menus.length === 0 ? 'no-menu' : 'select-menu';
      };

      return {
        removeAttendee,
        openMenuCheckModal,
        getAttendeeSelectedMenus,
        getAttendeeSelectedMenusClass,
      }
    }
  }
</script>

<style scoped>
@import url(../../assets/attendee/attendee-list.css);
</style>