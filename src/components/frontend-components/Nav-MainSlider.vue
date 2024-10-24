<template>
  <NavBar :absolute="true" :navColor="navColor" />
  <div id="default-carousel" class="relative" data-carousel="static">
    <div class="w-full h-full mx-0">
      <div class="overflow-hidden h-screen">
        <div
          v-for="(slide, index) in props.sliderImages"
          :key="index"
          v-show="currentIndex === index"
          class="w-full duration-700 ease-in-out"
          data-carousel-item
        >
          <img
            :src="slide?.image"
            class="block absolute top-1/2 left-1/2 w-full h-screen -translate-x-1/2 -translate-y-1/2"
            :alt="slide?.alt"
          />
          <button
            @click="previous"
            type="button"
            class="flex absolute left-10 z-30 justify-center items-center px-3 top-1/2 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              :stroke="navColor === 'white' ? '#ffffff' : '#000000'"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="next"
            type="button"
            class="flex absolute right-10 z-30 justify-center items-center px-4 top-1/2 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              :stroke="navColor === 'white' ? '#ffffff' : '#000000'"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex absolute bottom-1/2 rotate-90 z-30 left-7 space-x-2 -translate-x-1/2">
        <button
          v-for="(slide, index) in props.sliderImages"
          :key="index"
          type="button"
          :class="{ 'bg-gray-700': currentIndex === index, 'bg-gray-400': currentIndex !== index }"
          class="w-2 h-2 rounded-full"
          @click="changeSlide(index)"
        ></button>
      </div>
      <div id="sideText" class="absolute bottom-6 mx-auto left-6 sm:left-14 md:left-20"
           :class="['absolute transition-all duration-1000 ease-in-out', { 'bottom-0': atBottom, 'bottom-6': !atBottom }]">
        <div class="capitalize opacity-80 text-white font-graphikLight sm:text-[20px] md2:text-[40px]">
          {{ props.sliderImages[currentIndex]?.alt }}
        </div>
      </div>
    </div>
    <div class="absolute left-1/2 bottom-5 animate-bounce mx-auto">
      <div @click="()=>scrollDown('sideText')" class="text-5xl text-white font-sans hover:bg-[#0e0e0e89] bg-opacity-5 ease-in duration-300 px-3 py-1">
        <span href="#" class="transition ease-out duration-1000">
          <svg width="24px" height="24px" viewBox="0 0 1024 1024" class="icon" version="1.1"
               xmlns="http://www.w3.org/2000/svg" fill="#fafafa" stroke="#fafafa" stroke-width="73.728">
            <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#ffffff"></path>
          </svg>
        </span>
      </div>
    </div>
    <div class="absolute top-48 right-0 pr-3" ref="closeMenu">
      <SideMenu
        :key="firstKey"
        :list="props.sidebarList"
        :handleSideMenu="handleSideMenu"
        :isOpen="isOpenSidebarSlider"
        :mainSlider="props.mainSlider"
        :showDropDown="props.showDropDown"
        :showHeading="props.showHeading"
        :downDropdown="props.downDropdown"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SideMenu from './Side-Menu.vue';
import NavBar from './Nav-bar.vue';
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  sidebarList: {
    type: Array,
    required: true,
  },
  mainSlider: {
    type: Boolean,
  },
  showHeading: {
    type: Boolean,
    default: true,
  },
  sliderImages: {
    type: Array,
    default: () => [],
  },
  showDropDown: {
    type: Boolean,
  },
  downDropdown: {
    type: Boolean,
  },
});

const navColor = ref('');
const atBottom = ref(false);
const currentIndex = ref(0);
const isOpenSidebarSlider = ref(false);

const startAutoSwipe = () => {
  setInterval(() => {
    if (props.sliderImages.length > 0) {
      navColor.value = props.sliderImages[currentIndex.value]?.navColor || '';
      atBottom.value = !atBottom.value;
      next();
    }
  }, 5000);
};

const changeSlide = (index) => {
  currentIndex.value = index;
};

const previous = () => {
  currentIndex.value = (currentIndex.value - 1 + props.sliderImages.length) % props.sliderImages.length;
  navColor.value = props.sliderImages[currentIndex.value]?.navColor || '';
};

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.sliderImages.length;
  navColor.value = props.sliderImages[currentIndex.value]?.navColor || '';
};

onMounted(startAutoSwipe);

const handleSideMenu = () => {
  isOpenSidebarSlider.value = true;
};

onClickOutside(closeMenu, () => {
  isOpenSidebarSlider.value = false;
});
</script>

<style scoped>
/* Add your scoped styles here */
</style>
