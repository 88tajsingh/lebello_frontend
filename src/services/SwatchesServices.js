import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class Swatcheservices {
  getSwatches(payload) {
    return instance.get(ApiConfig.getSwatches,{params: {...payload}})
  }
  addSwatches(payload) {
    return instance.post(ApiConfig.addSwatches, payload)
  }
  editSwatches(payload) {
    return instance.post(ApiConfig.editSwatches, payload)
  }
  deleteSwatches(payload) {
    return instance.delete(ApiConfig.deleteSwatches, {params: {...payload}})
  }
  bulkDeleteSwatches(payload) {
    return instance.post(ApiConfig.bulkDeleteSwatches,payload)
  }
  swatchesSorting(payload) {
    return instance.post(ApiConfig.swatchesSorting,payload)
  }
  // deleteMaterial(payload) {
  //   return instance.get(`${ApiConfig.deleteMaterial}/id=${payload.id}`)
  // }
}

export default new Swatcheservices()
