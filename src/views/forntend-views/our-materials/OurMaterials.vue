<script setup>
import { ref, onMounted } from 'vue'
import SideMenu from '@/components/frontend-components/Side-Menu.vue';
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router';
import FooterSection from '@/components/frontend-components/Footer-section.vue'
import {getSwatchList, scrollDown } from '@/helper/frontendHelpers';
import NavBar from '@/components/frontend-components/Nav-bar.vue';
import LogoSection from '@/components/frontend-components/Logo-section.vue';

const router = useRouter();
const navColor = ref('')
const atBottom = ref(false)
const currentIndex = ref(0)
const sidebarList = ref([])
const ourMaterialData = ref([])
const closeMenu = ref(null)
const isOpenSidebarSlider = ref(false)
const closeSideMenu = () => {
  isOpenSidebarSlider.value = false;
}
onClickOutside(closeMenu, closeSideMenu)
const props = defineProps({
  sidebarList: {
    type: Array,
    required: true,
  },
  mainSlider: {
    type: Boolean,
  },
  showHeading: {
    type: Boolean,
    default: true,    
  },
  sliderImages:{
    type: Array,
    default: () => [],
  },
  showDropDown: {
    type: Boolean,
  },
  downDropdown: {
    type: Boolean,
  },
});


const  handleOurMaterials = async () => {
   const res = await getSwatchList();
  if (res.status === 200 && res.data.success) {
     ourMaterialData.value = res.data.data
  }
}

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
    handleOurMaterials()
})


const startAutoSwipe = () => {
  setInterval(() => {
    navColor.value=ourMaterialData.value.swatch_data[currentIndex.value]?.navColor;
    atBottom.value= !atBottom.value ;
    next()
  }, 5000)
}

const changeSlide = (index) => {
  currentIndex.value = index
  console.log(ourMaterialData.value.swatch_data[currentIndex.value].navColor);
}

const previous = () => {
  navColor.value=ourMaterialData.value.swatch_data[currentIndex.value].navColor;
  currentIndex.value = (currentIndex.value - 1 + ourMaterialData.value.swatch_data.length) % ourMaterialData.value.swatch_data.length
}

const next = () => {
  if (ourMaterialData.value.swatch_data.length === 0) {
        return;
    }
  navColor.value=ourMaterialData.value.swatch_data[currentIndex.value].navColor;
  currentIndex.value = (currentIndex.value + 1) % ourMaterialData.value.swatch_data.length
}

onMounted(startAutoSwipe)

const handleSideMenu = () => {
  isOpenSidebarSlider.value = true;
}

const handleRoute = (sub) => {
  sessionStorage.setItem('materialDetail', sub.id);
  router.push({ name: 'materialDetail', params: { slug: sub.slug } });
};
4
</script>
  <template>
     <NavBar absolute="true" :navColor="navColor"/>
    <div id="default-carousel" class="relative" data-carousel="static">
      <div class="w-full h-full  mx-0">
        <div class="overflow-hidden  h-screen sm:h-screen xl:h-screen 2xl:h-screen">
          <div v-show="currentIndex === index" v-for="(slide, index) in ourMaterialData.swatch_data" :key="index"
            class="w-full duration-700 ease-in-out" data-carousel-item>
            <img :src="$filePath(slide?.featured_image_data?.file_url)"
              class="block  absolute top-1/2 left-1/2 w-full h-screen -translate-x-1/2 -translate-y-1/2 "
              :alt="slide?.featured_image_data?.file_url" />
              <button @click="previous" type="button"
          class="flex absolute left-10 z-30 justify-center items-center px-3 top-1/2 cursor-pointer group focus:outline-none"
          data-carousel-prev>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" :stroke="navColor === 'white' ? '#ffffff' : '#000000'">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button @click="next" type="button"
          class="flex absolute right-10 z-30 justify-center items-center px-4 top-1/2 cursor-pointer group focus:outline-none"
          data-carousel-next>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" :stroke="navColor === 'white' ? '#ffffff' : '#000000'">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
          </div>
        </div>
        <div class="flex absolute bottom-1/2 rotate-90 z-30 left-7 space-x-2 -translate-x-1/2">
          <button v-for="(slide, index) in ourMaterialData.swatch_data" :key="index" type="button"
            :class="{ 'bg-gray-700': currentIndex === index, 'bg-gray-400': currentIndex !== index }"
            class="w-2 h-2 rounded-full" aria-current="false" @click="changeSlide(index)"></button>
        </div>
       
      </div>
      <!-- lebellow icon right top -->
      <a href="#" class="absolute z-50 top-11 right-0 mx-auto">
        <img src="https://lebello.com/wp-content/themes/lebello-ep/images/logo2.png" />
      </a>
      <!-- text left bottom -->
      <div  
     class="absolute mx-auto top-1/2 w-[700px] left-20  transform -translate-y-1/2 "
     :class="['absolute transition-all duration-1000 ease-in-out']">
  
  <div class=" text-white font-graphik font-bold  uppercase opacity-90 sm:text-[20px] md2:text-[60px] leading-snug">
    Performance Outdoor Materials
  </div>
  <h6 class=" text-white font-graphik font-bold uppercase opacity-100 sm:text-[20px] md2:text-[40px] leading-snug">
    #ENDLESSBESPOKE
  </h6>
