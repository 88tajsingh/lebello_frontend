import instance from './instance'
import ApiConfig from '@/config/apiConfig'
class DesignerServices {
  getDesigners(payload) {
    return instance.get(ApiConfig.getDesigners, { params: { ...payload } })
  }
  addDesigners(payload) {
    return instance.post(ApiConfig.addDesigners, payload)
  }
  editDesigners(payload) {
    return instance.post(ApiConfig.editDesigners, payload)
  }
  deleteDesigners(payload) {
    return instance.delete(ApiConfig.deleteDesigners, { params: { ...payload } })
  }
  bulkDeleteDesigners(payload) {
    return instance.post(ApiConfig.bulkDeleteDesigners, payload)
  }

}
export default new DesignerServices()
