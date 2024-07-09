import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class Pageservices {

  getPages() {
    return instance.get(ApiConfig.getPages)
  }
  addPages(payload) {
      console.log("Added material", payload)
    return instance.post(ApiConfig.addPages, payload)
  }
  editPages(payload) {
    return instance.post(ApiConfig.editPages, payload)
  }
  deletePages(payload) {
    return instance.delete(ApiConfig.deletePages, {params: {...payload}})
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
