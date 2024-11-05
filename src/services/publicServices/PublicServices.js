import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class PublicServices {

  getDomainData() {
    return instance.get(ApiConfig.getDomain, { params: {name:import.meta.env.VITE_DOMAIN} })
  }
  getLandingPageData(payload) {
    return instance.get(ApiConfig.getLandingPageData, { params: {domain_id:payload} })
  }
  getContractDesign(payload) {
    return instance.get(ApiConfig.getContractDesign, { params: {domain_id:payload} })
  }

  contractDesign(id,payload) {
    return instance.get(ApiConfig.contractDesign, { params: {domain_id:id,id:payload}, })
  }
  contractType(id,payload) {
    return instance.get(ApiConfig.contractType, { params: {domain_id:id,id:payload}, })
  }
  contractLocation(id,payload) {
    return instance.get(ApiConfig.contractLocation, { params: {domain_id:id,id:payload}, })
  }
 
}

export default new PublicServices()

