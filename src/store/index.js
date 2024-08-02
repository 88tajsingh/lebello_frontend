import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    user: safeJsonParse(localStorage.getItem('user')) || null,
    editData: '', 
    edit: safeJsonParse(localStorage.getItem('edit')) || null,
    domain: safeJsonParse(localStorage.getItem('domain')) || null,
  },
  getters: {
    token: (state) => state.token,
    user: (state) => state.user,
    getDomain: (state) => state.domain,
    editData: (state) => state.edit
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = null;
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
    setDomain(state, domain) {
      localStorage.setItem('domain', JSON.stringify(domain));
      state.domain = domain;
    },
    setEdit(state, data) {
      localStorage.setItem('edit', JSON.stringify(data));
      state.edit = data;
    },
    clearEdit(state) {
      state.edit = null;
      localStorage.removeItem('edit');
    }
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
    userUpdate({ commit }, user) {
      commit('setUser', user);
    },
    editData({ commit }, data) {
      commit('setEditData', data);
    },
    setDomain({ commit }, domain) {
      commit('setDomain', domain);
    },
    setEdit({ commit }, data) {
      commit('setEdit', data);
    },
    clearEditData({ commit }) {
      commit('clearEdit');
    }
  },
  modules: {}
});

function safeJsonParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return null; 
  }
}
