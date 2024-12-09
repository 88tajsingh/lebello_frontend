<template>
    
  <div class="overflow-hidden">
    <MainSlider :isAbsolute="false" :list="sliderList" :mainSlider="true" :showDropDown="false" :showHeading="false"
    :sliderImages="landingPageData"
      :downDropdown="false" />
    <div class="flex relative">
     
      <!-- <div class="absolute top-30 right-0 pr-3" ref="closeMenu">
        <SideMenu :list="list" :handleSideMenu="handleSideMenu" :isOpen="isOpenSidebarSlider" :mainSlider="false"
          :showDropDown="false" :showHeading="false" :downDropdown="true" />
      </div> -->
    </div>
    <div id='scrollTOadditional' class=" bg-white">
    <!-- Breadcrumb -->
    <nav class="py-4 text-sm">
      <div class="flex items-center gap-2 ml-14">
        <span class="text-gray-600 font-medium">Collection</span>
        <!-- Heroicon: ChevronRight -->
        /
        <span class="text-yellow-600 font-medium">Tubo Sofa Exposed</span>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto grid grid-cols-1 gap-8 px-4 lg:flex lg:justify-between lg:px-10">
  <!-- Product Viewer (Image Section) -->
  <div class="relative  max-h-[430px] mb-5 aspect-square bg-gray-50 rounded-lg lg:w-3/5 overflow-y-hidden">
    <Images3DView/>

    <!-- Controls -->
    <div id="zoom-controls" class="absolute right-4 top-2 flex flex-col items-center gap-4 z-[9999] text-yellow-600">
      <!-- Fullscreen Icon -->
      <button id="fullscreen-toggle" class="rounded-full p-2">
        <svg height="20px" width="20px" viewBox="0 0 512 512" fill="#000000">
          <polygon fill="#c2a02f" points="481.706,337.186 481.711,460.288 277.415,256 481.711,51.704 481.711,174.821 511.996,174.821 512,0 337.175,0 337.175,30.294 460.292,30.294 256,234.588 51.704,30.294 174.817,30.294 174.817,0 0,0 0.004,174.821 30.289,174.821 30.289,51.704 234.581,256 30.289,460.288 30.289,337.17 0.004,337.179 0,512 174.817,512 174.817,481.706 51.704,481.706 256,277.419 460.292,481.706 337.175,481.706 337.175,512 512,512 511.996,337.179" />
        </svg>
      </button>

      <!-- Zoom In and Out Icons -->
      <div class="flex flex-col items-center bg-white rounded-full shadow-lg border border-yellow-600">
        <button id="zoom-in" class="py-2 px-[5px]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m-7-7h14"/>
          </svg>
        </button>
        <div class="border-t border-yellow-600 w-full"></div>
        <button id="zoom-out" class="py-2  px-[5px]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14"/>
          </svg>
        </button>
      </div>

      <!-- Reset Icon -->
      <button id="zoom-reset" class="rounded-full p-2 ">
        <svg width="28px" height="28px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000">
          <path fill="#c2a02f" d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"></path>
        </svg>
      </button>
    </div>
  </div>

  <!-- Configuration Panel -->
  <div class=" flex flex-col h-full pl-14 lg:w-2/5">
  <div>
    <h1 class="text-2xl font-semibold">3D CONFIGURATOR</h1>
  </div>

  <div class="space-y-4">
    <div>
      <h2 class="text-lg font-medium">Recommended Configuration</h2>
      <p class="text-sm text-gray-500">Please select the configuration</p>
    </div>

    <!-- Select Dropdown -->
    <div class="relative w-72">
      <label for="configuration" class="block text-sm font-medium text-gray-700">Select Configuration</label>
      <select v-model="configuration" id="configuration" class="w-full p-2 border border-gray-300 rounded-md">
        <option value="1">Configuration 1</option>
        <option value="2">Configuration 2</option>
        <option value="3">Configuration 3</option>
      </select>
    </div>
  </div>

  <!-- Buttons at the bottom (added mt-auto for positioning) -->
  <div class="mt-[130px]  h-full flex gap-4 items-end"> 
    <button @click="handleStoreClick" class="text-[#B88746] hover:text-[#9E7339] border border-[#B88746] py-1 px-10 rounded-full">
      ENQUIRE/EMAIL
    </button>
    <button @click="handleStoreClick" class="bg-[#B88746] text-white hover:bg-[#9E7339] py-1 px-10 rounded-full">
      SEE AT STORE
    </button>
  </div>
