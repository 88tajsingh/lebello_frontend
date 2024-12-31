<template>
  <div class="relative min-h-screen">
    <NavBar :absolute="true" :storePages="true" />
    <!-- right logo -->
    <div class="absolute z-[999] top-16 right-0">
      <img src="@/assets/logo/lebello-logo-right.png" alt="Lebello Logo">
    </div>
    <!-- <StoreSwiper/> -->
    <div class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <div class="slider_main_img">
            <div class="relative aspect-square bg-gray-50 rounded-lg overflow-y-hidden">
              <div class="w-full h-screen overflow-hidden">
                <div class="absolute top-28 left-20 z-[999999]">
                  Home / <span class="text-[#c59233]">{{ slide.name }}</span>
                </div>
                <component :is="slide.type === 'iframe' ? 'iframe' : 'img'" :src="slide.src"
                  :allowfullscreen="slide.type === 'iframe'" :frameborder="slide.type === 'iframe' ? '0' : undefined"
                  :scrolling="slide.type === 'iframe' ? 'no' : undefined"
                  class="absolute z-99999 top-0 left-0 w-full h-full border-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
            <span class="swiper-pagination z-[9999] flex items-start absolute pb-5 left-10 px-18"></span>
      <div class="absolute bottom-1/3 left-18 z-[999] custom-navigation">
        <div id="custom-prev" class="mb-2 custom-next border border-yellow-600 rounded-full px-2">
          <i class="text-yellow-600 fa fa-angle-right" aria-hidden="true"></i>
        </div>
        <div id="custom-next" class="custom-prev absolute border border-yellow-600 rounded-full px-2 z-[9999999]">
          <i class="text-yellow-600 fa fa-angle-left" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div>
      <StoreProduct />
    </div>
    <div class="p-10 px-14">
      <span class="text-lg font-bold font-graphik text-black block pb-4">MATERIALS</span>
      <StoreAccordion />
    </div>
    <section class="bg-[#e7e3de] py-20">
      <div class="max-w-full px-16">
        <h2 class="text-[18px] leading-[16px] text-[#333333] font-medium mb-6">FAMILY PRODUCT</h2>
        <div class="grid grid-cols-4 gap-4">
          <div v-for="product in familyProducts" :key="product.id" class="group">
            <a href="#">
              <img :src="product.image" :alt="product.name" class="w-full" />
              <h4
                class="text-[14px] leading-[18px] text-[#333333] font-normal py-3.5 px-3.5 transition-all duration-500 group-hover:bg-[#c59233] group-hover:text-white">
                {{ product.name }}
              </h4>
            </a>
          </div>
        </div>
      </div>
    </section >
    <div class="px-10">
      <FooterSection color="#ffffff" textColor="000000" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
// import StoreSwiper from '@/components/store-components/StoreSlider.vue';
import NavBar from '@/components/frontend-components/Nav-bar.vue';
import StoreProduct from '@/components/store-components/StoreProductDetail.vue';
import StoreAccordion from '@/components/store-components/StoreAccordion.vue';
import FooterSection from '@/components/frontend-components/Footer-section.vue';
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

const familyProducts = ref([
  { id: 1, name: 'Tubo Club Double', image: '/src/assets/lebello/images/Tubo Club Double.png' },
  { id: 2, name: 'Tubo Club Single', image: '/src/assets/lebello/images/Tubo Club Single.png' },
  { id: 3, name: 'Tubo Club', image: '/src/assets/lebello/images/Tubo Club.png' },
  { id: 4, name: 'Tubo Counter Stool', image: '/src/assets/lebello/images/Tubo Counter Stool.png' },
]);

let swiper: Swiper;
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

</script>

<style scoped>
:deep(.swiper-pagination) {
  padding-left: 68px;
  display:flex;
  justify-content: flex-start;
  padding-bottom: 20px;
  opacity: 0.7;
}
:deep(.swiper-pagination-bullet) {
  border: 1px solid #c59233 ;
  background-color: #eee;
  opacity: 0.7;
}
:deep(.swiper-pagination-bullet-active) {
  background-color: #c59233 ;
  opacity: 0.7;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
}

.swiper-slide {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.swiper-slide-active {
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background-color: #c59233 !important;
}
</style>