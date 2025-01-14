<template>
  <section class="relative h-screen overflow-hidden">
    <div class="slider_main">
      <swiper :modules="modules" :pagination="{ clickable: true }"
        :navigation="{ prevEl: '.custom-prev', nextEl: '.custom-next' }" class="mySwiper">
        <swiper-slide v-for="(slide, index) in images" :key="index">
          <div class="product_slide">
            <div class="slider_img h-screen w-full">
              <!-- <div v-if="loading" class="absolute inset-0 bg-gray-4 animate-pulse"></div> -->
              <img loading="lazy" :src="$filePath(slide[props.imageKeyName]?.file_url)"
                :alt="slide[props?.imageKeyName]?.file_url" class="h-full w-full object-cover "
                 />
            </div>
            <div v-if="slide?.title" class="slider_text">
              <h1>{{ slide?.title }}</h1>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <slot name="utility"></slot>

      <button class="slider_arrow absolute top-1/2 z-99999 left-[50px] transform translate-y-1/2
        custom-prev" aria-label="Previous">
        <Arrow size="23px" direction="right" :strokeWidth="26.8" fillColor="#ffffff" />
      </button>
      <button class="slider_arrow absolute top-1/2 z-99999 right-[50px] transform translate-y-1/2
        custom-next" aria-label="Next">
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

</script>

<style scoped>
.slider_main {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.slider_text {
  padding: 0px 124px 60px;
  position: absolute;
  z-index: 999;
  bottom: 0;
  width: 100%;
}
.slider_text h1 {
  font-size: 60px;
  line-height: 74px;
  color: #ffffff;
  font-weight: 400;
  font-family: 'PT Serif';
}
@media (max-width: 1879px) {
  .slider_text {
    padding: 0px 94px 60px;
  }
}
@media (max-width: 1699px) {
  .slider_text {
    padding: 0px 82px 45px;
  }
  .slider_text h1 {
    font-size: 50px;
    line-height: 50px;
  }
}
@media (max-width: 1399px) {
  .slider_text h1 {
    font-size: 40px;
    line-height: 40px;
  }
}
@media(max-width:1199px) {
  .slider_text {
    padding: 0px 52px 45px;
  }
}
@media(max-width:991px) {
  .slider_text {
    padding: 0px 32px 35px;
  }
}
@media(max-width:574px) {
  .slider_text {
    padding: 0px 22px 35px;
  }
  .slider_text h1 {
    font-size: 30px;
    line-height: 20px;
  }
}
@media(max-width:767px) {
  .threed_inner_main {
    flex-direction: column;
  }
  .slider_text h1 {
    font-size: 36px;
    line-height: 32px;
  }
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
</style>