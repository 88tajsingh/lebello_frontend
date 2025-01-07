<template>
  <nav class="hidden md2:block z-[99999] ">
    <div class=" mx-auto w-full self-start text-graphik  text-white z-50" :class="{
      'absolute  top-0 left-0 bg-transparent': props.absolute,
      'bg-white': !props.absolute
    }">
      <div class="relative z-[9999999] items-center justify-between">
        <!-- Desktop Links -->
        <div class="   hidden md2:block  mx-auto  " :class="[...extraClass,
        props.absolute ? navBackgroundColor : '',
        storePages ? navBackgroundColor : ''
        ]">
          <div :class="['flex', 'mt-auto', 'mb-0', props.absolute ? 'pt-6' : 'pt-6',]" @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave" class="">
            <!-- Logo -->
            <router-link to="/" class=" flex ">
              <!-- <img class="h-8 w-52" :src="navbarColor === '#ffffff' ? logoLight : logoDark" alt="Lebello-global" /> -->
              <div class="text-[15px] w-[160px] leading-[15px] font-helvetica text-left "
                :style="{ color: navbarColor }">
                Forever<br>
                Summer Collection™
              </div>

            </router-link>

            <!-- Navigation Links -->
            <NavigationLinks :links="links" :navColor="navbarColor ? navbarColor : '#000000'"
              :storePages="storePages" />

            <!-- for product page -->

            <!-- border -->
            <!-- <div v-if="storePages" class="absolute bg-black w-[92%] h-[1px] top-20 z-[9999999]" :class="hoverd ? 'text-white' : 'text-black'" >
            </div> -->



            <!-- Search Icon -->
            <div :class="storePages ? 'absolute right-20 top-22' : 'col-span-1 m-auto mr-20'">
              <div @click="showModal = true">
                <SearchSvg size="18px" :fillColor="navColor ? navbarColor : '#000000'" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Modal -->
    <SearchModal :show="showModal" @close="showModal = false" />
  </nav>
  <div class="md2:hidden  pt-5 pl-6 z-99999" :class="{
    'absolute top-0 left-0  bg-transparent': props.absolute,
    'bg-white relative border-b pb-3 border-[#cacaca]': !props.absolute
  }">
    <div class="mb-3 "> <img class="h-9" :src="navbarColor === '#ffffff' ? logoLight : logoDark" alt="Lebello-global" />
    </div>
    <MobileNavbar :links="links" :navColor="navbarColor" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

import NavigationLinks from './NavigationLinks.vue';
import SearchSvg from './Svg/Search-Svg.vue';
import SearchModal from './SearchModal.vue'
import logoLight from '../../assets/logo/logo.png'
import logoDark from '../../assets/logo/logo-header4.png'
import MobileNavbar from './MobileNavbar.vue';

const props = defineProps({
  absolute: Boolean,
  extraClass: {
    type: Array,
    default: () => ['px-10']
  },
  storePages: {
    type: Boolean,
    default: false
  },
  navColor: {
    type: String,
    required: false,
  },
  hovrednavColor: {
    type: String,
    required: false,
    default: '#000000'
  },
  navBackgroundColor: {
    type: String,
    default: 'hover:bg-[#0e0e0e89] bg-opacity-5'
  },

});

const navbarColor = ref(props.absolute === false ? '#000000' : props?.navColor);
const showModal = ref(false);
const hoverd = ref(false);

watch(
  () => props.navColor,
  (color) => {
    if (!hoverd.value)
      navbarColor.value = color;
    // else if(props.storePages)
    //   {
    //     navbarColor.value = '#4b4b4b  ';
    //   }
    else
      navbarColor.value = '#ffffff';
  }
);

const handleMouseEnter = () => {
  hoverd.value = true;
  navbarColor.value = props?.hovrednavColor ? props?.hovrednavColor : props.absolute === false ? '#000000' : '#ffffff';
}

const handleMouseLeave = () => {
  hoverd.value = false;
  navbarColor.value = props.navColor;
}


const lebello = [
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
    to: '/contract_type',
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
      { to: '/productDetailNew2', text: 'Product Detail 2' },
      { to: '/productDetailNew', text: 'Product Detail' },
      { to: '/store-product', text: 'Store Page' },
      { to: '/new-product-series', text: 'Product series' },
      { to: '/new-product', text: 'Product Listing' },

    ]
  },
]

const storeLinks = [
  {
    to: '/productDetail',
    text: 'Home'
  },
  {
    to: '#',
    text: 'SHOP COLLECTION',
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
    to: '#',
    text: 'SHOP BY CATEGORY',
    sublinks: [

      { to: 'productDetail', text: 'sdss', submenu: [{ to: 'productDetail', text: 'contractsub' }] },
      { to: 'productDetail', text: 'NEWsdss', submenu: [{ to: 'productDetail', text: 'contractsub' }] },
      { to: 'productDetail', text: 'NEWsdss', submenu: [{ to: 'productDetail', text: 'contractsub' }] },
    ]
  },
]

let links = props.storePages ? storeLinks : lebello;

watch(
  () => props.storePages,
  () => {
    props.storePages ? storeLinks : lebello
  }
);

</script>

<style></style>
