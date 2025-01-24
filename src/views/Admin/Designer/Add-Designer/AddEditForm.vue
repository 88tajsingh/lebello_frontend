<template>
  <DefaultCard :cardTitle="form.id ? `Edit Designer` : `Add New Designer`">
    <DomainComponent @customChange="(id) => (form.domain_id = id)" @domainArray="(array) => form.domain_all = array" :deleteService="DesignerServices.deleteDesigners"
      masterKey="master_designer_id" :masterDeleteService="DesignerServices.deleteMasterDesigners" routeTo="designer" />

    <template v-if="form.id" v-slot:header>
      <MasterSlugForm :form="form" @update-slug="() => fetchDesignerData()"
        :SlugUpdateservices="DesignerServices.masterDesignersSlugUpdate" masteridKeyName="master_designer_id" />
    </template>

    <form @submit.prevent="handleSubmit" class="mb-5 m-5">
      <div class="grid grid-cols-12 gap-4 mt-5">
        <div class="col-span-8">
          <Accordion :open="true" header="Fileds">
            <div class="px-6">
              <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title *" placeholder="Add title"
                v-model="form.title" :errMessage="errors.title" @update:modelValue="$clearError(errors, 'title')"
                :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => {
                    checkedFields.title = value
                  }
                  " />

              <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug" placeholder="slug (Read Only)"
                v-model="form.slug" disabled="true" />

              <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Product Url" placeholder=""
                v-model="form.product_url" :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => {
                    checkedFields.product_url = value
                  }
                  " />

              <div class="mr-2 mt-5 h-auto">
                <InputLabel for="Featured_image" value="Featured Image" />
                <div class="flex w-full h-auto">
                  <SingleCheck v-if="form.id" label="" v-model="checkedFields.media_id"></SingleCheck>
                  <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                    @click="() => (imageData.product_image.isOpen = true)">
                    {{ imageData.product_image.mediaName }}
                  </div>
                </div>
                <div class="mt-3 flex overflow-x-auto">
                  <img v-if="imageData.product_image.images[0]" v-for="file in imageData.product_image.images"
                    :key="file" :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                    :alt="file?.alternative_text || 'Img'" />
                </div>
              </div>
            </div>
          </Accordion>

          <div class="mt-5">
            <Accordion :open="true" header="Description">
              <div class="px-5 pt-2">
                <TinyMCE v-model="form.description" />
              </div>
            </Accordion>
          </div>
        </div>

        <div class="col-span-4">
          <Accordion header="Publish" open="false">
            <div class="px-1 py-3">
              <div class="px-4">
                <div class="flex flex-col">
                  <InputLabel for="status" value="Status" />
                  <Select :options="statusData" showfield="name" class="w-full" valueField="value" label="Select "
                    v-model="form.status" :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => {
                        checkedFields.status = value
                      }
                      " />
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

          <div class="mt-3">
            <Accordion :open="true" header="Tags">
              <div class="mt-2 px-6 flex h-auto">
                <Checkbox :nexted="true" :checkedData="form.tags" :dropdown="true" valueField="id" showField="name"
                  :data="TagsData" @checked-items="(checked) => (form.tags = checked)" />
              </div>
            </Accordion>
          </div>

          <div class="mt-3">
            <Accordion :open="true" header="Product Category Type">
              <div class="mt-2 px-6 flex h-auto">
                <Checkbox :nexted="true" :checkedData="form.product_category_types" :dropdown="true" valueField="id"
                  showField="name" :data="ProductCategory"
                  @checked-items="(checked) => (form.product_category_types = checked)" />
              </div>
            </Accordion>
          </div>

          <div class="mt-3">
            <Accordion :open="true" header="Product Type">
              <div class="mt-2 px-6 flex h-auto">
                <Checkbox :nexted="true" :checkedData="form.product_types" :dropdown="true" valueField="id"
                  showField="name" :data="productType" @checked-items="(checked) => (form.product_types = checked)" />
              </div>
            </Accordion>
          </div>

          <div class="mt-4">
            <Accordion :open="true" header="Featured image">
              <div class="px-6 h-auto">
                <InputLabel for="Featured_image" value="Featured_image" />
                <div class="flex w-full h-auto">
                  <SingleCheck v-if="form.id" label="" v-model="checkedFields.media_id"></SingleCheck>
                  <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                    @click="() => (imageData.featured_image.isOpen = true)">
                    {{ imageData.featured_image.mediaName }}
                  </div>
                </div>
                <div class="mt-3 flex overflow-x-auto">
                  <img v-if="imageData.featured_image.images[0]" v-for="file in imageData.featured_image.images"
                    :key="file" :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                    :alt="file?.alternative_text || 'img'" />
                </div>
                <InputError class="mt-2" :message="errors?.featured_image" />
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </form>
  </DefaultCard>
  <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
    v-model:isOpen="imageData.featured_image.isOpen">
    <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="false"
      :closeModal="() => {
          imageData.featured_image.isOpen = false
        }
        " :selectedFiles="handleFeatureFiles" />
  </popupModal>

  <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
    v-model:isOpen="imageData.product_image.isOpen">
    <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.product_image.images" :singleFile="false"
      :closeModal="() => {
          imageData.product_image.isOpen = false
        }
        " :selectedFiles="handleProductFiles" />
  </popupModal>
  <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import _ from 'lodash'
