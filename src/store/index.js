import LoginServices from '@/services/LoginServices';
import Vuex from 'vuex';
import { encryptData, decryptData } from './EncriptDecript';
import Cookie from 'cookie-universal';

const cookies = Cookie();

export default new Vuex.Store({
  state: {
    currentID: cookies.get('currentID') || null,
    token: decryptData(cookies.get('token')) || null,
    expiresAt: cookies.get('expiresAt') || null,
    user: decryptData(cookies.get('user')) || null,
    editData: null,
    edit: decryptData(cookies.get('edit')) || null,
    domain: decryptData(cookies.get('domain')) || null,
  },
  getters: {
    getCurrentID: (state) => state.currentID,
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
      cookies.set('token', encryptData(token));
      cookies.set('expiresAt', expiresAt);
    },
    clearToken(state) {
      state.token = null;
      cookies.remove('token');
      cookies.remove('expiresAt');
    },
    setUser(state, user) {
      state.user = user;
      cookies.set('user', encryptData(user));
    },
    setEditData(state, data) {
      state.editData = data;
    },
    clearUser(state) {
      state.user = null;
      cookies.remove('user');
    },
    setDomain(state, domain) {
      cookies.set('domain', encryptData(domain));
      state.domain = domain;
    },
    clearDomain(state) {
      cookies.remove('domain');
      state.domain = null;
    },
    setEdit(state, data) {
      cookies.set('edit', encryptData(data));
      state.edit = data;
    },
    clearEdit(state) {
      state.edit = null;
      cookies.remove('edit');
    },
    setCurrentId(state, params) {
      console.log("currentID", params);
      cookies.set('currentID', params);
      state.currentID = params;
    },
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
    setCurrentId({ commit }, data) {
      console.log("setCurrentId", data);
      commit('setCurrentId', data);
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
