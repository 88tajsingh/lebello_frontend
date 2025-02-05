import { inject, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useExtraData() {
  const extraData = ref(inject('extraData', {}))

  onMounted(() => {
    if (typeof window !== 'undefined' && window.__EXTRA_DATA__) {
      extraData.value = window.__EXTRA_DATA__
    }
  })

  const route = useRoute()
  watch(
    () => route.path, 
    () => {
      if (typeof window !== 'undefined' && window.__EXTRA_DATA__) {
        extraData.value = window.__EXTRA_DATA__ 
      }
    }
  )
  return {
    extraData
  }
}
