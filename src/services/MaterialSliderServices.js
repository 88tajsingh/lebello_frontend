import instance from './instance'
import ApiConfig from '@/config/apiConfig'

class MaterialSliderServices {
  getMaterialSliders(payload) {
    return instance.get(ApiConfig.getMaterialSliders, { params: { ...payload } })
  }

  addMaterialSlider(payload) {
    return instance.post(ApiConfig.addMaterialSlider, payload)
  }

  editMaterialSlider(payload) {
    return instance.post(ApiConfig.editMaterialSlider, payload)
  }

  deleteMaterialSlider(payload) {
    return instance.delete(ApiConfig.deleteMaterialSlider, { params: { ...payload } })
  }

  bulkDeleteMaterialSlider(payload) {
    return instance.post(ApiConfig.bulkDeleteMaterialSlider, payload)
  }
}
export default new MaterialSliderServices()
