<template>
<div class="w-fill lg:h-[400px]  ">   
    <div class="min-h-screen bg-white ">
    <!-- Breadcrumb -->
    <nav class="p-4 text-sm">
      <div class="flex items-center gap-2">
        <span class="text-gray-600">Collection</span>
        <!-- Heroicon: ChevronRight -->
        /
        <span class="text-primary">Tubo Sofa Exposed</span>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto grid grid-cols-1 gap-8 p-4 lg:grid-cols-2">
      <!-- Product Viewer -->
      <div class="relative aspect-square bg-gray-50 w-full h-[350px] rounded-lg">
        <div>3D Animation view</div>
        <ThreeDAnimaation/>
        <!-- Controls -->
        <!-- <div id="zoom-controls" class="absolute right-4 top-4 flex flex-col items-center gap-4 z-[9999] text-yellow-600"> -->
    <!-- Fullscreen Icon -->
    <!-- <button id="fullscreen-toggle" class="rounded-full p-2">
  <svg height="22px" width="22px" viewBox="0 0 512 512" fill="#000000">
    <polygon fill="#c2a02f" points="481.706,337.186 481.711,460.288 277.415,256 481.711,51.704 481.711,174.821 511.996,174.821 512,0 337.175,0 337.175,30.294 460.292,30.294 256,234.588 51.704,30.294 174.817,30.294 174.817,0 0,0 0.004,174.821 30.289,174.821 30.289,51.704 234.581,256 30.289,460.288 30.289,337.17 0.004,337.179 0,512 174.817,512 174.817,481.706 51.704,481.706 256,277.419 460.292,481.706 337.175,481.706 337.175,512 512,512 511.996,337.179" />
  </svg>
</button> -->

    
    <!-- Zoom In and Out Icons -->
    <!-- <div class="flex flex-col items-center bg-white rounded-full shadow-lg  border border-yellow-600">
        <button id="zoom-in" class="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m-7-7h14"/>
            </svg>
        </button>
        <div class="border-t border-yellow-600 w-full"></div>
        <button id="zoom-out" class="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14"/>
            </svg>
        </button>
    </div> -->

    <!-- Reset Icon -->
    <!-- <button id="zoom-reset" class="rounded-full p-2 ">
      <svg width="28px" height="28px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="1"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#c2a02f" d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"></path></g></svg>
    </button> -->
<!-- </div> -->


      </div>

      <!-- Configuration Panel -->
      <div class="space-y-6 flex flex-col h-full pl-14">
  <div>
    <h1 class="text-2xl font-semibold">3D CONFIGURATOR</h1>
  </div>

  <div class="space-y-4">
    <div>
      <h2 class="text-lg font-medium">Recommended Configuration</h2>
      <p class="text-sm text-gray-500">Please select the configuration</p>
    </div>

    <!-- Select Dropdown -->
    <div class="relative w-72 ">
      <label for="configuration" class="block text-sm font-medium text-gray-700 ">Select Configuration</label>
      <select 
        v-model="configuration"
        id="configuration"
        class="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="1">Configuration 1</option>
        <option value="2">Configuration 2</option>
        <option value="3">Configuration 3</option>
      </select>
    </div>
  </div>

  <!-- Buttons at the bottom -->
  <div class="mt-auto  pb-5 h-full flex flex-col md:flex-row sm:w-72 md:w-full  gap-4 md:items-end "> 
    <button 
      @click="handleStoreClick"
      class="text-[#B88746] hover:text-[#9E7339] border border-[#B88746] py-1 px-10 rounded-full"
    >
      ENQUIRE/EMAIL
    </button>
    <button 
      @click="handleStoreClick"
      class="bg-[#B88746] text-white hover:bg-[#9E7339] py-1 px-10 rounded-full"
    >
      SEE AT STORE
    </button>
  </div>
