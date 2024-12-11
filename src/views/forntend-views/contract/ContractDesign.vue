<template>
  <div class="relative overflow-hidden">
    <NavBar :absolute="false" />
    <!-- Logo -->
    <div class="absolute top-11 right-0 z-[9999] mx-auto">
      <img src="https://lebello.com/wp-content/themes/lebello-ep/images/logo2.png" alt="Logo" />
    </div>
    <!-- Menu Icon -->
    <div class="absolute top-52 right-0 z-[9999]">
      <SideMenu openClass="w-[230px] absolute z-50 top-0 right-0 "
        closeClass="w-[230px] absolute z-50 top-0 right-[-250px]" height="" svgColor="#f9f9f9"
        menuClass="p-2 bg-[#9ce163]">
        <div class="flex border border-gray-400 items-center">
          <div class="sticky top-3 p-4 border-r border-gray-400">
            <Icons.Menu size="15px" fillColor="black" />
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
                class="group relative flex w-full items-center hover:text-orange border-0 px-4 py-2 text-left transition hover:z-[2] focus:z-[3] focus:outline-none"
                :class="{ 'text-orange dark:bg-surface-dark dark:text-orange': activeIndex === key }" type="button"
                @mouseover="hoverKey = key" @mouseleave="hoverKey = null">
                {{ key }}
                <span class="-me-1 ms-auto pt-1 transition-transform duration-200 ease-in-out"
                  :class="{ 'rotate-0': activeIndex !== key, 'rotate-[-180deg]': activeIndex === key }">
                  <Icons.Arrow size="15px" :fillColor="hoverKey === key ? '#d98c3a' : activeIndex === key ? '#d98c3a' : ''" strokeWidth="22.77"
                    direction="top" />
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
                        <!-- {{sub}} -->
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

    <div class="mx-5 mt-4 lg:mx-20">
      <!-- Slider -->
      <div id="default-carousel" class="relative">
        <Slider :images="contractDesignData.contract_design_slider" imageKeyName='contract_slider_image_data'
          :navColor="'white'" sliderPageName="contractDesign" :hasSidebar="false">
        </Slider>
        <!-- Logo -->
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

      <!-- Image Gallery -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-0 py-3 md:py-0">
        <div v-for="(images, index) in contractDesignData.contract_design" :key="index"
          class="prod_content overflow-hidden">
          <div @click="handleRoute(images)" class="product_img relative w-full max-h-[190px] h-full"
            :class="{ 'md:transition-transform md:duration-1000 md:ease-in-out md:transform scale-125': isHovered[index] }"
            @mouseenter="toggleOverlay(index, true)" @mouseleave="toggleOverlay(index, false)">
            <img :src="$filePath(images?.featured_image_data?.file_url)" :alt="images?.featured_image_data?.file_url"
              class="aos-item w-full h-full object-cover" ref="element" :data-aos="animationType"
              :data-aos-duration="getAnimationDuration(index)" />
            <div
              :class="{ 'absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] transition-colors duration-100 z-20': isHovered[index] }">
            </div>
            <div class="prod-overlay" :class="{ 'show-overlay': isHovered[index] }">
              <div class="overlay-content">
                <p class="text-[11px] font-graphik">{{ images?.title }}</p>
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
import Icons from "@/components/frontend-components/Svg/Icons";
import FooterSection from "@/components/frontend-components/Footer-section.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from 'vue-router';
import AOS from "aos";
import "aos/dist/aos.css";
import SideMenu from "@/components/frontend-components/Side-Menu.vue";
import { getContractDesignData } from "@/helper/frontendHelpers";
import { useStore } from "vuex";
import Slider from "@/components/frontend-components/Slider.vue";

// Setup router and store
const router = useRouter();
const store = useStore();

// References
const element = ref(null);
const animationType = "fade-up";
const isHovered = ref([]);
const contractDesignData = ref([]);
const hoverKey = ref(null);

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

// AOS Initialization
onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  AOS.init({});
  AOS.refresh();

  // Initialize hover states
  isHovered.value = new Array(contractDesignData.value?.contract_design?.length).fill(false);
  handleContractDesignData();
});

onUnmounted(() => {
  AOS.refreshHard();
});
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