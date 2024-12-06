<template>
  <div>
    <!-- Slider Section -->
    <div id="default-carousel" class="relative" data-carousel="static">

      <div class="overflow-hidden h-screen">
        <div v-for="(slide, index) in props.images" :key="index" class="w-full duration-700 ease-in-out"
          v-show="currentIndex === index">
          <img :src="$filePath(slide[props.imageKeyName]?.file_url)"
            class="block absolute top-1/2 left-1/2 w-full h-screen -translate-x-1/2 -translate-y-1/2"
            :alt="slide[props.imageKeyName]?.file_url" />
          <!-- Navigation Buttons -->

          <button @click="previous" class="absolute left-10 top-1/2 z-30 cursor-pointer">
            <ArrowSvg size="20px" direction="right" :strokeWidth="17"
              :fillColor="navColor === 'white' ? '#ffffff' : '#000000'" />
          </button>
          <button @click="next" class="absolute right-10 top-1/2 z-30 cursor-pointer">
            <ArrowSvg size="20px" direction="left" :strokeWidth="17"
              :fillColor="navColor === 'white' ? '#ffffff' : '#000000'" />
          </button>




          <!-- Carousel Indicators -->
          <div :class="['absolute space-x-2 z-30', indicatorPosition]">
            <button v-for="(slide, index) in props.images" :key="index" @click="changeSlide(index)"
              :class="{ 'bg-[#909090]': currentIndex === index, 'bg-[#626262]': currentIndex !== index }"
              class="w-2 h-2 rounded-full"></button>
          </div>

          <!-- Text on Carousel -->
          <div :class="['absolute left-10 transition-all duration-1000 ease-in-out', {
            'bottom-20': headingAndSubHeading, 'bottom-10': !hasHeadingAndLocation && atBottom,
            'bottom-6': !hasHeadingAndLocation && !atBottom,
          }]">
            <div class="font-graphik px-3 py-3 mb-4" :style="titleStyle(slide)">
              {{ camelCase(slide?.heading_case, slide.heading_title) }}
            </div>
            <span v-if="slide?.sub_heading_title" class="font-graphikLight px-3 py-2" :style="subHeadingStyle(slide)">
              {{ camelCase(slide?.sub_heading_case, slide?.contract_info_location) }}
            </span>
          </div>

          <!-- <div :class="['absolute transition-all duration-1000 ease-in-out', { 'bottom-6': !atBottom, 'bottom-10': atBottom }]"
                class="text-white left-6 sm:left-14 md:left-20 capitalize opacity-80 font-graphikLight sm:text-[20px] md2:text-[40px]">
                {{ props?.images && props?.images[currentIndex]?.title || "default" }}
            </div> -->

          <!-- Down Arrow -->
          <div
            class="absolute left-1/2 bottom-5 animate-bounce text-5xl text-white font-sans hover:bg-[#0e0e0e89] bg-opacity-5">
            <div @click="() => scrollDown('sideText')" class="px-3 py-1 cursor-pointer">
              <svg width="24px" height="24px" viewBox="0 0 1024 1024" fill="#fafafa">
                <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute top-48 right-0 ">
      <SideMenu :openClass="props.openClass" :closeClass="props.closeClass" :height="props.height">
        <slot name="sidebar"></slot>
      </SideMenu>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, computed } from 'vue';
import SideMenu from './Side-Menu.vue';
import ArrowSvg from './Svg/Arrow-Svg.vue';

const currentIndex = ref(0);
const atBottom = ref(false);
const navColor = ref('');

const props = defineProps({
  images: { type: Array, required: true },
  navColor: { type: String, default: 'black' },
  imageKeyName: { type: String, default: 'featured_image_data' },
  indicatorPosition: { type: String, default: 'top-1/2 left-0 transform rotate-90' },
  closeClass: { type: String, default: 'w-[230px] z-50 absolute right-[-250px]' },
  openClass: { type: String, default: 'w-[230px] absolute z-50 right-0' },
  height: { type: String, default: '100vh' },
});
// :indicatorPosition="'bottom-5 left-1/2 transform -translate-x-1/2'"
const startAutoSwipe = () => {
  setInterval(() => {
    navColor.value = props.images[currentIndex.value]?.navColor || 'black';
    atBottom.value = !atBottom.value;
    next();
  }, 5000);
};

const changeSlide = (index) => {
  currentIndex.value = index;
  navColor.value = props.images[currentIndex.value]?.navColor || 'black';
};

const previous = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
  navColor.value = props.images[currentIndex.value]?.navColor || 'black';
};

const next = () => {
  if (props.images.length === 0) {
    console.error('Slider images array is empty');
    return;
  }
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
  navColor.value = props.images[currentIndex.value]?.navColor || 'black';
};

onMounted(startAutoSwipe);

const hexToRgb = (hex) => {
  const defaultHex = '#ff9d0f';

  if (!hex || typeof hex !== 'string') {
    hex = defaultHex;
  }

  hex = hex.replace(/^#/, '');

  if (hex.length !== 6) {
    hex = defaultHex.replace(/^#/, '');
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
};

const titleStyle = (slide) => {
  const defaultHex = '';
  console.log("slide", slide?.heading_font_size);
  const baseBackground = slide?.heading_background || defaultHex;
  const transparency = slide?.heading_transparent_percentage
    ? parseFloat(slide.heading_transparent_percentage) / 100
    : 1;

  const rgbaBackground = baseBackground.startsWith('#')
    ? `rgba(${hexToRgb(baseBackground)}, ${transparency})`
    : baseBackground;

  return {

    color: slide?.heading_text_color,
    background: rgbaBackground,
    fontSize: `${slide?.heading_font_size || '25px'}`,

  };
};

const subHeadingStyle = (slide) => {
  const defaultHex = '';
  const baseBackground = slide?.sub_heading_background || defaultHex;
  const transparency = slide?.sub_heading_transparent_percentage
    ? parseFloat(slide.sub_heading_transparent_percentage) / 100
    : 1;

  const rgbaBackground = baseBackground.startsWith('#')
    ? `rgba(${hexToRgb(baseBackground)}, ${transparency})`
    : baseBackground;

  return {
    color: slide?.sub_heading_color,
    background: rgbaBackground,
    fontSize: `${slide?.sub_heading_font_size || '17px'}`,
  };
};

const headingAndSubHeading = computed(() => {
  return slide?.heading_title && slide?.sub_heading_title;
});
// Function to convert text to camel case
const camelCase = (capitalize, text) => {
  if (!text) return '';
  if (capitalize === 'No Caps' || capitalize === 'no caps')
    return text
  else
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
};

watch(() => props.images, () => {
  props.images = props.images;
});
</script>

<style scoped>
/* Add any required styles for the slider */
</style>
