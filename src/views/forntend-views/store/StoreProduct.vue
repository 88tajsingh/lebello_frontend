<template>
    <div class="relative min-h-screen">
      <NavBar :absolute="true" :storePages="true" />
      <!-- right logo -->
      <div class="absolute z-[999] top-16 right-0">
        <img src="@/assets/logo/lebello-logo-right.png" alt="Lebello Logo">
      </div>
      
      <div class="swiper mySwiper">
        <div class="swiper-wrapper">
          <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
            <div class="slider_main_img">
              <div class="relative aspect-square bg-gray-50 rounded-lg overflow-y-hidden">
                <div class="w-full h-screen overflow-hidden">
                  <div class="absolute top-28 left-20 z-[999999]">
                    Home / <span class="text-[#c59233]">{{ slide.name }}</span>
                  </div>
                  <component :is="slide.type === 'iframe' ? 'iframe' : 'img'"
                    :src="slide.src"
                    :allowfullscreen="slide.type === 'iframe'"
                    :frameborder="slide.type === 'iframe' ? '0' : undefined"
                    :scrolling="slide.type === 'iframe' ? 'no' : undefined"
                    class="absolute z-99999 top-0 left-0 w-full h-full border-none"
                  />
                </div>
                <div id="zoom-controls"
                  class="absolute right-4 top-2 flex flex-col items-center gap-4 z-[999] text-yellow-600">
                  <button @click="toggleFullscreen" class="rounded-full p-2">
                    <svg height="20px" width="20px" viewBox="0 0 512 512" fill="#000000">
                      <polygon fill="#c2a02f"
                        points="481.706,337.186 481.711,460.288 277.415,256 481.711,51.704 481.711,174.821 511.996,174.821 512,0 337.175,0 337.175,30.294 460.292,30.294 256,234.588 51.704,30.294 174.817,30.294 174.817,0 0,0 0.004,174.821 30.289,174.821 30.289,51.704 234.581,256 30.289,460.288 30.289,337.17 0.004,337.179 0,512 174.817,512 174.817,481.706 51.704,481.706 256,277.419 460.292,481.706 337.175,481.706 337.175,512 512,512 511.996,337.179" />
                    </svg>
                  </button>
                  <div
                    class="flex flex-col items-center bg-white rounded-full shadow-lg border border-yellow-600">
                    <button @click="zoomIn" class="py-2 px-[5px]">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m-7-7h14" />
                      </svg>
                    </button>
                    <div class="absolute border-t border-yellow-600 w-full"></div>
                    <button @click="zoomOut" class="py-2 px-[5px]">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                      </svg>
                    </button>
                  </div>
                  <button @click="resetZoom" class="rounded-full p-2">
                    <svg width="28px" height="28px" viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg" fill="#000000">
                      <path fill="#c2a02f"
                        d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z">
                      </path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute bottom-1/3 left-18 z-[999] custom-navigation">
          <div id="custom-prev" class="mb-2 custom-next border border-yellow-600 rounded-full px-2">
            <i class="text-yellow-600 fa fa-angle-right" aria-hidden="true"></i>
          </div>
          <div id="custom-next" class="custom-prev absolute border border-yellow-600 rounded-full px-2 z-[9999999]">
            <i class="text-yellow-600 fa fa-angle-left" aria-hidden="true"></i>
          </div>
          <div class="absolute -bottom-24">
            <div class="flex">
              <div class="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <StoreProduct />
        <StoreAccordion/>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import NavBar from '@/components/frontend-components/Nav-bar.vue';
  import StoreProduct from '@/components/store-components/StoreProductDetail.vue';
  import StoreAccordion from '@/components/store-components/StoreAccordion.vue';
  import Swiper from 'swiper';
  import { Navigation, Pagination } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  
  const slides = ref([
    {
      type: 'iframe',
      src: '/src/assets/lebello/Stone Tables White Background.1/Stone Tables White Background.1.html',
      name: 'Tubo Sofa'
    },
    {
      type: 'image',
      src: '/src/assets/lebello-tubo-sofa-outdoor.jpg',
      name: 'Tubo Sofa Outdoor'
    },
  ]);
  
  let swiper: Swiper;
  let zoomLevel = ref(1);
  const maxZoom = 3;
  const minZoom = 0.5;
  const zoomStep = 0.1;
  
  onMounted(() => {
    swiper = new Swiper(".mySwiper", {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '#custom-next',
        prevEl: '#custom-prev',
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      slidesPerView: 1,
      spaceBetween: 30,
      loop: false,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
    });
  });
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  
  const zoomIn = () => {
    if (zoomLevel.value < maxZoom) {
      zoomLevel.value += zoomStep;
      applyZoom();
    }
  };
  
  const zoomOut = () => {
    if (zoomLevel.value > minZoom) {
      zoomLevel.value -= zoomStep;
      applyZoom();
    }
  };
  
  const resetZoom = () => {
    zoomLevel.value = 1;
    applyZoom();
  };
  
  const applyZoom = () => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const content = activeSlide.querySelector('iframe, img') as HTMLElement;
    if (content) {
      content.style.transform = `scale(${zoomLevel.value})`;
    }
  };
  
  watch(zoomLevel, () => {
    applyZoom();
  });
  </script>
  
  <style scoped>
  .swiper-slide {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .swiper-slide-active {
    opacity: 1;
  }
  
  /* Add any additional styles here */
  </style>
  
  