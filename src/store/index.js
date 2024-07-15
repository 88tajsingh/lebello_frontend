import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {email: null, password: null},
    editData: ''
  },
  getters: {
    token: state => state?.token,
    user: state => state?.user,
    editData: state => state?.editData,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setEditData(state, data) {
      state.editData = data;
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    setStatus(state, status) {
      state.status = status;
    },
  },
  actions: {
    login({ commit }, { token, user }) {
      commit('setToken', token);
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('clearToken');
      commit('clearUser');
    },
    userUpdate({ commit }) {
      commit('setUser', user);
    },
    editData({ commit }, {data  }) {
      commit('setEditData', data);
    },
  },
  modules: {},
});