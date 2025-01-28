<template>
  <div class="faq_main_div " :class="{ 'no-scroll': isModalOpen }">
    <!-- Accordion -->
    <div v-for="(item, index) in items" :key="index" class="faq_title">
      <!-- Parent Item -->
      <div class="faq_head_mian   transition-all duration-300">
        <div class="faq_haed cursor-pointer" @click="toggleParent(index)">
          <span :class="activeParent === index ? 'text-orange' : 'text-black'">{{ item.swatch.title }}</span>
          <div>
            <Arrow :direction="activeParent === index ? 'up' : 'left'" :strokeWidth="10.5"
              :fillColor="activeParent === index ? '#d98c3a' : '#000000'" />
          </div>
        </div>

      </div>
      <!-- Child Items -->
      <TransitionRoot as="template" :show="activeParent === index" enter="transition-all duration-1000 ease-in"
        enterFrom="max-h-0 overflow-hidden" enterTo="max-h-screen overflow-hidden"
        leave="transition-all duration-700 ease-out" leaveFrom="max-h-screen overflow-hidden"
        leaveTo="max-h-0 overflow-hidden">
        <div class="inner_faq">
          <div v-for="(child, childIndex) in item.swatch.materials" :key="childIndex" class="faq_inner_cont">
            <div class="inner_faq_head" @click="openPopup(item, child, childIndex)"
              :class="activeChild === childIndex ? 'text-orange' : 'text-black'">
              <span>{{ child.name }}</span>
              <Arrow :strokeWidth="10.5" :fillColor="'currentColor'" direction="left" />
            </div>
          </div>
        </div>
      </TransitionRoot>
    </div>
    <!-- Popup/Drawer -->
    <TransitionRoot as="template" :show="isModalOpen" enter="transition-opacity duration-1000" enterFrom="opacity-0"
      enterTo="opacity-100" leave="transition-opacity duration-1000" leaveFrom="opacity-100" leaveTo="opacity-100"
      @before-enter="calculateHeight">
      <div class="gallery_popup_main fixed inset-0 px-10 bg-black bg-opacity-50 flex items-center justify-end z-[9999]">
        <TransitionChild as="template" enter="transition transform duration-1500 ease-in-out"
          enterFrom="translate-x-full" enterTo="translate-x-0" leave="transition transform duration-1500 ease-in-out"
          leaveFrom="translate-x-0" leaveTo="translate-x-full">
          <div v-if="isModalOpen" class=" popup_gallery_cont fixed  top-0 bottom-0 right-0 bg-white" @click.stop>
            <div ref="closeMenu" class="flex mx-auto z-999999">
              <!-- Back button -->
              <div class="flex">
                <button class="mt-1 flex text-black" @click="closeModal">
                  <Close size="30px" fillColor="#000000" />
                </button>
              </div>
              <!-- Content -->
              <div class="text-black font-graphik w-full gallery_popup_imgs">
                <div class="resizeDiv">
                  <h1 class="popup_title">{{ popupTitle }}</h1>
                 <ReadMoreLess :text="text" :maxLength="140" />                

                  <!-- Dropdown -->
                  <select v-model="selectedMaterialName" @change="updateSelectedMaterial" class="popup_select_box">
                    <option v-for="material in currentItem.materials" :key="material.name" :value="material.name">
                      {{ material.name }}
                    </option>
                  </select>
                </div>
                <!-- Images Grid -->
                <div class="gallery_new_scrool  overflow-y-auto transition-all duration-300"
                  :style="{ height: adjustedHeight + 'px' }">
                  <div class="gallery_images_main grid h-full grid-cols-2 md:grid-cols-4 gap-4 mt-4">
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
import { ref, watch, computed, onBeforeUnmount, onMounted, nextTick } from 'vue'
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { Arrow, Close } from '../frontend-components/Svg/Icons'
import { onClickOutside } from '@vueuse/core'
import { useModal } from '@/Hooks/useModals.js'
import ReadMoreLess from './ReadMoreLess.vue'

const height = ref(null)
const adjustedHeight = ref(0);

const { isModalOpen, openModal, closeModal } = useModal()
const text = ref('')
const closeMenu = ref(null)
const isExpanded = ref(false);
const content = ref(null);


const calculateHeight = async () => {
  await nextTick();

  const staticContent = document.querySelector(".resizeDiv");
  if (staticContent) {
    const staticContentHeight = staticContent.offsetHeight;
    const viewportHeight = window.innerHeight;
    adjustedHeight.value = viewportHeight - staticContentHeight;
  }
};

