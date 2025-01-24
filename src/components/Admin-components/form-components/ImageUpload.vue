<template>
  <div class="relative">
    <!-- Input allows multiple file selection -->
    <input 
      ref="fileInput" 
      type="file" 
      @change="handleFileInputChange" 
      accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .mp4, .avi, .mkv, .mov"
      class="py-2 px-4 border rounded-lg bg-white  focus:outline-none focus:ring-0 outline-none border-none" 
      multiple>
      
    <!-- Display the selected files -->
    <div v-if="imageUrls.length > 0" class="absolute top-0 right-0 p-2 pt-3 text-red">
      <button @click="clearImages">
        &#10006;
      </button>
    </div>
    
    <!-- Show selected image previews -->
    <!-- <div v-if="imageUrls.length > 0" class="mt-4">
      <div v-for="(url, index) in imageUrls" :key="index" class="inline-block mr-2">
        <img :src="url" alt="Uploaded Image" class="max-w-xs max-h-48" />
      </div>
    </div> -->
  </div>
</template>
<script setup>
import { ref } from 'vue';

const emits = defineEmits(['file-selected']);
const imageUrls = ref([]);  
const fileInput = ref(null);
let selectedFiles = ref([]);

const handleFileInputChange = (event) => {
  const files = event.target.files;
  
  if (files.length > 0) {
    selectedFiles.value = Array.from(files); 
    
    imageUrls.value = [];
    
    selectedFiles.value.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        imageUrls.value.push(reader.result);  
      };
      reader.readAsDataURL(file);
    });
    
    emits('file-selected', selectedFiles.value);
  }
};

const clearImages = () => {
  emits('file-selected', []);
  imageUrls.value = [];  
  selectedFiles.value = []; 
  if (fileInput.value) {
    fileInput.value.value = '';  
  }
};
</script>
