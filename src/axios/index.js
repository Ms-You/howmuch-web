import axios from 'axios'
import store from '../store/index'

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: '/',
  withCredentials: true,  // 쿠키 전송을 위해 필요함
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if(accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 토큰이 유효하지 않을 경우 RefreshToken을 이용한 재발급
    if(error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post('/api/reissue', {}, { withCredentials: true });
        if(res.status === 403 || res.status === 700) {  // 리프레시 토큰이 유효하지 않을 경우
          store.dispatch('logout'); // 로그아웃
          return Promise.reject(error);
        }

        const newAuthorizationHeader = res.headers['authorization'];
        const newAccessToken = newAuthorizationHeader ? newAuthorizationHeader.replace('Bearer ', '') : null;

        if(newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return instance(originalRequest);
        }

      } catch (refreshError) {
        store.dispatch('logout'); // 로그아웃
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