// Handle the button click
const handleAdjustHeight = () => {
  calculateHeight();
};

onMounted(async () => {
  window.addEventListener("resize", calculateHeight);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateHeight);
});

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
}

const truncatedHtml = computed(() => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = text.value; // Assuming `text` is your full HTML content
  const textContent = tempDiv.textContent || tempDiv.innerText;
  
  // If the content is smaller than the maxLength, just return it
  if (textContent.length <= props.maxLength) {
    return text.value;
  }

  // Otherwise, truncate and add "Read More" button
  let truncated = textContent.slice(0, props.maxLength);
  
  // Avoid cutting off words by trimming to the last space
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > 0) {
    truncated = truncated.substr(0, lastSpace);
  }
  return `${truncated}...`;
  // Now append the Read More button inside the truncated content
  // return `${truncated}... <button @click="isExpanded = !isExpanded.value" class="mt-2 no-underline text-orange underline focus:outline-none sm:hidden">${isExpanded ? `Read less ${isExpanded.value}`  : 'Read more'}</button>`;

});
const setHeight = (el, done) => {
  const height = isExpanded.value ? el.scrollHeight : 0;
  el.style.height = height + 'px';
  el.addEventListener('transitionend', done, { once: true });
};

// -------------------------------------------
const closeSideMenu = () => {
  closeModal()
  activeChild.value = null
}
onClickOutside(closeMenu, closeSideMenu)
const props = defineProps({
  accordionData: {
    type: Array,
    required: true,
    default: () => [
      {
        "swatch": {
          "id": 7,
          "title": "Colored Surfaces",
          "description": "<p>Lebello RopeTek is our exclusive design of outdoor ropes. They have been designed exclusively for the Lebello collection and are available on many pieces where they are woven directly onto the product. Customization might be available for large contract applications.Our Gildo Rope is a larger knotted ropes that adds visual texture and complexity. Composition: 100% Polyolefin Made in Italy</p>",
          "materials": [
            {
              "id": 7,
              "name": "Gafasa G4",
              "children": [
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                }
              ],
              "description": "<p>Lebello RopeTek is our exclusive design of outdoor ropes. They have been designed exclusively for the Lebello collection and are available on many pieces where they are woven directly onto the product. Customization might be available for large contract applications.Our Gildo Rope is a larger knotted ropes that adds visual texture and complexity.</p>\n<p>&lt;strong&gt;Composition:&lt;/strong&gt; 100% Polyolefin<br>Made in Italy</p>"
            }, {
              "id": 7,
              "name": "Structures G4",
              "children": [
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                }
              ],
              "description": `Lebello RopeTek is our exclusive design of outdoor ropes. They have been designed exclusively for the Lebello collection and are available on many pieces where they are woven directly onto the product. Customization might be available for large contract applications.Our Gildo Rope is a larger knotted ropes that adds visual texture and complexity.`
            }
          ]
        }
      },
      {
        "swatch": {
          "id": 8,
          "title": "SurfaceTex",
          "description": "<p>Lebello RopeTek is our exclusive design of outdoor ropes. They have been designed exclusively for the Lebello collection and are available on many pieces where they are woven directly onto the product. Customization might be available for large contract applications.Our Gildo Rope is a larger knotted ropes that adds visual texture and complexity. Composition: 100% Polyolefin Made in Italy</p>",
          "materials": [
            {
              "id": 7,
              "name": "Gafasa G4",
              "children": [
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                }
              ],
              "description": "<p>Lebello RopeTek is our exclusive design of outdoor ropes. They have been designed exclusively for the Lebello collection and are available on many pieces where they are woven directly onto the product. Customization might be available for large contract applications.Our Gildo Rope is a larger knotted ropes that adds visual texture and complexity.</p>\n<p>&lt;strong&gt;Composition:&lt;/strong&gt; 100% Polyolefin<br>Made in Italy</p>"
            }, {
              "id": 7,
              "name": "Structures G4",
              "children": [
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                }
              ],
              "description": `Lebello RopeTek is our exclusive design of outdoor ropes. They have been designed exclusively for the Lebello collection and are available on many pieces where they are woven directly onto the product. Customization might be available for large contract applications.Our Gildo Rope is a larger knotted ropes that adds visual texture and complexity.`
            }
          ]
        }
      }, {
        "swatch": {
          "id": 8,
          "title": "Aqua Weave G4",
          "description": "<p>Lebello RopeTek is our exclusive design of outdoor ropes. They have been designed exclusively for the Lebello collection and are available on many pieces where they are woven directly onto the product. Customization might be available for large contract applications.Our Gildo Rope is a larger knotted ropes that adds visual texture and complexity. Composition: 100% Polyolefin Made in Italy</p>",
          "materials": [
            {
              "id": 7,
              "name": "Gafasa G4",
              "children": [
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                }
              ],
              "description": "<p>Lebello RopeTek is our exclusive design of outdoor ropes. They have been designed exclusively for the Lebello collection and are available on many pieces where they are woven directly onto the product. Customization might be available for large contract applications.Our Gildo Rope is a larger knotted ropes that adds visual texture and complexity.</p>\n<p>&lt;strong&gt;Composition:&lt;/strong&gt; 100% Polyolefin<br>Made in Italy</p>"
            }, {
              "id": 7,
              "name": "Structures G4",
              "children": [
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                },
                {
                  "id": 8,
                  "name": "Breeze",
                  "media_id": 49,
                  "media_data": {
                    "id": 49,
                    "file_url": "materials/mini ropes/lebello_breeze-75x75.jpg"
                  }
                },
                {
                  "id": 9,
                  "name": "Cactus",
                  "media_id": 50,
                  "media_data": {
                    "id": 50,
                    "file_url": "materials/mini ropes/Cactus-g3-2-150x150.jpeg"
                  }
                },
                {
                  "id": 10,
                  "name": "Ruby",
                  "media_id": 51,
                  "media_data": {
                    "id": 51,
                    "file_url": "materials/mini ropes/lebello-ruby-75x75.jpg"
                  }
                },
                {
                  "id": 11,
                  "name": "Bronze",
                  "media_id": 52,
                  "media_data": {
                    "id": 52,
                    "file_url": "materials/mini ropes/lebello_bronze-75x75.jpg"
                  }
                }
              ],
              "description": `Lebello RopeTek is our exclusive design of outdoor ropes. They have been designed exclusively for the Lebello collection and are available on many pieces where they are woven directly onto the product. Customization might be available for large contract applications.Our Gildo Rope is a larger knotted ropes that adds visual texture and complexity.`
            }
          ]
        }
      }
    ]
  },
  maxLength: {
    type: Number,
    default: 130
  }
})
const items = ref(props.accordionData ? props.accordionData : [])

