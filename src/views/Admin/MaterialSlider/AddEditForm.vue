<template>
  <DefaultCard :cardTitle="form.id ? `Edit Material Slider` : `Add Material Slider`">
    <DomainComponent @customChange="(id) => (form.domain_id = id)"
      :deleteService="MaterialSliderServices.deleteMaterialSlider" masterKey="master_material_slider_id"
      :masterDeleteService="MaterialSliderServices.masterDeleteMaterialSlider" routeTo="store-product" />
    <template v-if="form.id" v-slot:header>
      <MasterSlugForm :form="form" @update-slug="() => fetchMaterialSliderData()"
        :SlugUpdateservices="MaterialSliderServices.masterMaterialSliderSlugUpdate"
        masteridKeyName="master_material_slider_id" />
    </template>
    <form @submit.prevent="handleSubmit" class="mb-5 m-5">
      <div class="grid grid-cols-12 gap-4 mt-5">
        <div class="col-span-8">
          <Accordion :open="true" header="Fileds">
            <div class="px-6">
              <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title *" placeholder="Add title"
                v-model="form.title" :errMessage="errors.title" :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => {
                    checkedFields.title = value
                  }
                  " :errors="errors" @update:modelValue="$clearError(errors, 'title')" />
              <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug (Read Only)" placeholder="Add title"
                v-model="form.slug" :errMessage="errors.slug" :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => {
                    checkedFields.slug = value
                  }
                  " :errors="errors" disabled />
            </div>
          </Accordion>
        </div>
        <div class="col-span-4">
          <div class="mt-4">
            <Accordion header="Publish" open="false">
              <div class="px-1 py-3">
                <div class="px-4">
                  <div class="flex flex-col">
                    <InputLabel for="status" value="Status" />
                    <Select :options="statusData" showfield="name" class="w-full" valueField="value" label="Select "
                      v-model="form.status" :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => {
                          checkedFields.status = value }"
                           :errorClass='errors.status' :errMessage="errors.status"
                      @update:modelValue="$clearError(errors, 'status')" />
                  </div>
                </div>
              </div>
              <div class="bg-[#f6f7f7] flex py-3">
                <Button type="submit" bg_th_color="text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                  class="text-sm ml-auto px-3 py-2">
                  {{ buttonText }}
                </Button>
              </div>
            </Accordion>
          </div>

          <div class="mt-4">
            <div class="mr-2 mt-3 h-auto">
              <div class="h-auto">
                <InputLabel for="featured_image" value="Featured Image" />
                <div class="flex w-full h-auto">
                  <SingleCheck v-if="form.id" label="" v-model="checkedFields.media_id"></SingleCheck>
                  <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                    @click="() => (imageData.featured_image.isOpen = true)">
                    {{ imageData.featured_image.mediaName }}
                  </div>
                </div>

                <div class="mt-3 flex overflow-x-auto">
                  <img v-for="file in imageData.featured_image.images" :key="file" :src="$filePath(file?.file_url)"
                    class="inline-block w-auto h-34 mr-4" :alt="file?.alternative_text || ''" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </DefaultCard>
  <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
    v-model:isOpen="imageData.featured_image.isOpen">
    <GetLibrary btnName="select File" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
      :closeModal="() => {
          imageData.featured_image.isOpen = false
        }
        " :selectedFiles="handleFeaturedImageFiles" />
  </popupModal>

  <Loader :isLoading="loading" :fullPage="true" />
</template>
<script setup>
import _ from 'lodash'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, onMounted, watch, computed } from 'vue'
import { showToast, handleFileUpdate, getGlobalUpdateData } from '@/helper/functions'
import { PublishOptions, statusData } from '@/json/data'
import Accordion from '@/components/Admin-components/Accordion.vue'
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import MaterialSliderServices from '@/services/MaterialSliderServices.js'

// store and router
const store = useStore()
const router = useRouter()

// reactive state
const errors = ref({})
const loading = ref(false)
const form = ref(store.getters.editData || { status: '1', visibility: '' })
const checkedFields = ref({})
const checkBoxFlag = ref(Boolean(form.value.id))

const imageData = ref({
  featured_image: { isOpen: false, mediaName: 'Featured Image', images: [] }
})

const handleFeaturedImageFiles = (data) =>
  handleFileUpdate('featured_image', data, imageData, form, false)

// Form Validation
const validateForm = () => {
  errors.value = {}
  if (!form.value.title) {
    errors.value.title = 'Title is required'
    return false
  }
  if(form.value.status=== null || form.value.status=== undefined || form.value.status=== ''){
    errors.value.status = 'Status is required'
    return false
  }
  return true
}

// Submit Handler
const handleSubmit = async () => {
  if (!validateForm()) return
  const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)

  loading.value = true
  try {
    const action = store.getters.editData
      ? MaterialSliderServices.editMaterialSlider
      : MaterialSliderServices.addMaterialSlider
    const {
      deleted_at,
      domain,
      created_at,
      slug,
      domains_data,
      default_domain,
      featured_image_url,
      updated_at,
      ...payload
    } = form.value
    if (!form.value?.domains_data?.includes(form.value.domain_id)) {
      delete payload.id
    }
    const res = await action({ ...payload })
    if (res.status === 200 && res.data.success) {
      if (hasCheckedFields) {
        handleGlobalUpdate()
      } else {
        showToast(res.data.message, 'success')
        router.push('/material-slider')
      }
    }
    if (res.status === 400 || res.status === 403) showToast(res.data.message, 'error')
  } catch (e) {
    console.error(
      `Error while ${store.getters.editData ? 'editing' : 'adding'} Material Sliders:`,
      e
    )
  } finally {
    loading.value = false
  }
}

// Global Update Handler
const handleGlobalUpdate = async () => {
  const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value)
  if (_.isEmpty(globalUpdate)) return

  const payload = {
    master_material_slider_id: form.value.master_material_slider_id,
    global_keys: globalUpdate
  }

  try {
    const { status, data } = await MaterialSliderServices.globalMaterialSliderUpdate(payload)
    status === 200 && data.success
      ? showToast(data.message, 'success')
      : showToast(data.message, 'error')
    if (status === 200 && data.success) router.push('/material-slider')
  } catch (error) {
    showToast('Something went wrong', 'error')
    console.error(
      `Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`,
      error
    )
  } finally {
    loading.value = false
  }
}

// Fetch Perticular Domain Data
const fetchMaterialSliderData = async () => {
  loading.value = true
  const payload = {
    master_material_slider_id: form.value.master_material_slider_id,
    domain_id: form.value.domain_id
  }
  try {
    const { status, data } = await MaterialSliderServices.getMaterialSliders(payload)
    if (status === 200 && data.success) {
      const dataValue = data.data[0]
      store.dispatch('setEdit', dataValue)
      Object.assign(form.value, dataValue)
    }
  } catch (error) {
    showToast('Something went wrong', 'error')
    console.error('Error while fetching data:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle Hooks
onMounted(() => {
  if (store.getters.editData) {
    const { featured_image_url } = store.getters.editData
    imageData.value.featured_image.images = [featured_image_url]
    imageData.value.featured_image.mediaName = featured_image_url?.file_url
  }
})

watch(
  () => form.value.domain_id,
  (newDomainId) => {
    // Check if newDomainId is present in domains_data and fetch
    if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
      fetchMaterialSliderData()
    } 
  }
)

// Computed Property
const buttonText = computed(() => {
  return form.value.id ? 'Update' : 'Submit'
})
</script>
<style scoped></style>
