<template>
  <div class="relative ">
    <NavBar :absolute="false" background='red' />
    <!-- lebellow icon right top -->
    <img class="absolute top-8 right-0 mx-auto"
      src="https://lebello.com/wp-content/themes/lebello-ep/images/logo2.png" />
  </div>
  <!-- menu item -->
  <div class=" relative ">
    <div class="absolute top-44  right-0" ref="closeMenu" :class="{ 'w-0': isOpenSidebarSlider }">
      <div class="  bg-[#7bd923] p-3  ">
        <SideMenu key="firstKey" :list="[]" :handleSideMenu="handleSideMenu" :isOpen="isOpenSidebarSlider"
          :mainSlider="mainSlider" :showDropDown="showDropDown" :showHeading="true" :downDropdown="downDropdown"
          :showMediaIcon="true" svgSize="14px" svgColor="white" />
      </div>
    </div>
  </div>
  <div class="py-5 mx-20">
    <div class="py-10">
      <div class="uppercasefont-graphik text-[24px] text-[#3d3d3d]">VAUD SERIES</div>
      <p class="font-graphikLight text-[13px] text-textColorBlack">
        Lebello is an exclusive outdoor furniture manufacturer of innovative outdoor
        designs for home residential and commercial hospitality projects. The lebello
        range offers, sofas, tables, lounger and various timeless outdoor furnishings.
      </p>
      <div class="flex mt-2 ">
        <div class="mr-2">
          <svg width="18px" height="18px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
            fill="#d8d8d8" stroke="#d8d8d8">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title>grid</title>
              <desc>Created with Sketch Beta.</desc>
              <defs></defs>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-104.000000, -935.000000)"
                  fill="#d8d8d8">
                  <path
                    d="M128,935 L124,935 C121.791,935 120,936.791 120,939 L120,943 C120,945.209 121.791,947 124,947 L128,947 C130.209,947 132,945.209 132,943 L132,939 C132,936.791 130.209,935 128,935 L128,935 Z M128,951 L124,951 C121.791,951 120,952.791 120,955 L120,959 C120,961.209 121.791,963 124,963 L128,963 C130.209,963 132,961.209 132,959 L132,955 C132,952.791 130.209,951 128,951 L128,951 Z M112,951 L108,951 C105.791,951 104,952.791 104,955 L104,959 C104,961.209 105.791,963 108,963 L112,963 C114.209,963 116,961.209 116,959 L116,955 C116,952.791 114.209,951 112,951 L112,951 Z M112,935 L108,935 C105.791,935 104,936.791 104,939 L104,943 C104,945.209 105.791,947 108,947 L112,947 C114.209,947 116,945.209 116,943 L116,939 C116,936.791 114.209,935 112,935 L112,935 Z"
                    id="grid" sketch:type="MSShapeGroup"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div class="mr-2">
          <svg width="18px" height="18px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" fill="#d8d8d8" stroke="#d8d8d8">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title>grid [#1526]</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-219.000000, -200.000000)" fill="#d8d8d8">
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M181.9,54 L179.8,54 C178.63975,54 177.7,54.895 177.7,56 L177.7,58 C177.7,59.105 178.63975,60 179.8,60 L181.9,60 C183.06025,60 184,59.105 184,58 L184,56 C184,54.895 183.06025,54 181.9,54 M174.55,54 L172.45,54 C171.28975,54 170.35,54.895 170.35,56 L170.35,58 C170.35,59.105 171.28975,60 172.45,60 L174.55,60 C175.71025,60 176.65,59.105 176.65,58 L176.65,56 C176.65,54.895 175.71025,54 174.55,54 M167.2,54 L165.1,54 C163.93975,54 163,54.895 163,56 L163,58 C163,59.105 163.93975,60 165.1,60 L167.2,60 C168.36025,60 169.3,59.105 169.3,58 L169.3,56 C169.3,54.895 168.36025,54 167.2,54 M181.9,47 L179.8,47 C178.63975,47 177.7,47.895 177.7,49 L177.7,51 C177.7,52.105 178.63975,53 179.8,53 L181.9,53 C183.06025,53 184,52.105 184,51 L184,49 C184,47.895 183.06025,47 181.9,47 M174.55,47 L172.45,47 C171.28975,47 170.35,47.895 170.35,49 L170.35,51 C170.35,52.105 171.28975,53 172.45,53 L174.55,53 C175.71025,53 176.65,52.105 176.65,51 L176.65,49 C176.65,47.895 175.71025,47 174.55,47 M167.2,47 L165.1,47 C163.93975,47 163,47.895 163,49 L163,51 C163,52.105 163.93975,53 165.1,53 L167.2,53 C168.36025,53 169.3,52.105 169.3,51 L169.3,49 C169.3,47.895 168.36025,47 167.2,47 M181.9,40 L179.8,40 C178.63975,40 177.7,40.895 177.7,42 L177.7,44 C177.7,45.105 178.63975,46 179.8,46 L181.9,46 C183.06025,46 184,45.105 184,44 L184,42 C184,40.895 183.06025,40 181.9,40 M174.55,40 L172.45,40 C171.28975,40 170.35,40.895 170.35,42 L170.35,44 C170.35,45.105 171.28975,46 172.45,46 L174.55,46 C175.71025,46 176.65,45.105 176.65,44 L176.65,42 C176.65,40.895 175.71025,40 174.55,40 M169.3,42 L169.3,44 C169.3,45.105 168.36025,46 167.2,46 L165.1,46 C163.93975,46 163,45.105 163,44 L163,42 C163,40.895 163.93975,40 165.1,40 L167.2,40 C168.36025,40 169.3,40.895 169.3,42"
                      id="grid-[#1526]"></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <span class="font-graphikLight self-center mr-2 text-[13px] text-Black666 uppercase">Sort By</span>
        <div class="flex ">
          <div class="group relative cursor-pointer">
            <div
              class="flex items-center justify-between hover:bg-[#000000CC] text-[13px] pr-6 bg-gray-100 text-[#4dc45c]"
              :class="dropdownHoverColor ? 'bg-[#000000CC]' : ''">
              <a class="menu-hover font-graphik uppercase text-green  mx-2 py-1" onClick="">
                Product Type
              </a>
              <ArrowSvg size="8px" initialRotation="left" :fillColor="arrowFillColor2" />
            </div>
            <div @mouseenter="dropdownHoverColor = true" @mouseleave="dropdownHoverColor = false"
              class="invisible absolute bg-[#000000CC] z-50 flex w-full flex-col text-gray-800 shadow-xl group-hover:visible">
              <a v-for="link in links" :key="link.url" :href="link.url"
                class="block border-b text-[12px] border-[#000000AA] py-1 px-2 font-graphikLight text-white hover:text-green">
                {{ link.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- images in main section  -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-0">
      <div v-for="(product, index) in products" :key="index" class=" ">
        <div class="prod_content overflow-hidden mt-6 hover:bg-gray-100" @mouseenter="toggleOverlay(index, true)"
          @mouseleave="toggleOverlay(index, false)">
          <div class="relative overflow-hidden">
            <a :href="product?.link">
              <img
                class="opacity-60 transition-transform duration-700 ease-in-out transform hover:scale-105 hover:opacity-100"
                ref="element" :data-aos="animationType" :src="product?.image" :alt="product?.name" />
            </a>
            <div class="prod-overlay" :class="{ 'show-overlay': isHovered[index] }">
              <div class="overlay-content">
                <h1 class="hover:text-green text-[13px] font-graphik">4L Chair</h1>
              </div>
            </div>
          </div>
          <p class="pl-5 mt-3 pb-4 text-[#3d3d3d] font-graphikLight text-[13px]">4L Pixie Arms Chair</p>
        </div>
      </div>
    </div>
  </div>
  <LogoSection />
  <FooterSection />
</template>

<script setup>
import NavBar from "@/components/frontend-components/Nav-bar.vue";
import FooterSection from "@/components/frontend-components/Footer-section.vue";
import LogoSection from "@/components/frontend-components/Logo-section.vue";
import SideMenu from '@/components/frontend-components/Side-Menu.vue';
import { ref } from "vue";
import ArrowSvg from "@/components/frontend-components/Svg/Arrow-Svg.vue";
import { onClickOutside } from '@vueuse/core'

const isHovered = ref([]);

const toggleOverlay = (index, show) => {
  isHovered.value[index] = show;
};

const dropdownHoverColor = ref(false)
const closeMenu = ref(null)
const isOpenSidebarSlider = ref(false)
const closeSideMenu = () => {
  isOpenSidebarSlider.value = false;
}
onClickOutside(closeMenu, closeSideMenu)
const handleSideMenu = () => {
  isOpenSidebarSlider.value = true;
}

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
    id: 2,
    name: "Watt Plaza",
    location: "Los Angeles, CA",
    link: "https://lebello.com/contract_design/watt-plaza/",
    image: "http://lebello.com/wp-content/uploads/thumbs/watt-plaza-350X234.png",
  },
  {
    id: 2,
    name: "Watt Plaza",
    location: "Los Angeles, CA",
    link: "https://lebello.com/contract_design/watt-plaza/",
    image: "http://lebello.com/wp-content/uploads/thumbs/watt-plaza-350X234.png",
  },
];

const links = [
  { name: "Modular / Sofas", url: "https://lebello.com/product_type/modularsofas/" },
  { name: "Lounge Poufs", url: "https://lebello.com/product_type/lounge-poufs/" },
  { name: "Daybed", url: "https://lebello.com/product_type/daybed/" },
  { name: "Archives", url: "https://lebello.com/product_type/archives/" },
  { name: "Outdoor Carpets", url: "https://lebello.com/product_type/outdoor-carpets/" },
  { name: "Rocking Chair", url: "https://lebello.com/product_type/rocking-chair/" },
  { name: "Lounge Seating", url: "https://lebello.com/product_type/lounge-seating/" },
  { name: "Lighting", url: "https://lebello.com/product_type/lighting/" },
  { name: "Counter Tables", url: "https://lebello.com/product_type/counter-tables/" },
  { name: "Tables", url: "https://lebello.com/product_type/tables/" },
  { name: "Counter / Bar Stools", url: "https://lebello.com/product_type/counter-bar-stools/" },
  { name: "Accessories", url: "https://lebello.com/product_type/accessories/" },
  { name: "Stools / Poufs", url: "https://lebello.com/product_type/stools/" },
  { name: "Coffee / Side Table", url: "https://lebello.com/product_type/coffee-table/" },
  { name: "Club Chairs", url: "https://lebello.com/product_type/club-chairs/" },
  { name: "Planters", url: "https://lebello.com/product_type/planters/" },
  { name: "Lounge Chairs", url: "https://lebello.com/product_type/lounge-chairs/" },
  { name: "Chaise Loungers", url: "https://lebello.com/product_type/chaise-loungers/" },
  { name: "Chairs", url: "https://lebello.com/product_type/chairs/" },
  { name: "Benches", url: "https://lebello.com/product_type/benches/" },
  { name: "Container Bins", url: "https://lebello.com/product_type/container-bins/" }
];

</script>

<style scoped>
.prod-overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.prod-overlay.show-overlay {
  opacity: 1;
}

.overlay-content {
  position: absolute;
  bottom: -0;
  left: 0;
  text-align: center;
  color: white;
  background-color: #0e0e0e89;
  opacity: 1;
  z-index: 1;
  padding: 10px;
}
</style>
