<template>
  <div class="relative">
    <input ref="fileInput" type="file" @change="handleFileInputChange" accept="image/*"
           class="py-2 px-4 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-0 ">
    <button v-if="imageUrl" @click="clearImage" class="absolute top-0 right-0 p-2 pt-3 text-red-600 hover:text-red-800">
      &#10006; 
    </button>
  </div>
  <!-- <div v-if="imageUrl">
    <img :src="imageUrl" alt="Uploaded Image" class="mt-4 max-w-xs max-h-48">
  </div> -->
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emits = defineEmits(['file-selected']);
const imageUrl = ref('');
const fileInput = ref(null); 
let selectedFile = null;

const handleFileInputChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      imageUrl.value = reader.result;
    };
    reader.readAsDataURL(file);

    emits('file-selected', file);
  }
};

const clearImage = () => {
  imageUrl.value = '';
  selectedFile = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};
</script>
