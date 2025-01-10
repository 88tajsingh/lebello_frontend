<template>
  <div class="overflow-hidden ">
    <div>{{ navColor }}
      <NavBar :absolute="true"  navColor="#000000"  hovrednavColor="#ffffff"/>
      <Slider :images="imageData" imageKeyName='gallery' :disableSideText="true"
      :navColor="'white'" sliderPageName="productDetails  " :hasSidebar="true">
      <template #utility>
        <!-- lebellow icon right top -->
        <a href="#" class="absolute z-50 top-11 right-0 mx-auto">
          <img src="/src/assets/logo/logohori.png" />
        </a>
        <!-- text left bottom -->
        <div  class="absolute bottom-10  mx-auto left-6 sm:left-14 md:left-20 "
          :class="['absolute transition-all duration-1000 ease-in-out', { 'bottom-10': !atBottom, 'bottom-10': atBottom }]">
          <div class=" capitalize opacity-80 text-[#686868] font-graphik sm:text-[20px] md2:text-[40px]  ">{{
            productData.title }}</div>
        </div>
        </template>
        <template #sidebar>
          <div class="z-50">
              <div class="flex border border-[#686868] items-center">
                <span class="sticky top-3 p-4 border-r mr-4 border-[#686868] bg-transparent">
                  <Menu size="15px" fillColor="#000000" />
                </span>
                <div>
                  <h3 class="text-[14px] font-medium">
                    <a href="https://www.lebello.com/listItem/" class="uppercase text-[14px] text-textColorBlack">
                      Collection 2024
                    </a>
                  </h3>
                </div>
              </div>
              <ul class="font-light text-[13px] my-1 px-5 text-textColorBlack overflow-auto max-h-52">
                <form  @submit.prevent="handleSearch" role="search">
                <div class="relative border-b border-[#33333357] mt-2">
                  <input
                    @keydown.enter="handleSearch"
                    v-model="search"
                    class="w-full py-[1px] px-0 font-graphikLight text-[13px] border-none bg-transparent focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="Search"
                  />
                  <div class="absolute right-2 top-1 flex items-center">
                    <Search size="22px" fillColor="currentColor" />
                  </div>
                </div>
              </form>
                <li v-for="(listItem, index) in productTypes " :key="index" class="mt-1 border-b border-[#cdc6c6]">
                  <a @click="handelProductSeriesNavigation(listItem)" class="hover:text-orange  cursor-pointer">
                    {{ listItem?.name }}
                  </a>
                </li>
              </ul>
            </div>
          </template>
      </Slider> 
    </div>
    <div class="flex relative">
    </div>
    <div class=" ">
      <!-- Breadcrumb -->
      <div id="sideText" class="relative">
        <nav class="py-6 font-graphik text-sm">
          <div class="flex items-center  text-[16px] cursor-pointer gap-2 ml-14">
            <span @click="() => $router.push('/products')" class="text-gray-600">Collection</span>
            /
            <span class="text-green font-medium">{{ productData.title }}</span>
          </div>
        </nav>
        <div class="absolute top-5 right-0 bg-transparent " ref="closeMenu">
          <SideMenu openClass="w-[230px] absolute z-50 top-0 right-0 "
            closeClass="w-[230px] absolute z-50 top-0 right-[-250px]">
            <div class="z-50">
              <div class="flex border border-[#686868] items-center">
                <span class="sticky top-3 p-4 border-r mr-4 border-[#686868] bg-transparent">
                  <Menu size="15px" fillColor="#000000" />
                </span>
                <div>
                  <h3 class="text-[14px] font-medium">
                    <a href="https://www.lebello.com/listItem/" class="uppercase text-[14px] text-textColorBlack">
                      Collection 2024
                    </a>
                  </h3>
                </div>
              </div>
              <ul class="font-light text-[13px] my-1 px-5 text-textColorBlack overflow-auto max-h-52">
                <form  @submit.prevent="handleSearch" role="search">
                <div class="relative border-b border-[#33333357] mt-2">
                  <input
                    @keydown.enter="handleSearch"
                    v-model="search"
                    class="w-full py-[1px] font-graphikLight text-[13px] px-0 border-none bg-transparent focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="Search"
                  />
                  <div class="absolute right-2 top-1 flex items-center">
                    <Search size="22px" fillColor="#000000" />
                  </div>
                </div>
              </form>
                <li v-for="(listItem, index) in productTypes " :key="index" class="mt-1 border-b border-[#cdc6c6]">
                  <a @click="handelProductSeriesNavigation(listItem)" class="hover:text-orange  cursor-pointer">
                    {{ listItem?.name }}
                  </a>
                </li>
              </ul>
            </div>
          </SideMenu>
        </div>
      </div>
    </div>
    <div  class="bg-white  ">
      <section class="bg-[#f3f3f3]">
        <div class="grid sm:grid-cols-1 md:grid-cols-2 md:gap-4">
          <div class="lg:px-11 my-10">
            <div class="mx-4 md:mx-12 lg:mx-6 font-graphikLight">
              <h2 class="text-[24px] md:text-[18px] lg:text-[27px] pb-[35px] text-textColorBlack ">{{ productData.title
                }}</h2>
              <p v-html="productData.description" class="sm:text-[15px] md:text-[15px] lg:text-[16px] lg:leading-[25px] text-[#666]">
              </p>
            </div>
            <span class="mt-10 flex hover:text-green" :class="{ 'text-green': addiVisible }"
              @click="HandleAdditionalInfo" @mouseenter="addiColor = true" @mouseleave="addiColor = false">
              <span class="ml-5 uppercase font-graphikMedium text-[13px]">Additional Product info</span>
              <Arrow class="mt-0 ml-3 self-center" size="15px" :fillColor="addiColor ? '#4dc45c' : addiVisible ? '#4dc45c' : '#64748b'" />
            </span>
          </div>
          <div class="hidden md:block">
            <div></div>
            <div class="relative overflow-hidden  h-full max-h-[450px] w-full">
              <img
                class="object-cover h-full w-full transition-transform duration-700 ease-in-out transform hover:scale-105"
                :src="$filePath(productData?.new_product_additional_right_box_image_url?.file_url)" alt="B Chair" />
              <span  class="absolute bottom-0 bg-green p-5" @click="rotate">
                <Arrow size="13px" fillColor="#ffffff" ref="arrowSvg"  />
              </span>
            </div>
          </div>
        </div>
      </section>
      <transition>
        <div id="scrollTOadditional" v-show="isVisible" class="container-fluid bg-[#d8d8d8] p-0">
          <div class="grid grid-cols-1 mt-[5px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div class="product-item p-0" v-for="(product, index) in productData?.gallery_urls" :key="index">
              <div class="product_img max-h-[250px] h-full  overflow-hidden">
                <a :title="product?.title" :href="product?.image" rel="pro-gallery">
                  <img
                    class="w-full h-full opacity-55 hover:opacity-100 transition-transform duration-700 ease-in-out transform hover:scale-125"
                    :src="$filePath(product?.file_url)" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition>
        <div ref="scrollTOadditional" v-show="addiVisible"
          class="container-fluid mt-1 h-[450px] w-full p-0"
          :style="{ backgroundImage: 'url(' + $filePath(productData?.new_product_additional_bg_image_url?.file_url) + ')' }">
          <div class="py-10 m-0 relative px-14 lg:w-1/2 font-light text-left text-white bg-green">
            <p id="directTO" class="font-graphikLight   sm:text-[20px] md:text-[24px] lg:text-[27px] leading-9">
              {{ productData?.new_product_additional_info }}
            </p>
            <div class="absolute right-3 top-3" @click="HandleAdditionalInfo">
              <Close size="15px" fillColor="#ffffff" />
            </div>
          </div>
        </div>
      </transition>
      <div class="flex justify-between uppercase py-7  ">
        <div class="ml-16 flex self-center ">
          <ul class="flex font-graphikMedium text-[14px] text-[#64748b] hover:text-green"
            @mouseenter="setArrowFillColor('#3399ff')" @mouseleave="setArrowFillColor('#4dc45c')">
            <li class="mr-2 ">
              <a class="font-graphikMedium text-[14px]" href="https://www.lebello.com/product/">Enquire</a>
              <span class="mx-1">/</span>
            </li>
            <li class="active">Email</li>
          </ul>
          <ul class="flex font-medium ml-20 text-[#64748b] hover:text-green" @mouseenter="setArrowFillColor2('#3399ff')"
            @mouseleave="setArrowFillColor2('#4dc45c')">
            <li class="mr-2 ml-2">
              <a class="underline font-graphikMedium text-[14px]" target="_blank"
                :href="productData?.downloadable_files_url && productData?.downloadable_files_url[0]?.file_url ? $filePath(productData?.downloadable_files_url[0]?.file_url) : '#'">
                Download Cut Sheet
              </a>
            </li>
          </ul>
        </div>
      </div>
      <AccordianSection :AccordionData="productData?.material_swatche_data" />
    </div>
    <FooterSection />
  </div>
