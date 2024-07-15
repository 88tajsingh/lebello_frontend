<template>
  {{ form }}
  <DefaultCard :cardTitle="id ? `Edit Pages` : `Add Pages`">
    <form @submit.prevent="handleSubmit">
      <div class="p-6.5 grid grid-cols-2 gap-2">

        <div class="flex flex-col">
          <input-label for="page_title" value="Page Title" />
          <TextInput type="text" class="block mr-2 h-[40px] w-full" v-model="form.page_title"
            :errMessage="errors.page_title" />
        </div>
        <div class="flex flex-col">
          <input-label for="page_title" value="Page Slug" />
          <TextInput type="text" class="block mr-2 h-[40px] w-full" v-model="form.page_slug"
            :errMessage="errors.page_slug" />
        </div>

        <div class="flex flex-col">
          <input-label for="seo_title" value="SEO Title" />
          <TextInput type="text" class="block mr-2 h-[40px] w-full" :class="{ 'border-red-500': errors.seo_title }"
            v-model="form.seo_title" :errMessage="errors.seo_title" />
          <p class="text-sm text-[#646970] text-[11.5px]">Custom title tag.</p>
        </div>
        <div class="flex flex-col">
          <input-label for="seo_title" value="Author" />
          <TextInput type="text" class="block mr-2 h-[40px] w-full" 
           v-model="form.author"  disabled/>
        </div>

        <div class="col-span-2 w-full">
          <input-label for="seo_title" value="Page Description" />
          <TinyMCE v-model="form.page_description" />
        </div>
        
        <div v-if="form.gallery !== null" class="col-span-2 w-full border border-gray rounded-lg">
          <div class="mt-2 ml-3  ">
          <input-label for="slides" value="Slider " />
          <div class="text-gray-4 text-[13px]">Minimum Size 1600 x 700px</div>
          <div class=" flex flex-wrap">
            <div class="relative p-1" v-for="(slide, index) in slider" :key="`slide-${index}`">
              <img class=" border border-gray-4 m-1 p-2 h-[168px] w-[156px]" src="../../../assets/profilepic.png">
              <div class=" absolute top-2 right-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
            </div>
          </div>
          <button @click="()=> IsOpen=true" type="button"
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
          <input-label for="page_tagline" value="Page Tagline" />
          <div class="py-2 rounded-lg px-2 border border-stroke" @click="() => IsOpen = true"> {{
            mediaName }}</div>
          <div class=" mt-3 flex overflow-x-auto">
            <img v-for="file in selectedFiles" :key="file" :src="$filePath(file.file_url)"
              class="inline-block w-auto h-34 mr-4" :alt="file.alternative_text || 'image'">
          </div>
        </div>
        <div class="col-span-1 w-full">
          <input-label for="template" value="Template" />
          <TextInput type="text" class="block mr-2 w-full" v-model="form.template" />
        </div>
        <div class="col-span-1 w-full">
          <input-label for="comments" value="Comments" />
          <TextInput type="text" class="block mr-2 w-full" v-model="form.comments" />
        </div>
        <div class="col-span-1 w-full">
          <input-label for="parent_page" value="Parent Page" />
          <TextInput type="text" class="block mr-2 w-full" v-model="form.parent_page" />
        </div>
        <div class="col-span-1 w-full">
          <input-label for="page_order" value="Page Order" />
          <TextInput type="text" class="block mr-2 w-full" v-model="form.page_order" />
        </div>
        <div class="col-span-1 w-full">
          <input-label for="parentOrder" value="Visibility" />
          <TextInput type="text" class="block mr-2 w-full" v-model="form.visibility" />
        </div>
        
        <div class="col-span-1 w-full">
          <input-label for="parentOrder" value="Visibility" />
         <div class="flex gap-2">
           <RadioButton 
           v-for="option in options" 
           :key="option.value" 
        name="Visibility" 
      :value="option.value" 
      :label="option.label" 
      :modelValue="selectedOption"
      
      @update:modelValue="selectedOption = $event"
      />
    </div>
    <div v-if="selectedOption==='Password protected'" class="">
      <TextInput type="password" class="block mr-2 w-full" v-model="form.visibility" placeholder="Password" />
    </div>
      <div class="mt-4">
      Selected Option: {{ selectedOption }}
    </div>
        </div>
        <!-- <div class="flex justify-center items-center h-screen">
    <div class="bg-white p-6 rounded shadow-md w-64">
      <DatePicker
        v-model="selectedDateTime"
        label="Select Date and Time"
        format="YYYY-MM-DD HH:mm:ss"
        :use12-hour="false"
      />

      <p class="mt-2 text-sm text-gray-500">Selected Date and Time: {{ selectedDateTime }}</p>
    </div>add 
  </div> -->
        <button type="submit"
          class="flex col-span-2 mt-5 w-full mb-10 m-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
          Submit
        </button>
      </div>
    </form>
  </DefaultCard>
  <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="IsOpen">
    <GetLibrary :getFlag="true" :selected="selectedFiles" :singleFile="true" :closeModal="close"
      :selectedFiles="handleLibrary" />
  </popupModal>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { handleFiles } from '@/helper/functions';
