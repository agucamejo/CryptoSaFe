import { createStore } from 'vuex';

const store = createStore({
  state: {
    usuario: null,
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload;
    },
  },
  actions: {
    detectarUsuario({ commit }, usuario) {
      commit('setUsuario', usuario);
    },
  },
  getters: {
    existeUsuario(state) {
      return state.usuario !== null;
    },
  },
});

export default store;