import { ref, onMounted, watch, computed } from 'vue'
import { handleFileUpdate } from '@/helper/functions'
import { showToast } from '@/helper/functions'
import TinyMCE from '@/components/Admin-components/TinyMCE.vue'
import Accordion from '@/components/Admin-components/Accordion.vue'
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import { getProductCategoryTypeTree, getProductTypeTree } from '@/helper/Apis'
import DesignerServices from '@/services/DesignerServices'
import { statusData } from '@/json/data'
import { useStore } from 'vuex'
import { useRouter,onBeforeRouteLeave } from 'vue-router'
import CommonServices from '@/services/CommonServices'
import { useGlobalUpdate } from '@/Hooks/useGlobalupdate'
// store and router
const router = useRouter()
const store = useStore()
const { handleGlobalUpdate  } = useGlobalUpdate(DesignerServices.globalDesignersUpdate,'master_designer_id')
// Reactive state
const errors = ref({})
const loading = ref(false)
const form = ref(
  store.getters.editData || {
    status: '1',
    visibility: '',
    tags: [],
    domain_id: store.getters.getDomain?.id || null,
    featured_image: '',
    product_image: '',
    product_types: [],
    product_category_types: []
  }
)
const ProductCategory = ref([])
const TagsData = ref([])
const productType = ref([])
const checkedFields = ref({})
const checkBoxFlag = ref(Boolean(form.value.id))

// Image data for various categories
const imageData = ref({
  featured_image: { isOpen: false, mediaName: 'Feature Image', images: [] },
  product_image: { isOpen: false, mediaName: 'Upload Product Image', images: [] }
})

// Handlers for file updates
const handleFeatureFiles = (data) =>
  handleFileUpdate('featured_image', data, imageData, form, false)
const handleProductFiles = (data) => handleFileUpdate('product_image', data, imageData, form, false)

// Validate form fields
const validateForm = () => {
  errors.value = {}
  if (!form.value.title) {
    errors.value.title = 'Title is required'
    return false
  }
  if (form.value.status === null || form.value.status === undefined || form.value.status === '') {
    errors.value.status = 'Status is required'
    return false
  }
  return true
}

// Handle form submission (add or edit designer)
const handleSubmit = async () => {
  if (!validateForm()) return
  const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)
  !form.value.domain_all && delete form.value.domain_all
  loading.value = true
  const {
    featured_image_url,domain,slug,domains_data,featured_image_data,product_image_data,product_category_types_data,
    product_types_data,default_domain,tags_data,product_image_url,...payload} = form.value
  if (!form.value?.domains_data?.includes(form.value.domain_id)) {
    delete payload.id
  }
  try {
    const service = store.getters.editData
      ? DesignerServices.editDesigners
      : DesignerServices.addDesigners
    const res = await service(payload)

    if (res.status === 200 && res.data.success) {
      if (hasCheckedFields) {
        handleGlobalUpdate(form,checkedFields,'/designer')
      } else  {
        showToast(res.data.message, 'success')
        router.push('/designer')
      }
    }
    else if(res.status === 403 || res.status === 400) {
        showToast(res.data.message, 'error')
      }
  } catch (e) {
    showToast('Something went wrong', 'error')
    console.error('Error:', e)
  } finally {
    loading.value = false
  }
}

// Fetch Perticular Domain Data
const fetchDesignerData = async () => {
  loading.value = true
  const payload = {
    master_designer_id: form.value.master_designer_id,
    domain_id: form.value.domain_id
  }
  try {
    const { status, data } = await DesignerServices.getDesigners(payload)
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

// Fetch product and category data
const fetchProductData = async (payload) => {
  ProductCategory.value = await getProductCategoryTypeTree(payload)
  productType.value = await getProductTypeTree(payload)
}

// Fetch tags data
const fetchTagsData = async (payload) => {
  try {
    const res = await CommonServices.getTags(payload)
    if (res.status === 200 && res.data.success) {
      TagsData.value = res.data.data
    }
  } catch (e) {
    console.error('Error while getting tags:', e)
  }
}

// Initialize component state
onMounted(() => {
  if (store.getters.editData) {
    const { product_image_data, featured_image_data } = store.getters?.editData
    imageData.value.featured_image.images = [featured_image_data] || []
    imageData.value.featured_image.mediaName = featured_image_data?.file_url || 'Feature Image'
    imageData.value.product_image.images = [product_image_data] || []
    imageData.value.product_image.mediaName = product_image_data?.file_url || 'Product Image'
    fetchTagsData({ domain_id: store.getters.editData.domain_id })
    fetchProductData({ domain_id: store.getters.editData.domain_id })
  }
})

// Watch for domain_id changes to update product and category data
watch(
  () => form.value.domain_id,
  (newDomainId) => {
    // Fetch tree data
    fetchTagsData({ domain_id: newDomainId })
    fetchProductData({ domain_id: newDomainId })
    // Check if newDomainId is present in domains_data and fetch
    if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
      fetchDesignerData(newDomainId)
    }
  }
)

// Computed Property
const buttonText = computed(() => {
  return form.value.id ? 'Update' : 'Submit'
})

onBeforeRouteLeave((to, from, next) => {
    store.dispatch('clearEditData');
    next();
});
</script>

<style scoped></style>
