<template>
  <nav class="z-[99999]">
    <div
      class="mx-auto w-full top-0 self-start text-graphik text-white ease-in duration-300 z-50"
      :class="{
        'absolute pb-10 top-0 left-0 bg-transparent': absolute,
        'hover:text-white': navColor === 'white',
      }"
    >
      <div class="relative z-[9999999] h-16 items-center justify-between">
        <!-- Mobile Menu Button -->
        <!-- <MobileMenuButton /> -->
        
        <!-- Desktop Links -->
        <div class="px-20 hidden md2:block" :class="{ 'hover:bg-[#0e0e0e89] bg-opacity-5': absolute }">
          <div
            :class="['flex', 'mt-auto', 'mb-0', absolute ? 'pt-8' : 'py-4']"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          >
            <!-- Logo -->
            <router-link to="/" class="col-span-1 flex">
              <img
                class="h-8 w-full"
                :src="navColor1 ? logoDark : navColor === 'white' ? logoDark : logoLight"
                alt="Lebello-global"
              />
            </router-link>

            <!-- Navigation Links -->
            <NavigationLinks :links="links" :navColor="navColor" :navColor1="navColor1" />

            <!-- Search Icon -->
            <div class="col-span-1 m-auto ml-0">
              <div @click="showModal = true">
                <SearchSvg size="22px" fillColor="#000000" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Modal -->
    <SearchModal :show="showModal" @close="showModal = false" />
  </nav>
</template>

<script setup>
import { ref } from 'vue';

import NavigationLinks from './NavigationLinks.vue';
import SearchSvg from './Svg/Search-Svg.vue';
import SearchModal from './SearchModal.vue'
import logoDark from '../../assets/logo/logo.png'
import logoLight from '../../assets/logo/logo-header4.png'

const { absolute, navColor } = defineProps({
  absolute: Boolean,
  navColor: {
    type: String,
    required: false,
  },
});

const navColor1 = ref(false)
const showModal = ref(false);



const links = [
  {
    to: '/productDetail',
    text: 'New',
    sublinks: [
      { to: 'productDetail', text: 'B Chair' },
      { to: 'productDetail', text: 'Chair 8' },
      { to: 'productDetail', text: 'Director Chair' },
      { to: 'productDetail', text: 'Trixie Chair' },
      { to: 'productDetail', text: 'Trixie Wing Chair' },
      { to: 'productDetail', text: 'Trixie Lounger' },
      { to: 'productDetail', text: 'Twiggy XY Chair ' },
      { to: 'productDetail', text: '4L Pixie Arm Chair' },
      { to: 'productDetail', text: 'Mogul Lounger' },
      { to: 'productDetail', text: 'Mini Mogul' },

    ]
  },
  {
    to: '/products',
    text: 'COLLECTION24',
    sublinks: [
      {
        to: '/product_series',
        text: '4L Series',
        submenu: [
          {
            to: 'productDetail',
            text: ' 4L Lounger ',
            supermenu: [
              { to: 'productDetail', text: '4L Lounger' },
              { to: 'productDetail', text: '4L Lounger Clasic' }
            ]
          },
          {
            to: '/productDetail',
            text: ' 4L Pixie  ',
            supermenu: [
              { to: 'productDetail', text: ' 4L Pixie Chair ' },
              { to: 'productDetail', text: ' 4L Pixie Arms Chair ' },
              { to: 'productDetail', text: ' 4L Arrow Chair ' }
            ]
          },
          {
            to: '/productDetail',
            text: ' 4L Stools',
            supermenu: [
              { to: 'productDetail', text: '  4L Stool  ' },
              { to: 'productDetail', text: '  4L Backrest Stool  ' },
              { to: 'productDetail', text: ' 4L Teak Stool ' }
            ]
          },
          {
            to: '/productDetail',
            text: '4L X Series',
            supermenu: [
              { to: 'productDetail', text: '4L X Chair ' },
              { to: 'productDetail', text: ' 4L X Lounger Chasie ' },
              { to: 'productDetail', text: ' 4L X Lounger Single  ' },
              { to: 'productDetail', text: '4L X Lounger Double' }
            ]
          },
          { to: 'productDetail', text: ' 4L Sungita Chair ' },
          { to: 'productDetail', text: '4L Arms' },
          { to: 'productDetail', text: ' 4L Chair' },
          { to: 'productDetail', text: '4L Criss W ' },
          { to: 'productDetail', text: '4L Net Chair' }
        ]
      }
    ]
  },
  {
    to: '',
    text: 'CATEGORY',
    sublinks: [

      { to: 'productDetail', text: 'sdss', submenu: [{ to: 'productDetail', text: 'contractsub' }] },
      { to: 'productDetail', text: 'NEWsdss', submenu: [{ to: 'productDetail', text: 'contractsub' }] },
      { to: 'productDetail', text: 'NEWsdss', submenu: [{ to: 'productDetail', text: 'contractsub' }] },
    ]
  },
  {
    to: 'contract_type/scqasdc',
    text: 'CONTRACT',
    sublinks: [
      { text: "Hotels Restaurants", to: "contract_type/scqasdc" },
      { text: "Residential", to: "contract" },
      { text: "Retail & Education", to: "contract" },
      { text: "Communal Spaces", to: "contract" },
      { text: "Restaurants & Hospitality", to: "contract" },
      {
        to: 'contract', text: 'location',
        submenu: [
          { text: "United States", to: "contract" },
          { text: "Australia", to: "contract" },
          { text: "Canada", to: "contract" },
          { text: "Africa", to: "contract" },
          { text: "China", to: "contract" },
          { text: "Caribbean", to: "contract" },
          { text: "Mexico", to: "contract" },
          { text: "Costa Rica", to: "contract" },
          { text: "Bahrain", to: "contract" }

        ]
      },

    ]
  },
  {
    to: '/category',
    text: 'COMPANY',
    sublinks: [
      { to: 'dealers', text: 'Contact Us', submenu: [{ to: 'contactUs', text: 'Boston' }] },
      { to: 'libraryandtools', text: 'Library @ Tools' },
    ]
  },
  {
    to: '/productDetailNew',
    text: 'STORE',
    sublinks: [
      { to: '/productDetailNew', text: 'Product Detail' }
    ]
  }
]
</script>

<style>
li>ul {
  transform: translatex(105%) scale(0);
}

li:hover>ul {
  transform: translatex(100%) scale(1);
}

li>button svg {
  transform: rotate(-90deg);
}

.group:hover .group-hover\:scale-100 {
  transform: scale(1);
}

.group:hover .group-hover\:-rotate-180 {
  transform: rotate(180deg);
}

.scale-0 {
  transform: scale(0);
}

.min-w-32 {
  min-width: 1.6rem;
}

.list-wid {
  width: 200px;
}
</style>
