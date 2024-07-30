import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ,
    user: JSON.parse(localStorage.getItem('user')) ,
    editData: '',
    edit: '',
    domain : JSON.parse(localStorage.getItem('domain')) || '',
  },
  getters: {
    token: state => state.token,
    user: state => state.user,
    editData: state => state.editData,
    getDomain: state => state.domain,
    editData: state => state.edit,
    

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
   
    setDomain(state, domain) {
      localStorage.setItem('domain', JSON.stringify(domain));
      state.domain = domain;
    },
    setEdit(state, data) {
      state.edit = data;
    },
    clearEdit(state) {
      state.edit = null;
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
    setDomain({ commit }, domain) {
      commit('setDomain', domain);
    },
    setEdit({ commit }, data) {
      commit('setEdit', data);
    },
    clearEditData({ commit }) {
      commit('clearEdit');
    },
  },
  modules: {},
});