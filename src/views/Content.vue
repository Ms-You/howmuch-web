<template>
  <div class="container">
    <div class="input-section">
      <input type="text" placeholder="참석자 이름을 입력해주세요" v-model="newAttendee" @keyup.enter="addAttendee()">
      <button @click="addAttendee">추가</button>
    </div>
    <div class="attendees-list">
      <div v-for="(attendee, idx) in attendees" :key="idx" class="card">
        <span class="attendee-name">{{ attendee }}</span>
        <span @click="removeAttendee(idx)" class="close">&times;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

  export default {
    name: 'Content',
    setup() {
      const attendees = ref([]);
      const newAttendee = ref('');

      // 참석자 추가 함수
      const addAttendee = () => {
        if(newAttendee.value.trim() !== '') {
          attendees.value.push(newAttendee.value);
          newAttendee.value = '';
        }
      }

      // 참석자 삭제 함수
      const removeAttendee = (idx) => {
        attendees.value.splice(idx, 1);
      }

      return {
        attendees,
        newAttendee,
        addAttendee,
        removeAttendee,
      }
    }
  }
</script>

<style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .input-section {
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

  .attendees-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    max-height: 300px;
    overflow-y: auto;
  }

  .card {
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

  .attendee-name {
    flex: 1;
    font-size: 16px;
    margin-right: 10px;
  }

  .close {
    color: #aaa;
    /* background-color: #dc3545; */
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size:25px;
  }

  .close:hover {
    color: black;
  }
</style>