</div>

    </div>
  </div>
  </div>
  <div class="min-h-screen bg-white">
    <!-- Breadcrumb -->
    <nav class="p-4 text-sm">
      <div class="flex items-center gap-2">
        <span class="text-gray-600">Collection</span>
        <!-- Heroicon: ChevronRight -->
        /
        <span class="text-primary">Tubo Sofa Exposed</span>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto grid grid-cols-1 gap-8 p-4 lg:grid-cols-2">
      <!-- Product Viewer -->
      <div class="relative aspect-square bg-gray-50 rounded-lg">
        <div>3d images view</div>
        <Images3DView/>

        <!-- Controls -->
        <div id="zoom-controls" class="absolute right-4 top-10 flex flex-col items-center gap-4 z-[9999] text-yellow-600">
    <!-- Fullscreen Icon -->
    <button id="fullscreen-toggle" class="rounded-full p-2">
  <svg height="22px" width="22px" viewBox="0 0 512 512" fill="#000000">
    <polygon fill="#c2a02f" points="481.706,337.186 481.711,460.288 277.415,256 481.711,51.704 481.711,174.821 511.996,174.821 512,0 337.175,0 337.175,30.294 460.292,30.294 256,234.588 51.704,30.294 174.817,30.294 174.817,0 0,0 0.004,174.821 30.289,174.821 30.289,51.704 234.581,256 30.289,460.288 30.289,337.17 0.004,337.179 0,512 174.817,512 174.817,481.706 51.704,481.706 256,277.419 460.292,481.706 337.175,481.706 337.175,512 512,512 511.996,337.179" />
  </svg>
</button>

    
    <!-- Zoom In and Out Icons -->
    <div class="flex flex-col items-center bg-white rounded-full shadow-lg  border border-yellow-600">
        <button id="zoom-in" class="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m-7-7h14"/>
            </svg>
        </button>
        <div class="border-t border-yellow-600 w-full"></div>
        <button id="zoom-out" class="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14"/>
            </svg>
        </button>
    </div>

    <!-- Reset Icon -->
    <button id="zoom-reset" class="rounded-full p-2 ">
      <svg width="28px" height="28px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="1"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#c2a02f" d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"></path></g></svg>
    </button>
</div>


      </div>

      <!-- Configuration Panel -->
      <div class="space-y-6 flex flex-col h-full pl-14">
  <div>
    <h1 class="text-2xl font-semibold">3D CONFIGURATOR</h1>
  </div>

  <div class="space-y-4">
    <div>
      <h2 class="text-lg font-medium">Recommended Configuration</h2>
      <p class="text-sm text-gray-500">Please select the configuration</p>
    </div>

    <!-- Select Dropdown -->
    <div class="relative w-72 ">
      <label for="configuration" class="block text-sm font-medium text-gray-700 ">Select Configuration</label>
      <select 
        v-model="configuration"
        id="configuration"
        class="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="1">Configuration 1</option>
        <option value="2">Configuration 2</option>
        <option value="3">Configuration 3</option>
      </select>
    </div>
  </div>

  <!-- Buttons at the bottom -->
  <div class="mt-auto pb-5 h-full flex gap-4 items-end "> 
    <button 
      @click="handleStoreClick"
      class="text-[#B88746] hover:text-[#9E7339] border border-[#B88746] py-1 px-10 rounded-full"
    >
      ENQUIRE/EMAIL
    </button>
    <button 
      @click="handleStoreClick"
      class="bg-[#B88746] text-white hover:bg-[#9E7339] py-1 px-10 rounded-full"
    >
      SEE AT STORE
    </button>
  </div>
</div>

    </div>
  </div>
</template>

<script setup>

import Images3DView from '@/components/frontend-components/Images3DView.vue'
import ThreeDAnimaation from '@/components/Admin-components/ThreeDAnimaation.vue'
import { ChevronRightIcon,PlusIcon,MinusIcon,ArrowsPointingOutIcon,ArrowPathIcon  } from '@heroicons/vue/24/solid'
import { ref } from 'vue';

const configuration = ref('1')
const email = ref('')

const handleStoreClick = () => {
  console.log('Email:', email.value)
}

</script>