const activeParent = ref(null)
const popupTitle = ref('')
const currentItem = ref({})
const selectedMaterialName = ref('')
const selectedMaterialImages = ref([])

const toggleParent = (index) => {
  activeParent.value = activeParent.value === index ? null : index
}

const openPopup = (item, child) => {
  handleAdjustHeight();
  currentItem.value = item.swatch;
  popupTitle.value = item.swatch.title;
  text.value = item.swatch.description;

  selectedMaterialName.value = child.name;
  selectedMaterialImages.value = child.children.map((c) => ({
    name: c.name,
    file_url: c.media_data.file_url,
  }));
  openModal();
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

watch(window.innerHeight, () => {
  height.value = window.innerHeight
})

watch(selectedMaterialName, () => {
  updateSelectedMaterial()
})

watch(() => props.accordionData, (newData) => {
  items.value = newData
}, { immediate: true })
</script>
<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.7s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
}

.no-scroll {
  overflow: hidden;
}

.faq_main_div {
  margin-top: 28px;
  z-index: 99999999;
  border-top: 1px solid #7c7369;
}

.faq_main_div .faq_haed {
  display: flex;
  align-items: center;
  max-width: 378px;
  justify-content: space-between;
  font-size: 16px;
  line-height: 21px;
  color: #000000;
}

.faq_head_mian {
  border-bottom: 1px solid #7c7369;
  border-left: none;
  padding: 20px 0px;
}

.faq_main_div .faq_haed span {
  color: #000;
}

.faq_main_div .faq_haed svg {
  width: 20px;
  height: 20px;
}

.faq_main_div .faq_haed span.text-orange {
  color: rgb(217 140 58 / var(--tw-text-opacity, 1));
}

.inner_faq .faq_inner_cont {
  border-bottom: 1px solid #7c7369;
  border-left: none;
  padding: 30px 0px 30px 30px;
}

.inner_faq .faq_inner_cont .inner_faq_head {
  display: flex;
  align-items: center;
  max-width: 356px;
  justify-content: space-between;
  font-size: 16px;
  line-height: 21px;
  color: #000000;
  cursor: pointer;
  transition: all 0.5s;
}

