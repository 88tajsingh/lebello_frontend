import LoginServices from '@/services/LoginServices';
import Vuex from 'vuex';
import { encryptData, decryptData } from './EncriptDecript'; 

export default new Vuex.Store({
  state: {
    token: decryptData(localStorage.getItem('token')) || null,
    expiresAt: localStorage.getItem('expiresAt') || null,
    user: decryptData(localStorage.getItem('user')) || null,
    editData: null,
    edit: decryptData(localStorage.getItem('edit')) || null,
    domain: decryptData(localStorage.getItem('domain')) || null,
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
      localStorage.setItem('expiresAt', expiresAt);
      localStorage.setItem('token', encryptData(token)); 
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', encryptData(user)); 
    },
    setEditData(state, data) {
      state.editData = data; 
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    setDomain(state, domain) {
      localStorage.setItem('domain', encryptData(domain));
      state.domain = domain;
    },
    clearDomain(state) {
      localStorage.removeItem('domain');
      state.domain = null;
    },

    setEdit(state, data) {
      localStorage.setItem('edit', encryptData(data)); 
      state.edit = data;
    },
    clearEdit(state) {
      state.edit = null;
      localStorage.removeItem('edit');
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
    clearDomain({ commit }) {
      commit('clearDomain');
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

function safeJsonParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return null; 
  }
}
