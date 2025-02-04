<template>
  <section class="relative h-screen overflow-hidden">
    <div class="slider_main">
      <swiper
        :modules="modules"
        :pagination="{ clickable: true }"
        :effect="'fade'"
        :loop="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        :navigation="{
          prevEl: '.custom-prev',
          nextEl: '.custom-next'
        }"
        class="mySwiper"
      >
        <swiper-slide v-for="(slide, index) in props.images" :key="index">
          <div class="product_slide">
            <div class="slider_img h-screen w-full">
              <div v-if="loading" class="absolute inset-0 bg-gray-4 animate-pulse"></div>
              <img
                loading="lazy"
                :src="$filePath(slide[props.imageKeyName]?.file_url)"
                :alt="slide[props.imageKeyName]?.file_url"
                class="h-full w-full object-cover"
                @load="handleImageLoad"
              />
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
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Arrow } from "./Svg/Icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const modules = [EffectFade, Autoplay, Navigation, Pagination];
const loading = ref(true);

const handleImageLoad = () => {
  loading.value = false;
};

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
  imageKeyName: { type: String, default: 'featured_image_data' },
  pagination: { type: Boolean, default: false },
});

// If pagination is enabled, add the Pagination module
if (props.pagination) {
  modules.push(Pagination);
}
</script>

<style scoped>
.slider_main {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

:deep(.swiper-pagination) {
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

:deep(.swiper-pagination-bullet) {
  background-color: #828282;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #626262;
  width: 8px;
  height: 8px;
}

.slider_arrow {
  position: absolute;
  z-index: 99999;
  top: 50%;
  transform: translate(0px, -50%);
}

.slider_arrow.custom-next {
  right: 60px;
}

.slider_arrow.custom-prev {
  left: 60px;
}

@media (max-width: 767px) {
  .slider_arrow.custom-next {
    right: 16px !important;
  }
  .slider_arrow.custom-prev {
    left: 16px !important;
  }
}
</style>