</template>

<script setup>
import FooterSection from '@/components/frontend-components/Footer-section.vue'
import { ref, onMounted,computed } from 'vue'
import Slider from '@/components/frontend-components/Slider.vue'
import AccordianSection from '@/components/frontend-components/Accordian-Section.vue'
import { onClickOutside } from '@vueuse/core'
import NavBar from '@/components/frontend-components/Nav-bar.vue'
import SideMenu from '@/components/frontend-components/Side-Menu.vue'
import { getProductDetail } from '@/helper/frontendHelpers'
import {Menu,Arrow,Close,Search} from '@/components/frontend-components/Svg/Icons'
import { useRouter } from 'vue-router'


const router = useRouter();
const isOpenSidebarSlider = ref(false);
const isOpenSidebarSlider2 = ref(false);
const addiVisible = ref(false);
const arrowRotation = ref('down')
const isVisible = ref(false);
const arrowSvg = ref(null)
const arrowScroll = ref(0);
const addiColor = ref(null);
const arrowFillColor = ref('#4dc45c');
const arrowFillColor2 = ref('#333');
const closeMenu = ref(null);
const closeMenu2 = ref(null);
const email = ref('')
const productData = ref([])
const productTypes = ref([])
const navColor = ref('')
const atBottom = ref(false)
const search = ref('')



const slug = ref(router.currentRoute.value.params.slug);
const handleProductDetailData = async () => {
  const res = await getProductDetail(slug.value)
  if (res.status === 200 && res.data.success) {
    productData.value = res.data.data.product_data[0];
    productTypes.value = res.data.data?.product_types;
  }
  else
  router.push('/products')
}

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  handleProductDetailData()
})

const imageData = computed(() => {
  return productData.value.gallery_urls?.map(item => ({
    gallery: item
  }));
});

const handleStoreClick = () => {
  console.log('Email:', email.value)
}

const handleSearch = (event) => {
  if (event) event.preventDefault(); 
  if (search.value.trim() !== '') {
    console.log('Searching for:', search.value);
    router.push({ name: 'search', query: { search: search.value } });
    search.value = ''; 
  } else {
    console.log('Search query is empty!');
  }
};


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
  if (addiVisible.value) scrollToTarget('scrollTOadditional');
};

const scrollToTarget = () => {
  const targetDiv = document.getElementById('scrollTOadditional');
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

const handleProductNav = (nav) => {
  sessionStorage.setItem('productDetail', nav.id);
  router.push({ name: 'productDetail', params: { slug: nav.slug } });
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