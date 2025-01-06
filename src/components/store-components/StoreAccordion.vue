<template>
  <div class="w-full mx-auto border-t border-gray-4">
    <!-- Accordion -->
    <div v-for="(item, index) in items" :key="index" class="border-b border-gray-4">
      <!-- Parent Item -->
      <div
        class="flex w-full md:w-1/3 border justify-between items-center p-4 cursor-pointer transition-all duration-300"
        @click="toggleParent(index)">
        <div>
          <span :class="activeParent === index ? 'text-orange' : 'text-black'">{{ item.swatch.title }}</span>
        </div>
        <div :class="['w-3 h-3 transition-transform duration-300', activeParent === index ? 'rotate-90' : '']">
          <Arrow direction="left" :strokeWidth="22.5" :fillColor="activeParent === index ? '#d98c3a' : '#000000'" />
        </div>
      </div>
      <!-- Child Items -->
      <TransitionRoot as="template" :show="activeParent === index" enter="transition-all duration-1000 ease-in"
        enterFrom="max-h-0 overflow-hidden" enterTo="max-h-screen overflow-hidden"
        leave="transition-all duration-700 ease-out" leaveFrom="max-h-screen overflow-hidden"
        leaveTo="max-h-0 overflow-hidden">
        <div class="">
          <div v-for="(child, childIndex) in item.swatch.materials" :key="childIndex"
            class="border-t cursor-pointer transition-colors hover:bg-gray-100"
            @click="openPopup(item, child, childIndex)">
            <div class="flex items-center justify-between w-full pr-10 md:w-1/3 p-3 pl-6"
              :class="activeChild === childIndex ? 'text-orange' : 'text-black'">
              <span>{{ child.name }}</span>
              <Arrow direction="left" :strokeWidth="22.5" :fillColor="'currentColor'" />
            </div>
          </div>
        </div>
      </TransitionRoot>
    </div>
<<<<<<< HEAD
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { TransitionRoot, TransitionChild } from '@headlessui/vue'
  import { Arrow, Close } from '../frontend-components/Svg/Icons'
  import { onClickOutside } from '@vueuse/core'
  
  const items = ref([
    {
      title: "Surface Materials",
      description: "Lebello RopeTek is our exclusive design of outdoor ropes. They have been designed exclusively for the Lebello collection and are available on many pieces where they are woven directly onto the product. Customization might be available for large contract applications.Our Gildo Rope is a larger knotted ropes that adds visual texture and complexity. Composition: 100% Polyolefin Made in Italy",
      children: [
        { name: "Galfasa G4", images: Array(24).fill("/src/assets//lebello/images/1_Gafsa.png") },
        { name: "Structures G4", images: Array(2).fill("/src/assets//lebello/images/1_Gafsa.png") }
      ]
    },
    {
      title: "Frame Colors",
      description: "Lebello RopeTek is our exclusive design of outdoor ropes. They have been designed exclusively for the Lebello collection and are available on many pieces where they are woven directly onto the product. Customization might be available for large contract applications.Our Gildo Rope is a larger knotted ropes that adds visual texture and complexity. Composition: 100% Polyolefin Made in Italy",
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
=======
    <!-- Popup/Drawer -->
    <TransitionRoot as="template" :show="showPopup" enter="transition-opacity duration-1000" enterFrom="opacity-0"
      enterTo="opacity-100" leave="transition-opacity duration-1000" leaveFrom="opacity-100" leaveTo="opacity-100">
      <div class="fixed inset-0 px-10 bg-black bg-opacity-50 flex items-center justify-end z-[9999]">
        <TransitionChild as="template" enter="transition transform duration-1500 ease-in-out"
          enterFrom="translate-x-full" enterTo="translate-x-0" leave="transition transform duration-1500 ease-in-out"
          leaveFrom="translate-x-0" leaveTo="translate-x-full">
          <div v-if="showPopup"
            class="absolute px-24 pl-10 top-0 bottom-0 right-0 bg-white shadow-xl w-full md:w-2/3 lg:w-4/6 z-50"
            @click.stop>
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
                <p class="font-MyriadPro leading-[31px] text-[16px]" v-html="popupDescription"></p>
                <!-- Dropdown -->
                <select v-model="selectedMaterialName" @change="updateSelectedMaterial"
                  class="text-black my-5 leading-[16px] text-[14px] w-36 rounded-full focus:outline-none focus:ring-0 focus:ring-black">
                  <option v-for="material in currentItem.materials" :key="material.name" :value="material.name">
                    {{ material.name }}
                  </option>
                </select>

                <!-- Images Grid -->
                <div class="image-scrollbar max-h-[350px] overflow-y-auto">
                  <div class="grid h-full grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div v-for="(image, index) in selectedMaterialImages" :key="index" class="aspect-square">
                      <img :src="$filePath(image.file_url)" :alt="image.name" class="object-cover w-full h-full" />
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

const props = defineProps({
  accordionData: {
    type: Array,
    required: true
>>>>>>> 535ece4835a4694d46e179c5250a0109a7d426cf
  }
})

const closeMenu = ref(null)
const closeSideMenu = () => { showPopup.value = false; activeChild.value = null }
onClickOutside(closeMenu, closeSideMenu)

const items = ref(props.accordionData ? props.accordionData : [])

const activeParent = ref(null)
const showPopup = ref(false)
const popupTitle = ref('')
const popupDescription = ref('')
const currentItem = ref({})
const selectedMaterialName = ref('')
const selectedMaterialImages = ref([])

const toggleParent = (index) => {
  activeParent.value = activeParent.value === index ? null : index
}

const openPopup = (item, child) => {
  currentItem.value = item.swatch;
  popupTitle.value = item.swatch.title;
  popupDescription.value = item.swatch.description;

  selectedMaterialName.value = child.name;
  selectedMaterialImages.value = child.children.map((c) => ({
    name: c.name,
    file_url: c.media_data.file_url,
  }));
  showPopup.value = true;
};

const updateSelectedMaterial = () => {
  const material = currentItem.value.materials.find(
    (m) => m.name === selectedMaterialName.value
  );
  if (material) {
    selectedMaterialImages.value = material.children.map((child) => ({
      name: child.name,
      file_url: child.media_data.file_url,
    }));
  }
};


const closePopup = () => {
  showPopup.value = false
}



watch(selectedMaterialName, (newMaterialName) => {
  updateSelectedMaterial()
})

watch(() => props.accordionData, (newData) => {
  items.value = newData
}, { immediate: true })
</script>
