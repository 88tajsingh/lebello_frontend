import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class ContractDesignService {
  getProductFeature(payload) {
    return instance.get(ApiConfig.getProductFeature,{params: {...payload}})
  }
  getNewContract(payload) {
    return instance.get(ApiConfig.getNewContract,{params: {...payload}})
  }

  addNewContract(payload) {
    return instance.post(ApiConfig.addNewContract, payload)
  }

  editNewContract(payload) {
    return instance.post(ApiConfig.editNewContract, payload)
  }
 
  deleteNewContract(payload) {
    return instance.delete(ApiConfig.deleteNewContract, {params: {...payload}})
  }

  BulkDeleteNewContract(payload) {
    return instance.post(ApiConfig.bulkNewContract, payload)
  }

  deleteMasterContractDesign(payload) {
    return instance.post(ApiConfig.deleteMasterContractDesign, payload)
  }
  
  globalContractDesignUpdate(payload) {
    return instance.post(ApiConfig.globalContractDesignUpdate, payload)
  }

  masterContractDesignSlugUpdate(payload) {
    return instance.post(ApiConfig.masterContractDesignSlugUpdate, payload)
  }

  // contract type services

  getContractType(payload) {
    return instance.get(ApiConfig.getContract,{params: {...payload}})
  }
  getAllContractType(payload) {
    return instance.get(ApiConfig.getContractTreeList,{params: {...payload}})
  }

  addContractType(payload) {
    return instance.post(ApiConfig.addContract, payload)
  }

  editContractType(payload) {
    return instance.post(ApiConfig.editContract, payload)
  }
 
  deleteContractType(payload) {
    return instance.delete(ApiConfig.deleteContract, {params: {...payload}})
  }
  taxonomySortContractType(payload) {
    return instance.delete(ApiConfig.contractTaxonomySort,payload)
  }

  BulkDeleteContractType(payload) {
    return instance.post(ApiConfig.bulkDeletecontract, payload)
  }
  
  deleteMasterContractType(payload) {
    return instance.post(ApiConfig.deleteMasterContractType, payload)
  }

  globalContractTypeUpdate(payload) {
    return instance.post(ApiConfig.globalContractTypeUpdate, payload)
  }
  masterContractTypeSlugUpdate(payload) {
    return instance.post(ApiConfig.masterContractTypeSlugUpdate, payload)
  }


  // Contract location
  getContractLocation(payload) {
    return instance.get(ApiConfig.getContractLocation,{params: {...payload}})
  }
  getAllContractLocation(payload) {
    return instance.get(ApiConfig.getContractLocationTreeList ,{params: {...payload}})
  }

  addContractLocation(payload) {
    return instance.post(ApiConfig.addContractLocation, payload)
  }

  editContractLocation(payload) {
    return instance.post(ApiConfig.editContractLocation, payload)
  }
 
  deleteContractLocation(payload) {
    return instance.delete(ApiConfig.deleteContractLocation, {params: {...payload}})
  }
  taxonomySortContractLocation(payload) {
    return instance.delete(ApiConfig.contractTaxonomySort,payload)
  }

  BulkDeleteContractLocation(payload) {
    return instance.post(ApiConfig.bulkDeleteLocation, payload)
  }

  deleteMasterContractLocation(payload) {
    return instance.post(ApiConfig.deleteMasterContractLocation, payload)
  }

  masterContractLocationSlugUpdate(payload) {
    return instance.post(ApiConfig.masterContractLocationSlugUpdate, payload)
  }
  globalContractLocationUpdate(payload) {
    return instance.post(ApiConfig.globalContractLocationUpdate, payload)
  }
}

export default new ContractDesignService()
