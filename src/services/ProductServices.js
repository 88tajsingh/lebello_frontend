import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class ProductService {

  // product 
  getProduct(payload) {
  return instance.get(ApiConfig.getProduct, { params: { ...payload } })
  }
  addProduct(payload) {
    return instance.post(ApiConfig.addProduct, payload)
  }
  editProduct(payload) {
    return instance.post(ApiConfig.editProduct, payload)
  }
  deleteProduct(payload) {
    return instance.delete(ApiConfig.deleteProduct, { params: { ...payload } })
  }
  BulkDeleteProduct(payload) {
    return instance.post(ApiConfig.bulkDeleteProduct, payload)
  }
  masterSlugUpdateProduct(payload) {
    return instance.post(ApiConfig.masterSlugUpdateProduct, payload)
  }
  globalUpdateProduct(payload) {
    return instance.post(ApiConfig.globalUpdateProduct, payload)
  }
  mastetrDeleteProduct(payload) {
    return instance.post(ApiConfig.mastetrDeleteProduct,payload)
  }

  // product Types
  getProductType(payload) {
    return instance.get(ApiConfig.getProductType, { params: { ...payload } })
  }
  getProductTypeTreeList(payload) {
    return instance.get(ApiConfig.getProductTypeTreeList, { params: { ...payload } })
  }
  addProductType(payload) {
    return instance.post(ApiConfig.addProductType, payload)
  }
  editProductType(payload) {
    return instance.post(ApiConfig.editProductType, payload)
  }
  masterSlugUpdateProductType(payload) {
    return instance.post(ApiConfig.masterSlugUpdateProductType, payload)
  }
  globalUpdateProductType(payload) {
    return instance.post(ApiConfig.globalUpdateProductType, payload)
  }
  deleteProductType(payload) {
    return instance.delete(ApiConfig.deleteProductType, { params: { ...payload } })
  }
  mastetrDeleteProductType(payload) {
    return instance.post(ApiConfig.mastetrDeleteProductType,payload)
  }
  BulkDeleteProductType(payload) {
    return instance.post(ApiConfig.bulkDeleteProductType, payload)
  }

  // Product Category Types

  getProductCategoryType(payload) {
    return instance.get(ApiConfig.getProductCategoryType, { params: { ...payload } })
  }
  getProductCategoryTypeTreeList(payload) {
    return instance.get(ApiConfig.getProductCategoryTypeTreeList, { params: { ...payload } })
  }
  addProductCategoryType(payload) {
    return instance.post(ApiConfig.addProductCategoryType, payload)
  }
  editProductCategoryType(payload) {
    return instance.post(ApiConfig.editProductCategoryType, payload)
  }
  deleteProductCategoryType(payload) {
    return instance.delete(ApiConfig.deleteProductCategoryType, { params: { ...payload } })
  }
  BulkDeleteProductCategoryType(payload) {
    return instance.post(ApiConfig.bulkDeleteProductCategoryType, payload)
  }
  slugUpdateProductCategoryType(payload) {
    return instance.post(ApiConfig.slugUpdateProductCategoryType, payload)
  }
  deleteMasterProductCategoryType(payload) {
    return instance.post(ApiConfig.deleteMasterProductCategoryType, payload)
  }
  globalUpdateProductCategoryType(payload) {
    return instance.post(ApiConfig.globalUpdateMasterProductCategoryType, payload)
  }

  // Product Contract 

  getProductContract(payload) {
    return instance.get(ApiConfig.getProductContract, { params: { ...payload } })
  }
  getProductContractTreeList(payload) {
    return instance.get(ApiConfig.getProductContractTree, { params: { ...payload } })
  }
  addProductContract(payload) {
    return instance.post(ApiConfig.addProductContract, payload)
  }
  editProductContract(payload) {
    return instance.post(ApiConfig.editProductContract, payload)
  }
  deleteProductContract(payload) {
    return instance.delete(ApiConfig.deleteProductContract, { params: { ...payload } })
  }
  BulkDeleteProductContract(payload) {
    return instance.post(ApiConfig.bulkDeleteProductContract, payload)
  }
  deleteMasterProductContract(payload) {
    return instance.post(ApiConfig.deleteMasterProductContract, payload)
  }
  globalUpdateProductContract(payload) {
    return instance.post(ApiConfig.globalUpdateProductContract, payload)
  }
  masterSlugProductContract(payload) {
    return instance.post(ApiConfig.masterSlugProductContract, payload)
  }

  // Product Series 

  getProductSeries(payload) {
    return instance.get(ApiConfig.getProductSeries, { params: { ...payload } })
  }
  getProductSeriesTreeList(payload) {
    return instance.get(ApiConfig.getProductSeriesTree, { params: { ...payload } })
  }
  addProductSeries(payload) {
    return instance.post(ApiConfig.addProductSeries, payload)
  }
  editProductSeries(payload) {
    return instance.post(ApiConfig.editProductSeries, payload)
  }
  deleteProductSeries(payload) {
    return instance.delete(ApiConfig.deleteProductSeries, { params: { ...payload } })
  }
  BulkDeleteProductSeries(payload) {
    return instance.post(ApiConfig.bulkDeleteProductSeries, payload)
  }
  deleteMasterProductSeries(payload) {
    return instance.post(ApiConfig.deleteMasterProductSeries, payload)
  }
  globalProductSeriesUpdate(payload) {
    return instance.post(ApiConfig.globalProductSeriesUpdate, payload)
  }
  masterProductSeriesSlugUpdate(payload) {
    return instance.post(ApiConfig.masterProductSeriesSlugUpdate, payload)
  }
}

export default new ProductService()
