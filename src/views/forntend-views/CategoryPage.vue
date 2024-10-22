<template>
  <div class="relative">
    <NavBar :absolute="false" background="red" />
    <img class="absolute top-8 right-0 mx-auto" src="https://lebello.com/wp-content/themes/lebello-ep/images/logo2.png" />

    <div class="relative">
      <div class="absolute top-44 right-0" ref="closeMenu" :class="{ 'w-0': isOpenSidebarSlider }">
        <div class="bg-[#7bd923] p-3">
          <SideMenu
            key="firstKey"
            :list="[]"
            :handleSideMenu="handleSideMenu"
            :isOpen="isOpenSidebarSlider"
            :mainSlider="mainSlider"
            :showDropDown="showDropDown"
            :showHeading="true"
            :downDropdown="downDropdown"
            :showMediaIcon="true"
            svgSize="14px"
            svgColor="white"
          />
        </div>
      </div>
    </div>

    <div class="py-5 mx-7 md:mx-20">
      <div class="py-10 ">
        <div class="uppercase font-graphik mb-3 text-[24px] text-[#3d3d3d]">VAUD SERIES</div>
        <p class="font-graphikLight text-[17px] text-textColorBlack">
          Lebello is an exclusive outdoor furniture manufacturer of innovative outdoor designs for home residential and commercial hospitality projects. The lebello range offers sofas, tables, loungers, and various timeless outdoor furnishings.
        </p>
        
        <div class="flex mt-2">
          <span class="font-graphikLight self-center mr-2 text-[13px] text-Black666 uppercase">Sort By</span>
          <div class="group relative cursor-pointer">
            <div class="flex items-center justify-between hover:bg-[#000000CC] text-[13px] pr-6 bg-gray-100 text-[#4dc45c]">
              <a class="menu-hover font-graphik uppercase text-green mx-2 py-1">Product Type</a>
              <ArrowSvg size="8px" initialRotation="left" :fillColor="arrowFillColor2" />
            </div>
            <div @mouseenter="dropdownHoverColor = true" @mouseleave="dropdownHoverColor = false"
              class="invisible absolute bg-[#000000CC] z-50 flex w-full flex-col text-gray-800 shadow-xl group-hover:visible">
              <a v-for="link in links" :key="link.url" :href="link.url" class="block border-b text-[12px] border-[#000000AA] py-1 px-2 font-graphikLight text-white hover:text-green">
                {{ link.name }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="(product, index) in products" :key="product.id" class="prod_content overflow-hidden mt-6 hover:bg-[#efefef]" @mouseenter="toggleOverlay(index, true)" @mouseleave="toggleOverlay(index, false)">
          <div class="relative overflow-hidden">
            <a :href="product.link">
              <img class="opacity-60 transition-transform duration-700 ease-in-out transform hover:scale-105 hover:opacity-100" ref="element" :data-aos="animationType" :src="product.image" :alt="product.name" />
            </a>
            <div class="prod-overlay" :class="{ 'show-overlay': isHovered[index] }">
              <div class="overlay-content">
                <h1 class="hover:text-green text-[13px] font-graphik">{{ product.name }}</h1>
              </div>
            </div>
          </div>
          <p class="pl-5 mt-3 pb-4 text-[#3d3d3d] font-graphikLight text-[13px]">{{ product.location }}</p>
        </div>
      </div>
    </div>
    
    <LogoSection />
    <FooterSection />
  </div>
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
const toggleOverlay = (index, show) => { isHovered.value[index] = show; };
const dropdownHoverColor = ref(false);
const closeMenu = ref(null);
const isOpenSidebarSlider = ref(false);
const closeSideMenu = () => { isOpenSidebarSlider.value = false; };
onClickOutside(closeMenu, closeSideMenu);
const handleSideMenu = () => { isOpenSidebarSlider.value = true; };

const products = [
  { id: 1, name: "Sandbar Jax Bch | Springhill Suites By Marriott", location: "Jacksonville Beach, FL", link: "https://lebello.com/contract_design/springhill-suites/", image: "http://lebello.com/wp-content/uploads/thumbs/SpringhillSuites-JacksonvilleFL-350X234.png" },
  { id: 2, name: "Watt Plaza", location: "Los Angeles, CA", link: "https://lebello.com/contract_design/watt-plaza/", image: "http://lebello.com/wp-content/uploads/thumbs/watt-plaza-350X234.png" },
  { id: 3, name: "Ebbdunedin", location: "EBB Bunded In, New Zealand", link: "https://lebello.com/contract_design/ebbdunedin/", image: "http://lebello.com/wp-content/uploads/thumbs/lebello-ebbdunedin-350X234.png" },
];

const links = [
  { name: "Modular / Sofas", url: "https://lebello.com/product_type/modularsofas/" },
  { name: "Lounge Poufs", url: "https://lebello.com/product_type/lounge-poufs/" },
  { name: "Daybed", url: "https://lebello.com/product_type/daybed/" },
  { name: "Outdoor Carpets", url: "https://lebello.com/product_type/outdoor-carpets/" },
  { name: "Lounge Chairs", url: "https://lebello.com/product_type/lounge-chairs/" },
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
  bottom: 0;
  left: 0;
  text-align: center;
  color: white;
  background-color: #0e0e0e89;
  padding: 10px;
}
</style>