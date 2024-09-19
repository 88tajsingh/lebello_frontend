import instance from './instance'
import ApiConfig from '@/config/apiConfig'
class Pageservices {

  getPages(payload) {
    return instance.get(ApiConfig.getPages,{params: {...payload}})
  }
  addPages(payload) {
    return instance.post(ApiConfig.addPages, payload)
  }
  editPages(payload) {
    return instance.post(ApiConfig.editPages, payload,)
  }
  globalPageUpdate(payload) {
    return instance.post(ApiConfig.globalPageUpdate, payload,)
  }
  deletePageMaster(payload) {
    return instance.post(ApiConfig.deletePageMaster, payload,)
  }
  masterPageSlugUpdate(payload) {
    return instance.post(ApiConfig.masterPageSlugUpdate, payload,)
  }
  deletePages(payload) {
    return instance.delete(ApiConfig.deletePages, {params: {...payload}})
  }
  bulkDeletePages(payload) {
    return instance.post(ApiConfig.bulkDeletePages,payload)
  }
  bulkDeletePages(payload) {
    return instance.post(ApiConfig.bulkDeletePages,payload)
  }
  PagesSorting(payload) {
    return instance.post(ApiConfig.PagesSorting,payload)
  }
  // deleteMaterial(payload) {
  //   return instance.get(`${ApiConfig.deleteMaterial}/id=${payload.id}`)
  // }
}

export default new Pageservices()
