import instance from './instance'
import ApiConfig from '@/config/apiConfig'
class ProjectServices {

  getProjectCategory(payload) {
    return instance.get(ApiConfig.getProjectCategory,{params: {...payload}})
  }
  getProjectCategoryTree(payload) {
    return instance.get(ApiConfig.getProjectCategorytree,{params: {...payload}})
  }
  addProjectCategory(payload) {
    return instance.post(ApiConfig.addProjectCategory, payload)
  }
  editProjectCategory(payload) {
    return instance.put(ApiConfig.editProjectCategory, payload,)
  }
  deleteProjectCategory(payload) {
    return instance.delete(ApiConfig.deleteProjectCategory, {params: {...payload}})
  }
  bulkDeleteProjectCategory(payload) {
    return instance.post(ApiConfig.bulkDeleteProjectCategory,payload)
  }
 

}

export default new ProjectServices()