</div>

</div>

  </div>

  <div class="bg-[#f3f3f3] ">
    <section class="">
      <div class="grid sm:grid-cols-1 md:grid-cols-2 md:gap-4">
        <div class="lg:px-11 my-10">
          <div class="mx-4 md:mx-12 lg:mx-6 font-graphikLight">
            <h2 class="text-[24px] md:text-[18px] text-textColorBlack pb-4 ">B Chair 1/2 & Pixie</h2>
            <p class="sm:text-[15px] md:text-[15px] lg:text-[16px] text-[#666]">
              B Chair is now available in our exclusive timeless pixie weave design language. A chair that provides
              functionality with its open frame design allowing access to a self-storage compartment for personal
              belongings. The pixie design pattern embodies our authentic superior woven craftsmanship through which
            clients can opt for our LSO option. Lebello Special Operations provides enhanced bespoke design
              customization solutions tailored towards your design requirements. The B Chair comes in a low and
              high-back model.
            </p>
          </div>
          <div class="mt-10 flex hover:text-orange" :class="{ 'text-orange': addiVisible }" @click="HandleAdditionalInfo"
            @mouseenter="setAddiColor('#000000')" @mouseleave="setAddiColor('#333')">
            <span class="ml-12 uppercase font-graphikMedium text-[13px]">Additional Product info</span>
            <ArrowSvg class="mt-0 ml-3 self-center" size="15px"
              :fillColor="addiVisible ? '#d98c3a' : '#64748b' " />
          </div>

        </div>

        <div class="hidden md:block"> <div></div>
          <div class="relative h-full overflow-hidden">
            <img
              class="object-cover h-full w-full transition-transform duration-700 ease-in-out transform hover:scale-105"
              src="https://lebello.com/wp-content/uploads/2019/12/b_chair_slider_gallery.jpg" alt="B Chair" />
            <span v-scroll="isVisible ? arrowScroll : 0" class="absolute bottom-0 bg-orange p-5">
              <ArrowSvg size="13px" fillColor="#ffffff" ref="arrowSvg" @click="rotate" />
            </span>
          </div>
        </div>

      </div>

    </section>

    <transition>
      <div id="scrollTOadditiona" v-scroll="-400" v-show="isVisible" class="container-fluid bg-[#d8d8d8] p-0">
        <div class="grid grid-cols-1 mt-[5px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div class="product-item p-0" v-for="(product, index) in products" :key="index">
            <div class="product_img overflow-hidden">
              <a :title="product.title" :href="product.image" rel="pro-gallery">
                <img
                  class="w-full h-auto opacity-55 hover:opacity-100 transition-transform duration-700 ease-in-out transform hover:scale-125"
                  :src="product.thumbnail" :alt="product.alt" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition>
      <div ref="scrollTOadditiona"  v-scroll="-400" v-show="addiVisible"
        class="container-fluid mt-1 h-[450px] bg-[url('https://lebello.com/wp-content/uploads/2019/12/Additional-Information-e1707234297556.jpg')] p-0">
        <div class="py-10 m-0 relative px-14 ld:w-1/2 font-light text-left text-white bg-orange">
          <p id="directTO" class="font-graphikLight sm:text-[20px] md:text-[24px] lg:text-[27px] leading-9">
            Crafted from our exclusive Ropetek® materials...
          </p>
          <div class="absolute right-3 top-3" @click="HandleAdditionalInfo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path fill="#ffffff"
                d="M12 10.586l4.293-4.293 1.414 1.414L13.414 12l4.293 4.293-1.414 1.414L12 13.414l-4.293 4.293-1.414-1.414L10.586 12 6.293 7.707l1.414-1.414L12 10.586z" />
            </svg>
          </div>
        </div>
      </div>
    </transition>

    <div class="flex justify-between uppercase py-4  ">
      <div class="ml-16 flex self-center ">
        <ul class="flex font-graphikMedium text-[14px] text-[#64748b] hover:text-orange"
          @mouseenter="setArrowFillColor('#3399ff')" @mouseleave="setArrowFillColor('#4dc45c')">
          <li class="mr-2 ">
            <a class="font-graphikMedium text-[14px]" href="https://www.lebello.com/product/">Enquire</a>
            <span class="mx-1">/</span>
          </li>
          <li class="active">Email</li>
          
        </ul>
        <ul class="flex font-medium ml-20 text-[#64748b] hover:text-orange" @mouseenter="setArrowFillColor2('#3399ff')"
          @mouseleave="setArrowFillColor2('#4dc45c')">
          <li class="mr-2 ml-2">
            <a class="underline font-graphikMedium text-[14px]" target="_blank"
              href="https://lebello.com/wp-content/uploads/2013/09/B-Chair_Cutsheet.pdf">Download Cut Sheet</a>
          </li>
         
        </ul>
      </div>
      <!-- social links -->
      <!-- <ul class="flex justify-center space-x-1 pr-20 ">
        <li> <a href="https://www.facebook.com/share.php?u=https://lebello.com/products/b-chair-1-2/&title=B Chair"
            target="_blank" title="Facebook"
            class="flex items-center justify-center w-11 h-11 bg-gray hover:bg-[#7bd923] rounded-full mx-3"> <svg
              width="18px" height="18px" viewBox="-5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fcfcfc" stroke="#fcfcfc">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Dribbble-Light-Preview" transform="translate(-385.000000, -7399.000000)" fill="#ffffff">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                        d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z"
                        id="facebook-[#fcfcfc]"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg> </a> </li>
        <li> <a
            href="https://www.houzz.com/imageClipperUpload?link=https://lebello.com/products/b-chair-1-2/&source=button&hzid=8628&imageUrl=https://lebello.com/wp-content/uploads/2019/12/b-chair-slider-gallery.jpg&title=B Chair&ref=https://lebello.com/products/b-chair-1-2/"
            target="_blank" title="Houzz"
            class="flex items-center justify-center w-11 h-11 bg-gray hover:bg-[#7bd923] rounded-full mx-3"> <svg
              fill="#ffffff" width="18px" height="18px" viewBox="-5 0 24 24" xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="m6.926 15.991 6.927-3.991v7.995l-6.927 4.005zm-6.926-3.991v7.995l6.926-4.005zm6.926-12v7.995l-6.926 4.005v-7.995zm0 7.995 6.926-3.991v7.996z">
                </path>
              </g>
            </svg> </a> </li>
        <li> <a
            href="https://pinterest.com/pin/create/bookmarklet/?media=https://lebello.com/wp-content/uploads/2019/12/b-chair-slider-gallery.jpg&url=https://lebello.com/products/b-chair-1-2/&is_video=false&description=B Chair"
            target="_blank" title="Pinterest"
            class="flex items-center justify-center w-11 h-11 bg-gray hover:bg-[#7bd923] rounded-full mx-3"> <svg
              width="18px" height="18px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" fill="#f5f5f5" stroke="#f5f5f5">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <title>pinterest [#180]</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Dribbble-Light-Preview" transform="translate(-220.000000, -7399.000000)" fill="#ffffff">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                        d="M173.876,7239 C168.399,7239 164,7243.43481 164,7248.95866 C164,7253.05869 166.407,7256.48916 169.893,7258.07936 C169.893,7256.21186 169.88,7256.45286 171.303,7250.38046 C170.521,7248.80236 171.129,7246.19673 172.88,7246.19673 C175.31,7246.19673 173.659,7249.79964 173.378,7251.2174 C173.129,7252.30544 173.959,7253.14238 174.955,7253.14238 C176.864,7253.14238 178.108,7250.71524 178.108,7247.87063 C178.108,7245.69456 176.615,7244.10437 174.042,7244.10437 C169.467,7244.10437 168.307,7249.19966 169.893,7250.79893 C170.292,7251.40294 169.893,7251.43118 169.893,7252.22174 C169.616,7253.05768 167.403,7251.84259 167.403,7248.70757 C167.403,7245.86195 169.727,7242.51518 174.457,7242.51518 C178.191,7242.51518 180.681,7245.27609 180.681,7248.2054 C180.681,7252.13805 178.523,7254.98366 175.37,7254.98366 C174.291,7254.98366 173.295,7254.3978 172.963,7253.72824 C172.36,7256.07371 172.238,7257.26258 171.303,7258.58153 C172.216,7258.83261 173.129,7259 174.125,7259 C179.602,7259 184,7254.56519 184,7249.04235 C183.752,7243.43481 179.353,7239 173.876,7239"
                        id="pinterest-[#180]"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg> </a> </li>
        <li> <a
            href="https://twitter.com/intent/tweet?status=Discover Lebello - B Chair+https://lebello.com/products/b-chair-1-2/"
            target="_blank" title="Twitter"
            class="flex items-center justify-center w-11 h-11 bg-gray hover:bg-[#7bd923] rounded-full mx-3"> <img
              class="w-[18px] h-[18px]"
              src="https://lebello.com/wp-content/themes/lebello-ep/images/Lebello-twitterx-icon.svg"
              alt="Social Icon" /> </a> </li>
      </ul> -->

      <!-- <div class="relative top-30 right-0 pr-3 self-center" ref="closeMenu2">
        <SideMenu :list="list" :handleSideMenu="handleSideMenu2" :isOpen="isOpenSidebarSlider2" :mainSlider="false"
          :showDropDown="false" :showHeading="false" :downDropdown="true" />
      </div> -->
    </div>


    <!-- <AccordianSection /> -->
     <div class="mx-12">
       <AccordionNew />
     </div>
  </div>
    <FooterSection />
  </div>
</template>

<script setup>
import MainSlider from '@/components/frontend-components/Main-Slider.vue'
import NavMainSlider from '@/components/frontend-components/Nav-MainSlider.vue'
import FooterSection from '@/components/frontend-components/Footer-section.vue'
import { ref,onMounted } from 'vue'
import { scrollDown } from '@/helper/frontendHelpers'
import ArrowSvg from '@/components/frontend-components/Svg/Arrow-Svg.vue'
import AccordianSection from '@/components/frontend-components/Accordian-Section.vue'
import { onClickOutside } from '@vueuse/core'
import BreadcrumbSection from '@/components/frontend-components/BreadcrumbSection.vue'
import SideMenu from '@/components/frontend-components/Side-Menu.vue'
import Images3DView from '@/components/frontend-components/Images3DView.vue'
import ThreeDAnimaation from '@/components/Admin-components/ThreeDAnimaation.vue'
import { getLandingPageData } from '@/helper/frontendHelpers'
import AccordionNew from '@/components/frontend-components/AccordionNew.vue'

const sliderList = [
  { name: 'B Chair Series', link: 'https://lebello.com/products/trixie-lounger/' },
  { name: 'B Chair', link: 'https://lebello.com/products/4l-pixie-arms-chair/' }
];

const products = ref([
  { title: 'Set of B Chair, B Chair 2 and Dot Table.', description: 'Set of B Chair, B Chair 2 and Dot Table.', image: 'https://lebello.com/wp-content/uploads/2019/12/b-chair-slider-gallery.jpg', thumbnail: 'http://lebello.com/wp-content/uploads/thumbs/b-chair-slider-gallery-302X202.png', alt: 'B Chair Piie Low & High Lounger Chair' },
  { title: 'Set of B Chair, B Chair 2 and Dot Table.', description: 'Set of B Chair, B Chair 2 and Dot Table.', image: 'https://lebello.com/wp-content/uploads/2019/12/b-chair-slider-gallery.jpg', thumbnail: 'http://lebello.com/wp-content/uploads/thumbs/b-chair-slider-gallery-302X202.png', alt: 'B Chair Piie Low & High Lounger Chair' },
  { title: 'Set of B Chair, B Chair 2 and Dot Table.', description: 'Set of B Chair, B Chair 2 and Dot Table.', image: 'https://lebello.com/wp-content/uploads/2019/12/b-chair-slider-gallery.jpg', thumbnail: 'http://lebello.com/wp-content/uploads/thumbs/b-chair-slider-gallery-302X202.png', alt: 'B Chair Piie Low & High Lounger Chair' },

]);

const sliderImages = ref([
 
  {
    image: 'http://lebello.com/wp-content/uploads/2024/02/Lebello-Chair-8-Siider.jpg',
    alt: 'Tubo Club',
    navColor: 'black'
  },
  {
    image: 'http://lebello.com/wp-content/uploads/2021/09/lebello_4l-pixie_arms_chair.jpg',
    alt: 'Mogul Lounger',
    navColor: 'white'
  },
  {
    image: 'http://lebello.com/wp-content/uploads/2022/02/lebello_monyet_stools-outdoor.jpg',
    alt: 'Trixie Lounger Chair    ',
    navColor: 'white  '
  },
  {
    image: 'http://lebello.com/wp-content/uploads/2024/02/Lebello-Twigs-XY-Slider.jpg',
    alt: 'Monyet Stools',
    navColor: 'white'
  },
  {
    image: 'http://lebello.com/wp-content/uploads/2021/05/lebello_tubo_club-outdoor.jpg',
    alt: 'Monyet Stools',
    navColor: 'white'
  },
  { image: 'http://lebello.com/wp-content/uploads/2021/11/Lebello-tubo-club.jpeg', 
    alt: 'Twiggy XY Chair',
    navColor: 'white' 
  }
])


const list = ref([
  { name: 'Trixie Lounger', link: 'https://lebello.com/products/trixie-lounger/' },
  { name: '4L Pixie Arms Chair', link: 'https://lebello.com/products/4l-pixie-arms-chair/' },
  { name: 'Monyet Stool', link: 'https://lebello.com/products/monyet-stool/' }
]);

const breadcrumbData = ref([
  { name: 'Collection', link: '/' },
  { name: 'B Chair', link: '/' }
]);

const isOpenSidebarSlider = ref(false);
const isOpenSidebarSlider2 = ref(false);
const addiVisible = ref(false);
const arrowRotation = ref('down')
const isVisible = ref(false);
const arrowSvg = ref(null)
const landingPageData = ref([])
const arrowScroll = ref(0);
const arrowFillColor = ref('#4dc45c');
const arrowFillColor2 = ref('#333');
const closeMenu = ref(null);
const closeMenu2 = ref(null);
const configuration = ref('1')
const email = ref('')

const  handleLandingPageData = async () => {
   const res = await getLandingPageData()
   console.log("getLandingPageData", res.data.data.home_slider);
  if (res.status === 200 && res.data.success) {
     landingPageData.value = res.data.data.home_slider
  }
}

onMounted(() => {
   handleLandingPageData()
})

const handleStoreClick = () => {
  console.log('Email:', email.value)
}

const setArrowFillColor = (color) => arrowFillColor.value = color;
const setArrowFillColor2 = (color) => arrowFillColor2.value = color;

const handleSideMenu = () => { isOpenSidebarSlider.value = true; }
const closeSideMenu = () => { isOpenSidebarSlider.value = false; }
const handleSideMenu2 = () => { isOpenSidebarSlider2.value = true; }
const closeSideMenu2 = () => { isOpenSidebarSlider2.value = false; }

onClickOutside(closeMenu, closeSideMenu);
onClickOutside(closeMenu2, closeSideMenu2);

const rotate = () => {
  if (arrowSvg?.value && arrowSvg?.value?.rotate) {
    arrowSvg.value.rotate(arrowRotation.value)
    arrowRotation.value = arrowRotation.value === 'up' ? 'down' : 'up'
    toggleVisibility()
  }
}
const HandleAdditionalInfo = () => {
  addiVisible.value = !addiVisible.value;
  isVisible.value = false;
  if (addiVisible.value) scrollToTarget('scrollTOadditiona');
};

const scrollToTarget = () => {
  const targetDiv = document.getElementById('scrollTOadditiona');
  const startPosition = window.pageYOffset;
  const targetPosition = targetDiv.getBoundingClientRect().top + startPosition;
  const distance = targetPosition - startPosition;
  const duration = 1000;

  let startTime = null;
  const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  const animateScroll = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed / duration) * distance + startPosition;
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animateScroll);
    else window.scrollTo(0, targetPosition);
  };

  requestAnimationFrame(animateScroll);
};

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
  addiVisible.value = false
  if (isVisible.value) arrowScroll.value = -400
  else arrowScroll.value = 0
}


</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>