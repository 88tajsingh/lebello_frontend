import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    currentID: null,
    token: null,
    expiresAt: null,
    user: null,
    editData: null,
    extraData: {},
    edit: null,
    domain: null
  }),

  getters: {
    getCurrentID: (state) => state.currentID,
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getDomain: (state) => state.domain,
    getEditData: (state) => state.edit,
    isTokenExpired: (state) => state.expiresAt,
    getApiData: (state) => state.extraData
  },

  actions: {
    setToken(token, expiresAt) {
      this.token = token
      this.expiresAt = expiresAt
      const cookies = useCookie('token')
      cookies.value = token
    },

    setUser(user) {
      this.user = user
      const cookies = useCookie('user')
      cookies.value = JSON.stringify(user)
    },

    setDomain(domain) {
      this.domain = domain
      const cookies = useCookie('domain')
      cookies.value = domain
    },

    setExtraData(data) {
      this.extraData = data
    },

    logout() {
      this.token = null
      this.user = null
      this.domain = null
      this.edit = null
      const cookies = useCookie('token')
      cookies.value = null
    }
  }
})