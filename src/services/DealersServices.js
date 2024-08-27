import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class DealerServices {
  getDealer(payload) {
    return instance.get(ApiConfig.getDealer,{params: {...payload}})
  }

  addDealer(payload) {
    return instance.post(ApiConfig.addDealer, payload)
  }

  editDealer(payload) {
    return instance.post(ApiConfig.editDealer, payload)
  }
 
  deleteDealer(payload) {
    return instance.delete(ApiConfig.deleteDealer, {params: {...payload}})
  }

  BulkDeleteDealer(payload) {
    return instance.post(ApiConfig.bulkDeleteDealer, payload)
  }
  deleteMasterDealer(payload) {
    return instance.post(ApiConfig.deleteMasterDealer, payload)
  }
  globalDealerUpdate(payload) {
    return instance.post(ApiConfig.globalDealerUpdate, payload)
  }
  masterSlugDealerUpdate(payload) {
    return instance.post(ApiConfig.masterSlugDealerUpdate, payload)
  }

}
export default new DealerServices()
