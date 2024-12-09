<template>
  <div id="collection" class="h-full bg-[#e3dbcf] overflow-hidden pb-16 mx-0 transition duration-1000 ease-in">
    <!-- Menu Icon and Sidebar -->
    <div class="relative" id="sideText">
      <div class="absolute top-5 right-0 bg-transparent" ref="closeMenu">
        <SideMenu openClass="w-[500px] fixed z-50 top-0 right-0 " closeClass="w-[500px] fixed z-50 top-0 right-[-520px]" height="100vh"
        >
          <div class="z-50 pl-16 pr-32 pt-10">
            <!-- Sidebar Header -->
            <div  class=" mt-4 mb-2 gap-5  flex items-center">
          <span class="sticky ">
            <CloseSvg size="20px" fillColor="#000000" />
          </span>
          <h3 class="text-[20px] uppercase text-orange font-graphikMedium">
            <a href="https://www.lebello.com/listItem/" class="text-orange">Collection 2024</a>
          </h3>
        </div>


            <!-- Search Section -->
            <div class="">
              <div class="search mt-4">
            <form role="search">
              <div class="relative border-b border-[#33333357] mt-2  mx-0">
                <input class="w-full py-[1px] font-graphikLight text-[20px] px-0 border-none bg-transparent focus:outline-none" id="username" type="text" placeholder="Search" />
                <div class="absolute right-2 top-1 flex items-center">
                  <SearchSvg size="22px" fillColor="#000000" />
                </div>
              </div>
            </form>
          </div>
          <div class="text-[#333]">
            <h3 class="text-[19px] font-graphikMedium pb-2 pt-8 hover:text-orange cursor-pointer uppercase">Collection 2024</h3>
          </div>
              <!-- Sidebar Navigation Links -->
              <ul class="max-h-full border-y border-[#33333357] text-[19px]  text-[#363636] pt-1">
                  <li v-for="(listItem, index) in props.sidebarList" :key="index" class="py-[9px] font-graphikLight">
                    <a @click="handelProductSeriesNavigation(listItem)" class="hover:text-orange cursor-pointer">
                      {{ listItem?.name }}
                    </a>
                  </li>
              </ul>

              <!-- Social Media Links -->
              <div class="border-t border-gray-300 mt-3 pt-3">
                <ul class="flex justify-center">
                  <li>
                    <a href="#" target="_blank" title="Facebook" class="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full mx-2 hover:bg-green-500">
                      <!-- Facebook Icon -->
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" title="Twitter" class="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full mx-2 hover:bg-blue-500">
                      <!-- Twitter Icon -->
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" title="Pinterest" class="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full mx-2 hover:bg-red-500">
                      <!-- Pinterest Icon -->
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </SideMenu>
      </div>
    </div>

    <!-- Section: Video + Text -->
    <div class="flex flex-wrap ml-5 mt-20 sm:ml-10 md:flex my-20 sm:pl-10 m-auto h-auto gap-10">
      <div class="max-w-[440px]">
        <h1 class="text-orange  text-[28px] sm:text-[36px] md:text-[37px] leading-[46px]">
          INNOVATIVE, CREATIVE OUTDOOR FURNITURE
        </h1>
      </div>
      <div>
        <p class="md:text-[21px] max-w-[570px] text-textColorBlack leading-6 font-light">
          Designer and manufacturer of exclusive outdoor furniture with performance vibrant materials. Bespoke outdoor
          contract furniture supplier for commercial and residential clients.
        </p>
      </div>
    </div>

    <!-- Video Section -->
    <div class="flex flex-col md:flex-row text-[#333] md:w-[1200px] gap-6 m-auto mt-14 overflow-auto">
      <div class="md:w-3/5">
        <video autoplay muted loop controls class="w-full h-full object-cover">
          <source src="https://lebello.com/wp-content/uploads/2023/05/Spring%20Collection%20Highlights.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="bg-[#dcd6cd] p-5 md:w-2/5 lg:p-10 flex flex-col justify-center items-start">
        <img class="max-w-[166px] mb-5" src="https://lebello.com/wp-content/uploads/2023/05/video-logo.png" />
        <h4 class="my-5 text-orange uppercase text-[32px] leading-10">“Spring Collection Highlights”</h4>
        <p class="text-[21px]  font-thin pr-4">
          Watch our season collection and product highlights.
        </p>
        <button
          @click="handleModal"
          class="mt-5 px-3 pb-[2px] border border-black rounded-3xl text-black hover:bg-orange hover:text-white"
        >
          see more
        </button>
      </div>
    </div>

    <!-- Modal -->
    <transition name="slide-down">
      <div v-if="open" class="fixed z-[100] top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <VideoModal :open="open" :handleClose="handleModal" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import VideoModal from "./VideoModal.vue";
import SearchSvg from "./Svg/Search-Svg.vue";
import CloseSvg from "./Svg/Close-Svg.vue";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import SideMenu from "./Side-Menu.vue";
import MenuSvg from "./Svg/Menu-Svg.vue";
import { useRouter } from 'vue-router';

import FormDropdown from "./Form-components/Form-Dropdown.vue";

const router = useRouter();
const props = defineProps({
  sidebarList: {
    type: Array,
    required: true,
  },
});

const open = ref(false);
const handleModal = () => {
  open.value = !open.value;
};
const isOpenSidebar = ref(false);
const handleSideMenu = () => {
  isOpenSidebar.value = !isOpenSidebar.value;
};

const closeMenu = ref(null);
const closeSideMenu = () => {
  isOpenSidebar.value = false;
};
onClickOutside(closeMenu, closeSideMenu);


const handelProductSeriesNavigation = (prod) => {
  id.value = prod.id;
  sessionStorage.setItem('Product_series', prod.id);
  router.push( { name: 'product_series', params: { slug: prod.slug } });
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.5s ease;
}

.slide-down-enter,
.slide-down-leave-to {
  transform: translateY(-100%);
}

/* .slide-down-enter-to, .slide-down-leave {
  transform: translateY(0);
} */
</style>
