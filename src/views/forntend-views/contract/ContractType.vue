<template>
  <div class="relative pb-20">
    <NavBar :absolute="false" />
    <div class="absolute z-999999 top-2 lg:top-11 right-0 mx-auto">
      <img src="/src/assets/logo/logohori.png" />
    </div>
    <!-- menu icon  -->
    <div class="absolute z-999999 border mt-24 right-0 ">
      <SideMenu  svgColor="#f9f9f9" menuClass="p-2 bg-[#9ce163]" openClass="w-[230px] absolute z-50 top-0 right-0 "
      closeClass="w-[230px] absolute z-50 top-0 right-[-250px]" height="">
        <div class="flex border border-gray-400 items-center">
          <div class="sticky top-3 p-4 border-r border-gray-400">
            <Icons.Menu size="15px" fillColor="black" />
          </div>
          <h3 class="text-[14px] font-medium">
            <a href="https://www.lebello.com/product/" class="uppercase">Collection 2024</a>
          </h3>
        </div>
        <div class="text-black">
          <div v-for="(item, key) in contractDesignSidebar" :key="key" class="border-0 rounded-lg">
            <h2 :id="'heading' + key" class="mb-0">
              <button @click="toggleAccordion(key)" :aria-expanded="activeIndex === key"
                :aria-controls="'collapse' + key"
                class="group relative flex w-full items-center hover:text-orange border-0 px-4 py-2 text-left transition  focus:outline-none"
                :class="{ 'text-orange dark:bg-surface-dark dark:text-orange': activeIndex === key }" type="button"
                @mouseover="hoverKey = key" @mouseleave="hoverKey = null">
                {{ key }}
                <span class="-me-1 ms-auto pt-1 transition-transform duration-200 ease-in-out"
                  :class="{ 'rotate-0': activeIndex !== key, 'rotate-[-180deg]': activeIndex === key }">
                  <Icons.Arrow size="15px"
                    :fillColor="hoverKey === key ? '#d98c3a' : activeIndex === key ? '#d98c3a' : ''" strokeWidth="22.77"
                    direction="top" />
                </span>
              </button>
            </h2>
            <div :id="'collapse' + key" v-show="activeIndex === key" class="pl-7 py-0"
              :aria-labelledby="'heading' + key" data-twe-collapse-item data-twe-parent="#accordionExample">
              <div v-if="item">
                <ul>
                  <!-- Overview -->
                  <li v-if="item.overview">
                    <a @click.prevent="handleClick(item.overview)"
                      class="font-graphikLight text-[13px] cursor-pointer">{{
                        item.overview.title }}</a>
                  </li>
                  <!-- Location -->
                  <template v-if="Array.isArray(item)">
                    <li v-for="(sub, itemIndex) in item" :key="itemIndex">
                      <a @click.prevent="handleClick(sub)" class="font-graphikLight text-[13px] cursor-pointer">{{
                        sub.contract_location || sub.title }}</a>
                    </li>
                  </template>
                  <!-- Contract designs -->
                  <template v-else-if="item.designs">
                    <li v-for="(sub, itemIndex) in item.designs" :key="itemIndex">
                      <a @click.prevent="handleClick(sub)" class="font-graphikLight text-[13px] cursor-pointer">{{
                        sub.title }}</a>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SideMenu>
    </div>
    <div class="container pt-7 pb-5 pl-5 md:pl-10 lg:pl-20  ">
      <!-- Page Header -->
      <div class="flex relative">
        <h1 class="uppercase font-graphik text-[#3d3d3d] text-[20px]">
          {{ headerText }}
        </h1>
      </div>
      <div class="custom-hidden custom-hidden-md-block">
        <ul class="flex">
          <li class="font-graphik text-[15px] hover:text-blue cursor-pointer text-green">
            <a href="/contract_designs">Contract Design</a><span class="ml-3 mr-1">/</span>
          </li>
          <li class="hover:text-blue font-graphik cursor-pointer text-[15px]">
            <a class="overview-jumper_s">{{ headerText }}</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- images -->
    <div class="mx-5 md:mx-10 lg:mx-20 relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-0">
      <!-- Loop through products -->
      <div v-for="(slide, index) in contractDesignData" :key="index" class=" ">
        <div @click.prevent="handleClick(slide)" class="prod_content h-full overflow-hidden">
          <div @click="handleRoute(slide)" class="product_img holder relative w-full h-full object-cover max-h-[190px] "
            :class="{ 'md:transition-transform md:duration-1000  md:ease-in-out md:transform scale-125': isHovered[index] }"
            @mouseenter="toggleOverlay(index, true)" @mouseleave="toggleOverlay(index, false)">
            <img :src="$filePath(slide?.featured_image_data?.file_url)" :alt="slide?.featured_image_data?.file_url"
              class="aos-item w-full h-full object-cover   " ref="element" :data-aos="animationType"
              :data-aos-duration="getAnimationDuration(index)" />
            <div :class="{
              'absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] transition-colors duration-100 z-99999':
                isHovered[index],
            }"></div>
            <div class="prod-overlay " :class="{ 'show-overlay': isHovered[index] }">
              <div class="overlay-content">
                <p class="text-[11px] px-6 font-graphik">{{ slide?.title }}</p>
                <p class=" text-[11px] font-graphikLight">{{ slide?.contract_info_location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterSection />
</template>

<script setup>
// Importing necessary components, libraries, and hooks
import NavBar from "@/components/frontend-components/Nav-bar.vue";
import Icons from "@/components/frontend-components/Svg/Icons";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
import SideMenu from "@/components/frontend-components/Side-Menu.vue";
import FooterSection from "@/components/frontend-components/Footer-section.vue";
import AOS from "aos";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

// Importing AOS library for animations
import "aos/dist/aos.css";
import { getContractType } from "@/helper/frontendHelpers";

// Initialize store, router, and route
const store = useStore();
const router = useRouter();
const route = useRoute();

// References state management
const element = ref(null);
const hoverKey = ref(null);
const animationType = "fade-up";
const active = ref(false);
const isOpen = ref(false);
const isHovered = ref([]);
const closeMenu = ref(null);

const id = ref(sessionStorage.getItem('contract_type_id'));
const headerText = route?.params?.slug;
console.log("headerText", headerText);

// Function to close side menu when clicked outside
const closeSideMenu = () => {
  isOpen.value = false;
  active.value = false;
};
onClickOutside(closeMenu, closeSideMenu);  // Set up click outside event listener

const contractDesignSidebar = ref([]);
const contractDesignData = ref([]);

// Function to fetch contract design data
const handleContractDesignData = async () => {
  const { status, data } = await getContractType(id.value);
  if (status === 200 && data.success) {
    contractDesignSidebar.value = data.data.contract_design_sidebar;
    contractDesignData.value = data.data.contract_desing;
  } else {
    contractDesignData.value = [];
  }
};

onMounted(() => {
  handleContractDesignData();
});

const handleSideMenu = () => {
  isOpen.value = !isOpen.value;
};

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

  contractDesignData.value = [];
  isHovered.value = new Array(contractDesignData.value.length).fill(false);
});

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

// Refresh AOS animations on component unmount
onUnmounted(() => {
  AOS.refreshHard();
});

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

// Function to open the navigation menu
const openNav = () => {
  active.value = true;
  isOpen.value = true;
};

</script>

<style scoped>
.custom-hidden {
    display: none;
  }

  @media (min-width: 768px) {
    .custom-hidden-md-block {
      display: block;
    }
  }
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