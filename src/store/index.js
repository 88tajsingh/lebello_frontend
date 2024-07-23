import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ,
    user: JSON.parse(localStorage.getItem('user')) ,
    editData: '',
    passData: null,
    domain : '',
  },
  getters: {
    token: state => state.token,
    user: state => state.user,
    editData: state => state.editData,
    getParam: state => state.param,
    getDomain: state => state.domain,
    

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
    setParam(state, param) {
      state.passData = param;
    },
    setDomain(state, domain) {
      state.domain = domain;
      console.log('setting domain', state.domain)
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
    setParam({ commit }, param) {
      commit('setParam', param);
    },
    setDomain({ commit }, domain) {
      console.log(' entering domain')
      commit('setDomain', domain);
    },
  },
  modules: {},
});