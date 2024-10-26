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

 
}

export default new PublicServices()