</div>

      <!-- down arrow -->
      <div id="sideText" class="absolute left-1/2 bottom-5 animate-bounce mx-auto">
        <div @click="()=> scrollDown('sideText')"
          class="text-5xl text-white font-sans hover:bg-[#0e0e0e89] bg-opacity-5 ease-in duration-300 px-3 py-1">
          <span href="#" class="transition  ease-out duration-1000	">
            <svg width="24px" height="24px" viewBox="0 0 1024 1024" class="icon" version="1.1"
              xmlns="http://www.w3.org/2000/svg" fill="#fafafa" stroke="#fafafa" stroke-width="73.728">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#ffffff"></path>
              </g>
            </svg>
          </span>
        </div>
      </div>
      <!-- menu item -->
      <slot name="header"></slot>
      <div class="absolute top-48 right-0 pr-3 " ref="closeMenu">
        
        <SideMenu key="firstKey" :list="sidebarList" :handleSideMenu="handleSideMenu" :isOpen="isOpenSidebarSlider"
          :mainSlider="mainSlider" :showDropDown="showDropDown" :showHeading="showHeading"
          :downDropdown="downDropdown" >
            <div class="z-50">
        <div class="h-auto mb-2 mx-3 mt-4 border-b border-[#898989]">
          <h3 class="text-[14px]">
            <a href="https://www.lebello.com/listItem/"
              class="uppercase font-graphikMedium text-[14px]  text-textColorBlack">MATERIALS</a>
          </h3>
        </div>
        <div class="px-5">
          <ul class="font-graphikLight text-[13px] my-1 text-textColorBlack overflow-auto max-h-52 ">
            <PerfectScrollbar class="max-h-52">
              <li class="mt-1" v-for="(listItem, index) in ourMaterialData.swatch_side_bar" :key="index">
                <a :href="listItem?.link" class="hover:text-orange">{{ listItem?.title }}</a>
                
              </li>
            </PerfectScrollbar>
          </ul>
          <div v-if="downDropdown" class="mb-2">
            <FormDropdown />
          </div>
          <div v-if="showMediaIcon" class="border-t border-gray-400 my-3">
            <ul class="flex justify-center mt-3">
              <li>
                <a href="https://www.facebook.com/share.php?u=https://lebello.com/products/b-chair-1-2/&title=B Chair"
                  target="_blank" title="Facebook"
                  class="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full mx-2 hover:bg-green-500">
                  <svg width="14px" height="14px" viewBox="-5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
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
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.houzz.com/imageClipperUpload?link=https://lebello.com/products/b-chair-1-2/&source=button&hzid=8628&imageUrl=https://lebello.com/wp-content/uploads/2019/12/b-chair-slider-gallery.jpg&title=B Chair&ref=https://lebello.com/products/b-chair-1-2/"
                  target="_blank" title="Houzz"
                  class="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full mx-2">
                  <svg fill="#ffffff" width="14px" height="14px" viewBox="-5 0 24 24" xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="m6.926 15.991 6.927-3.991v7.995l-6.927 4.005zm-6.926-3.991v7.995l6.926-4.005zm6.926-12v7.995l-6.926 4.005v-7.995zm0 7.995 6.926-3.991v7.996z">
                      </path>
                    </g>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://pinterest.com/pin/create/bookmarklet/?media=https://lebello.com/wp-content/uploads/2019/12/b-chair-slider-gallery.jpg&url=https://lebello.com/products/b-chair-1-2/&is_video=false&description=B Chair"
                  target="_blank" title="Pinterest"
                  class="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full mx-2">
                  <svg width="16px" height="16px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" fill="#f5f5f5" stroke="#f5f5f5">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>pinterest [#180]</title>
                      <desc>Created with Sketch.</desc>
                      <defs> </defs>
                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Dribbble-Light-Preview" transform="translate(-220.000000, -7399.000000)" fill="#ffffff">
                          <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path
                              d="M173.876,7239 C168.399,7239 164,7243.43481 164,7248.95866 C164,7253.05869 166.407,7256.48916 169.893,7258.07936 C169.893,7256.21186 169.88,7256.45286 171.303,7250.38046 C170.521,7248.80236 171.129,7246.19673 172.88,7246.19673 C175.31,7246.19673 173.659,7249.79964 173.378,7251.2174 C173.129,7252.30544 173.959,7253.14238 174.955,7253.14238 C176.864,7253.14238 178.108,7250.71524 178.108,7247.87063 C178.108,7245.69456 176.615,7244.10437 174.042,7244.10437 C169.467,7244.10437 168.307,7249.19966 169.893,7250.79893 C170.292,7251.40294 169.893,7251.43118 169.893,7252.22174 C169.616,7253.05768 167.403,7251.84259 167.403,7248.70757 C167.403,7245.86195 169.727,7242.51518 174.457,7242.51518 C178.191,7242.51518 180.681,7245.27609 180.681,7248.2054 C180.681,7252.13805 178.523,7254.98366 175.37,7254.98366 C174.291,7254.98366 173.295,7254.3978 172.963,7253.72824 C172.36,7256.07371 172.238,7257.26258 171.303,7258.58153 C172.216,7258.83261 173.129,7259 174.125,7259 C179.602,7259 184,7254.56519 184,7249.04235 C183.752,7243.43481 179.353,7239 173.876,7239"
                              id="pinterest-[#180]"> </path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/intent/tweet?status=Discover Lebello - B Chair+https://lebello.com/products/b-chair-1-2/"
                  target="_blank" title="Twitter" class="flex items-center justify-center w-8 h-8 rounded-full mx-2">
                  <svg fill="#000000" height="31px" width="31px" version="1.1" id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="-143 145 512 512" xml:space="preserve">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <path
                          d="M113,446c24.8,0,45.1-20.2,45.1-45.1c0-9.8-3.2-18.9-8.5-26.3c-8.2-11.3-21.5-18.8-36.5-18.8s-28.3,7.4-36.5,18.8 c-5.3,7.4-8.5,16.5-8.5,26.3C68,425.8,88.2,446,113,446z">
                        </path>
                        <polygon points="211.4,345.9 211.4,308.1 211.4,302.5 205.8,302.5 168,302.6 168.2,346 ">
                        </polygon>
                        <path
                          d="M183,401c0,38.6-31.4,70-70,70c-38.6,0-70-31.4-70-70c0-9.3,1.9-18.2,5.2-26.3H10v104.8C10,493,21,504,34.5,504h157 c13.5,0,24.5-11,24.5-24.5V374.7h-38.2C181.2,382.8,183,391.7,183,401z">
                        </path>
                        <path
                          d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M241,374.7v104.8 c0,27.3-22.2,49.5-49.5,49.5h-157C7.2,529-15,506.8-15,479.5V374.7v-52.3c0-27.3,22.2-49.5,49.5-49.5h157 c27.3,0,49.5,22.2,49.5,49.5V374.7z">
                        </path>
                      </g>
                    </g>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
          </SideMenu>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 px-16">
      <div v-for="collection in ourMaterialData.swatch_data" :key="collection.title" class="bg-gray-5 p-4 rounded-lg overflow-hidden shadow-lg">
  <div class="relative overflow-hidden group cursor-pointer" :onclick="() => handleRoute(collection)"> 
    <img 
      :src="$filePath(collection?.featured_image_data?.file_url)" 
      :alt="collection.title" 
      class="w-full h-48 object-cover filter grayscale transition duration-700 ease-in-out transform group-hover:scale-110 group-hover:filter-none"
    >
    <span class="absolute top-4 right-4 text-white font-bold text-lg">{{ collection.slug.toUpperCase() }}</span>
  </div>
  
  <div class="pt-5 flex justify-between items-center">
    <h2 class="text-[26px] font-graphikLight text-[#070707]">{{ collection.title }}</h2>
    <button 
      class="px-4 p-[4px] bg-[#978b7a] text-[12px] uppercase font-graphik text-white rounded-full hover:bg-gray-500"
      :onclick="() => handleRoute(collection)">
      View Collection
    </button>
  </div>
</div>

    </div>
  <LogoSection/>
  <FooterSection/>
  </template>
