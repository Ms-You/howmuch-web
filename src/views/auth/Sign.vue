<template>
  <div>
    <div class="item" @click="showModal = true">로그인</div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <!-- 모달창 닫기 -->
        <span class="close" @click="showModal = false">&times;</span>
        <!-- 로그인, 회원가입 선택 -->
        <div class="tab">
          <button class="tablinks" @click="openTab('login')" :class="{ active: activeTab === 'login' }">로그인</button>
          <button class="tablinks" @click="openTab('register')" :class="{ active:activeTab === 'register' }">회원가입</button>
        </div>

        <!-- 로그인 탭 선택한 경우 -->
        <div v-show="activeTab === 'login'" class="tabContent">
          <form @submit.prevent="login">
            <label for="login-email">이메일</label>
            <input type="email" id="login-email" v-model="loginForm.email" required>
            <label for="login-password">비밀번호</label>
            <input type="password" id="login-password" v-model="loginForm.password" required>
            <button type="submit">로그인</button>
          </form>
        </div>
        <!-- 회원가입 탭 선택한 경우 -->
        <div v-show="activeTab === 'register'" class="tabContent">
          <form @submit.prevent="register">
            <label for="register-email">이메일</label>
            <input type="email" id="register-email" v-model="registerForm.email" required>
            <label for="register-password">비밀번호</label>
            <input type="password" id="register-password" v-model="registerForm.password" required>
            <label for="register-password-confirm">비밀번호 확인</label>
            <input type="password" id="register-password-confirm" v-model="registerForm.passwordConfirm" required>
            <small v-if="!isPasswordMatched" class="password__match">비밀번호가 일치하지 않습니다.</small>

            <label for="register-name">이름</label>
            <input type="text" id="register-name" v-model="registerForm.name" required>
            <div class="info__birth">
              <select v-model="registerForm.birthYear" @focus="populateYears">
                <option disabled value="" selected>출생 연도</option>
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
              <select v-model="registerForm.birthMonth" @focus="populateMonths">
                <option disabled value="" selected>월</option>
                <option v-for="month in  months" :key="month" :value="month">{{ month }}</option>
              </select>
              <select v-model="registerForm.birthDay" @focus="populateDays">
                <option disabled value="" selected>일</option>
                <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
              </select>
            </div>

            <label for="register-gender">성별</label>
            <div class="info__gender">
              <input type="radio" id="gender-male" value="Male" v-model="registerForm.gender" checked required>
              <label for="gender-male">남성</label>
              <input type="radio" id="gender-female" value="Female" v-model="registerForm.gender" required>
              <label for="gender-female">여성</label>
            </div>
            <button type="submit">회원가입</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watchEffect } from 'vue'
import axios from 'axios'
import store from '../../store/index'
import router from '../../router/index'

  export default {
    name: 'Sign',
    setup() {
      const isAuthenticated = computed(() => store.state.isAuthenticated);
      const showModal = ref(false);
      const activeTab = ref('login');
      const isPasswordMatched = computed(() => {
        return registerForm.password === registerForm.passwordConfirm;
      });

      const loginForm = reactive({
        email: "",
        password: ""
      });

      const registerForm = reactive({
        email: "",
        password: "",
        passwordConfirm: "",
        name: "",
        birthYear: "",
        birthMonth: "",
        birthDay: "",
        gender: "Male"
      });

      const years = ref([]);
      const months = ref([]);
      const days = ref([]);
      const isYearOptionExisted = ref(false);
      const isMonthOptionExisted = ref(false);
      const isDayOptionExisted = ref(false);

      const populateYears = () => {
        if(!isYearOptionExisted.value) {
          for(let i = 1910; i <= 2024; i++) {
            years.value.push(i);
          }

          isYearOptionExisted.value = true;
        }
      };

      const populateMonths = () => {
        if(!isMonthOptionExisted.value) {
          for(let i = 1; i <= 12; i++) {
            months.value.push(i);
          }

          isMonthOptionExisted.value = true;
        }
      };

      const populateDays = () => {
        if(!isDayOptionExisted.value) {
          for(let i = 1; i <= 31; i++) {
            days.value.push(i);
          }

          isDayOptionExisted.value = true;
        }
      };

      const openTab = (tab) => {
        activeTab.value = tab;
      };

      /**
       * 로그인 한 사용자가 다시 로그인 할 수 없도록 라우팅
       */
      watchEffect(() => {
        if(isAuthenticated.value) {
          router.push({ path: '/' });
        }
      });

      /**
       * 로그인 API 호출
       */
      const login = () => {
        axios.post('/api/login', loginForm).then((res) => {
          const authorizationHeader = res.headers['authorization'];
          const accessToken = authorizationHeader ? authorizationHeader.replace('Bearer ', '') : null;

          if(accessToken) {
            localStorage.setItem('accessToken', accessToken);
            store.dispatch('initAuthentication');
          }

        }).catch((error) => {
          if(error.response && error.response.data) {
            window.alert(error.response.data.message);
          } else {
            window.alert("로그인에 실패했습니다.");
          }
        });
      };

      /**
       * 회원가입 API 호출
       */
      const register = () => {
        // 비밀번호 일치 여부 확인
        if(!isPasswordMatched.value) {
          return;
        }

        axios.post('/api/auth', registerForm).then((res) => {
          window.alert(res.data.message);
          // 로그인 탭으로 변경
          openTab('login');
        }).catch((error) => {
          if(error.response && error.response.data) {
            window.alert(error.response.data.message);
          } else {
            window.alert("사용할 수 없는 이메일입니다.");
          }
        });
        
      };

      return {
        isAuthenticated,
        showModal,
        activeTab,
        isPasswordMatched,
        loginForm,
        registerForm,
        years,
        months,
        days,
        populateYears,
        populateMonths,
        populateDays,
        openTab,
        login,
        register,
      }
    }
  }
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4); /* 배경을 어둡게 */
}

.modal-content {
  background-color: #fefefe;
  position: absolute; /* absolute 위치 지정 */
  top: 15%; /* 모달창 뜨는 위치 설정 */
  left: 50%;
  transform: translate(-50%, 0); /* 수평 중앙 정렬 */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
  border-radius: 5px;
  z-index: 1001; /* 모달 내용이 배경보다 앞에 오도록 */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.tab {
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  margin-bottom: 25px;
}

.tab button {
  background-color: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

.tab button:hover {
  background-color: #ddd;
}

.tab button.active {
  background-color: #ccc;
}

.tabcontent {
  display: none;
}

.tabcontent {
  display: block;
}

form {
  display: flex;
  flex-direction: column;
}

form label {
  margin-bottom: 5px;
}

form input, form select {
  margin-bottom: 20px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

form button {
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  margin-top: 10px; 
}

form button:hover {
  background-color: #218838;
}

.password__match {
  font-size: 15px;
  color: #ff4b2b;
  padding-left: 8px;
  margin-bottom: 1.5rem;
}

.info__birth {
  display: flex;
  align-items: center;
}

.info__birth select {
  margin-right: 20px;
}

.info__gender label {
  margin-right: 20px;
}
</style>