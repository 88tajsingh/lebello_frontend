import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class CompanyServices {
  getCompany(payload) {
    return instance.get(ApiConfig.getCompany,{params: {...payload}})
  }

  addCompany(payload) {
    return instance.post(ApiConfig.addCompany, payload)
  }

  editCompany(payload) {
    return instance.post(ApiConfig.editCompany, payload)
  }
 
  deleteCompany(payload) {
    return instance.delete(ApiConfig.deleteCompany, {params: {...payload}})
  }

  bulkDeleteCompany(payload) {
    return instance.post(ApiConfig.bulkDeleteCompany, payload)
  }

}
export default new CompanyServices()
