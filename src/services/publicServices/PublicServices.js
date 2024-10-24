import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class PublicServices {

  getHomeSlider(payload) {
    return instance.get(ApiConfig.getHomeSlider,)
  }
 
}

export default new PublicServices()

