import Vuex from 'vuex';
import { encryptData, decryptData,} from './EncriptDecript';

export default new Vuex.Store({
  state: {
    token: decryptData(localStorage.getItem(encryptData('token'))) || null,
    expiresAt: decryptData(localStorage.getItem(encryptData('expiresAt'))) || null,
    user: decryptData(localStorage.getItem(encryptData('user'))) || null,
    editData: '',
    edit: decryptData(localStorage.getItem(encryptData('edit'))) || null,
    domain: decryptData(localStorage.getItem(encryptData('domain'))) || null,
  },
  getters: {
    token: (state) => state.token,
    user: (state) => state.user,
    getDomain: (state) => state.domain,
    editData: (state) => state.edit,
    isTokenExpired(state) {
      return state.expiresAt;
    }
  },
  mutations: {
    setToken(state, { token, expiresAt }) {
      state.token = token;
      state.expiresAt = expiresAt;
      localStorage.setItem(encryptData('expiresAt'), encryptData(expiresAt));
      localStorage.setItem(encryptData('token'), encryptData(token));
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem(encryptData('token'));
      localStorage.removeItem(encryptData('expiresAt'));
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem(encryptData('user'), encryptData(user));
    },
    setEditData(state, data) {
      state.editData = data;
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem(encryptData('user'));
    },
    setDomain(state, domain) {
      localStorage.setItem(encryptData('domain'), encryptData(domain));
      state.domain = domain;
    },
    setEdit(state, data) {
      localStorage.setItem(encryptData('edit'), encryptData(data));
      state.edit = data;
    },
    clearEdit(state) {
      state.edit = null;
      localStorage.removeItem(encryptData('edit'));
    }
  },
  actions: {
    login({ commit }, { token, user, expiresAt }) {
      commit('setToken', { token, expiresAt });
      commit('setUser', user);
    },
    refreshToken({ commit }, { token, expiresAt }) {
      commit('setToken', { token, expiresAt });
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
    },
    clearToken({ commit }) {
      commit('clearToken');
    }
  },
  modules: {}
});
