<template>
  {{pagesData}}
    <form @submit.prevent="handleSubmit">
      <div class="p-6.5 grid grid-cols-2 gap-2">
        <div class="flex flex-col">
          <input-label for="page_title" value="Page Title" />
          <text-input 
            type="text" 
            class="block mr-2 h-[40px] w-full" 
            :class="{ 'border-red': errors.page_title }" 
            v-model="form.page_title" 
            :errMessage="errors.page_title" 
            @update:model="$clearError('page_title')" 
          />
        </div>
  
        <div class="flex flex-col">
          <input-label for="seo_title" value="SEO Title" />
          <text-input 
            type="text" 
            class="block mr-2 h-[40px] w-full" 
            :class="{ 'border-red-500': errors.seo_title }" 
            v-model="form.seo_title" 
            :errMessage="errors.seo_title" 
            @update:model="clearError('seo_title')" 
          />
          <p class="text-sm text-[#646970] text-[11.5px]">Custom title tag.</p>
        </div>
  
        <div class="col-span-2 w-full">
          <input-label for="seo_meta_description" value="Meta Description" />
          <text-input 
            type="text" 
            class="block mr-2 w-full" 
            :class="{ 'border-red-500': errors.seo_meta_description }" 
            :isTextarea="true" 
            :rows="3" 
            v-model="form.seo_meta_description" 
            :errMessage="errors.seo_meta_description" 
            @update:model="clearError('seo_meta_description')" 
          />
          <p class="text-sm text-[#646970] text-[11.5px]">Most search engines use a maximum of 160 chars for the description.</p>
        </div>
  
        <div class="col-span-2 w-full">
          <input-label for="seo_meta_keywords" value="Meta Keywords" />
          <text-input 
            type="text" 
            class="block mr-2 w-full" 
            :class="{ 'border-red-500': errors.seo_meta_keywords }" 
            :isTextarea="true" 
            :rows="3" 
            v-model="form.seo_meta_keywords" 
            :errMessage="errors.seo_meta_keywords" 
            @update:model="clearError('seo_meta_keywords')" 
          />
          <p class="text-sm text-[#646970] text-[11.5px]">Separate each term with a comma.</p>
        </div>
  
        <div class="col-span-2 w-full">
          <input-label for="page_tagline" value="Page Tagline" />
          <text-input 
            type="text" 
            class="block mr-2 w-full" 
            :class="{ 'border-red-500': errors.page_tagline }" 
            :isTextarea="true" 
            :rows="3" 
            v-model="form.page_tagline" 
            :errMessage="errors.page_tagline" 
            @update:model="$clearError('page_tagline')" 
          />
          <p class="text-sm text-[#646970] text-[11.5px]">Type the page tagline here.</p>
        </div>
  
        <button 
          type="submit" 
          class="flex col-span-2 mt-5 w-full mb-10 m-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
        >
          Submit
        </button>
      </div>
    </form>
  </template>
  <script setup>
  import { ref } from 'vue';
  import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue';
  import TextInput from '@/components/Admin-components/form-components/TextInput.vue';
  
  const props = defineProps({
    pagesData: {
        type: Object,
    },
});

  const errors = ref({});
  const form = ref({ ...props.pagesData });
  
  const emit = defineEmits(['handleApi']);
  
//   const clearError = (field) => {
//     if (errors.value[field]) {
//       delete errors.value[field];
//     }
//   };
  
  const validateForm = () => {
    let isValid = true;
    errors.value = {};
  
    if (!form.value.page_title) {
      errors.value.page_title = 'Page title is required';
      isValid = false;
    }
    // if (!form.value.seo_title) {
    //   errors.value.seo_title = 'SEO title is required';
    //   isValid = false;
    // }
    // if (!form.value.seo_meta_description) {
    //   errors.value.seo_meta_description = 'Meta description is required';
    //   isValid = false;
    // }
    // if (!form.value.seo_meta_keywords) {
    //   errors.value.seo_meta_keywords = 'Meta keywords are required';
    //   isValid = false;
    // }
    // if (!form.value.page_tagline) {
    //   errors.value.page_tagline = 'Page tagline is required';
    //   isValid = false;
    // }
  
    return isValid;
  };
  
  const handleSubmit = async () => {
    if (validateForm()) {
      emit('handleApi', { ...form.value });
    }
  };
  </script>
  
  <!-- if (errors.value.page_title) {
    const errorFieldRef = refs.page_title;
    if (errorFieldRef && errorFieldRef.$el) {
      errorFieldRef.$el.focus();
    }
  } -->