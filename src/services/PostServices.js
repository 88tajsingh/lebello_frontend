import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class PostService {

  // Post
  getPost(payload) {
    return instance.get(ApiConfig.getPost, { params: { ...payload } })
  }
  addPost(payload) {
    return instance.post(ApiConfig.addPost, payload)
  }
  editPost(payload) {
    return instance.post(ApiConfig.editPost, payload)
  }
  deletePost(payload) {
    return instance.delete(ApiConfig.deletePost, { params: { ...payload } })
  }
  BulkDeletePost(payload) {
    return instance.post(ApiConfig.bulkDeletePost, payload)
  }
  masterDeletePost(payload) {
    return instance.post(ApiConfig.masterDeletePost, payload)
  }
  globalPostUpdate(payload) {
    return instance.post(ApiConfig.globalPostUpdate, payload)
  }
  masterPostSlugUpdate(payload) {
    return instance.post(ApiConfig.masterPostSlugUpdate, payload)
  }

  // Post Category
  getPostCategory(payload) {
    return instance.get(ApiConfig.getPostCategory, { params: { ...payload } })
  }
  getPostCategoryTreeList(payload) {
    return instance.get(ApiConfig.getPostCategoryTree, { params: { ...payload } })
  }
  addPostCategory(payload) {
    return instance.post(ApiConfig.addPostCategory, payload)
  }
  editPostCategory(payload) {
    return instance.post(ApiConfig.editPostCategory, payload)
  }
  deletePostCategory(payload) {
    return instance.delete(ApiConfig.deletePostCategory, { params: { ...payload } })
  }
  BulkDeletePostCategory(payload) {
    return instance.post(ApiConfig.bulkDeletePostCategory, payload)
  }
  deleteMasterPostCategory(payload) {
    return instance.post(ApiConfig.deleteMasterPostCategory, payload)
  }
  globalPostCategoryUpdate(payload) {
    return instance.post(ApiConfig.globalPostCategoryUpdate, payload)
  }
  masterPostCategorySlugUpdate(payload) {
    return instance.post(ApiConfig.masterPostCategorySlugUpdate, payload)
  }

 

 
}

export default new PostService()
