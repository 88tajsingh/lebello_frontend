<template>
    <div class="w-full mx-auto border-t border-gray-4">
      <!-- Accordion -->
      <div v-for="(item, index) in items" :key="index" class="border-b border-gray-4">
        <!-- Parent Item -->
        <div class="flex w-full md:w-1/3 border justify-between items-center p-4 cursor-pointer transition-all duration-300" @click="toggleParent(index)">
          <div>
            <span :class="activeParent === index ? 'text-orange' : 'text-black'">{{ item.title }}</span>
          </div>
          <div :class="[ 'w-3 h-3 transition-transform duration-300', activeParent === index ? 'rotate-90' : '' ]">
            <Arrow direction="left" :strokeWidth="22.5" :fillColor="activeParent === index ? '#d98c3a' : '#000000'" />
          </div>
        </div>
        <!-- Child Items -->
        <TransitionRoot as="template" :show="activeParent === index" enter="transition-all duration-1000 ease-in" enterFrom="max-h-0 overflow-hidden" enterTo="max-h-screen overflow-hidden" leave="transition-all duration-700 ease-out" leaveFrom="max-h-screen overflow-hidden" leaveTo="max-h-0 overflow-hidden">
          <div class="">
            <div v-for="(child, childIndex) in item.children" :key="childIndex" class="border-t cursor-pointer transition-colors hover:bg-gray-100" @click="openPopup(item, child, childIndex)">
              <div class="flex items-center justify-between w-full pr-10 md:w-1/3 p-3 pl-6" :class="activeChild === childIndex ? 'text-orange' : 'text-black'">
                <span>{{ child.name }}</span>
                <Arrow direction="left" :strokeWidth="22.5" :fillColor="'currentColor'" />
              </div>
            </div>
          </div>
        </TransitionRoot>
      </div>
      <!-- Popup/Drawer -->
      <TransitionRoot as="template" :show="showPopup" enter="transition-opacity duration-700" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-700" leaveFrom="opacity-100" leaveTo="opacity-100">
        <div class="fixed inset-0 px-10 bg-black bg-opacity-50 flex items-center justify-end z-[9999]">
          <TransitionChild as="template" enter="transition transform duration-1000 ease-in-out" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transition transform duration-1500 ease-in-out" leaveFrom="translate-x-0" leaveTo="translate-x-full">
            <div v-if="showPopup" class="absolute px-24 pl-10 top-0 bottom-0 right-0 bg-white shadow-xl w-full md:w-2/3 lg:w-4/6 z-50" @click.stop>
              <div ref="closeMenu" class="flex mx-auto gap-10 py-16 pb-20">
                <!-- Back button -->
                <div class="flex">
                  <button class="mt-2 flex text-black" @click="closePopup">
                    <Close size="24px" :fillColor="'currentColor'" />
                  </button>
                </div>
                <!-- Content -->
                <div class="text-black font-graphik w-full">
                  <h1 class="text-4xl leading-[55px] text-black">{{ popupTitle }}</h1>
                  <p class="font-MyriadPro leading-[31px] text-[16px]">{{ popupDescription }}</p>
                  <!-- Dropdown -->
                  <select v-model="selectedChildName" @change="updateSelectedChild" class="text-black my-5 leading-[16px] text-[14px] w-36 rounded-full focus:outline-none focus:ring-0 focus:ring-black">
                    <option v-for="child in currentItem.children" :key="child.name" :value="child.name">
                      {{ child.name }}
                    </option>
                  </select>
                  <!-- Images Grid -->  
                  <div class="image-scrollbar max-h-[350px] overflow-y-auto">
                    <div class="grid h-full grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div v-for="(image, index) in selectedChildImages" :key="index" class="aspect-square">
                        <img :src="image" alt="Selected image" class="object-cover w-full h-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </TransitionRoot>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { TransitionRoot, TransitionChild } from '@headlessui/vue'
  import { Arrow, Close } from '../frontend-components/Svg/Icons'
  import { onClickOutside } from '@vueuse/core'
  
  const items = ref([
    {
      title: "Surface Materials",
      description: "The Surface-Tex is an exclusive collection of high-performance technical outdoor fabrics...",
      children: [
        { name: "Galfasa G4", images: Array(24).fill("/src/assets//lebello/images/1_Gafsa.png") },
        { name: "Structures G4", images: Array(2).fill("/src/assets//lebello/images/1_Gafsa.png") }
      ]
    },
    {
      title: "Frame Colors",
      description: "Premium powder-coated aluminum frames.",
      children: [
        { name: "Metallic Collection", images: Array(4).fill("/src/assets//lebello/images/1_Gafsa.png") },
        { name: "Earth Tones", images: Array(6).fill("/src/assets//lebello/images/1_Gafsa.png") }
      ]
    }
  ])
  
  const closeMenu = ref(null)
  const closeSideMenu = () => { showPopup.value = false; activeChild.value = null }
  onClickOutside(closeMenu, closeSideMenu)
  
  const activeParent = ref(null)
  const activeChild = ref(null)
  const showPopup = ref(false)
  const popupTitle = ref('')
  const popupDescription = ref('')
  const currentItem = ref({})
  const selectedChildName = ref('')
  const selectedChildImages = ref([])
  
  const toggleParent = (index) => {
    activeParent.value = activeParent.value === index ? null : index
  }
  
  const openPopup = (parent, child, childIndex) => {
    currentItem.value = parent
    activeChild.value = childIndex
    popupTitle.value = parent.title
    popupDescription.value = parent.description
    selectedChildName.value = child.name
    selectedChildImages.value = child.images
    showPopup.value = true
  }
  
  const closePopup = () => { showPopup.value = false; activeChild.value = null }
  
  const updateSelectedChild = () => {
    const child = currentItem.value.children.find(c => c.name === selectedChildName.value)
    if (child) { selectedChildImages.value = child.images }
  }
  
  watch(selectedChildName, (newChildName) => {
    updateSelectedChild()
  })
  </script>
  
  <style scoped>
  .image-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(217, 207, 207, 0.3) transparent;
    overflow-y: overlay;
  }
  
  .image-scrollbar::-webkit-scrollbar {
    width: 8px;
    
    background: transparent;
  }
  
  .image-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(239, 225, 225, 0.3);
    border-radius: 20px;
    border: 2px solid transparent;
    
    background-clip: padding-box;
  }
  
  .image-scrollbar::-webkit-scrollbar-track {
    background: transparent;
   
  }
  
  /* When hovering over the scrollbar */
  .image-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0);
    border: 2px solid transparent;
    background-clip: padding-box;
  }
  
  /* Ensure the scrollbar doesn't affect layout */
  .image-scrollbar {
    margin-right: -8px;
    padding-right: 8px;
  }
  </style>