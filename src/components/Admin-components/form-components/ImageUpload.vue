<template>
  <div class="relative">
    <!-- Input allows multiple file selection -->
    <input
      ref="fileInput"
      type="file"
      @change="handleFileInputChange"
      accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .mp4, .avi, .mkv, .mov"
      class="py-2 hidden px-4 border rounded-lg bg-white focus:outline-none focus:ring-0 outline-none border-none"
      multiple
    >

    <!-- Drag and Drop Zone -->
    <div 
      class="drop-zone" 
      @dragover.prevent 
      @drop="handleDrop" 
      @click="triggerFileInput"
      :class="{ 'drop-zone-active': isDragging }"
      @dragenter.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
    >
      <p class="text-gray-500 text-center">
        {{ dropZoneText }}
      </p>
    </div>

    <!-- Show selected image previews -->
    <div v-if="imageUrls.length > 0" class="mt-4">
      <div class="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-3">
        <div v-for="(url, index) in imageUrls" :key="index" class="flex justify-center relative">
          <img 
            :src="url" 
            alt="Uploaded Image"
            class="full object-cover border border-black rounded-lg w-full h-[150px]" 
          />
          <button 
            @click="removeImage(index)"
            class="absolute top-1 right-1 bg-white rounded-full shadow-md p-1 opacity-80 hover:opacity-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H7a1 1 0 01-1-1V8zm8-3a1 1 0 00-1-1H7a1 1 0 00-1 1v1H4a1 1 0 100 2h12a1 1 0 100-2h-2V5z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { createHash } from 'crypto';

const emits = defineEmits(['file-selected']);
const imageUrls = ref([]);
const fileInput = ref(null);
const selectedFiles = ref([]);
const isDragging = ref(false);

const dropZoneText = computed(() => {
  if (imageUrls.value.length > 0) {
    return `${imageUrls.value.length} Selected Files - Drop more or click to select`;
  }
  return 'Drag & Drop your files here or click to select';
});

const handleFileInputChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    addFiles(Array.from(files));
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  isDragging.value = false;
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    addFiles(Array.from(files));
  }
};

const calculateHash = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const hash = createHash('sha256');
      hash.update(e.target.result);
      resolve(hash.digest('hex'));
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

const addFiles = async (files) => {
  for (const file of files) {
    const hash = await calculateHash(file);
    if (!selectedFiles.value.some(f => f.name === file.name && f.hash === hash)) {
      selectedFiles.value.push({ ...file, hash });
      const reader = new FileReader();
      reader.onload = () => {
        imageUrls.value.push(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  emits('file-selected', selectedFiles.value);
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const removeImage = (index) => {
  imageUrls.value.splice(index, 1);
  selectedFiles.value.splice(index, 1);
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
  transition: all 0.3s ease;
}

.drop-zone p {
  font-size: 14px;
  color: #555;
}

.drop-zone:hover, .drop-zone-active {
  background-color: #f5f5f5;
  border-color: #aaa;
}
</style>

