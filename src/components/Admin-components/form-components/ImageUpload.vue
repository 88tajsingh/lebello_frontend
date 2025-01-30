<template>
  <div class="relative">
    
    <!-- Input allows multiple file selection -->
    <input ref="fileInput" type="file" @change="handleFileInputChange"
      accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .mp4, .avi, .mkv, .mov"
      class="py-2 hidden px-4 border rounded-lg bg-white focus:outline-none focus:ring-0 outline-none border-none"
      multiple>

    <!-- Drag and Drop Zone -->
    <div class="drop-zone" @dragover.prevent @drop="handleDrop" @click="triggerFileInput">
      <p class="text-gray-500 text-center">{{
        imageUrls?.length > 0 ? `${imageUrls?.length} Selected Files add more` : 'Drag & Drop your files here or click to select'
      }}</p>
    </div>

    <!-- Display the selected files -->
    <!-- <div v-if="imageUrls.length > 0" class="absolute top-0 right-0 p-2 pt-3 text-red">
      <button @click="clearImages">
        &#10006;
      </button>
    </div> -->

    <!-- Show selected image previews -->
    <div v-if="imageUrls.length > 0" class="mt-4">
      <div class="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-3">
        <div v-for="(url, index) in imageUrls" :key="index" class="flex justify-center relative">
          <img :src="url" alt="Uploaded Image"
            class="full object-cover border border-black rounded-lg w-full h-[150px]" />

          <button @click="removeImage(index)"
            class="absolute top-1 right-1 bg-white rounded-full shadow-md p-1 opacity-80 hover:opacity-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-700" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M6 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H7a1 1 0 01-1-1V8zm8-3a1 1 0 00-1-1H7a1 1 0 00-1 1v1H4a1 1 0 100 2h12a1 1 0 100-2h-2V5z"
                clip-rule="evenodd" />
            </svg>
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emits = defineEmits(['file-selected']);
const imageUrls = ref([]);
const fileInput = ref(null);
let selectedFiles = ref([]);

// Handle file input change (when files are selected)
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

// Handle drag and drop functionality
const handleDrop = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;

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

// Trigger file input click event for selecting files
const triggerFileInput = () => {
  fileInput.value.click();
};

// Clear selected files and image previews
const clearImages = () => {
  emits('file-selected', []);
  imageUrls.value = [];
  selectedFiles.value = [];
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// Remove selected image by index
const removeImage = (index) => {
  imageUrls.value.splice(index, 1);  // Remove the image URL
  selectedFiles.value.splice(index, 1);  // Remove the corresponding file from the list

  // Emit the updated files list after removal
  emits('file-selected', selectedFiles.value);
};
</script>

<style scoped>
.drop-zone {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
}

.drop-zone p {
  font-size: 14px;
  color: #555;
}

.drop-zone:hover {
  background-color: #f5f5f5;
}
</style>
