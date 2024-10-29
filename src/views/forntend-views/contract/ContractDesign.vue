<template>
  <div class="relative pb-20">
    <NavBar :absolute="false" />
    
    <div class="absolute z-[9999] top-11 right-0 mx-auto">
      <img src="https://lebello.com/wp-content/themes/lebello-ep/images/logo2.png" />
    </div>

    <!-- Menu Icon -->
    <div class="relative z-[9999]" ref="closeMenu">
      <div class="absolute top-24 right-0">
        <v-card id="mySidenav" :dark="active" @click="active = true"
          :class="{ 'w-[230px] right-0': isOpen, 'w-[230px] right-[-250px]': !isOpen }"
          class="sidenav bg-[#ededed] text-graphik text-[14px] pb-2 z-50 absolute top-7 right-0 transition-all duration-300 overflow-hidden">
          
          <div class="flex border border-gray-400 items-center">
            <div class="sticky top-3 p-4 border-r border-gray-400">
              <MenuSvg size="15px" fillColor="black" />
            </div>
            <h3 class="text-[14px] font-medium">
              <a href="https://www.lebello.com/product/" class="uppercase">Collection 2024</a>
            </h3>
          </div>

          <div class="text-black">
            <div v-for="(item, key) in contractDesignData.contract_design_sidebar" :key="key" class="border-0 rounded-lg">
    <h2 :id="'heading' + key" class="mb-0">
      <button @click="toggleAccordion(key)" :aria-expanded="activeIndex === key"
        :aria-controls="'collapse' + key"
        class="group relative flex w-full items-center hover:text-orange border-0 px-5 py-2 text-left transition hover:z-[2] focus:z-[3] focus:outline-none"
        :class="{'text-primary dark:bg-surface-dark dark:text-primary': activeIndex === key}" type="button">
        {{ key }} <!-- Display key here -->
        <span class="-me-1 ms-auto h-5 w-5 transition-transform duration-200 ease-in-out"
          :class="{'rotate-0': activeIndex !== key, 'rotate-[-180deg]': activeIndex === key}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="10px" height="10px" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
    </h2>
    <div :id="'collapse' + key" v-show="activeIndex === key" class="pl-7 py-0"
      :aria-labelledby="'heading' + key" data-twe-collapse-item data-twe-parent="#accordionExample">
      <div v-if="item">
        <ul>
          <li class="hover:text-orange text-graphikLight text-[13px]" v-for="(sub, itemIndex) in item" :key="itemIndex">
            <a  @click.prevent="handleClick(sub)"  class="font-graphikLight text-[13px]">{{ sub.title || sub.contract_location }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>

          </div>
        </v-card>
        
        <span v-if="!active" @click="openNav" class="p-3 text-white">
          <MenuSvg size="35px" fillColor="#ffffff" class="p-2 bg-[#9ce163]" />
        </span>
      </div>
    </div>

    <!-- Slider --> 
    <div id="default-carousel" class="relative mx-3  md:mx-8 lg:mx-16" data-carousel="static">
      <div class="w-full h-full mx-0 overflow-hidden">
    <div class="h-screen">
      <div
        v-for="(slide, index) in contractDesignData.contract_design_slider"
        :key="index"
        v-show="currentIndex === index"
        class="w-full duration-700 ease-in-out"
        data-carousel-item
      >
        <img
          :src="$filePath(slide?.contract_slider_image_data?.file_url)"
          class="absolute top-1/2 left-1/2 w-full h-screen -translate-x-1/2 -translate-y-1/2"
          :alt="slide.alt"
        />
        
        <!-- Text Overlay -->
        <div id="sideText" class="absolute bottom-20 left-14">
          <div class="text-[25px] font-graphik uppercase px-2 py-1 mb-4"
          :style="{ color: slide?.contract_title_color, background: slide?.contract_background_title }"
          >
            {{ slide?.title }}
          </div>
          <span class="text-[17px] font-graphikLight  px-3 py-2"
          :style="{ color: slide?.contract_location_color, background: slide?.contract_location_background }"
          >
            {{ slide?.contract_info_location }}
          </span>
        </div>
      </div>

      <!-- Navigation Dots -->
      <div class="flex absolute bottom-1/3 rotate-90 z-30 right-0 space-x-2 -translate-x-1">
        <button
          v-for="(slided, index) in contractDesignData.contract_design"
          :key="index"
          type="button"
          :class="{'bg-gray-700': currentIndex === index, 'bg-gray-400': currentIndex !== index}"
          class="w-2 h-2 rounded-full"
          @click="changeSlide(index)"
        ></button>
      </div>

      <!-- Previous Button -->
      <button
        @click="previous"
        type="button"
        class="flex absolute left-10 z-30 justify-center items-center px-3 top-1/2 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <!-- Next Button -->
      <button
        @click="next"
        type="button"
        class="flex absolute right-10 z-30 justify-center items-center px-4 top-1/2 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>

     

      <div class="absolute top-3 right-0">
        <img src="https://lebello.com/wp-content/themes/lebello-ep/images/content/contract-design.png" alt="Contract Design" />
      </div>
    </div>

    <div class="mx-3 md:mx-8 lg:mx-16 bg-[#f7f7f7] font-graphik text-[14px] text-[#4c4c4c]">
      <p class="px-5 py-6">
        Lebello contract design offers customized solutions for the hospitality, retail and trade industry. We build long-term partnerships with our clients and help bring their ideas to fruition by delivering personal and unique bespoke outdoor products.
      </p>
    </div>

    <!-- Images -->
    <div class="mx-3 md:mx-8 lg:mx-16 relative grid grid-cols-2  md:grid-cols-4 gap-0 py-3 md:py-0">
      <div v-for="(images, index) in contractDesignData.contract_design" :key="index" class="prod_content overflow-hidden ">
        <div :onclick="()=>handleRoute(images)" class="product_img holder relative" :class="{'md:transition-transform md:duration-9000 md:ease-in-out md:transform scale-125': isHovered[index]}"
          @mouseenter="toggleOverlay(index, true)" @mouseleave="toggleOverlay(index, false)">
            <img :src="$filePath(images?.featured_image_data?.file_url)" :alt="images?.featured_image_data?.file_url" class="aos-item" ref="element"
              :data-aos="animationType" :data-aos-duration="getAnimationDuration(index)" />
            <div :class="{'absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] transition-colors duration-100 z-20': isHovered[index]}"></div>
            <div class="prod-overlay" :class="{ 'show-overlay': isHovered[index] }">
              <div class="overlay-content">
                <p class="text-[11px]  font-graphik">{{ images?.title }}</p>
                <p class="text-[11px] font-graphikLight">{{ images?.contract_info_location }}</p>
              </div>
            </div>
        </div>
      </div>
    </div>

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

// Navigation Handling
const handleClick = (sub) => {
  store.dispatch('setCurrentId', sub.id);
  const route = sub.title ? 
    { name: 'contractType', params: { slug: sub.slug, title: sub } } : 
    { name: 'ContractLocation', params: { slug: sub.slug } };
  router.push(route);
};

const handleRoute = (sub) => {
  store.dispatch('setCurrentId', sub.id);
  router.push({ name: 'contractDesign', params: { slug: sub.slug } });
};

const closeSideMenu = () => {
  isOpen.value = false;
  active.value = false;
};
onClickOutside(closeMenu, closeSideMenu);

// Fetch Contract Design Data
const handleContractDesignData = async () => {
  const { status, data } = await getContractDesignData();
  console.log("slider images", status, data);
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
    return positionInRow * 500 + 500; // Adjust duration based on position
  };
});

// Overlay Management
const toggleOverlay = (index, show) => {
  isHovered.value[index] = show;
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