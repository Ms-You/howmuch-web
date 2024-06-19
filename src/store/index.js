import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
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
  },

});