<template>
  <nav class="z-[999]">
    <div class=" mx-auto w-full  top-0  self-start  text-graphik text-white  ease-in duration-300  z-50 " :class="{
      'absolute pb-10 top-0 left-0  bg-transparent	': absolute,
      'hover:text-white': navColor === 'white',
    }">
      <div class="relative  h-16 items-center  justify-between ">
        <div class="absolute inset-y-0 left-0 flex  items-center sm:hidden ">
          <button type="button"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu" aria-expanded="false">
            <span class="absolute "></span>
            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="px-20 hidden md2:block " :class="{ 'hover:bg-[#0e0e0e89] bg-opacity-5': absolute, }">
          <div
    :class="['flex', 'mt-auto', 'mb-0', absolute ? 'pt-8' : 'py-4']"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
            <router-link to="/"  class="col-span-1 flex">
              <img class="h-8 right-end text-right w-full"
                :src="navColor1 ? '@/../logo-header.png' : (navColor === 'white' ? '@/../logo-header.png' : '@/../logo-header4.png')"
                alt="Lebello-global" />
            </router-link>
            <!-- nav links route -->
            <a v-for="(link, index) in links" :key="index" :herf="link.to" class=" text-[15px] m-auto ">
              <div class="flex-inline text-[15px]  items-center group top-12">
                <button class="outline-none rounded-sm py-3  flex items-center min-w-32"
                  :class="navColor1 ? 'text-white' : (navColor === 'white' ? 'text-white' : 'text-black')">
                  <div class="px-1 flex justify-between   w-full	 hover:text-blue">
                    <a class=" uppercase "> {{ link?.text }}  </a>
                    <div class="my-auto ml-2">
                      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        style="stroke-width: 2px; transform: rotate(270deg);">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </button>
                <ul class="bg-[#0e0e0ec9] bg-opacity-5 transform scale-0 group-hover:scale-100 
                        absolute transition duration-150 ease-in-out origin-top list-wid mt-0 ">
                  <!-- sublinks list  -->
                  <div v-for="(sublink, subIndex) in link.sublinks" :key="subIndex" class="px-4">
                    <li v-if="sublink?.submenu && sublink?.submenu.length > 0"
                      class=" relative  py-1 border-b hover:text-[#c9d8e8]  border-[rgba(208,208,208,0.16)] ">
                      <button class="w-full text-left flex items-center outline-none focus:outline-none">
                        <!-- submenu 1ist list  -->
                        <div class=" flex justify-between text-[13px] w-full hover:text-blue">
                          <!-- 1nd list -->
                          <router-link :to="sublink.to"   class="text-[13px]"> {{ sublink?.text }} </router-link>
                          <div class="my-auto">
                            <svg class="fill-current h-3 w-3    transition duration-150 ease-in-out"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </button>
                      <ul
                        class="bg-[#0e0e0ec9]  bg-opacity-5 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left list-wid mt-0">
                        <!-- <div>
                          <li v-if="sublink?.submenu" class="px-4 border-2 border-red-400 hover:text-blue  border-[rgba(208,208,208,0.16)]">
                            {{ link.sublinks?.submenu?.text }}
                          </li>
                        </div> -->
                        <!-- submenu list -->
                        <div v-for="(submenu, ubIndex) in sublink?.submenu" :key="ubIndex"
                          class="mx-3  border-b border-[rgba(208,208,208,0.16)]">
                          <li v-if="submenu?.supermenu?.length > 0" class="my-1 ">
                            <button class="w-full text-left flex items-center outline-none focus:outline-none">
                              <!-- sublist menu 2nd list -->
                              <div class="px-1 flex justify-between   w-full	 hover:text-blue">
                                <!-- 2rd list menu -->
                                <router-link :to="submenu.to" class="text-[13px]"> {{ submenu?.text }} </router-link>
                                <div class="my-auto">
                                  <svg class="fill-current h-3 w-3    transition duration-150 ease-in-out"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path
                                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                  </svg>
                                </div>
                              </div>
                            </button>
                            <ul
                              class="bg-[#0e0e0ec9] bg-opacity-5 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left list-wid mt-0">
                              <!-- super menu -->
                              <!--  3rd list text -->
                              <li v-for="(supermenu, ubIndex) in submenu?.supermenu" :key="ubIndex"
                                class="px-4 py-1 border-b  hover:text-blue  border-[rgba(208,208,208,0.16)]">
                                <router-link :to="supermenu.to" class="text-[13px]">
                                  {{ supermenu?.text }}
                                </router-link>
                              </li>
                            </ul>
                          </li>
                          <!-- 2nd list text-->
                          <li v-else class="px-1 border-b py-1 hover:text-blue  border-[rgba(208,208,208,0.16)]">
                            <router-link :to="submenu.to" class="text-[13px]">
                              {{ submenu?.text }} </router-link>
                          </li>
                        </div>
                      </ul>
                    </li>
                    <!-- 1st list text  -->
                    <li v-else class="px-1 py-1 border-b max-h-20 hover:text-blue  border-[rgba(208,208,208,0.16)]">
                      <router-link :to="sublink.to" class="text-[13px]">{{ sublink.text }} </router-link>
                    </li>
                  </div>
                </ul>
              </div>
            </a>
            <div class="col-span-1 m-auto ml-0">
              <div @click="showModal = true">
                <svg width="24px" height="24px" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"
                  :stroke="navColor1 ? '#ffffff' : (navColor === 'white' ? '#ffffff' : '#000000')"
                  :fill="navColor1 ? '#ffffff' : (navColor === 'white' ? '#ffffff' : '#000000')">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z "
                      :fill="navColor1 ? '#ffffff' : (navColor === 'white' ? '#ffffff' : '#000000')">
                    </path>
                  </g>
                </svg>
              </div>  
            </div>

          </div>
          <hr v-if="!absolute" class="text-green">
        </div>
      </div>
    </div>
    <!-- mobile version -->
    <!-- <div class="md2:hidden absolute z-50 w-full bg-white" id="mobile-menu">
      <div class="mt-7 px-6 overflow-x-hidden" id="">
        <div class="flex">
        <a href="#" class=""><img src="https://lebello.com/wp-content/uploads/2023/11/close_sign.png"></a>
          <div>
            <ul class="flex ml-10 font-graphik text-[14px] text-[#ce8d39]">
	     			<li><a class="mx-2" href="route('/')">HOME </a></li> /
	     			<li><a class="mx-2" href="mailto:sales@lebello.com" target="_blank"> CONTACT US</a></li>
	     		</ul>
          </div>
        </div>
        <div class="mt-6 pr-16">
          <div v-for="(link, index) in links" :key="index"
            class="   flex justify-between	border-b content-center content-between space-y-1  pb-3 pt-3">
            <a :herf="link.to"
              class="text-Black flex font-[16px] text-textColorBlack block rounded-md  text-base font-graphik text-[13px]">{{
                link.text }}
            </a>
            <div class="my-auto ml-2">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                style="stroke-width: 2px; transform: rotate(270deg);">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="px-6 pr-20 py-5">
      <input
      type="text"
      placeholder="Search"
      class="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <button class="absolute right-24 pt-2 text-gray-500">
      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  stroke="#000000"
                  >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z "
                      fill="#000000">
                    </path>
                  </g>
                </svg>
    </button>
  </div>
  </div> -->
  </nav>
  <SearchModal :show="showModal" @close="showModal = false" />

