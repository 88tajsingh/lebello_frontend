import instance from './MediaInstance'
import ApiConfig from '@/config/apiConfig'

class MediaAndFoldersService {
  // media instances
  GetMedia () {
    return instance.get(ApiConfig.getMedia)
  }
  GetMediaChild(payload) {
    return instance.get(ApiConfig.getMediaChild, {params: {...payload}})
  }
  addBulkMedia(payload) {
    return instance.post(ApiConfig.addBulkMedia,payload)
  }
  EditMedia(payload) {
    return instance.post(ApiConfig.editMedia,payload)
  }
  DeleteMedia(payload) {
    return instance.delete(ApiConfig.deleteMedia, {params: {...payload}})
  }

  // folder instances methods
  GetFolder() {
    return instance.get(ApiConfig.getFolder)
  }
  GetFolderChild(payload) {
    return instance.get(ApiConfig.getFolderChild, {params: {...payload}})
  }
  AddFolder(payload) {
    return instance.post(ApiConfig.addFolder,payload)
  }
  EditFolder(payload) {
    return instance.put(ApiConfig.editFolder,null,{params: {...payload}})
  }
  DeleteFolder(payload) {
    return instance.delete(ApiConfig.deleteFolder, {params: {...payload}})
  }

}

export default new MediaAndFoldersService()
