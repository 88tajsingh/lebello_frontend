import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class HomeSliderServices {

  getHomeSlider(payload) {
    return instance.get(ApiConfig.getHomeSlider,{params: {...payload}})
  }
  addHomeSlider(payload) {
    return instance.post(ApiConfig.addHomeSlider, payload)
  }
  editHomeSlider(payload) {
    return instance.post(ApiConfig.editHomeSlider, payload)
  }
 
  deleteHomeSlider(payload) {
    return instance.delete(ApiConfig.deleteHomeSlider, {params: {...payload}})
  }

  BulkDeleteHomeSlider(payload) {
    return instance.post(ApiConfig.bulkDeleteHomeSlider, payload)
  }
  deleteMasterHomeSlider(payload) {
    return instance.post(ApiConfig.DeleteMasterHomeSlider, payload)
  }
  globalHomeSliderUpdate(payload) {
    return instance.post(ApiConfig.globalHomeSliderUpdate, payload)
  }
  masterHomeSliderSlugUpdate(payload) {
    return instance.post(ApiConfig.masterHomeSliderSlugUpdate, payload)
  }
  
}

export default new HomeSliderServices()
