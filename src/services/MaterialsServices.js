import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class MaterialServices {

  getMaterials(payload) {
    return instance.get(ApiConfig.getMaterial,{params: {...payload}})
  }
  addMaterial(payload) {
    return instance.post(ApiConfig.addMaterial, payload)
  }
  editMaterial(payload) {
    return instance.post(ApiConfig.editMaterial, payload)
  }
  masterMaterialSlugUpdate(payload) {
    return instance.post(ApiConfig.masterMaterialSlugUpdate, payload)
  }
  globalMaterialUpdate(payload) {
    return instance.post(ApiConfig.globalMaterialUpdate, payload)
  }
  deleteMasterMaterial(payload) {
    return instance.post(ApiConfig.deleteMasterMaterial, payload)
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
  MaterialTreeList(payload) {
    return instance.get(ApiConfig.getMaterialTeeeList,{params: {...payload}})
  }
  // deleteMaterial(payload) {
  //   return instance.get(`${ApiConfig.deleteMaterial}/id=${payload.id}`)
  // }
}

export default new MaterialServices()
