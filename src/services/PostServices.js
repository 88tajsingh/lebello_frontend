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
    return instance.put(ApiConfig.editPost, payload)
  }
  deletePost(payload) {
    return instance.delete(ApiConfig.deletePost, { params: { ...payload } })
  }
  BulkDeletePost(payload) {
    return instance.post(ApiConfig.bulkDeletePost, payload)
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

 

 
}

export default new PostService()
