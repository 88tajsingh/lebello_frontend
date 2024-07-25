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

 
}

export default new StoreService()