.inner_faq .faq_inner_cont svg.icon {
  width: 20px;
  height: 20px;
  transform: rotate(-91deg);
}

.inner_faq .faq_inner_cont .inner_faq_head:hover {
  color: rgb(217 140 58 / var(--tw-text-opacity, 1));
}

h1.popup_title {
  font-size: 31px;
  line-height: 42px;
  color: #000000;
  font-family: 'GraphikMedium';
}

.gallery_popup_main {
  background-color: #c3c1beb5;
  z-index: 99999999999999999;

}

.popup_gallery_cont {
  max-width: 1471px;
  padding: 35px 148px 0px 30px;
}

.gallery_popup_imgs {
  padding-left: 90px;
}

.gallery_images_main {
  gap: 40px;
  margin-top: 0px;
}

.popup_gallery_cont button {
  margin-top: 6px;
}

.gallery_images_height {
  height: 61vh;
}

.gallery_images_height::-webkit-scrollbar {
  width: 10px;
}

.popup_select_box {
  margin-top: 16px;
  font-size: 16px;
  color: #000000;
  line-height: 25px;
  border-radius: 6px;
  padding: 9px 64px 9px 20px;
  margin-bottom: 28px;
  background-image: url(/src/assets/images/product/select-arrow.svg);
  background-position: 95% 50%;
  background-size: 12% 30%;
}

p.popup_desc {
  font-size: 16px;
  line-height: 30px;
  color: #000000;
  margin-top: 10px;
}

.gallery_new_scrool::-webkit-scrollbar {
  width: 0em;
  height: 0em
}

@media (max-width: 1879px) {
  .popup_gallery_cont {
    max-width: 1340px;
  }
}

@media (max-width: 1699px) {
  .faq_head_mian {
    padding: 24px 0px;
  }

  .inner_faq .faq_inner_cont {
    padding: 24px 0px 30px 24px;
  }


  .popup_gallery_cont {
    max-width: 1230px;
  }

}

@media(max-width:1599px) {
  .popup_gallery_cont button {
    margin-top: 4px;
  }

  .popup_gallery_cont {
    max-width: 1130px;
  }

  .gallery_popup_imgs {
    padding-left: 80px;
  }

  .gallery_images_main {
    gap: 25px;
  }

  .gallery_popup_imgs {
    padding-left: 60px;
  }
}

@media (max-width: 1399px) {

  .faq_main_div {
    margin-top: 28px;
  }

  .faq_head_mian {
    padding: 19px 0px;
  }

  .faq_main_div .faq_haed svg {
    width: 16px;
    height: 16px;
  }

  .inner_faq .faq_inner_cont {
    padding: 19px 0px 19px 20px;
  }

  .inner_faq .faq_inner_cont svg.icon {
    width: 16px;
    height: 16px;
    transform: rotate(-91deg);
  }

  .popup_gallery_cont {
    max-width: 982px;
  }


  .popup_gallery_cont svg.icon {
    height: 28px;
  }

  .popup_gallery_cont button {
    margin-top: 8px;
  }

  .gallery_images_height {
    height: 51vh;
  }

  .popup_gallery_cont {
    max-width: 982px;
  }

}

@media(max-width:1199px) {
  .popup_gallery_cont {
    max-width: 832px;
    padding: 46px 40px 0px 30px;
  }

  .gallery_popup_imgs {
    padding-left: 32px;
  }

  .popup_gallery_cont button {
    margin-top: 0px;
  }

}

@media(max-width:991px) {
  .popup_gallery_cont {
    max-width: 682px;
    padding: 46px 40px 0px 30px;
  }

  .gallery_images_main {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .product_container {
    padding: 0px 42px;
  }

  .materils_main_sec {
    background-color: #eae6e1;
    padding: 30px 0px 60px;
  }

  .product_container {
    padding: 0px 32px;
  }
}

@media(max-width:574px) {
  .product_container {
    padding: 0px 22px;
  }

  .materils_cut_top ul {
    column-gap: 40px;
  }

  .popup_gallery_cont {
    padding: 36px 22px 0px 22px;
  }

  .gallery_popup_imgs {
    padding-left: 22px;
  }

  h1.popup_title {
    font-size: 26px;
    line-height: 32px;
  }

  .popup_gallery_cont button svg {
    width: 18px;
  }

  .popup_gallery_cont button {
    margin-top: -4px;
  }

  p.popup_desc {
    font-size: 14px;
    line-height: 26px;
  }

  .gallery_images_main {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 15px;
  }

  .gallery_images_height {
    height: 43vh;
  }
}
</style>