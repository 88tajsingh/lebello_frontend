<template>{{ store.getters.editData  }}
  <DefaultCard :cardTitle="store.getters.editData ? `Edit Pages` : `Add Pages`"> 
    <DomainComponent  @customChange="(id)=> form.domain_id = id"></DomainComponent>
    <form @submit.prevent="handleSubmit">
      <div class="p-6.5 grid grid-cols-2 gap-2">

        <div class="flex flex-col">
          <input-label for="page_title " value="Page Title *" />
          <TextInput type="text" class="block mr-2 h-[40px] w-full" v-model="form.page_title"
            :errMessage="errors.page_title" />
        </div>
        <div class="flex flex-col">
          <input-label for="page_title" value="Page Slug" />
          <TextInput type="text" class="block mr-2 h-[40px] w-full" v-model="form.slug"
            :errMessage="errors.slug" />
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
            <div class="relative p-1" v-for="(slide, index) in SliderSelects" :key="`slide-${index}`">
              <img class=" border border-gray-4 m-1 p-2 h-[168px] w-[156px]" :src="$filePath(slide.file_url)">
              <div @click="()=>handleRemoveImage(slide)" class=" absolute top-2 right-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
            </div>
          </div>
          <button @click="()=> isOpenSlider=true" type="button"
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
          <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
            label="Options" v-model="form.comments" />
        </div>
     
        <div class="col-span-1 w-full">
          <input-label for="page_order" value="Page Order" />
          <TextInput type="text" class="block mr-2 w-full" v-model="form.page_order" />
        </div>
        <div class="col-span-1 w-full">
      <DatePicker
        v-model="form.publish"
        label="Publish Date"
        format="yyyy-mm-dd hh:mm:ss"
        dayjsFormat='YYYY-MM-DD HH:mm:ss'
        :use12-hour="false"
      /> 
        </div>
       
        <div class="col-span-1 w-full">
          <input-label for="parentOrder" value="Visibility" />
         <div class="flex gap-2">
           <RadioButton 
           v-for="option in PublishOptions" 
           :key="option.value" 
        name="Visibility" 
      :value="option.value" 
      :label="option.label" 
      :modelValue="form.visibility"
      @update:modelValue="form.visibility = $event"
      />
    </div>
    <div v-if="form.visibility==='Password protected'" class="">
      <TextInput type="password" class="block mr-2 w-full" v-model="form.passowrd" placeholder="Password" />
    </div>
        </div>
        <div class="mt-2">
        <input-label for="page_tagline" value="Featured Image" />
          <div class="py-2 rounded-lg px-2 border border-stroke" @click="() => IsOpen = true"> {{
            featurImage.mediaName }}</div>
          <!-- <div class=" mt-3 flex overflow-x-auto">
            <img :src="$filePath(form.feature_image_url)"
              class="inline-block w-auto h-34 mr-4" >
          </div> -->
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
  <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="isOpenSlider">
    <GetLibrary btnName="Select files" :getFlag="true" :selected="SliderSelects" :singleFile="false" :closeModal="isSliderClose"
      :selectedFiles="handleLibrary" />
  </popupModal>
  <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="IsOpen">
    <GetLibrary btnName="Select file" :getFlag="true" :selected="SliderSelects" :singleFile="true" :closeModal="close"
      :selectedFiles="handleFeatureFiles" />
  </popupModal>
</template>
<script setup>
import { ref, onMounted  } from 'vue';
import { handleFiles } from '@/helper/functions';
import DatePicker from  '@/components/Admin-components/form-components/DatePicker.vue'
import RadioButton from '@/components/Admin-components/form-components/RadioButton.vue';
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue';
import TinyMCE from '@/components/Admin-components/TinyMCE.vue';
import PagesServices from '@/services/PagesServices';
import router from '@/router';
import store from '@/store';
import { showToast } from '@/helper/functions'
import { PublishOptions,trueFalse } from '@/json/data';
import DefaultCard from '@/components/Admin-components/DefaultCard.vue';

const featurImage = ref({
  mediaName:'select Feature Media' ,
  selectedImage :[] || from.feature_image ,
})
const libraryImages = ref({
  mediaName:'select Feature Media' ,
  selectedImage :[] || from.feature_image ,
})
const errors = ref({});
const featureSelects = ref([]);
const SliderSelects = ref([]);
const IsOpen = ref(false)
const isOpenSlider = ref(false)
const form = ref(store.getters.editData || { gallery: [],password:'',page_description:''});
const loading = ref(false)
const PreviousDomain = ref(null)



const close = () => {
  IsOpen.value = false;
}
const isSliderClose = () => {
  isOpenSlider.value = false;
}
const handleRemoveImage = (slide) => {
    const index = SliderSelects.value.findIndex(item => item.id === slide.id);
        if (index !== -1) {
          SliderSelects.value.splice(index, 1);
          form.value.gallery.splice(index, 1);}
}
const handleFeatureFiles = (data) => {
   featureSelects.value= data;
  close();
   const object = handleFiles(data);
   featurImage.value.mediaName = object.mediaName;
   form.value.feature_image = object.media_ids[0]
}
const handleLibrary = (data) => {
  isSliderClose();
  SliderSelects.value = data;
  const object = handleFiles(data)
  libraryImages.value.mediaName= object.mediaName;
  form.value.gallery = object.media_ids
 
}

const validateForm = () => {
  let isValid = true;
  errors.value = {};
  if (!form.value.page_title) {
    errors.value.page_title = 'Page title is required';
    isValid = false;
  }
  return isValid;
};

const handleSubmit = async () => {
  try {
        if (validateForm()) {
            if (store.getters.editData === null) {
                handleAddPages({ ...form.value })
            }
            else {
                if (form.value.domain_id !== PreviousDomain.value) {
                    delete form.value.id;
                }
                const { deleted_at, created_at, updated_at, featured_image_url, ...refinedPayload } = form.value;
                handleEditPages({ ...refinedPayload })
            }
        }
    } catch (e) {
        console.error('Error material add edit :', e)
    }
};

// api calls
const handleAddPages = async (payload) => {
  loading.value = true;
  try {
    const res = await PagesServices.addPages(payload);
    if (res.status === 200 && res.data.success) {
      showToast(res.data.message, 'success');
      router.push('/pages');
    } else if (res.data.status_code === 400) {
      showToast(res.data.message, 'error');
    }
  } catch (e) {
    console.error('Error while adding pages:', e);
  } finally {
    loading.value = false;
  }
};

const handleEditPages = async (payload) => {
  loading.value = true;
  try {
    const res = await PagesServices.editPages(payload);
    if (res.status === 200 && res.data.success) {
      showToast(res.data.message, 'success');
      store.dispatch('clearEditData')
      router.push('/pages');
    } else if (res.data.status_code === 400) {
      showToast('Something went wrong', 'error');
    }
  } catch (e) {
    console.error('Error while editing pages:', e);
  } finally {
    loading.value = false;
  }
};

onMounted(()=>{
      PreviousDomain.value = store.getters.getDomain.id
      if(store.getters.editData !== null) {
        SliderSelects.value=store.getters.editData.gallery_urls
      }
})
</script>