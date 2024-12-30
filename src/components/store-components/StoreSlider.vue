<template>
    <swiper :spaceBetween="30" :pagination="{
        clickable: true
    }" :modules="modules" class="mySwiper" ref="swiperRef">
        <swiper-slide v-for="(slide, index) in slides" :key="index" class="relative">
            <div class="slider_main_img">
                <div class="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                    <div class="w-full h-screen overflow-hidden">
                        <div class="absolute top-28 left-20 z-[999999]">
                            Home / <span class="text-orange">{{ slide.name }}</span>
                        </div>
                        <component :is="slide.type === 'iframe' ? 'iframe' : 'img'" :src="slide.src"
                            :allowfullscreen="slide.type === 'iframe'"
                            :frameborder="slide.type === 'iframe' ? '0' : undefined"
                            :scrolling="slide.type === 'iframe' ? 'no' : undefined"
                            class="absolute z-999999 top-0 left-0 w-full h-full border-none" />
                    </div>
                </div>
            </div>
        </swiper-slide>

        <!-- Custom Navigation Buttons -->
        <div class="absolute bottom-1/3 left-18 z-[999] custom-navigation"  >
        <div @click="swiperRef.swiper.slidePrev" id="custom-prev" class="mb-2 custom-next border border-orange rounded-full px-2">
          <i class="text-orange fa fa-angle-right" aria-hidden="true"></i>
        </div>
        <div  @click="swiperRef.swiper.slideNext" id="custom-next" class="custom-prev absolute border border-orange rounded-full px-2 z-[9999999]">
          <i class="text-orange fa fa-angle-left" aria-hidden="true"></i>
        </div>
      </div>
    </swiper>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Navigation, Pagination } from 'swiper/modules'
import { ref } from 'vue'  

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
    }
])

const swiperRef = ref(null)

const modules = [Navigation, Pagination]
</script>

<style scoped>
#app {
    height: 100%;
}

html,
body {
    position: relative;
    height: 100%;
}

body {
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #000;
    margin: 0;
    padding: 0;
}

.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    background-position: center;
    background-size: cover;
}

.swiper-slide img {
    display: block;
    width: 100%;
}

.swiper-slide iframe {
    width: 100%;
    height: 100%;
    border: none;
}
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

.custom-prev,
.custom-next {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.custom-prev:hover,
.custom-next:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.custom-prev i,
.custom-next i {
    font-size: 18px;
    color: #c59233;
}
</style>