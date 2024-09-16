import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class UserServices {
  getUser(payload) {
    return instance.get(ApiConfig.getUser, { params: { ...payload } })
  }
  addUser(payload) {
    return instance.post(ApiConfig.addUser, payload)
  }
  editUser(payload) {
    return instance.post(ApiConfig.editUser, payload)
  }
  statusUser(payload) {
    return instance.patch(ApiConfig.statusUser, { params: { ...payload } })
  }
}

export default new UserServices()
