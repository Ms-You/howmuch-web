<template>
  <div class="input-section">
    <div class="input-group">
      <label for="attendee-name">참석자</label>
      <div class="input-and-button">
        <input type="text" id="attendee-name" placeholder="참석자 이름을 입력해주세요" v-model="newAttendee" @keyup.enter="addAttendee">
        <button @click="addAttendee">추가</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

  export default {
    name: 'AttendeeInput',
    emits: ['add-attendee'],
    setup(props, { emit }) {
      // 새로운 참석자
      const newAttendee = ref('');

      // 참석자 추가 함수
      const addAttendee = () => {
        if(newAttendee.value.trim() !== '') {
          emit('add-attendee', newAttendee.value);
          newAttendee.value = '';
        }
      }

      return {
        newAttendee,
        addAttendee,
      }
    }
  }
</script>

<style scoped>
@import url(../../assets/attendee/attendee-input.css);
</style>