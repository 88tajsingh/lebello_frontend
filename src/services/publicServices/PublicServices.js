import instance from './instance.js'
import ApiConfig from '../../config/apiConfig.js'

class PublicServices {
  async getDomainData() {
    let domainName
    if (typeof process !== 'undefined' && process.env) {
      // Server-side code
      domainName = process.env.VITE_DOMAIN
    } else {
      // Client-side code
      domainName = import.meta.env.VITE_DOMAIN
    }
    try {
      const response = await instance.get(ApiConfig.getDomain, { params: { name: domainName } })
      return response
    } catch (error) {
      console.error('Error fetching domain data:', error)
      return { status: error.response?.status, data: error.response?.data }
    }
  }
 
  getLandingPageData(payload) {
    return instance.get(ApiConfig.getLandingPageData, { params: {domain_id:payload} })
  }
  getContractDesign(payload) {
    return instance.get(ApiConfig.getContractDesign, { params: {domain_id:payload} })
  }

  contractDesign(id,payload) {
    return instance.get(ApiConfig.contractDesign, { params: {domain_id:id,slug:payload}, })
  }
  swatchDetail(id,payload) {
    return instance.get(ApiConfig.frontend_swatch_Detail, { params: {domain_id:id,slug:payload}, })
  }
  contractType(id,payload) {
    return instance.get(ApiConfig.contractType, { params: {domain_id:id,slug:payload}, })
  }
  contractLocation(id,payload) {
    return instance.get(ApiConfig.contractLocation, { params: {domain_id:id,slug:payload}, })
  }

  product_list(id) {
    return instance.get(ApiConfig.product_list, { params: {domain_id:id}, })
  }
  productSeriesList(id,payload) {
    return instance.get(ApiConfig.product_series_list, { params:{domain_id:id,slug:payload} })
  }
  productTypeList(id,payload) {
    return instance.get(ApiConfig.product_Type_list, { params:{domain_id:id,slug:payload} })
  }
  productDetail(id,payload) {
    return instance.get(ApiConfig.product_Detail, { params:{domain_id:id,slug:payload} })
  }

  frontendSwatchList(id) {
    return instance.get(ApiConfig.frontend_swatch_list, { params: {domain_id:id}, })
  }
  globalSearch(id,payload) {
    return instance.get(ApiConfig.globalSearch, { params: {domain_id:id,search:payload} })
  }
 
}

export default new PublicServices()

