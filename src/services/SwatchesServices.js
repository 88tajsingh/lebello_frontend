import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class Swatcheservices {
  getSwatches(payload) {
    return instance.get(ApiConfig.getSwatches,{params: {...payload}})
  }
  addSwatches(payload) {
    return instance.post(ApiConfig.addSwatches, payload)
  }
  editSwatches(payload) {
    return instance.post(ApiConfig.editSwatches, payload)
  }
  deleteSwatches(payload) {
    return instance.delete(ApiConfig.deleteSwatches, {params: {...payload}})
  }
  bulkDeleteSwatches(payload) {
    return instance.post(ApiConfig.bulkDeleteSwatches,payload)
  }
  swatchesSorting(payload) {
    return instance.post(ApiConfig.swatchesSorting,payload)
  }
  deleteMasterSwatch(payload) {
    return instance.post(ApiConfig.deleteMasterSwatch,payload)
  }
  globalSwatchDataUpdate(payload) {
    return instance.post(ApiConfig.globalSwatchDataUpdate,payload)
  }
  masterSwatchesSlugUpdate(payload) {
    return instance.post(ApiConfig.masterSwatchesSlugUpdate,payload)
  }
 
}

export default new Swatcheservices()
