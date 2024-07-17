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

}

export default new LoginService()
