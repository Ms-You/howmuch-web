<template>
  <div v-if="dutchPayResult" class="dutch-pay-result">
    <h1>더치페이 결과</h1>
    <div class="result-container">
      <ul>
        <li v-for="(result, idx) in dutchPayResult" :key="idx" class="result-item">
          <span class="result-name">{{ result.name }}</span>
          <span class="result-price">{{ lib.getPriceFormat(result.price) }}원</span>
        </li>
      </ul>
      <div class="total-price">
        총 금액: {{ lib.getPriceFormat(totalPrice) }}원
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import store from '../store/index';
import lib from '../scripts/lib';

  export default {
    name: 'DutchPayResult',
    setup() {
      const dutchPayResult = computed(() => store.getters.dutchPayResult);
      const totalPrice = computed(() => {
        return dutchPayResult.value.reduce((price, result) => {
          return price + result.price;
        }, 0);
      });

      return {
        dutchPayResult,
        lib,
        totalPrice,
      };
    },
  };
</script>

<style scoped>
.dutch-pay-result {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dutch-pay-result h1 {
  font-size: 24px;
  margin-bottom: 16px;
  text-align: center;
}

.result-container {
  max-height: 400px;
  overflow-y: auto;
}

.result-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.result-item:last-child {
  border-bottom: none;
}

.result-name {
  font-weight: 600;
}

.result-price {
  color: #ff5722;
  font-weight: 600;
}

.total-price {
  font-size: 18px;
  font-weight: 600;
  text-align: right;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}
</style>