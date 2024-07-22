import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class LoginService {

  logout() {
    return instance.post(ApiConfig.logout)
  }
  MaterialTreeList() {
    return instance.get(ApiConfig.getMaterialTeeeList)
  }

  updateProfile(payload) {
    return instance.put(ApiConfig.updateProfile , null, payload)
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
    return instance.delete(ApiConfig.deleteDomains, {params: {...payload}})
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
    return instance.post(ApiConfig.editExchangeRates, payload,)
  }
  deleteExchangeRates(payload) {
    return instance.delete(ApiConfig.deleteExchangeRates, {params: {...payload}})
  }
}
export default new LoginService()
