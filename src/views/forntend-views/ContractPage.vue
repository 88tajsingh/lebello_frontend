<template>
  <div class="relative pb-20">
    <NavBar :absolute="false" />
    <div class="absolute top-11 right-0 mx-auto">
      <img src="https://lebello.com/wp-content/themes/lebello-ep/images/logo2.png" />
    </div>
    <!-- menu icon  -->
    <div class="relative" ref="closeMenu">
      <div class="absolute top-24 right-0">
        <v-card id="mySidenav" :dark="active" @click="active = true"
          :class="{ 'w-[230px] right-0 ': isOpen, 'w-[230px] right-[-250px] ': !isOpen }"
          class="sidenav bg-[#ededed] text-graphik text-[14px] pb-2 z-50 absolute top-7 right-0 transition-all duration-1000 ease-in-out overflow-hidden">
          <div class=" ">
            <div class="flex border border-gray-400 items-center">
              <div class="sticky top-3 p-4 border-r border-gray-400">
                <MenuSvg size="11px" fillColor="black" />
              </div>
              <div class="h-auto">
                <h3 class="text-[14px] font-medium">
                  <a href="https://www.lebello.com/product/" class="uppercase">Collection 2024</a>
                </h3>
              </div>
            </div>
            <div id="" class="text-black">
              <div v-for="(item, index) in items" :key="index" class="border-0" :class="{
                'rounded-t-lg': index === 0,
                'rounded-b-lg': index === items.length - 1,
              }">
                <h2 :id="'heading' + index" class="mb-0">
                  <button @click="toggleAccordion(index)" :aria-expanded="activeIndex === index"
                    :aria-controls="'collapse' + index"
                    class="group relative flex w-full items-center hover:text-orange border-0 px-5 py-2 text-left transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none"
                    :class="{
                      ' text-primary shadow-border-b hover:text-orange dark:bg-surface-dark dark:text-primary dark:shadow-white/10':
                        activeIndex === index,
                    }" type="button">
                    {{ item.title }}
                    <span class="-me-1 ms-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out" :class="{
                      'rotate-0': activeIndex !== index,
                      'rotate-[-180deg]': activeIndex === index,
                    }">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="10px" height="10px" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </button>
                </h2>
                <div :id="'collapse' + index" v-show="activeIndex === index" class="pl-7 py-0"
                  :aria-labelledby="'heading' + index" data-twe-collapse-item data-twe-parent="#accordionExample">
                  <!-- <div>
                    <strong>{{ item.bodyTitle }}</strong> {{ item.bodyContent }}
                    </div> -->
                  <div v-if="item.subMenu">
                    <ul>
                      <li class="hover:text-orange text-graphikLight text-[13px]"
                        v-for="(sub, itemIndex) in item.subMenu" :key="itemIndex">
                        <a href="#" class="font-graphikLight text-[13px]">{{
                          sub.name
                          }}</a>
                      </li>
                    </ul>
                  </div>
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
    <div class="container pl-20 pt-7 pb-5">
      <!-- Page Header -->
      <div class="flex relative">
        <h1 class="uppercase font-graphik text-[#3d3d3d] text-[20px]">
          HOTELS & RESORTS
        </h1>
      </div>
      <div class="">
        <ul class="flex">
          <li class="font-graphik text-[15px] hover:text-blue text-green">
            <a href="https://lebello.com/contract-design/">Contract Design</a><span class="ml-3 mr-1">/</span>
          </li>
          <li class="hover:text-blue font-graphik text-[15px]">
            <a class="overview-jumper_s" href="https://lebello.com/contract-design/">Hotels & Resorts</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- images -->
    <div class="mx-5 md:mx-20 relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-0">
      <!-- Loop through products -->
      <div v-for="(product, index) in products" :key="index" class=" ">
        <div class="prod_content overflow-hidden">
          <div class="product_img holder relative" :class="{
            'transition-transform  duration-9000 ease-in-out transform scale-125':
              isHovered[index],
          }" @mouseenter="toggleOverlay(index, true)" @mouseleave="toggleOverlay(index, false)">
            <router-link to="/">
              <img class="aos-item w-full" ref="element" :data-aos="animationType"
                :data-aos-duration="getAnimationDuration(index)" :src="product?.image" :alt="product?.name" />
              <div :class="{
                'absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] transition-colors duration-100 z-20':
                  isHovered[index],
              }"></div>
              <div class="prod-overlay " :class="{ 'show-overlay': isHovered[index] }">
                <div class="overlay-content">
                  <p class="text-[11px] px-6 font-graphik">{{ product?.name }}</p>
                  <p class=" text-[11px] font-graphikLight">{{ product?.location }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterSection />
</template>

<script setup>
import NavBar from "@/components/frontend-components/Nav-bar.vue";
import MenuSvg from "@/components/frontend-components/Svg/Menu-Svg.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
import FooterSection from "@/components/frontend-components/Footer-section.vue";
import AOS from "aos";

import "aos/dist/aos.css";

const element = ref(null);
const animationType = "fade-up";
const active = ref(false);
const isOpen = ref(false);
const isHovered = ref([]);
const closeMenu = ref(null);

const closeSideMenu = () => {
  isOpen.value = false;
  active.value = false;
};
onClickOutside(closeMenu, closeSideMenu);

const products = [
  {
    id: 1,
    name: "Sandbar Jax Bch | Springhill Suites By Marriott",
    location: "Jacksonville Beach, FL",
    link: "https://lebello.com/contract_design/springhill-suites/",
    image:
      "http://lebello.com/wp-content/uploads/thumbs/SpringhillSuites-JacksonvilleFL-350X234.png",
  },
  {
    id: 2,
    name: "Watt Plaza",
    location: "Los Angeles, CA",
    link: "https://lebello.com/contract_design/watt-plaza/",
    image: "http://lebello.com/wp-content/uploads/thumbs/watt-plaza-350X234.png",
  },
  {
    id: 3,
    name: "Ebbdunedin",
    location: "EBB Bunded In , New Zealand",
    link: "https://lebello.com/contract_design/ebbdunedin/",
    image: "http://lebello.com/wp-content/uploads/thumbs/lebello-ebbdunedin-350X234.png",
  },
  {
    id: 2,
    name: "Watt Plaza",
    location: "Los Angeles, CA",
    link: "https://lebello.com/contract_design/watt-plaza/",
    image: "http://lebello.com/wp-content/uploads/thumbs/watt-plaza-350X234.png",
  },
  {
    id: 3,
    name: "Ebbdunedin",
    location: "EBB Bunded In , New Zealand",
    link: "https://lebello.com/contract_design/ebbdunedin/",
    image: "http://lebello.com/wp-content/uploads/thumbs/lebello-ebbdunedin-350X234.png",
  },
  {
    id: 2,
    name: "Watt Plaza",
    location: "Los Angeles, CA",
    link: "https://lebello.com/contract_design/watt-plaza/",
    image: "http://lebello.com/wp-content/uploads/thumbs/watt-plaza-350X234.png",
  },
  {
    id: 3,
    name: "Ebbdunedin",
    location: "EBB Bunded In , New Zealand",
    link: "https://lebello.com/contract_design/ebbdunedin/",
    image: "http://lebello.com/wp-content/uploads/thumbs/lebello-ebbdunedin-350X234.png",
  },
  {
    id: 2,
    name: "Watt Plaza",
    location: "Los Angeles, CA",
    link: "https://lebello.com/contract_design/watt-plaza/",
    image: "http://lebello.com/wp-content/uploads/thumbs/watt-plaza-350X234.png",
  },
  {
    id: 3,
    name: "Ebbdunedin",
    location: "EBB Bunded In , New Zealand",
    link: "https://lebello.com/contract_design/ebbdunedin/",
    image: "http://lebello.com/wp-content/uploads/thumbs/lebello-ebbdunedin-350X234.png",
  },
  {
    id: 2,
    name: "Watt Plaza",
    location: "Los Angeles, CA",
    link: "https://lebello.com/contract_design/watt-plaza/",
    image: "http://lebello.com/wp-content/uploads/thumbs/watt-plaza-350X234.png",
  },
  {
    id: 3,
    name: "Ebbdunedin",
    location: "EBB Bunded In , New Zealand",
    link: "https://lebello.com/contract_design/ebbdunedin/",
    image: "http://lebello.com/wp-content/uploads/thumbs/lebello-ebbdunedin-350X234.png",
  },
  {
    id: 3,
    name: "Ebbdunedin",
    location: "EBB Bunded In , New Zealand",
    link: "https://lebello.com/contract_design/ebbdunedin/",
    image: "http://lebello.com/wp-content/uploads/thumbs/lebello-ebbdunedin-350X234.png",
  },
  {
    id: 1,
    name: "Sandbar Jax Bch | Springhill Suites By Marriott",
    location: "Jacksonville Beach, FL",
    link: "https://lebello.com/contract_design/springhill-suites/",
    image:
      "http://lebello.com/wp-content/uploads/thumbs/SpringhillSuites-JacksonvilleFL-350X234.png",
  },
  {
    id: 2,
    name: "Watt Plaza",
    location: "Los Angeles, CA",
    link: "https://lebello.com/contract_design/watt-plaza/",
    image: "http://lebello.com/wp-content/uploads/thumbs/watt-plaza-350X234.png",
  },
  {
    id: 3,
    name: "Ebbdunedin",
    location: "EBB Bunded In , New Zealand",
    link: "https://lebello.com/contract_design/ebbdunedin/",
    image: "http://lebello.com/wp-content/uploads/thumbs/lebello-ebbdunedin-350X234.png",
  },
  {
    id: 3,
    name: "Ebbdunedin",
    location: "EBB Bunded In , New Zealand",
    link: "https://lebello.com/contract_design/ebbdunedin/",
    image: "http://lebello.com/wp-content/uploads/thumbs/lebello-ebbdunedin-350X234.png",
  },
];

const toggleOverlay = (index, show) => {
  isHovered.value[index] = show;
};
onMounted(() => {
  AOS.init({});
  AOS.refresh();

  AOS.init(
    {
      disable: false,
      startEvent: "DOMContentLoaded",
      offset: 170,
      delay: 1,
      easing: "ease",
      once: false,
      mirror: false,
      anchorPlacement: "top-bottom",
    },
    element.value
  );

  products.value = [];
  isHovered.value = new Array(products.value.length).fill(false);
});

onUnmounted(() => {
  AOS.refreshHard();
});

const items = ref([
  {
    title: "Hotels & Resorts",
  },
  {
    title: "Residential",
    subMenu: [
      { name: "overview", url: "#" },
      { name: "Barneys New York CO-OP", url: "#" },
      { name: "University of Queensland", url: "#" },
      { name: "Taylor Family Digital Library, University of Calgary", url: "#" },
    ],
  },
  {
    title: "Retail & Education",
  },
  {
    title: "Communal Spaces",
  },
  {
    title: "Restaurants & Hospitality",
    subMenu: [
      { name: "overview", url: "#" },
      { name: "Barneys New York CO-OP", url: "#" },
      { name: "University of Queensland", url: "#" },
      { name: "Taylor Family Digital Library, University of Calgary", url: "#" },
    ],
  },
]);

const activeIndex = ref(null);

const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const getAnimationDuration = computed(() => {
  return (index) => {
    const positionInRow = index % 4;
    switch (positionInRow) {
      case 0:
        return 500;
      case 1:
        return 1000;
      case 2:
        return 1500;
      case 3:
        return 2000;
      default:
        return 500;
    }
  };
});

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
