import instance from './instance'
import ApiConfig from '@/config/apiConfig'
class ProjectServices {
  
  getProjectCategory(payload) {
    return instance.get(ApiConfig.getProjectCategory, { params: { ...payload } })
  }
  getProjectCategoryTree(payload) {
    return instance.get(ApiConfig.getProjectCategorytree, { params: { ...payload } })
  }
  addProjectCategory(payload) {
    return instance.post(ApiConfig.addProjectCategory, payload)
  }
  editProjectCategory(payload) {
    return instance.put(ApiConfig.editProjectCategory, payload)
  }
  deleteProjectCategory(payload) {
    return instance.delete(ApiConfig.deleteProjectCategory, { params: { ...payload } })
  }
  bulkDeleteProjectCategory(payload) {
    return instance.post(ApiConfig.bulkDeleteProjectCategory, payload)
  }

  // Project Variables
  getProjects(payload) {
    return instance.get(ApiConfig.getProjects, { params: { ...payload } })
  }
  addProjects(payload) {
    return instance.post(ApiConfig.addProjects, payload)
  }
  editProjects(payload) {
    return instance.post(ApiConfig.editProjects, payload)
  }
  deleteProjects(payload) {
    return instance.delete(ApiConfig.deleteProjects, { params: { ...payload } })
  }
  bulkDeleteProjects(payload) {
    return instance.post(ApiConfig.bulkDeleteProjects, payload)
  }
}

export default new ProjectServices()
