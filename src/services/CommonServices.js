import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class LoginService {

  logout() {
    return instance.post(ApiConfig.logout)
  }

}

export default new LoginService()
