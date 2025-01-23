import { useRouter } from 'vue-router'
import { showToast, getGlobalUpdateData } from '@/helper/functions'
import _ from 'lodash'

export function useGlobalUpdate(service, masterIdKey, key='global_keys') {
  const router = useRouter()

  const handleGlobalUpdate = async (form, checkedFields, redirectPath) => {
    const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value)
    if (_.isEmpty(globalUpdate)) return

    const payload = {
      [masterIdKey]: form.value[masterIdKey],
      [key]: globalUpdate
    }

    try {
      const { status, data } = await service(payload)
      status === 200 && data.success 
        ? showToast(`${data.message} custom`, 'success') 
        : showToast(data.message, 'error')
      
      if (status === 200 && data.success) {
        router.push(redirectPath)
      }
    }  catch (error) {
        showToast('Something went wrong', 'error')
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error)
    }
  }

  return {
    handleGlobalUpdate
  }
}
