<template>
  <section class="relative h-screen overflow-hidden">
    <div class="slider_main">
      <swiper :modules="modules" :pagination="{ clickable: true }"
        :navigation="{ prevEl: '.custom-prev', nextEl: '.custom-next' }" class="mySwiper">
        <swiper-slide v-for="(slide, index) in images" :key="index">
          <div class="product_slide">
            <div class="slider_img h-screen w-full">
              <div v-if="loading" class="absolute inset-0 bg-gray-4 animate-pulse"></div>
              <img loading="lazy" :src="$filePath(slide[props.imageKeyName]?.file_url)" :alt="slide[props?.imageKeyName]?.file_url" class="h-full w-full object-cover "  @load="handleImageLoad"/>
            </div>
            <div class="absolute bottom-0 z-[999] w-full px-[124px] pb-[60px]">
              <h1 class="text-white font-ptSerif text-[60px] leading-[74px] font-normal">
                {{ slide?.title }}
              </h1>
            </div>
          </div>
        </swiper-slide>
      </swiper>
        <slot name="utility"></slot>
      <button class="slider_arrow custom-prev" aria-label="Previous">
        <Arrow size="23px" direction="right" :strokeWidth="26.8" fillColor="#ffffff" />
      </button>
      <button class="slider_arrow custom-next" aria-label="Next">
        <Arrow size="23px" direction="left" :strokeWidth="26.8" fillColor="#ffffff" />
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Arrow } from "./Svg/Icons";

import image1 from "@/assets/images/product/lebello-tubo-sofa-exposed-feature.jpg";
import image2 from "@/assets/images/product/lebello_tubo_sofa_outdoor.jpg";
import image3 from "@/assets/images/product/lebello-tubo-sofa-exposed.jpg";

const modules = [Navigation];
const loading = ref(true);

const handleImageLoad = () => {
  loading.value = false
}
const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
  imageKeyName: { type: String, default: 'featured_image_data' },
  pagination: { type: Boolean, default: false },
});

if (props?.pagination) {
  modules.push(Pagination);
}

const slides = [
  { image: image1, title: "Tubo Sofa Exposed" },
  { image: image2, title: "Tubo Sofa Outdoor" },
  { image: image3, title: "Tubo Sofa Exposed" },

];
</script>

<style scoped>

.slider_main {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

::v-deep(.swiper-pagination) {
  width: 20px;
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
}

::v-deep(.swiper-pagination-bullet) {
  background-color: #828282;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  opacity: 1;
}

::v-deep(.swiper-pagination-bullet-active) {
  background-color: #626262;
  width: 8px;
  height: 8px;
}
button.slider_arrow {
    position: absolute;
    z-index: 99999;
    top: 50%;
    transform: translate(0px, -50%);
}
button.slider_arrow.custom-next {
    right: 60px;
}
.slider_arrow.custom-prev {
    left: 60px;
}
</style>