</template>

<script setup>
import { ref } from 'vue';
// import BreadcrumbSection from "@/components/frontend-components/BreadcrumbSection.vue";
import SearchModal from './SearchModal.vue'

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
    to: 'productDetail',
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
    to: '',
    text: 'COLLECTION24',
    sublinks: [
      {
        to: 'category',
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
            to: 'productDetail',
            text: ' 4L Pixie  ',
            supermenu: [
              { to: 'productDetail', text: ' 4L Pixie Chair ' },
              { to: 'productDetail', text: ' 4L Pixie Arms Chair ' },
              { to: 'productDetail', text: ' 4L Arrow Chair ' }
            ]
          },
          {
            to: 'productDetail',
            text: ' 4L Stools   ',
            supermenu: [
              { to: 'productDetail', text: '  4L Stool  ' },
              { to: 'productDetail', text: '  4L Backrest Stool  ' },
              { to: 'productDetail', text: ' 4L Teak Stool ' }
            ]
          },
          {
            to: 'productDetail',
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
    to: '/',
    text: 'CONTRACT',
    sublinks: [
      { text: "Hotels Restaurants", to: "contract" },
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
    to: 'category',
    text: 'COMPANY',
    sublinks: [
      { to: 'dealers', text: 'Contact Us', submenu: [{ to: 'contactUs', text: 'Boston' }] },
      { to: 'libraryandtools', text: 'Library @ Tools' },
    ]
  },
  {
    to: '#e',
    text: 'STORE',
    sublinks: [
      { to: 'index', text: 'Coming Soon' }
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
