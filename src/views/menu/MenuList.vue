<!-- 메뉴 목록 컴포넌트 -->
<template>
  <div>
    <div class="total-price">
      총 금액: {{ lib.getPriceFormat(totalPrice) }}원
    </div>

    <div class="menu-list">
      <div v-for="(menu, idx) in menus" :key="idx" class="menu-card">
        <span class="menu-name">{{ menu.name }}</span>
        <span class="menu-price">{{ lib.getPriceFormat(menu.price) }}원</span>
        <span class="menu-quantity">{{ menu.quantity }}개</span>
        <span @click="removeMenu(idx)" class="menu-close">&times;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import lib from '../../scripts/lib';

  export default {
    name: 'MenuList',
    props: {
      menus: {
        type: Array,
        required: true
      },
    },
    emits: ['remove-menu'],
    setup(props, { emit }) {
      // 총 금액 계산
      const totalPrice = computed(() => {
        return props.menus.reduce((total, menu) => {
          return total + (menu.price * menu.quantity);
        }, 0);
      });

      // 메뉴 삭제 함수
      const removeMenu = (idx) => {
        emit('remove-menu', idx);
      };

      return {
        lib,
        totalPrice,
        removeMenu,
      }
    }
  }
</script>

<style scoped>
@import url(../../assets/menu-list.css);
</style>