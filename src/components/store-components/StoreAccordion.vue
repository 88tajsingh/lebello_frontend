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
    required: true,
    default: () => [ { "swatch": { "id": 7, "title": "RopeTek", "description": "<p>Lebello RopeTek is our exclusive design of outdoor ropes. They have been designed exclusively for the Lebello collection and are available on many pieces where they are woven directly onto the product. Customization might be available for large contract applications.Our Gildo Rope is a larger knotted ropes that adds visual texture and complexity.</p>\n<p>&lt;strong&gt;Composition:&lt;/strong&gt; 100% Polyolefin<br>Made in Italy</p>", "materials": [ { "id": 7, "name": "Mini Ropes", "children": [ { "id": 8, "name": "Breeze", "media_id": 49, "media_data": { "id": 49, "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg" } }, { "id": 9, "name": "Cactus", "media_id": 50, "media_data": { "id": 50, "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg" } }, { "id": 10, "name": "Ruby", "media_id": 51, "media_data": { "id": 51, "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg" } }, { "id": 11, "name": "Bronze", "media_id": 52, "media_data": { "id": 52, "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg" } } ], "description": "<p>Lebello RopeTek is our exclusive design of outdoor ropes. They have been designed exclusively for the Lebello collection and are available on many pieces where they are woven directly onto the product. Customization might be available for large contract applications.Our Gildo Rope is a larger knotted ropes that adds visual texture and complexity.</p>\n<p>&lt;strong&gt;Composition:&lt;/strong&gt; 100% Polyolefin<br>Made in Italy</p>" } ] } }, { "swatch": { "id": 8, "title": "Lebello Fibers", "description": "<p>Our outdoor materials are made from HDPE - High Density Polyethylene synthetic fibers. The material has a high UV and weather resistants. The fibers are characterized by there durability and performance during temperature fluctuations. Resistant to pool water, sea salt, and changes in climate with a high tensile strength of &amp;gt; 230 kg/cm2. Easy maintenance and free of toxins that is 100% recyclable and friendly on the environment. Our products can be left outside all year round and is able to withstand temperatures from -20&deg;C to +55&deg;C. We offer two types of material sizes Round and Peel Fibers. Please refer to the color chart to view the available product options. Fibers exceed ISO 4892-2 Compliance. Our Fibers are 100% recyclable and are non-toxic to the environment.</p>", "materials": [ { "id": 12, "name": "Peel Fibers", "children": [ { "id": 13, "name": "Beige", "media_id": 53, "media_data": { "id": 53, "file_url": "materials/peel fiber/Beige-peel-fibre-185x185-185X185.png" } }, { "id": 14, "name": "Curacao", "media_id": 55, "media_data": { "id": 55, "file_url": "materials/peel fiber/Curacao-peel-fibre-185x185-185X185.png" } } ], "description": "<p>Our outdoor materials are made from HDPE - High Density Polyethylene synthetic fibers. The material has a high UV and weather resistants. The fibers are characterized by there durability and performance during temperature fluctuations. Resistant to pool water, sea salt, and changes in climate with a high tensile strength of &amp;gt; 230 kg/cm2. Easy maintenance and free of toxins that is 100% recyclable and friendly on the environment. Our products can be left outside all year round and is able to withstand temperatures from -20&deg;C to +55&deg;C. We offer two types of material sizes Round and Peel Fibers. Please refer to the color chart to view the available product options. Fibers exceed ISO 4892-2 Compliance. Our Fibers are 100% recyclable and are non-toxic to the environment.</p>" } ] } } ]
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