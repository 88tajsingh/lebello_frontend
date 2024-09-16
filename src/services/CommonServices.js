import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class CommonServices {
  logout() {
    return instance.post(ApiConfig.logout)
  }
  MaterialTreeList() {
    return instance.get(ApiConfig.getMaterialTeeeList)
  }

  updateProfile(payload) {
    return instance.put(ApiConfig.updateProfile, payload)
  }

  // taxonomy
  taxonomySorting(payload) {
    return instance.post(ApiConfig.taxonomySort, payload)
  }

  // countries
  allCountrys(payload) {
    return instance.get(ApiConfig.getAllCountries, payload)
  }
  getCountries(payload) {
    return instance.get(ApiConfig.getCountries, payload)
  }

  // domains
  getDomains(payload) {
    return instance.get(ApiConfig.getDomains, payload)
  }
  addDomains(payload) {
    return instance.post(ApiConfig.addDomains, payload)
  }
  deleteDomains(payload) {
    return instance.delete(ApiConfig.deleteDomains, { params: { ...payload } })
  }

  // Currencies
  getAllCurrencies(payload) {
    return instance.get(ApiConfig.getAllCurrencies, payload)
  }
  getCurrencies(payload) {
    return instance.get(ApiConfig.getCurrenciesList, payload)
  }

  // exchange   rates
  getExchangeRates() {
    return instance.get(ApiConfig.getExchangeRatesList)
  }
  addExchangeRates(payload) {
    return instance.post(ApiConfig.addExchangeRates, payload)
  }
  editExchangeRates(payload) {
    return instance.post(ApiConfig.editExchangeRates, payload)
  }
  deleteExchangeRates(payload) {
    return instance.delete(ApiConfig.deleteExchangeRates, { params: { ...payload } })
  }

  // Tags
  getTags(payload) {
    return instance.get(ApiConfig.getTags, { params: { ...payload } })
  }
  addTags(payload) {
    return instance.post(ApiConfig.addTags, payload)
  }
  editTags(payload) {
    return instance.post(ApiConfig.editTags, payload)
  }
  globalUpdateTags(payload) {
    return instance.post(ApiConfig.globalUpdateTags, payload)
  }
  deleteTags(payload) {
    return instance.delete(ApiConfig.deleteTags, { params: { ...payload } })
  }
  masterSlugUpdate(payload) {
    return instance.post(ApiConfig.masterSlugUpdate, payload)
  }
  masterSlugDelete(payload) {
    return instance.post(ApiConfig.masterSlugDelete, payload)
  }
  BulkDeleteTags(payload) {
    return instance.post(ApiConfig.bulkDeleteTags, payload)
  }

  getSwatchesMaterialList(payload) {
    return instance.get(ApiConfig.getSwatchesMaterialList, { params: { ...payload } })
  }

  getRoles() {
    return instance.get(ApiConfig.getRole)
  }
}
export default new CommonServices()
