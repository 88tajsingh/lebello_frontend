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
    return instance.post(ApiConfig.editProjectCategory, payload)
  }
  deleteProjectCategory(payload) {
    return instance.delete(ApiConfig.deleteProjectCategory, { params: { ...payload } })
  }
  bulkDeleteProjectCategory(payload) {
    return instance.post(ApiConfig.bulkDeleteProjectCategory, payload)
  }
  deleteMasterProjectsCategory(payload) {
    return instance.post(ApiConfig.deleteMasterProjectsCategory, payload)
  }
  globalProjectsCategoryUpdate(payload) {
    return instance.post(ApiConfig.globalProjectsCategoryUpdate, payload)
  }
  masterProjectCategorysSlugUpdate(payload) {
    return instance.post(ApiConfig.masterProjectCategorysSlugUpdate, payload)
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
  deleteMasterProjects(payload) {
    return instance.post(ApiConfig.deleteMasterProjects, payload)
  }
  globalProjectsUpdate(payload) {
    return instance.post(ApiConfig.globalProjectsUpdate, payload)
  }
  masterProjectsSlugUpdate(payload) {
    return instance.post(ApiConfig.masterProjectsSlugUpdate, payload)
  }
}

export default new ProjectServices()
