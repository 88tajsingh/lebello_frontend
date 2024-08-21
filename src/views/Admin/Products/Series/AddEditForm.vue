<template>{{ form }}
    <DefaultCard  :cardTitle="form.id ? `Edit Product Series ` : `Add Product Series`">
        <DomainComponent :domains="items" @customChange="(id)=>form.domain_id = id"></DomainComponent>
        <form @submit.prevent="handleSubmit">
        <div class="p-6.5 grid grid-cols-2 gap-6">
            <div class="flex flex-col ">
                <TextInput type="text" class=" " :class="{ 'border-red': errors.name }"
                    placeholder="" v-model="form.name" :errMessage="errors.name"
                    @update:model="clearError('name')" label="Name" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The name is how it appears on your site.
                </p>
            </div>
            <div class="flex flex-col ">
                <TextInput type="text" class="block mr-2 h-[40px] w-full" 
                    placeholder="" v-model="form.slug" label="Slug" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only
                    letters, numbers, and hyphens.
                </p>
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Title"
                     placeholder="" 
                    v-model="form.title" 
                    />
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Sub Title"
                     placeholder="" 
                    v-model="form.sub_title" 
                    />
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Seo Title Tag"
                     placeholder="" 
                    v-model="form.seo_title_tag" 
                    />
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Seo Meta Keyword Tag"
                     placeholder="" 
                    v-model="form.seo_meta_keyword_tag" 
                    />
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Trade Mark Label"
                     placeholder="" 
                    v-model="form.trade_mark_label" 
                    />
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Label"
                     placeholder="" 
                    v-model="form.label" 
                    />
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Menu Label"
                     placeholder="" 
                    v-model="form.menu_label" 
                    />

            </div>
            <div class="">
                 <ColorPicker  label="Text Color" v-model="form.label_background_color" />
             </div>
            <div class="flex flex-col ">
                <InputLabel for="Parent Material" value="Parent Product Series " />
                <Select :options="ProductSeriesList" :defaultZero='true' showfield="name" class="w-full" valueField="id" label="Select"
                    v-model="form.parent_product_series" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of Bebop
                    and Big Band.
                </p>
            </div>
            <div class="flex flex-col ">
                <InputLabel for="DisplayO" value="Display On Home And Series Page Option " />
                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value" label="Select Material Options"
                    v-model="form.display_on_home" />
            </div>
       
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Description"
                     placeholder="" :isTextarea="true" rows="4"
                    v-model="form.description" 
                    />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The description is not prominent by default; however, some themes may show it.
                </p>
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Seo Meta Description Tag"
                     placeholder="" :isTextarea="true" rows="4"
                    v-model="form.seo_meta_description_tag" 
                    />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The description is not prominent by default; however, some themes may show it.
                </p>
            </div>
            <div class="flex flex-col w-full ">
                                <singleCheckBox id="FeaturedOption" label="Show in New Menu" v-model:modelValue="form.show_in_menu"></singleCheckBox>
                                <singleCheckBox id="FeaturedOption" label="Show in Collection 19 Menu" v-model:modelValue="form.show_in_yearly_collection"></singleCheckBox>
                              </div>
                              <div class="flex flex-col w-full  ">
                                
                                <!-- <InputLabel for="Featured_image" value="Featured_image" /> -->
                                <div class="py-2  rounded-lg px-2 border border-stroke"
                                    @click="() => imageData.featured_image.IsOpen = true"> {{
                                        imageData.featured_image.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in imageData.featured_image.images" :key="file" :src="$filePath(file.file_url)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file?.alternative_text || 'image'">
                                </div>
                                <InputError class="mt-2" :message="errors?.featured_image" />
                           
                                
                              </div>
                            </div>
        <button type="submit"
            class="flex mt-5 px-10 mb-10 ml-10 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
           {{ id ? `Update ` : `Submit` }}
        </button>
    </form>
</DefaultCard>
    <Loader :isLoading="loading" :fullPage="true" />
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="imageData.featured_image.IsOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
            :closeModal="() => { imageData.featured_image.IsOpen = false }" :selectedFiles="handleFeatureFiles" />
    </popupModal>
</template>

<script setup>
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import { getProductSeriesTree } from '@/helper/Apis'
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import ProductServices from '@/services/ProductServices'
import { clearError,showToast,handleFileUpdate } from '@/helper/functions'
import { onMounted, ref,watch } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { trueFalse } from '@/json/data'

// Store and Router
const store = useStore()
const router = useRouter()

// Reactive State
const form = ref({
  ...store.getters.editData,
  parent_product_series: store.getters.editData?.parent_product_series ?? 0
})
const PreviousDomain = ref(store.getters.getDomain.id)
const ProductSeriesList = ref([])
const loading = ref(false)
const errors = ref({})
const imageData = ref({
    featured_image: { IsOpen: false, mediaName: 'Select Feature Media', images: [] },
})

// Image Handlers
const handleFeatureFiles = (data) => handleFileUpdate('featured_image', data, false, imageData, form);



// Form Validation
const validateForm = () => {
  errors.value = {}
  if (!form.value.name) {
    errors.value.name = 'Name is required'
    return false
  }
  return true
}
// Submit Handler
const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
      if (form.value.domain_id !== PreviousDomain.value) delete form.value.id
      const { deleted_at, created_at, updated_at,featured_image_url,...payload } = form.value

    const action = store.getters.editData ? ProductServices.editProductSeries : ProductServices.addProductSeries
    const { status, data } = await action(payload)
    if (status === 200 && data.success) {
      showToast(data.message, 'success')
      router.push('/product-series')
    } else {
      showToast(data.message, 'error')
    }
  } catch (error) {
    showToast('Something went wrong', 'error')
    console.error(`Error ${store.getters.editData ? 'editing' : 'adding'} product series:`, error)
  } finally {
    loading.value = false
  }
}

// Fetch Product Series Tree
const fetchProductSeriesTree = async (domainId) => {
  try {
    ProductSeriesList.value = await getProductSeriesTree({ domain_id: domainId })
  } catch (error) {
    console.error('Error fetching product series tree:', error)
  }
}

// Lifecycle Hooks
onMounted(() => {
  if (store.getters.editData) {
    console.log(store.getters.editData.featured_image_url)
    imageData.value.featured_image = {
      images: [{file_url:store.getters.editData.featured_image_url}],
      mediaName: store.getters.editData.featured_image_url
    }
  }
  fetchProductSeriesTree(PreviousDomain.value)
})

// Watchers
watch(
  () => form.value.domain_id,
  (newDomainId) => {
    fetchProductSeriesTree(newDomainId)
    form.value.parent_product_series = 0
  }
)
</script>