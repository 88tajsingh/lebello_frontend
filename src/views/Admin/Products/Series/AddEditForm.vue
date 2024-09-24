<template>
  <DefaultCard :cardTitle="form.id ? `Edit Product Series ` : `Add Product Series`">
    <DomainComponent @customChange="(id) => form.domain_id = id" :deleteService="ProductServices.deleteProductSeries"
      masterKey="master_product_series_id" :masterDeleteService="ProductServices.deleteMasterProductSeries"
      routeTo="product-series"></DomainComponent>
    <template v-if="form.id" v-slot:header>
      <MasterSlugForm :form="form" @update-slug="() => fetchProductSeriesData()"
        :SlugUpdateservices='ProductServices.masterProductSeriesSlugUpdate'
        masteridKeyName='master_product_series_id' />
    </template>
    <form @submit.prevent="handleSubmit">
      <div class="p-6.5 grid grid-cols-2 gap-6">
        <div class="flex flex-col ">
          <TextInput type="text" class=" " :class="{ 'border-red': errors.name }" placeholder="" v-model="form.name"
            :errMessage="errors.name" @update:model="clearError('name')" label="Name" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.name = value" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The name is how it appears on your site.
          </p>
        </div>
        <div class="flex flex-col ">
          <TextInput type="text" class="block mr-2 h-[40px] w-full" placeholder="" v-model="form.slug"
            label="Slug (Read Only)" disabled="true" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only
            letters, numbers, and hyphens.
          </p>
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2  w-full" label="Title" placeholder="" v-model="form.title"
            :hasCheckBox="checkBoxFlag" @update:checkValue="value => checkedFields.title = value" />
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2  w-full" label="Sub Title" placeholder="" v-model="form.sub_title"
            :hasCheckBox="checkBoxFlag" @update:checkValue="value => checkedFields.sub_title = value" />
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2  w-full" label="Seo Title Tag" placeholder=""
            v-model="form.seo_title_tag" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.seo_title_tag = value" />
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2  w-full" label="Seo Meta Keyword Tag" placeholder=""
            v-model="form.seo_meta_keyword_tag" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.seo_meta_keyword_tag = value" />
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2  w-full" label="Trade Mark Label" placeholder=""
            v-model="form.trade_mark_label" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.trade_mark_label = value" />
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2  w-full" label="Label" placeholder="" v-model="form.label"
            :hasCheckBox="checkBoxFlag" @update:checkValue="value => checkedFields.label = value" />
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2  w-full" label="Menu Label" placeholder="" v-model="form.menu_label"
            :hasCheckBox="checkBoxFlag" @update:checkValue="value => checkedFields.menu_label = value" />

        </div>
        <div class="">
          <ColorPicker label="Text Color" v-model="form.label_background_color" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.label_background_color = value" />
        </div>
        <div class="flex flex-col ">
          <InputLabel for="Parent Material" value="Parent Product Series " />
          <Select :options="ProductSeriesList" :defaultZero='true' showfield="name" class="w-full" valueField="id"
            label="Select" v-model="form.parent_product_series" :errorClass="errors.parent_product_series"
            @update:modelValue="$clearError(errors, 'parent_product_series')"
            :errMessage="errors.parent_product_series" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of Bebop
            and Big Band.
          </p>
        </div>
        <div class="flex flex-col ">
          <InputLabel for="DisplayO" value="Display On Home And Series Page Option " />
          <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
            label="Select Material Options" v-model="form.display_on_home" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.display_on_home = value" />
        </div>

        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2  w-full" label="Description" placeholder="" :isTextarea="true"
            rows="4" v-model="form.description" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.description = value" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The description is not prominent by default; however, some themes may show it.
          </p>
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2  w-full" label="Seo Meta Description Tag" placeholder=""
            :isTextarea="true" :rows="4" v-model="form.seo_meta_description_tag" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.seo_meta_description_tag = value" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The description is not prominent by default; however, some themes may show it.
          </p>
        </div>
        <div class="flex flex-col w-full ">
          <singleCheck id="FeaturedOption" label="Show in New Menu" v-model:modelValue="form.show_in_menu">
          </singleCheck>
          <singleCheck id="FeaturedOption" label="Show in Collection 19 Menu"
            v-model:modelValue="form.show_in_yearly_collection"></singleCheck>
        </div>
        <div class="flex flex-col w-full  ">

          <!-- <InputLabel for="Featured_image" value="Featured_image" /> -->
          <div class=" flex  w-full h-auto ">
            <SingleCheck v-if="form.id" label="" v-model="checkedFields.featured_image"></SingleCheck>
            <div class="py-2  rounded-lg w-full px-2 border border-stroke"
              @click="() => imageData.featured_image.IsOpen = true"> {{
                imageData.featured_image.mediaName }}</div>
          </div>
          <div class=" mt-3 flex overflow-x-auto">
            <img v-if="imageData.featured_image.images[0]" v-for="file in imageData.featured_image.images" :key="file"
              :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
              :alt="file?.alternative_text || ''">
          </div>
        </div>
      </div>
      <button type="submit"
        class="flex mt-5 px-10 mb-10 ml-10 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
        {{ buttonText }}
      </button>
    </form>
  </DefaultCard>
  <Loader :isLoading="loading" :fullPage="true" />
  <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
    v-model:isOpen="imageData.featured_image.IsOpen">
    <GetLibrary btnName="select File" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
      :closeModal="() => { imageData.featured_image.IsOpen = false }" :selectedFiles="handleFeatureFiles" />
  </popupModal>
