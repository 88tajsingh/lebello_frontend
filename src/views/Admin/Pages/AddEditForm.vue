<template>{{ form }}
  <DefaultCard :cardTitle="store.getters.editData ? `Edit Pages` : `Add Pages`">
    <DomainComponent @customChange="(id) => form.domain_id = id"></DomainComponent>
    <form @submit.prevent="handleSubmit">
      <div class="p-6.5 grid grid-cols-2 gap-2">

        <div class="flex flex-col">
          <input-label for="page_title " value="Page Title *" />
          <TextInput type="text" class="block mr-2 h-[40px] w-full" v-model="form.page_title"
            :errMessage="errors.page_title" />
        </div>
        <div class="flex flex-col">
          <input-label for="page_title" value="Page Slug" />
          <TextInput type="text" class="block mr-2 h-[40px] w-full" v-model="form.slug" :errMessage="errors.slug" />
        </div>
        <div class="flex flex-col">
          <input-label for="seo_title" value="SEO Title" />
          <TextInput type="text" class="block mr-2 h-[40px] w-full" :class="{ 'border-red-500': errors.seo_title }"
            v-model="form.seo_title" :errMessage="errors.seo_title" />
          <p class="text-sm text-[#646970] text-[11.5px]">Custom title tag.</p>
        </div>
        <div class="col-span-1 w-full mt-1">
          <input-label for="template" value="Template" />
          <TextInput type="text" class="block mr-2 w-full" v-model="form.template" />
        </div>
        <!-- <div class="flex flex-col">
          <input-label for="seo_title" value="Author" />
          <TextInput type="text" class="block mr-2 h-[40px] w-full" 
           v-model="form.author"  disabled/>
        </div> -->

        <div class="col-span-2 w-full">
          <input-label for="seo_title" value="Page Description" />
          <TinyMCE v-model="form.page_description" />
        </div>

        <div v-if="form.gallery !== null" class="col-span-2 w-full border border-gray rounded-lg">
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

        <div class="col-span-2 w-full">
          <input-label for="seo_meta_description" value="Meta Description" />
          <TextInput type="text" class="block mr-2 w-full" :class="{ 'border-red-500': errors.seo_meta_description }"
            :isTextarea="true" :rows="3" v-model="form.seo_meta_description"
            :errMessage="errors.seo_meta_description" />
          <p class="text-sm text-[#646970] text-[11.5px]">Most search engines use a maximum of 160 chars for the
            description.</p>
        </div>

        <div class="col-span-1 w-full">
          <input-label for="seo_meta_keywords" value="Meta Keywords" />
          <TextInput type="text" class="block mr-2 w-full" :isTextarea="true" :rows="3" v-model="form.seo_meta_keywords"
            :errMessage="errors.seo_meta_keywords" />
          <p class="text-sm text-[#646970] text-[11.5px]">Separate each term with a comma.</p>
        </div>

        <div class="col-span-1 w-full">
          <input-label for="page_tagline" value="Page Tagline" />
          <TextInput type="text" class="block mr-2 w-full" :class="{ 'border-red-500': errors.page_tagline }"
            :isTextarea="true" :rows="3" v-model="form.page_tagline" :errMessage="errors.page_tagline" />
          <p class="text-sm text-[#646970] text-[11.5px]">Type the page tagline here.</p>
        </div>
        <div class="col-span-1 w-full">
          <input-label for="parent_page" value="Parent Page" />
          <TextInput type="text" class="block mr-2 w-full" v-model="form.parent_page" />
        </div>
        <div class="col-span-1 w-full">
          <input-label for="comments" value="Comments" />
          <Select :options="trueFalse" showfield="name" class="w-full" valueField="value" label="Options"
            v-model="form.comments" />
        </div>

        <div class="col-span-1 w-full">
          <input-label for="page_order" value="Page Order" />
          <TextInput type="text" class="block mr-2 w-full" v-model="form.page_order" />
        </div>

        <div class="mt-2">
          <input-label for="page_tagline" value="Featured Image" />
          <div class="py-2 rounded-lg px-2 border border-stroke" @click="() => imageData.feature_image.IsOpen = true">
            {{
              imageData.feature_image.mediaName }}</div>
          <div class=" mt-3 flex overflow-x-auto">
            <!-- <img v-if="imageData.value.feature_image.images.length > 0"
      v-for="file in imageData.value.feature_image.images" 
      :key="file.file_url"  
      :src="filePath(file.file_url)"
      class="inline-block w-auto h-34 mr-4" 
> -->
          </div>
        </div>
        <div class="col-span-1 w-full">
        </div>
        <button type="submit"
          class="flex col-span-2 mt-5 w-full mb-10 m-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
          Submit
        </button>
      </div>
    </form>
  </DefaultCard>
  <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="imageData.gallery.IsOpen">
    <GetLibrary btnName="Select files" :getFlag="true" :selected="imageData.gallery.images" :singleFile="false"
      :closeModal="() => imageData.gallery.IsOpen = false" :selectedFiles="handleGalleryFiles" />
  </popupModal>
  <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
    v-model:isOpen="imageData.feature_image.IsOpen">
    <GetLibrary btnName="Select file" :getFlag="true" :selected="imageData.feature_image.images" :singleFile="true"
      :closeModal="() => imageData.feature_image.IsOpen = false" :selectedFiles="handleFeatureFiles" />
  </popupModal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { handleFileUpdate } from '@/helper/functions';
import DatePicker from '@/components/Admin-components/form-components/DatePicker.vue'
import RadioButton from '@/components/Admin-components/form-components/RadioButton.vue';
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue';
import TinyMCE from '@/components/Admin-components/TinyMCE.vue';
import PagesServices from '@/services/PagesServices';
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
const PreviousDomain = ref(null);
const form = ref(store.getters.editData || {
  gallery: [],
  password: '',
  page_description: ''
});
const imageData = ref({
  feature_image: { IsOpen: false, mediaName: 'Select Feature Media', images: [] },
  gallery: { IsOpen: false, mediaName: 'Select gallery files', images: [] }
})

// Image Handlers
const handleFeatureFiles = (data) => handleFileUpdate('feature_image', data, false, imageData, form);
const handleGalleryFiles = (data) => handleFileUpdate('gallery', data, true, imageData, form);

// remove image form gallery
const handleRemoveImage = (slide) => {
    const index = imageData.value.gallery.images.findIndex(item => item.id === slide.id);
    console.log(index)
        if (index !== -1) {
          imageData.value.gallery.images.splice(index, 1);
          form.value.gallery.splice(index, 1);}
}

// Form Validation
const validateForm = () => {
  errors.value = {};
  if (!form.value.page_title) {
    errors.value.page_title = 'Page title is required';
    return false;
  }
  return true;
};

// Submit Handler
const handleSubmit = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      const action = store.getters.editData ? PagesServices.editPages : PagesServices.addPages;
      if (form.value.domain_id !== PreviousDomain.value) delete form.value.id;
      const { deleted_at, created_at, updated_at, featured_image_url, ...payload } = form.value;
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
  }
};

// Lifecycle Hooks
onMounted(() => {
  PreviousDomain.value = store.getters.getDomain.id;
  if (store.getters.editData) {
    SliderSelects.value = store.getters.editData.gallery_urls;
  }
});
</script>