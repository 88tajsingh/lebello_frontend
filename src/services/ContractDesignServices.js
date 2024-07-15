import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class ContractDesignService {

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
}

export default new ContractDesignService()
