import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class LoginService {

  logout() {
    return instance.post(ApiConfig.logout)
  }
  MaterialTreeList() {
    return instance.get(ApiConfig.getMaterialTeeeList)
  }
  MaterialTreeList() {
    return instance.get(ApiConfig.getMaterialTeeeList)
  }
  updateProfile(payload) {
    return instance.put(ApiConfig.updateProfile , null, payload)
  }
  taxonomySorting(payload) {
    return instance.post(ApiConfig.taxonomySort, payload)
  }
  allCountrys(payload) {
    return instance.get(ApiConfig.getAllCountries, payload)
  }
  getCountries(payload) {
    return instance.get(ApiConfig.getCountries, payload)
  }
  getDomains(payload) {
    return instance.get(ApiConfig.getDomains, payload)
  }
  addDomains(payload) {
    return instance.post(ApiConfig.addDomains, payload)
  }
  deleteDomains(payload) {
    return instance.delete(ApiConfig.deleteDomains, {params: {...payload}})
  }

}
export default new LoginService()
