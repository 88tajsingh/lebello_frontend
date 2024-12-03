<template>
  <div class="relative overflow-hidden">
    <NavBar :absolute="false" />
    <!-- Logo -->
    <div class="absolute top-11 right-0 z-[9999] mx-auto">
      <img src="https://lebello.com/wp-content/themes/lebello-ep/images/logo2.png" alt="Logo" />
    </div>
    <!-- Menu Icon -->
    <div ref="closeMenu" class="absolute top-52 right-0 z-[9999]">
      <SideMenu :handleSideMenu="handleSideMenu" :isOpen="isOpenSidebar" svgColor="#f9f9f9"
        menuClass="p-2 bg-[#9ce163]">
        <div class="flex border border-gray-400 items-center">
          <div class="sticky top-3 p-4 border-r border-gray-400">
            <MenuSvg size="15px" fillColor="black" />
          </div>
          <h3 class="text-sm font-medium">
            <a href="https://www.lebello.com/product/" class="uppercase">Collection 2024</a>
          </h3>
        </div>

        <div class="text-black">
          <div v-for="(item, key) in contractDesignData.contract_design_sidebar" :key="key" class="border-0 rounded-lg">
            <h2 :id="'heading' + key" class="mb-0">
              <button @click="toggleAccordion(key)" :aria-expanded="activeIndex === key"
                :aria-controls="'collapse' + key"
                class="group relative flex w-full items-center hover:text-orange border-0 px-5 py-2 text-left transition hover:z-[2] focus:z-[3] focus:outline-none"
                :class="{ 'text-primary dark:bg-surface-dark dark:text-primary': activeIndex === key }" type="button">
                {{ key }}
                <span class="absolute right-0 h-5 w-5 transition-transform duration-200 ease-in-out"
                  :class="{ 'rotate-0': activeIndex !== key, 'rotate-180': activeIndex === key }">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="10px" height="10px" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
            </h2>
            <div :id="'collapse' + key" v-show="activeIndex === key" class="pl-7 py-0">
              <div v-if="item">
                <ul>
                  <li v-if="item.overview">
                    <a @click.prevent="handleClick(item.overview)" class="font-graphikLight text-sm cursor-pointer">
                      {{ item.overview.title }}
                    </a>
                  </li>
                  <template v-if="Array.isArray(item)">
                    <li v-for="(sub, itemIndex) in item" :key="itemIndex">
                      <a @click.prevent="handleClick(sub)" class="font-graphikLight text-sm cursor-pointer">
                        {{ sub.contract_location || sub.title }}
                      </a>
                    </li>
                  </template>
                  <template v-else-if="item.designs">
                    <li v-for="(sub, itemIndex) in item.designs" :key="itemIndex">
                      <a @click.prevent="handleClick(sub)" class="font-graphikLight text-sm cursor-pointer">
                        {{ sub.title }}
                      </a>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SideMenu>
    </div>
    <!-- Slider -->
    <div class="mx-5 mt-4 lg:mx-20">
      <div id="default-carousel" class="relative">
        <div class="w-full h-full mx-0 overflow-hidden">
          <div class="h-screen w-screen">
            <div v-for="(slide, index) in contractDesignData.contract_design_slider" :key="index"
              v-show="currentIndex === index" class="w-full duration-700 ease-in-out">
              <img :src="$filePath(slide?.contract_slider_image_data?.file_url)"
                class="absolute top-1/2 left-1/2 w-full h-screen -translate-x-1/2 -translate-y-1/2" :alt="slide.alt" />
              <!-- Text Overlay -->
              <div class="absolute bottom-20 left-14">
                <div class="font-graphik px-2 py-2 mb-4" :style="titleStyle(slide)">
                  {{ camelCase(slide?.heading_case, slide?.title) }}
                </div>
                <span class="font-graphikLight px-3 py-2" :style="subHeadingStyle(slide)">
                  {{ camelCase(slide?.sub_heading_case, slide?.contract_info_location) }}
                </span>
              </div>
            </div>

            <!-- Navigation Dots -->
            <div class="flex absolute bottom-1/3 right-0 space-x-2 -translate-x-1 rotate-90 z-30">
              <button v-for="(slided, index) in contractDesignData.contract_design" :key="index" type="button" :class="{
                'bg-gray-700': currentIndex === index,
                'bg-gray-400': currentIndex !== index,
              }" class="w-2 h-2 rounded-full" @click="changeSlide(index)"></button>
            </div>

            <!-- Previous Button -->
            <button @click="previous" type="button"
              class="absolute left-10 top-1/2 z-30 p-3 text-white cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <!-- Next Button -->
            <button @click="next" type="button"
              class="absolute right-10 top-1/2 z-30 p-4 text-white cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div class="absolute top-3 right-0">
          <img src="https://lebello.com/wp-content/themes/lebello-ep/images/content/contract-design.png"
            alt="Contract Design" />
        </div>
      </div>

      <!-- Description -->
      <div class="bg-[#f7f7f7] font-graphik text-sm text-[#4c4c4c]">
        <p class="px-5 py-6">
          Lebello contract design offers customized solutions for the hospitality, retail, and trade industry. We build
          long-term partnerships with our clients and help bring their ideas to fruition by delivering personal and
          unique bespoke outdoor products.
        </p>
      </div>

      <!-- Images -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-0 py-3 md:py-0">
      <div v-for="(images, index) in contractDesignData.contract_design" :key="index"
          class="prod_content overflow-hidden ">
          <div @click="handleRoute(images)" class="product_img holder relative w-full max-h-[190px] h-full"
            :class="{ 'md:transition-transform md:duration-1000  md:ease-in-out md:transform scale-125': isHovered[index] }"
            @mouseenter="toggleOverlay(index, true)" @mouseleave="toggleOverlay(index, false)">
            <img :src="$filePath(images?.featured_image_data?.file_url)" :alt="images?.featured_image_data?.file_url"
              class="aos-item w-full h-full object-cover   " ref="element" :data-aos="animationType"
              :data-aos-duration="getAnimationDuration(index)" />
            <div
              :class="{ 'absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] transition-colors duration-100 z-20': isHovered[index] }">
            </div>
            <div class="prod-overlay" :class="{ 'show-overlay': isHovered[index] }">
              <div class="overlay-content">
                <p class="text-[11px]  font-graphik">{{ images?.title }}</p>
                <p class="text-[11px] font-graphikLight">{{ images?.contract_info_location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <FooterSection />
  </div>
</template>



<script setup>
import NavBar from "@/components/frontend-components/Nav-bar.vue";
import MenuSvg from "@/components/frontend-components/Svg/Menu-Svg.vue";
import FooterSection from "@/components/frontend-components/Footer-section.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from 'vue-router';
import { onClickOutside } from "@vueuse/core";
import AOS from "aos";
import "aos/dist/aos.css";
import SideMenu from "@/components/frontend-components/Side-Menu.vue";
import { getContractDesignData } from "@/helper/frontendHelpers";
import { useStore } from "vuex";

// Setup router and store
const router = useRouter();
const store = useStore();

// References
const element = ref(null);
const currentIndex = ref(0);
const animationType = "fade-up";
const active = ref(false);
const isOpen = ref(false);
const isHovered = ref([]);
const closeMenu = ref(null);
const contractDesignData = ref([]);
const isOpenSidebar = ref(false);
const handleSideMenu = () => {
  isOpenSidebar.value = !isOpenSidebar.value;
};

const closeSideMenu = () => {
  isOpenSidebar.value = false;
};
onClickOutside(closeMenu, closeSideMenu);


// Navigation Handling
const handleClick = (sub) => {
  store.dispatch('setCurrentId', sub.id);
  let route;
  if (sub.title === 'overview' || sub.title === 'Overview') {
    route = { name: 'contractType', params: { slug: sub.slug } };
  } else if (sub.title) {
    route = { name: 'contractDesign', params: { slug: sub.slug } };
  } else {
    route = { name: 'ContractLocation', params: { slug: sub.slug } };
  }

  if (sub.title === 'overview' || sub.title === 'Overview') {
    sessionStorage.setItem('contract_type_id', sub.id);
  } else if (sub.title) {
    sessionStorage.setItem('contract_design_id', sub.id);
  } else {
    sessionStorage.setItem('contract_location_id', sub.id);
  }

  router.push(route);
};


const handleRoute = (sub) => {
  sessionStorage.setItem('contract_design_id', sub.id);
  router.push({ name: 'contractDesign', params: { slug: sub.slug } });
};


// Fetch Contract Design Data
const handleContractDesignData = async () => {
  const { status, data } = await getContractDesignData();
  contractDesignData.value = (status === 200 && data.success) ? data.data : [];
};

// Auto Slider
const startAutoSwipe = () => {
  setInterval(next, 5000);
};

const changeSlide = (index) => {
  currentIndex.value = index;
};

const previous = () => {
  currentIndex.value = (currentIndex.value - 1 + contractDesignData.value.contract_design_slider.length) % contractDesignData.value.contract_design_slider.length;
};

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % contractDesignData.value.contract_design_slider.length;
};

// Accordion Management
const activeIndex = ref(null);
const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

// Animation Duration
const getAnimationDuration = computed(() => {
  return (index) => {
    const positionInRow = index % 4;
    return positionInRow * 500 + 500;
  };
});

// Overlay Management
const toggleOverlay = (index, show) => {
  isHovered.value[index] = show;
};

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
  const defaultHex = '#ff9d0f';
  const baseBackground = slide?.sub_heading_background || defaultHex;
  const transparency = slide?.sub_heading_transparent_percentage
    ? parseFloat(slide.sub_heading_transparent_percentage) / 100
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

// Function to compute the subheading styles
const subHeadingStyle = (slide) => {
  const defaultHex = '#ff9d0f';
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

// AOS Initialization
onMounted(() => {
  AOS.init({});
  AOS.refresh();

  // Initialize hover states
  isHovered.value = new Array(contractDesignData.value?.contract_design?.length).fill(false);
  handleContractDesignData();
  startAutoSwipe();
});

onUnmounted(() => {
  AOS.refreshHard();
});

// Open Navigation
const openNav = () => {
  active.value = true;
  isOpen.value = true;
};

</script>

<style scoped>
.prod-overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hidden {
  display: none;
}

.accordion svg.rotate-180 {
  transform: rotate(180deg);
}

.prod-overlay.show-overlay {
  opacity: 1;
}

.overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  width: 100%;
  opacity: 1;
  z-index: 100;
}
</style>