<template>
  <DefaultCard :cardTitle="store.getters.editData ? `Edit Pages` : `Add Pages`">
    <DomainComponent @customChange="(id) => form.domain_id = id"
      :deleteService="PagesServices.deletePages"
       masterKey="master_page_id" :masterDeleteService="PagesServices.deletePageMaster"
      routeTo="pages"
       ></DomainComponent>
       <template v-if="form.id" v-slot:header>
            <MasterSlugForm
        :form="form"
        @update-slug="()=>fetchPagesData()"
        :SlugUpdateservices = 'PagesServices.masterPageSlugUpdate'
        masteridKeyName='master_page_id'
      />
    </template>
    <form @submit.prevent="handleSubmit">
      <div class="p-6.5 grid grid-cols-2 gap-2">

        <div class="flex flex-col">
          <input-label for="page_title " value="Page Title *" />
          <TextInput type="text" class="block mr-2 h-[40px] w-full" v-model="form.page_title"
            :errMessage="errors.page_title"
            :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => { checkedFields.page_title = value }" />
        </div>
        <div class="flex flex-col">
          <input-label for="page_title" value="Page Slug" />
          <TextInput type="text" class="block mr-2 h-[40px] w-full" v-model="form.slug" :errMessage="errors.slug"
          />
        </div>
        <div class="flex flex-col">
          <input-label for="seo_title" value="SEO Title" />
          <TextInput type="text" class="block mr-2 h-[40px] w-full" :class="{ 'border-red-500': errors.seo_title }"
            v-model="form.seo_title" :errMessage="errors.seo_title"
            :hasCheckBox="checkBoxFlag"  @update:checkValue="(value) => { checkedFields.seo_title = value }" />
          <p class="text-sm text-[#646970] text-[11.5px]">Custom title tag.</p>
        </div>
        <div class="col-span-1 w-full mt-1">
          <input-label for="template" value="Template" />
          <TextInput type="text" class="block mr-2 w-full" v-model="form.template"
          :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => { checkedFields.template = value }" />
          
        </div>
        <!-- <div class="flex flex-col">
          <input-label for="seo_title" value="Author" />
          <TextInput type="text" class="block mr-2 h-[40px] w-full" 
           v-model="form.author"  disabled/>
        </div> -->

        <div class="col-span-2 w-full">
          <input-label for="seo_title" value="Page Description" />
          <div class="flex">
            <SingleCheck v-if="form.id" label="" v-model="checkedFields.page_description"></SingleCheck>
            <TinyMCE v-model="form.page_description" />
          </div>
        </div>
        <div class="flex col-span-2">
          <SingleCheck v-if="form.id" label="" v-model="checkedFields.gallery"></SingleCheck>
        <div v-if="form.gallery !== null" class="col-span-2 w-full border border-stroke rounded-lg">
          <div class="mt-2 ml-3  ">
            <input-label for="slides" value="Slider " />
            <div class="text-gray-4 text-[13px]">Minimum Size 1600 x 700px</div>
            <div class=" flex flex-wrap">
              <div class="relative p-1" v-for="(slide, index) in imageData.gallery.images" :key="`slide-${index}`">
               
                <img class=" border border-gray-4 m-1 p-2 h-[168px] w-[156px]" :src="$filePath(slide.file_url)">
                <div @click="() => handleRemoveImage(slide)" class=" absolute top-2 right-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
              </div>
            </div>
            <button @click="() => imageData.gallery.IsOpen = true" type="button"
              class="flex px-3 py-1 col-span-2 mt-5  mb-4 ml-4  justify-center rounded bg-primary  font-medium text-gray hover:bg-opacity-90">
              Gallery
            </button>
          </div>
          <div>
          </div>
        </div>
      </div>

        <div class="col-span-2 w-full">
          <input-label for="seo_meta_description" value="Meta Description" />
          <TextInput type="text" class="block mr-2 w-full" :class="{ 'border-red-500': errors.seo_meta_description }"
            :isTextarea="true" :rows="3" v-model="form.seo_meta_description"
            :errMessage="errors.seo_meta_description"
            :hasCheckBox="checkBoxFlag"
            @update:checkValue="(value) => { checkedFields.seo_meta_description = value }"
            />
          <p class="text-sm text-[#646970] text-[11.5px]">Most search engines use a maximum of 160 chars for the
            description.</p>
        </div>

        <div class="col-span-1 w-full">
          <input-label for="seo_meta_keywords" value="Meta Keywords" />
          <TextInput type="text" class="block mr-2 w-full" :isTextarea="true" :rows="3" v-model="form.seo_meta_keywords"
            :errMessage="errors.seo_meta_keywords"
            
            :hasCheckBox="checkBoxFlag"
                        @update:checkValue="(value) => { checkedFields.seo_meta_keywords = value }"/>
          <p class="text-sm text-[#646970] text-[11.5px]">Separate each term with a comma.</p>
        </div>

        <div class="col-span-1 w-full">
          <input-label for="page_tagline" value="Page Tagline" />
          <TextInput type="text" class="block mr-2 w-full" :class="{ 'border-red-500': errors.page_tagline }"
            :isTextarea="true" :rows="3" v-model="form.page_tagline" :errMessage="errors.page_tagline"
            :hasCheckBox="checkBoxFlag"
                        @update:checkValue="(value) => { checkedFields.page_tagline = value }"
            />
          <p class="text-sm text-[#646970] text-[11.5px]">Type the page tagline here.</p>
        </div>
        <div class="col-span-1 w-full">
          <input-label for="parent_page" value="Parent Page" />
          <TextInput type="text" class="block mr-2 w-full" v-model="form.parent_page" 
          :hasCheckBox="checkBoxFlag"
           @update:checkValue="(value) => { checkedFields.parent_page = value }"
          />
        </div>
        <div class="col-span-1 w-full">
          <input-label for="comments" value="Comments" />
          <Select :options="trueFalse" showfield="name" class="w-full" valueField="value" label="Options"
            v-model="form.comments"
            :hasCheckBox="checkBoxFlag"
            @update:checkValue="(value) => { checkedFields.comments = value }"
            />
        </div>

        <div class="col-span-1 w-full">
          <input-label for="page_order" value="Page Order" />
          <TextInput type="text" class="block mr-2 w-full" v-model="form.page_order"
          :hasCheckBox="checkBoxFlag"
          @update:checkValue="(value) => { checkedFields.page_order = value }"
          />
        </div>

        <div class="mt-2">
          <input-label for="page_tagline" value="Featured Image" />
          <div class=" flex  w-full h-auto ">
                            <SingleCheck v-if="form.id" label="" v-model="checkedFields.featured_image"></SingleCheck>
                            <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                @click="() => imageData.featured_image.IsOpen = true"> {{
                                    imageData.featured_image.mediaName }}</div>
                    </div>
          <div class=" mt-3 flex overflow-x-auto">
            <img v-for="file in imageData.featured_image.images" :key="file" :src="$filePath(file?.file_url)"
              class="inline-block w-auto h-34 mr-4" :alt="file?.alternative_text || 'image'" />
          </div>
        </div>
        <div class="col-span-1 w-full">
        </div>
        <button type="submit"
          class="flex col-span-2 mt-5 w-full mb-10 m-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
         {{buttonText}}
        </button>
      </div>
    </form>
  </DefaultCard>
  <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="imageData.gallery.IsOpen">
    <GetLibrary btnName="Select files" :getFlag="true" :selected="imageData.gallery.images" :singleFile="false"
      :closeModal="() => imageData.gallery.IsOpen = false" :selectedFiles="handleGalleryFiles" />
  </popupModal>
  <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
    v-model:isOpen="imageData.featured_image.IsOpen">
    <GetLibrary btnName="Select file" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
      :closeModal="() => imageData.featured_image.IsOpen = false" :selectedFiles="handleFeatureFiles" />
  </popupModal>
