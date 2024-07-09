import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class LoginService {

  getMaterials() {
    return instance.get(ApiConfig.getMaterial)
  }
  addMaterial(payload) {
      console.log("Added material", payload)
    return instance.post(ApiConfig.addMaterial, payload)
  }
  editMaterial(payload) {
    return instance.post(ApiConfig.editMaterial, payload)
  }
 
  deleteMaterial(payload) {
    return instance.delete(ApiConfig.deleteMaterial, {params: {...payload}})
  }

  BulkDeleteMaterial(payload) {
    return instance.post(ApiConfig.bulkDeleteMaterial, payload)
  }
  taxonomySorting(payload) {
    return instance.post(ApiConfig.taxonomySort, payload)
  }
  // deleteMaterial(payload) {
  //   return instance.get(`${ApiConfig.deleteMaterial}/id=${payload.id}`)
  // }
}

export default new LoginService()
