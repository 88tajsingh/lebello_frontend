import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class StoreService {

  // product category
  getStoreCategory(payload) {
    return instance.get(ApiConfig.getStoreCategory, { params: { ...payload } })
  }
  getStoreCategoryTreeList(payload) {
    return instance.get(ApiConfig.getStoreCategory, { params: { ...payload } })
  }
  addStoreCategory(payload) {
    return instance.post(ApiConfig.addStoreCategory, payload)
  }
  editStoreCategory(payload) {
    return instance.put(ApiConfig.editStoreCategory, payload)
  }
  deleteStoreCategory(payload) {
    return instance.delete(ApiConfig.deleteStoreCategory, { params: { ...payload } })
  }
  BulkDeleteStoreCategory(payload) {
    return instance.post(ApiConfig.bulkDeleteStoreCategory, payload)
  }

  // product 
  getStoreProduct(payload) {
    return instance.get(ApiConfig.getStoreProduct, { params: { ...payload } })
  }
  addStoreProduct(payload) {
    return instance.post(ApiConfig.addStoreProduct, payload)
  }
  editStoreProduct(payload) {
    return instance.put(ApiConfig.editStoreProduct, payload)
  }
  deleteStoreProduct(payload) {
    return instance.delete(ApiConfig.deleteStoreProduct, { params: { ...payload } })
  }
  BulkDeleteStoreProduct(payload) {
    return instance.post(ApiConfig.bulkDeleteStoreProduct, payload)
  }

 
}

export default new StoreService()
