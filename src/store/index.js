import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
    dutchPayResult: null,
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    setDutchPayResult(state, result) {
      state.dutchPayResult = result;
    },
  },
  actions: {
    initAuthentication({ commit }) {
      const accessToken = localStorage.getItem('accessToken');

      if(accessToken) {
        commit('setAuthentication', true);
      } else {
        commit('setAuthentication', false);
      }
    },
    logout({ commit }) {
      localStorage.removeItem('accessToken');
      commit('logout');
    },
    updateDutchPayResult({ commit }, result) {
      commit('setDutchPayResult', result);
    },
  },
  getters: {
    dutchPayResult: state => state.dutchPayResult,
  },
});