</template>

<script setup>
import { ref, onMounted,watch,computed } from 'vue';
import { handleFileUpdate,validateForm,getGlobalUpdateData } from '@/helper/functions';
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue';
import TinyMCE from '@/components/Admin-components/TinyMCE.vue';
import PagesServices from '@/services/PagesServices';
import _ from 'lodash';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { showToast } from '@/helper/functions'
import { PublishOptions, trueFalse } from '@/json/data';
import DefaultCard from '@/components/Admin-components/DefaultCard.vue';

// store and router
const store = useStore();
const router = useRouter();

// reactive state
const errors = ref({});
const loading = ref(false);
const form = ref(store.getters.editData || {
  gallery: [],
  password: '',
  page_description: ''
});
const checkedFields = ref({})
const checkBoxFlag = ref(Boolean(form.value.id))

const imageData = ref({
  featured_image: { IsOpen: false, mediaName: 'Select Feature Media', images: [] },
  gallery: { IsOpen: false, mediaName: 'Select gallery files', images: [] }
})

// Image Handlers
const handleFeatureFiles = (data) => handleFileUpdate('featured_image', data, false, imageData, form);
const handleGalleryFiles = (data) => handleFileUpdate('gallery', data, true, imageData, form);

// remove image form gallery
const handleRemoveImage = (slide) => {
    const index = imageData.value.gallery.images.findIndex(item => item.id === slide.id);
    console.log(index)
        if (index !== -1) {
          imageData.value.gallery.images.splice(index, 1);
          form.value.gallery.splice(index, 1);}
}