</template>

<script setup>
import _ from 'lodash';
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import { getProductSeriesTree } from '@/helper/Apis'
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import ProductServices from '@/services/ProductServices'
import { showToast, handleFileUpdate, getGlobalUpdateData } from '@/helper/functions'
import { onMounted, ref, watch, computed } from 'vue'
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
const ProductSeriesList = ref([])
const loading = ref(false)
const errors = ref({})
const checkedFields = ref({})
const checkBoxFlag = ref(Boolean(form.value.id))
const selectError = ref(false);

// images variable
const imageData = ref({
  featured_image: { IsOpen: false, mediaName: 'Select Feature Media', images: [] },
})

// Image Handlers
const handleFeatureFiles = (data) => handleFileUpdate('featured_image', data, imageData, form, false);



// Form Validation
const validateForm = () => {
  errors.value = {}
  let isValid = true
  if (!form.value.name) {
    errors.value.name = 'Name is required'
    isValid = false;
  }
  if (form.value.parent_product_series == form.value.id) {
    errors.value.parent_product_series = 'Can not be own parent'
    isValid = false
  }
  return isValid ? true : false
}

// Submit Handler
const handleSubmit = async () => {
  if (!validateForm()) return
  const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)
  loading.value = true
  try {
    const { deleted_at, created_at, slug, updated_at, default_master, domains_data, default_domain, featured_image_data, ...payload } = form.value
    if (!form.value?.domains_data?.includes(form.value.domain_id)) delete payload.id

    const action = store.getters.editData ? ProductServices.editProductSeries : ProductServices.addProductSeries
    const { status, data } = await action(payload)
    if (status === 200 && data.success) {
      if (hasCheckedFields) {
        handleGlobalUpdate();
      }
      else {
        store.dispatch('clearEditData');
        showToast(data.message, 'success')
        router.push('/product-series')
      }

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

// Global Update Handler
const handleGlobalUpdate = async () => {
  const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value)
  if (_.isEmpty(globalUpdate)) return

  const payload = {
    master_product_series_id: form.value.master_product_series_id,
    global_keys: globalUpdate
  }

  try {
    const { status, data } = await ProductServices.globalProductSeriesUpdate(payload)
    status === 200 && data.success ? showToast(data.message, 'success') : showToast(data.message, 'error')
    if (status === 200 && data.success) router.push('/product-series')
  } catch (error) {
    showToast('Something went wrong', 'error')
    console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error)
  } finally {
    loading.value = false
  }
}

// Fetch get Data
const fetchProductSeriesData = async () => {
  loading.value = true;
  const payload = { master_product_series_id: form.value.master_product_series_id, domain_id: form.value.domain_id }
  try {
    const { status, data } = await ProductServices.getProductSeries(payload)
    if (status === 200 && data.success) {
      const dataValue = data.data[0]
      store.dispatch('setEdit', dataValue)
      Object.assign(form.value, dataValue)
    }
  } catch (error) {
    showToast('Something went wrong', 'error')
    console.error('Error while fetching data:', error)
  }
  finally {
    loading.value = false;
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
    const { featured_image_data } = store.getters.editData
    imageData.value.featured_image = {
      images: [featured_image_data],
      mediaName: featured_image_data?.file_url || 'Featured Image'
    }
  }
  fetchProductSeriesTree(store.getters.getDomain.id)
})

// watch
watch(() => form.value.domain_id, (newDomainId) => {
  // Fetch product type tree and reset parent product type
  fetchProductSeriesTree(newDomainId)
  form.value.parent_product_series = 0
  // Check if newDomainId is present in domains_data and fetch product type data if so
  if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
    console.log("running form.value.domain_id: " + newDomainId)
    fetchProductSeriesData();
  } else {
    console.log('data not in array', form.value?.domains_data);
  }
});

// Watchers
watch(() => form.value.parent_contract, (newValue) => {
  if (newValue == form.value.id)
    selectError.value = true;
  else
    selectError.value = false;
});

// Computed Property
const buttonText = computed(() => {
  return (form.value.id ? 'Update' : 'Submit')
})
</script>