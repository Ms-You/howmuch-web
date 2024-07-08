<template>
  <div class="category">
    <span class="category-text">계산할 카테고리를 선택해주세요</span>
    <div class="row" v-for="(row, idx) in chunkedCategories" :key="idx">
      <router-link 
        v-for="category in row"
        :key="category.categoryId"
        :to="decodeURIComponent(category.path)"
        class="border-box"
        :style="{ backgroundImage: `url(${category.url})` }"
      >
        <span>{{ category.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

  export default {
    name: 'Category',
    setup() {
      const baseUrl = import.meta.env.VITE_APP_BASE_URL;
      const categories = ref([]);
      const chunkedCategories = computed(() => {
        // 카테고리를 2개씩 묶어서 보여줌
        const size = 2;
        const result = [];
        for(let i = 0; i < categories.value.length; i += size) {
          result.push(categories.value.slice(i, i+size));
        }

        return result;
      });

      const fetchCategories = async() => {
        try {
          const res = await axios.get('/api/category');
          categories.value = res.data.result.map(category => ({
            ...category,
            url: `${baseUrl}/${category.url}`,
          }));
        } catch (error) {
          if(error.response && error.response.data) {
            console.log(error.response.data.message);
          } else {
            console.log('카테고리 목록을 조회할 수 없습니다.');
          }
        }
      };

      onMounted(() => {
        fetchCategories();
      });

      return {
        categories,
        chunkedCategories,
        fetchCategories
      }
    }
  }
</script>

<style scoped>
.category {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.category-text {
  font-size: 18px;
  margin-bottom: 1.5rem;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.border-box {
  position: relative;
  width: 250px;
  height: 250px;
  box-sizing: border-box;
  border-radius: 10px;
  text-align: center;
  color: white;
  font-size: 25px;
  font-weight: bold;
  font-family: "Gowun Dodum", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-decoration: none;
}

.border-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  z-index: 1;
  transition: background-color 0.5s ease; /* 부드러운 전환 효과 추가 */
}

.border-box:hover::before {
  background: rgba(0, 0, 0, 0.7); /* 마우스 오버 시 더 어둡게 변경 */
}

.border-box span {
  position: relative;
  z-index: 2;
}

.dutch-pay {
  background-image: url('/img/students.png');
}

.drink {
  background-image: url('/img/drunk.jpg');
}

.restaurant {
  background-image: url('/img/restaurant.png');
}

.grocery {
  background-image: url('/img/grocery.jpg');
}
</style>