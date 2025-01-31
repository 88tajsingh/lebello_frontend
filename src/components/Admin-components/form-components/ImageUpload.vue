<template>
  <div class="w-full">
    <!-- Hidden file input -->
    <input ref="fileInput" type="file" @change="handleFileInputChange"
      accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .mp4, .avi, .mkv, .mov" class="hidden" multiple>
    <!-- Drop Zone -->
    <div class="border-2 border-dashed rounded-lg  transition-all cursor-pointer hover:bg-gray-50"
      :class="[isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300']" @dragover.prevent
      @drop.prevent="handleDrop" @click="triggerFileInput" @dragenter.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false">
      <div v-if="!selectedFiles.length" class="flex flex-col py-10 items-center justify-center gap-4">
        <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g id="File / Cloud_Upload">
              <path id="Vector"
                d="M12 16V10M12 10L9 12M12 10L15 12M23 15C23 12.7909 21.2091 11 19 11C18.9764 11 18.9532 11.0002 18.9297 11.0006C18.4447 7.60802 15.5267 5 12 5C9.20335 5 6.79019 6.64004 5.66895 9.01082C3.06206 9.18144 1 11.3498 1 13.9999C1 16.7613 3.23858 19.0001 6 19.0001L19 19C21.2091 19 23 17.2091 23 15Z"
                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </g>
        </svg>

        <div class="text-center ">
          <h3 class="text-lg font-medium text-gray-700">Drop files here or click to upload</h3>
          <p class="mt-1 text-sm text-gray-500">(This is just a demo dropzone. Selected files are not actually
            uploaded.)</p>
        </div>
      </div>
      <div v-if="selectedFiles.length > 0" class="mt-2 max-h-[300px] overflow-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="(file, index) in selectedFiles" :key="index"
            class="relative group bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all">
            <div class="aspect-square rounded-lg mb-3 flex items-center justify-center bg-gray-50">
              <!-- Image Preview -->
              <img v-if="isImageFile(file)" :src="getFilePreview(file)" :alt="file.name"
                class="w-full h-full object-cover rounded-lg" />
              <!-- File Type Icons -->
              <div v-else class="p-4">
                <svg v-if="file.type.includes('pdf')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="w-12 h-12 text-red">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm0 0L14 8H6V4h8z">
                  </path>
                </svg>
                <svg v-else-if="file.type.includes('doc')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="w-12 h-12 text-blue">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm0 0L14 8H6V4h8z">
                  </path>
                </svg>
                <svg v-else-if="file.type.includes('sheet')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="w-12 h-12 text-green">
                  <path d="M6 2h12c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 2v16h12V4H6z">
                  </path>
                  <path d="M6 8h12V6H6zm0 4h12V10H6zm0 4h12v-2H6z"></path>
                </svg>
                <svg v-else-if="file.type.includes('video')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="w-12 h-12 text-purple-500">
                  <path d="M4 2v20l16-10-16-10z"></path>
                </svg>

                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-12 h-12 text-gray-400">
                  <path d="M6 2H6a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4l-4-4H6z"></path>
                </svg>
              </div>
            </div>
            <!-- File Info -->
            <div class="text-sm">
              <p class="font-medium text-gray-700 truncate" :title="file.name">{{ file.name }}</p>
              <p class="text-gray-500 text-xs">{{ formatFileSize(file.size) }}</p>
            </div>

            <!-- Remove Button -->
            <button @click.stop="removeFile(index)" class="absolute top-2 right-2 p-1 rounded-full bg-white shadow-sm border border-gray-200 
               opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50">
               <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path></g></svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { UploadCloud, FileText, FileSpreadsheet, Video, File, X } from 'lucide-vue-next'
import { Close } from '@/components/frontend-components/Svg/Icons'
const emit = defineEmits(['file-selected'])
const fileInput = ref(null)
const selectedFiles = ref([])
const isDragging = ref(false)

const handleFileInputChange = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    addFiles(Array.from(files))
  }
}

const handleDrop = (event) => {
  isDragging.value = false
  const files = event.dataTransfer.files
  if (files.length > 0) {
    addFiles(Array.from(files))
  }
}

const isFileDuplicate = (file) => {
  return selectedFiles.value.some(f => f.name === file.name && f.size === file.size)
}

const addFiles = (files) => {
  files.forEach(file => {
    if (!isFileDuplicate(file)) {
      selectedFiles.value.push(file)
      emit('file-selected', selectedFiles.value)
    }
  })
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
  emit('file-selected', selectedFiles.value)
}

const isImageFile = (file) => {
  return file.type.startsWith('image/')
}

const getFilePreview = (file) => {
  return URL.createObjectURL(file)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handleFileUpload = () => {
  emit('file-selected', selectedFiles.value)
}
</script>
