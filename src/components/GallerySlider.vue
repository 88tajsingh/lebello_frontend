<template>
    <Transition name="modal-fade">
      <section class="modal popup" v-if="isModalOpen">
        <div class="popup_inner fixed inset-0 bg-[#c3c1be] bg-opacity-75 flex items-center justify-center z-50"
             @click.self="closeModal">
          <div class="bg-white rounded shadow-lg transition-all duration-300 ease-in-out"
               :style="modalStyle">
            <div class="relative">
              <button @click="closeModal" class="close_btn_popup absolute top-2 right-2 z-10">
                <img src="/public/close-button.png" alt="Close" class="w-6 h-6">
              </button>
              
              <Transition name="fade" mode="out-in">
                <img :key="activeImage?.file_url" 
                     :src="$filePath(activeImage?.file_url)" 
                     :alt="activeImage?.title"
                     class="w-full h-full object-contain"
                     @load="adjustModalSize"
                     ref="imageRef" />
              </Transition>
  
              <!-- Navigation Buttons -->
              <div class="absolute inset-0 z-10 flex justify-between">
                <button @click.stop="prevImage" 
                        @mouseenter="hoveredSide = 'left'" 
                        @mouseleave="hoveredSide = null"
                        class="w-1/3 h-full cursor-pointer flex items-center justify-start">
                  <Arrow v-if="hoveredSide === 'left'"
                         class="ml-3" 
                         direction="left" 
                         :strokeWidth="20.8" 
                         size="22px"
                         fillColor="#FFF" />
                </button>
                <button @click.stop="nextImage" 
                        @mouseenter="hoveredSide = 'right'" 
                        @mouseleave="hoveredSide = null"
                        class="w-1/3 h-full cursor-pointer flex items-center justify-end">
                  <Arrow v-if="hoveredSide === 'right'"
                         class="mr-3" 
                         direction="right" 
                         :strokeWidth="20.8" 
                         size="22px"
                         fillColor="#FFF" />
                </button>
              </div>
            </div>
  
            <!-- Modal Footer -->
            <div class="bg-gray-800 text-white p-4 flex items-center justify-between">
              <div class="text-sm">
                {{ activeImage?.description || productData?.title }}
              </div>
              <div class="flex items-center space-x-4">
                <a href="#" class="flex items-center text-sm hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="w-5 h-5 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M3 16.5v3.75a.75.75 0 00.75.75h16.5a.75.75 0 00.75-.75V16.5M12 3v13.5M8.25 11.25l3.75 3.75 3.75-3.75" />
                  </svg>
                  Download
                </a>
                <ul class="flex space-x-2">
                  <li v-for="social in socialIcons" :key="social.name">
                    <component :is="social.component" v-bind="social.props" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Transition>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
  import { Facebook, Houzz, Pinterest, Instagram,Arrow } from '@/components/frontend-components/Svg/Icons.js'; // Adjust the import path as needed
  
  // Props and emits
  const props = defineProps({
    isModalOpen: Boolean,
    activeImage: Object,
    productData: Object,
  });
  
  const emit = defineEmits(['close-modal', 'prev-image', 'next-image']);
  
  // Refs
  const imageRef = ref(null);
  const modalStyle = ref({});
  const hoveredSide = ref(null);
  
  // Methods
  const closeModal = () => emit('close-modal');
  const prevImage = () => emit('prev-image');
  const nextImage = () => emit('next-image');
  
  const adjustModalSize = async () => {
    if (!imageRef.value) return;
  
    await nextTick(); // Wait for the DOM to update
  
    const img = imageRef.value;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
  
    // Check if the image has loaded
    if (img.complete) {
      setModalSize(img.naturalWidth, img.naturalHeight, screenWidth, screenHeight);
    } else {
      // If the image hasn't loaded, use default dimensions or wait for load
      img.onload = () => setModalSize(img.naturalWidth, img.naturalHeight, screenWidth, screenHeight);
      // Set initial size based on screen dimensions
      setModalSize(screenWidth * 0.8, screenHeight * 0.8, screenWidth, screenHeight);
    }
  };
  
  const setModalSize = (imgWidth, imgHeight, screenWidth, screenHeight) => {
    const imageAspectRatio = imgWidth / imgHeight;
  
    let modalWidth, modalHeight;
  
    if (imageAspectRatio > screenWidth / screenHeight) {
      // Image is wider relative to the screen
      modalWidth = Math.min(imgWidth, screenWidth * 0.9);
      modalHeight = modalWidth / imageAspectRatio;
    } else {
      // Image is taller relative to the screen
      modalHeight = Math.min(imgHeight, screenHeight * 0.8);
      modalWidth = modalHeight * imageAspectRatio;
    }
  
    modalStyle.value = {
      width: `${modalWidth}px`,
      height: `${modalHeight + 80}px`, // Add 80px for the footer
      maxWidth: '90vw',
      maxHeight: '90vh',
    };
  };
  
  // Computed
  const socialIcons = computed(() => [
    { name: 'Facebook', component: Facebook, props: { bgColor: "#333333", bgSize: "28px", svgSize: "15px", svgColor: "#ffffff", hoverBgColor: "#ce8d39", hoverSvgColor: "#000000", href: "https://www.facebook.com", title: "Facebook" } },
    { name: 'Houzz', component: Houzz, props: { bgColor: "#333333", bgSize: "28px", svgSize: "15px", svgColor: "#FFFFFF", hoverBgColor: "#ce8d39", hoverSvgColor: "#ffffff", href: "https://www.houzz.com", title: "Houzz Share" } },
    { name: 'Pinterest', component: Pinterest, props: { bgColor: "#333333", bgSize: "28px", svgSize: "15px", svgColor: "#ffffff", hoverBgColor: "#ce8d39", hoverSvgColor: "#ffffff", href: "https://pinterest.com", title: "Pinterest" } },
    { name: 'Instagram', component: Instagram, props: { bgColor: "#333333", bgSize: "28px", svgSize: "15px", svgColor: "#ffffff", hoverBgColor: "#ce8d39", hoverSvgColor: "#ffffff", href: "https://instagram.com", title: "Instagram" } },
  ]);
  
  // Lifecycle hooks
  onMounted(() => {
    adjustModalSize();
    window.addEventListener('resize', adjustModalSize);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', adjustModalSize);
  });
  
  // Watch for changes in isModalOpen and activeImage
  watch([() => props.isModalOpen, () => props.activeImage], () => {
    if (props.isModalOpen) {
      nextTick(() => {
        adjustModalSize();
      });
    }
  });
  </script>
  
  <style scoped>
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>