import DatePicker from  '@/components/Admin-components/form-components/DatePicker.vue'
import RadioButton from '@/components/Admin-components/form-components/RadioButton.vue';
import GetLibrary from '@/views/Admin/Media-section/Index.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue';
import TinyMCE from '@/components/Admin-components/TinyMCE.vue';
import PagesServices from '@/services/PagesServices';
import router from '@/router';
import store from '@/store';
import DefaultCard from '@/components/Admin-components/DefaultCard.vue';
const props = defineProps({
  id: {
    type: String,
    default: null,
  }
});
const mediaName = ref('select Feature Media')
// const props = defineProps(['id']);
const data = JSON.stringify(store.getters);
console.log('data in vuex: ' + data)
const id = props.id
const errors = ref({});
const selectedFiles = ref([]);
const IsOpen = ref(false)
const form = ref({ gallery: [1, 2, 3,] });
const loading = ref(false)
const slider = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const selectedOption = ref('option1')
const radioName = 'options'

const options = [
  { value: 'Public', label: 'Public' },
  { value: 'Private', label: 'Private' },
  { value: 'Password protected', label: 'Password protected' }
]
const close = () => {
  IsOpen.value = false;
}

const handleLibrary = (data) => {
  close();
  selectedFiles.value = data
  const object = handleFiles(data)
  mediaName.value= object.mediaName;

  console.log("object",object)
  // const media_titles = data.map(item => item.title);
  // mediaName.value = media_titles.join(', ');
  // const media_ids = data.map(item => item.id);
  // form.value.featured_image = media_ids;
  // console.log('in form ', selectedFiles.value)
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
  if (validateForm()) {
    if (props.id !== null) {
      handleEditPages({ ...form.value })
    }
    else {
      handleAddPages({ ...form.value })
    }

  }
};

// api calls
const handleGetPages = async (payload) => {
  console.log('get payload: ' + JSON.stringify(payload))
  try {
    loading.value = true;
    const res = await PagesServices.getPages(payload);
    if (res.status === 200 && res.data.success === true) {
      form.value = res.data.data[0];
      loading.value = false;

    }
  } catch (e) {
    console.error('Error while pages get:', e);
  }
};
const handleAddPages = async (payload) => {
  try {
    loading.value = true;
    const res = await PagesServices.addPages(payload);
    if (res.status === 200 && res.data.success === true) {
      loading.value = false;
      router.push('/pages')
    }
    if (res.status_code === 400) {
      loading.value = false;
      console.error('Error while adding pages:', res.message);
    }
  } catch (e) {
    loading.value = false;
    console.error('Error while adding pages:', e);
  }
};
const handleEditPages = async (payload) => {
  try {
    loading.value = true;
    const res = await PagesServices.editPages(payload);
    if (res.status === 200 && res.data.success === true) {
      loading.value = false;
      router.push('/pages')
    }
    if (res.status_code === 400) {
      loading.value = false;
      console.error('Error while editing pages:', res.message);
    }
  } catch (e) {
    loading.value = false;
    console.error('Error while editing pages:', e);
  }
};

onMounted(() => {
  if (props.id !== undefined && props.id !== null && props.id !== '') {
    const payload = { id: props.id }
    console.log("payload ", payload)
    handleGetPages(payload);
  }
  // navigateToRoute();
});
</script>

<!-- if (errors.value.page_title) {
    const errorFieldRef = refs.page_title;
    if (errorFieldRef && errorFieldRef.$el) {
      errorFieldRef.$el.focus();
    }
  } -->