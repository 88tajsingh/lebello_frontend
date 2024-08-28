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
    return instance.post(ApiConfig.editStoreCategory, payload)
  }
  deleteStoreCategory(payload) {
    return instance.delete(ApiConfig.deleteStoreCategory, { params: { ...payload } })
  }
  BulkDeleteStoreCategory(payload) {
    return instance.post(ApiConfig.bulkDeleteStoreCategory, payload)
  }
  masterProductCategorySlugUpdate(payload) {
    return instance.post(ApiConfig.masterProductCategorySlugUpdate, payload)
  }
  globalProductCategoryUpdate(payload) {
    return instance.post(ApiConfig.globalProductCategoryUpdate, payload)
  }
  deleteMasterProductCategory(payload) {
    return instance.post(ApiConfig.deleteMasterProductCategory, payload)
  }

  // product
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
  BulkDeleteStoreProduct(payload) {
    return instance.post(ApiConfig.bulkDeleteStoreProduct, payload)
  }
  masterDeleteStoreProduct(payload) {
    return instance.post(ApiConfig.masterDeleteStoreProduct, payload)
  }
  globalStoreProductUpdate(payload) {
    return instance.post(ApiConfig.globalStoreProductUpdate, payload)
  }
  masterStoreProductSlugUpdate(payload) {
    return instance.post(ApiConfig.masterStoreProductSlugUpdate, payload)
  }
}

export default new StoreService()
