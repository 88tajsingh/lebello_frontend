import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class Swatcheservices {

  getSwatches() {
    return instance.get(ApiConfig.getSwatches)
  }
  addSwatches(payload) {
      console.log("Added material", payload)
    return instance.post(ApiConfig.addSwatches, payload)
  }
  editSwatches(payload) {
    return instance.post(ApiConfig.editSwatches, payload)
  }
  deleteSwatches(payload) {
    return instance.delete(ApiConfig.deleteSwatches, {params: {...payload}})
  }
  // deleteMaterial(payload) {
  //   return instance.get(`${ApiConfig.deleteMaterial}/id=${payload.id}`)
  // }
}

export default new Swatcheservices()
