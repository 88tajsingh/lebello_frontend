<template>
  <nav class="hidden md2:block z-[99999] ">
    <div class=" mx-auto w-full top-0 border-b  self-start text-graphik text-white ease-in duration-300 z-50" :class="{
      'absolute pb-10 top-0 left-0 bg-transparent': props.absolute,
      'bg-white': !props.absolute
    }">
      <div class="relative z-[9999999]  h-16 items-center justify-between">
        <!-- Desktop Links -->
        <div class="  px-20 hidden md2:block max-w-[1400px] mx-auto  " 
          :class="props.absolute  ? 'hover:bg-[#0e0e0e89] bg-opacity-5' : 'border-b border-[#cacaca]'">
          <div :class="['flex', 'mt-auto', 'mb-0', props.absolute ? 'pt-8' : 'pt-8', storePages && 'border-b border-[#333333]']" @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave" class="">
            <!-- Logo -->
            <router-link to="/" class="col-span-1 flex">
              <img class="h-8 w-52" :src="navbarColor === '#ffffff' ? logoLight : logoDark" alt="Lebello-global" />
            </router-link>

            <!-- Navigation Links -->
            <NavigationLinks :links="links" :navColor="navbarColor ? navbarColor : '#000000'"
              :storePages="storePages" />

              <!-- for product page -->
            <div v-if="storePages" class="flex justify-center items-center gap-10 pb-3" :class="hoverd ? 'text-white' : 'text-black'" >
              <div class="w-full">CONTACT&nbsp;/&nbsp;HELP&nbsp;?</div>
              <div class="flex">
                <a class="flex justify-center gap-2 items-center p-1" href="#">
                  <span>CHECKOUT</span>
                  <span>|</span>
                  <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <!-- border -->
            <!-- <div v-if="storePages" class="absolute bg-black w-[92%] h-[1px] top-20 z-[9999999]" :class="hoverd ? 'text-white' : 'text-black'" >
            </div> -->
            


            <!-- Search Icon -->
            <div  :class="storePages ? 'absolute right-20 top-22' : 'col-span-1 m-auto mr-20' ">
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
  storePages: {
    type: Boolean,
    default: false
  },
  navColor: {
    type: String,
    required: false,
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
    else
      navbarColor.value = '#ffffff';
  }
);

const handleMouseEnter = () => {
  hoverd.value = true;
  navbarColor.value = props.absolute === false ? '#000000' : '#ffffff';
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
      { to: '/productDetailNew', text: 'Product Detail' },
      { to: '/store-product', text: 'Store Page' }

    ]
  }
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
