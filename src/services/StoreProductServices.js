import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class StoreProductService {
    getStoreProduct(payload) {
    return instance.get(ApiConfig.getStoreProduct, { params: { ...payload } })
  }
  addStoreProduct(payload) {
    return instance.post(ApiConfig.addStoreProduct, payload)
  }
  editStoreProduct(payload) {
    return instance.post(ApiConfig.editStoreProduct, payload)
  }
  deleteStoreProduct(payload) {
    return instance.delete(ApiConfig.deleteStoreProduct, { params: { ...payload } })
  }
  bulkDeleteStoreProduct(payload) {
    return instance.post(ApiConfig.bulkDeleteStoreProduct, payload)
  }
  masterSlugStoreProduct(payload) {
    return instance.post(ApiConfig.masterSlugStoreProduct, payload)
  }
  globalUpdateStoreProduct(payload) {
    return instance.post(ApiConfig.globalUpdateStoreProduct, payload)
  }
  masterDeleteStoreProduct(payload) {
    return instance.post(ApiConfig.masterDeleteStoreProduct, payload)
  }
}

export default new StoreProductService()
