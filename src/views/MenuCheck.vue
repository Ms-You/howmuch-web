<template>
  <div class="menu-modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h3>{{ attendeeName }}님이 먹은 메뉴를 선택해주세요.</h3>
      <div v-for="(menu, idx) in menus" :key="idx" class="menu-item">
        <input type="checkbox" :id="'menu-' + idx" v-model="selectedMenus" :value="menu">
        <label :for="'menu-' + idx">{{ menu.name }} ({{ lib.getPriceFormat(menu.price) }}원)</label>
      </div>
      <button @click="confirmSelection">확인</button>
      <button @click="resetSelection">초기화</button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import lib from '../scripts/lib';

  export default {
    name: 'MenuCheck',
    props: {
      attendeeName: String,
      menus: {
        type: Array,
        required: true
      },
      selectedMenus: {
        type: Array,
        default: () => []
      }
    },
    setup(props, { emit }) {
      // 선택된 메뉴들
      const selectedMenus = ref([...props.selectedMenus]);

      // 선택된 메뉴가 변경될 때마다 업데이트
      watch(() => props.selectedMenus, (newSelectedMenus) => {
        selectedMenus.value = [...newSelectedMenus];
      });

      // 선택한 메뉴 목록 확인
      const confirmSelection = () => {
        emit('confirm', selectedMenus.value);
        selectedMenus.value = [];
      };

      // 선택한 메뉴 목록 초기화
      const resetSelection = () => {
        selectedMenus.value = [];
        emit('reset');
      }

      return {
        selectedMenus,
        confirmSelection,
        resetSelection,
        lib,
      };
    }
  }
</script>

<style scoped>
.menu-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
}

.close {
  float: right;
  cursor: pointer;
}

.menu-item {
  margin: 10px 0;
}

.button {
  margin-top: 10px;
}
</style>