const handleSubmit = async () => {
    console.log("called handleSubmit")
    if (!validateForm('page_title', 'Page Title', form, errors)) return
    const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)
    hasCheckedFields ? handleGlobalUpdate() : handleAddEditApi()
}

// Submit Handler
const handleAddEditApi = async () => {
  
    loading.value = true;
    try {
      const action = store.getters.editData ? PagesServices.editPages : PagesServices.addPages;
      const { deleted_at, created_at, updated_at, featured_image_url, ...payload } = form.value;
      if (!form.value?.domains_data?.includes(form.value.domain_id)) delete payload.id

      const res = await action(payload);
      if (res.status === 200 && res.data.success) {
        showToast(res.data.message, 'success');
        router.push('/pages');
      } else {
        showToast(res.data.message || 'Something went wrong', 'error');
      }
    } catch (e) {
      console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} pages:`, e);
    } finally {
      loading.value = false;
    }
  
};

// Global Update Handler
const handleGlobalUpdate = async () => {
  loading.value = true;
    const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value)
    if (_.isEmpty(globalUpdate)) return

    const payload = {
      master_page_id: form.value.master_page_id,
        global_keys: globalUpdate
    }

    try {
        const { status, data } = await PagesServices.globalPageUpdate(payload)
        status === 200 && data.success ? showToast(data.message, 'success') : showToast(data.message, 'error')
        if (status === 200 && data.success) router.push('/pages')
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error)
    } finally {
        loading.value = false
    }
}

// Fetch Perticular Domain Data
const fetchPagesData = async () => {
  loading.value = true
    const payload = { master_page_id: form.value.master_page_id, domain_id: form.value.domain_id }
    try {
        const { status, data } = await PagesServices.getPages(payload)
        if (status === 200 && data.success) {
            const dataValue = data.data[0]
            store.dispatch('setEdit', dataValue)
            Object.assign(form.value, dataValue)
            loading.value=false
        }
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error('Error while fetching data:', error)
        loading.value=false
    }
}

// Lifecycle Hooks
onMounted(() => {
  if (store.getters.editData) {
    console.log([store.getters?.editData])
        imageData.value.gallery.mediaName = store.getters?.editData?.gallery_urls?.file_url || 'Select Media';
        imageData.value.gallery.images = store.getters?.editData?.gallery_urls;
        imageData.value.featured_image.mediaName = store.getters?.editData?.featured_image_data?.file_url || 'Select Media';
        imageData.value.featured_image.images = [store.getters?.editData?.featured_image_data];
    }
});

// Check if domain_id is present in domains_data and fetch product type data if so
watch(() => form.value.domain_id, (newDomainId) => {
    if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
        fetchPagesData();
    } else {
        console.log('data not in array', form.value?.domains_data);
    }
});

// Computed Property
const buttonText = computed(() => {
    return Object.values(checkedFields.value).some(Boolean) ? 'Global Update' : (form.value.id ? 'Update' : 'Submit')
})
</script>