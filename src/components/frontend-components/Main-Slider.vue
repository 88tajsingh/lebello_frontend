<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import SideMenu from './Side-Menu.vue';
import NavBar from './Nav-bar.vue';
import { scrollDown } from '@/helper/frontendHelpers';

const router = useRouter();
const navColor = ref('');
const atBottom = ref(false);
const currentIndex = ref(0);

const props = defineProps({
  isAbsolute: { type: Boolean, required: true },
  imageKeyName: { type: String, default: 'featured_image_data' },
  sidebarList: { type: Array, required: true },
  mainSlider: { type: Boolean },
  showHeading: { type: Boolean, default: true },
  sliderImages: { type: Array, default: () => [] },
  showDropDown: { type: Boolean },
  downDropdown: { type: Boolean },
});

const handleProductNav = (nav) => {
  sessionStorage.setItem('productDetail', nav.id);
  router.push({ name: 'productDetail', params: { slug: nav.slug } });
};

const startAutoSwipe = () => {
  setInterval(() => {
    navColor.value = props.sliderImages[currentIndex.value]?.navColor;
    atBottom.value = !atBottom.value;
    next();
  }, 5000);
};

const changeSlide = (index) => {
  currentIndex.value = index;
  navColor.value = props.sliderImages[currentIndex.value]?.navColor;
};

const previous = () => {
  currentIndex.value = (currentIndex.value - 1 + props.sliderImages.length) % props.sliderImages.length;
  navColor.value = props.sliderImages[currentIndex.value]?.navColor;
};

const next = () => {
  if (props.sliderImages.length === 0) {
    console.error('Slider images array is empty');
    return;
  }
  currentIndex.value = (currentIndex.value + 1) % props.sliderImages.length;
  navColor.value = props.sliderImages[currentIndex.value]?.navColor;
};

onMounted(startAutoSwipe);
</script>

<template>
  <NavBar :absolute="props.isAbsolute" :navColor="navColor" />

  <!-- Carousel Section -->
  <div id="default-carousel" class="relative" data-carousel="static">
    <div class="overflow-hidden h-screen">
      <div v-for="(slide, index) in props.sliderImages" :key="index" class="w-full duration-700 ease-in-out" v-show="currentIndex === index">
        <img :src="$filePath(slide[props.imageKeyName]?.file_url)" class="block absolute top-1/2 left-1/2 w-full h-screen -translate-x-1/2 -translate-y-1/2" :alt="slide[props.imageKeyName]?.file_url" />
        
        <!-- Navigation Buttons -->
        <button @click="previous" class="absolute left-10 top-1/2 z-30 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :stroke="navColor === 'white' ? '#ffffff' : '#000000'" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button @click="next" class="absolute right-10 top-1/2 z-30 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :stroke="navColor === 'white' ? '#ffffff' : '#000000'" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Carousel Indicators -->
    <div class="absolute bottom-1/2 left-7 space-x-2 z-30">
      <button v-for="(slide, index) in props.sliderImages" :key="index" @click="changeSlide(index)" :class="{ 'bg-gray-700': currentIndex === index, 'bg-gray-400': currentIndex !== index }" class="w-2 h-2 rounded-full"></button>
    </div>

    <!-- Text on Carousel -->
    <div :class="['absolute transition-all duration-1000 ease-in-out', { 'bottom-6': !atBottom, 'bottom-10': atBottom }]" class="text-white left-6 sm:left-14 md:left-20 capitalize opacity-80 font-graphikLight sm:text-[20px] md2:text-[40px]">
      {{ props.sliderImages[currentIndex]?.title || "default" }}
    </div>

    <!-- Down Arrow -->
    <div class="absolute left-1/2 bottom-5 animate-bounce text-5xl text-white font-sans hover:bg-[#0e0e0e89] bg-opacity-5">
      <div @click="() => scrollDown('sideText')" class="px-3 py-1 cursor-pointer">
        <svg width="24px" height="24px" viewBox="0 0 1024 1024" fill="#fafafa">
          <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" />
        </svg>
      </div>
    </div>
  </div>

  <!-- Side Menu -->
  <div class="absolute top-48 right-0 pr-3">
    <SideMenu>
      <div class="z-50">
        <div v-if="props.mainSlider" class="mx-7 mt-4 mb-2">
          <h3 class="text-[14px] uppercase font-graphikMedium">
            <a href="https://www.lebello.com/listItem/" class="text-textColorBlack">Collection 2024</a>
          </h3>
        </div>

        <div v-else class="flex border border-gray-400 items-center">
          <span class="sticky top-3 p-4 border-r mr-4 border-gray-400 bg-transparent">
            <MenuSvg size="15px" fillColor="black" />
          </span>
          <h3 class="text-[14px] font-medium">
            <a href="https://www.lebello.com/listItem/" class="text-graphikMedium text-textColorBlack">Collection 2024</a>
          </h3>
        </div>

        <div class="px-7">
          <div class="search">
            <form role="search">
              <div v-if="props.showDropDown">
                <FormDropdown />
              </div>
              <div class="relative border-b border-gray-400 mt-2">
                <input class="w-full py-[1px] text-[14px] font-graphikLight border-none bg-transparent focus:outline-none" id="username" type="text" placeholder="Search" />
                <div class="absolute right-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-3 text-gray-400 hover:text-gray-500" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </form>
          </div>

          <div v-if="props.showHeading" class="border-y border-[#33333357]">
            <h3 class="py-2 font-graphik text-[14px] text-textColorBlack border-b">Highlights</h3>
          </div>

          <ul class="max-h-52 overflow-auto text-[13px] text-textColorBlack">
            <PerfectScrollbar>
              <li v-for="(listItem, index) in props.sidebarList" :key="index">
                <a @click="handleProductNav(listItem)" class="hover:text-orange">{{ listItem?.title }}</a>
              </li>
            </PerfectScrollbar>
          </ul>

          <div v-if="props.downDropdown" class="mb-2">
            <FormDropdown />
          </div>
        </div>
      </div>
    </SideMenu>
  </div>
</template>

<style scoped>
/* Add your scoped styles here if necessary */
</style>
