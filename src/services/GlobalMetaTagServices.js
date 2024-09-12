import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class GlobalMetaTags {
  // Post
  getMetaTags(payload) {
    return instance.get(ApiConfig.getMetaTags, { params: { ...payload } })
  }
  addMetaTags(payload) {
    return instance.post(ApiConfig.addMetaTags, payload)
  }
  editMetaTags(payload) {
    return instance.post(ApiConfig.editMetaTags, payload)
  }
  deleteMetaTags(payload) {
    return instance.delete(ApiConfig.deleteMetaTags, { params: { ...payload } })
  }
  bulkDeleteMetaTags(payload) {
    return instance.post(ApiConfig.bulkDeleteMetaTags, payload)
  }
}

export default new GlobalMetaTags()
