<template>
  <div class="overflow-hidden">
    <div class="relative overflow-hidden">
      <NavBar :absolute="true" :navColor="'#000000'" navBackgroundColor="hover:bg-[#ffffff] bg-opacity-5" hovrednavColor="#000000"/>
      <SwiperSlider :images="imageData" imageKeyName="gallery">
        <template #utility>
          <!-- lebellow icon right top -->
          <a href="#" class="absolute z-50 top-11 right-0 mx-auto">
            <img src="/src/assets/logo/lebello-logo-right.png" />
          </a>
          <!-- text left bottom -->
          <span class="slider_text">
            <h1> {{ productData?.title }}
            </h1>
          </span>
        </template>
      </SwiperSlider>
      <div class="absolute top-48 right-0" >
      <SideMenu openClass="w-[230px] absolute z-50 right-0" closeClass="w-[230px] z-50 absolute right-[-250px]" height=""
      :closeSidebar ="closeSidebar" >
      <div class="z-50">
            <div class="flex items-center">
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
              <form @submit.prevent="handleSearch" role="search">
                <div class="relative border-b border-[#33333357] mt-2">
                  <input @keydown.enter="handleSearch" v-model="search"
                    class="w-full py-[1px] px-0 font-graphikLight text-[13px] border-none bg-transparent focus:outline-none"
                    id="username" type="text" placeholder="Search" />
                  <div class="absolute right-2 top-1 flex items-center">
                    <Search size="22px" fillColor="currentColor" />
                  </div>
                </div>
              </form>
              <li v-for="(listItem, index) in productTypes" :key="index" class="mt-1 border-b border-[#cdc6c6]">
                <a @click="handelProductSeriesNavigation(listItem)" class="hover:text-orange cursor-pointer">
                  {{ listItem?.name }}
                </a>
              </li>
            </ul>
          </div>
      </SideMenu>
      </div>
      
    </div>
    <div id="sideText" class="bg-white">
      <!-- Breadcrumb -->

      <nav class="py-5 text-[16px] leading-[39px] text-black font-graphik">
        <div class="flex items-center gap-2 ml-16">
          <span class=" font-medium">Collection</span>
          <!-- Heroicon: ChevronRight -->
          /
          <span class="text-yellow-600 font-medium">{{ productData?.title }}</span>
        </div>
      </nav>
      <!-- Main Content -->
      <div className="grid grid-cols-1 lg:flex lg:justify-between w-full">
        <div
          className="relative aspect-square w-screen overflow-auto h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] bg-gray-100 overflow-y-hidden">
          <iframe src="/src/assets/lebello/Tubo Sofa Low_Conf_2/Tubo Sofa Low_Conf_2_Product_detail.html"
            allowFullScreen className="absolute z-[9999] aspect-ratio top-0 left-0 w-full h-full border-none"
            frameborder="0" scrolling="no" />
        </div>

        <div className="text-black flex flex-col pb-14 w-full h-full pl-4 md:pl-14 lg:w-4/6">
          <div>
            <h1 className="text-[21px] leading-[60px] lg:leading-[92px] text-[#333333] font-medium font-graphik">
              3D CONFIGURATOR
            </h1>
          </div>

          <div>
            <div>
              <h2 className="text-[16px]  text-[#000000] font-medium font-graphik">Recommended Configuration</h2>
              <p className="text-[16px] text-[#000000] font-light font-graphikLight mb-3">Please select the
                configuration
              </p>
            </div>
            <div className="relative">
              <select v-model="configuration" id="configuration"
                class="w-[228px] h-[46px]  rounded-[6px] text-[14px] p-2">
                <option value="1">Configuration 1</option>
                <option value="2">Configuration 2</option>
                <option value="3">Configuration 3</option>
              </select>
            </div>
          </div>

          <div class="mt-10 sm:mt-[70px] md:mt-[130px] lg:mt-[170px] h-full flex gap-4 md:items-end md:flex-row">
            <button @click="handleStoreClick"
              class="text-[#333333] opacity-[0.400] text-[10px] font-light leading-7 font-[Graphik] border border-black h-[27px] w-[133px] rounded-full hover:text-[#9E7339]">
              ENQUIRE/EMAIL
            </button>

            <button @click="handleStoreClick"
              class="bg-[#B88746] uppercase text-[10px] font-light leading-7 text-white font-[Graphik] hover:bg-[#9E7339] h-[27px] px-2 rounded-full w-[133px]">
              save configuration
            </button>

          </div>
        </div>
      </div>

    </div>

    <div class="bg-[#f3f3f3]">
      <section class="">
        <div class="grid sm:grid-cols-1 md:grid-cols-2 md:gap-4">
          <div class="lg:px-11  ">
            <div class="mx-4 md:mx-12 lg:mx-6 font-graphikLight">
              <h2 class="text-[26px] md:text-[25px] leading-[84px] text-[#333333] font-light font-graphik">
                {{ productData?.title }}
              </h2>
              <p v-html="productData?.description"
                class="text-[#555555] text-[16px] leading-[26px] font-light font-graphik sm:text-[15px] md:text-[15px] lg:text-[16px]">

              </p>
              <span class="inline-flex my-10 text-[#333333] leading-[21px] hover:text-orange"
                :class="{ 'text-orange': addiVisible }" @click="HandleAdditionalInfo"
                @mouseenter="setAddiColor('#000000')" @mouseleave="setAddiColor('#33333')">
                <span class="uppercase cursor-pointer font-graphikMedium text-[13px] leading-[21px] font-medium">
                  INSPIRATIONAL SCENE
                </span>
                <Icon.Arrow class="mt-0 ml-3 self-center" size="15px" fillColor="currentColor" />
              </span>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="relative h-full overflow-hidden">
              <img
                class="object-cover h-full w-full transition-transform duration-700 ease-in-out transform hover:scale-105"
                src="https://lebello.com/wp-content/uploads/2019/12/b_chair_slider_gallery.jpg" alt="B Chair" />
              <!-- <span @click="rotate" class="absolute bottom-0 bg-orange p-5">
                <Icon.Arrow size="13px" fillColor="#ffffff" ref="arrowSvg" />
              </span> -->
            </div>
          </div>
        </div>
      </section>

      <transition>
        <div id="scrollTOadditiona" v-show="isVisible" class="container-fluid bg-[#d8d8d8] p-0">
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
        <div ref="scrollTOadditiona" v-show="addiVisible" class="container-fluid mt-1 h-[450px]  p-0"
          :style="{ backgroundImage: 'url(' + $filePath(productData?.new_product_additional_bg_image_url?.file_url) + ')' }">
          <div class="py-10 m-0 relative px-14 md:w-1/2 font-light text-left text-white bg-orange">
            <p id="directTO" class="font-graphikLight sm:text-[20px] md:text-[24px] lg:text-[27px] leading-9">
              {{ productData?.new_product_additional_info }}
            </p>
            <div class="absolute right-3 top-3" @click="HandleAdditionalInfo">
              <Icon.Close size="20px" fillColor="#ffffff" />
            </div>
          </div>
        </div>
      </transition>

      <div class="flex justify-between uppercase">
        <div class="ml-5 md:ml-16 md:flex self-center">
          <div
            class="flex items-center font-graphikMedium text-[16px] text-[#333333] py-2 md:py-0 md:leading-[68px] font-medium "
            @mouseenter="setArrowFillColor('#3399ff')" @mouseleave="setArrowFillColor('#4dc45c')">
            Materials
          </div>

          <div
            class="md:flex md:items-center font-graphikMedium text-[16px] text-[#333333] py-2 md:py-0 md:leading-[68px] font-medium md:ml-20 hover:text-orange"
            @mouseenter="setArrowFillColor2('#3399ff')" @mouseleave="setArrowFillColor2('#4dc45c')">
            <!-- {{ productData.downloadable_files_url[0].file_url}} -->
            <a class="underline font-graphikMedium text-[16px]" target="_blank" blank
              :href="$filePath(productData?.downloadable_files_url && productData?.downloadable_files_url[0]?.file_url)">Download
              Cut Sheet</a>
          </div>
        </div>
      </div>
      

      <!-- <AccordianSection /> -->
      <div class="mx-5 md:mx-10 lg:mx-12  pb-12">
        <StoreAccordion :accordionData="productData?.material_swatche_data" />
      </div>
    </div>
    <FooterSection :extraClasses="['px-10', 'text-black', 'bg-[#dad6cd]']" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import SideMenu from '@/components/frontend-components/Side-Menu.vue'
import SwiperSlider from '@/components/frontend-components/SwiperSlider.vue'
import Icon, { Menu, Search } from '@/components/frontend-components/Svg/Icons'
import NavBar from '@/components/frontend-components/Nav-bar.vue'
import Slider from '@/components/frontend-components/Slider.vue'
import StoreAccordion from '@/components/store-components/StoreAccordion.vue'
import FooterSection from '@/components/frontend-components/Footer-section.vue'
import { getLandingPageData, getProductDetail } from '@/helper/frontendHelpers'
import { useRouter } from 'vue-router'

const products = ref([
  {
    title: 'Set of B Chair, B Chair 2 and Dot Table.',
    description: 'Set of B Chair, B Chair 2 and Dot Table.',
    image: 'https://lebello.com/wp-content/uploads/2019/12/b-chair-slider-gallery.jpg',
    thumbnail: 'http://lebello.com/wp-content/uploads/thumbs/b-chair-slider-gallery-302X202.png',
    alt: 'B Chair Piie Low & High Lounger Chair'
  },
  {
    title: 'Set of B Chair, B Chair 2 and Dot Table.',
    description: 'Set of B Chair, B Chair 2 and Dot Table.',
    image: 'https://lebello.com/wp-content/uploads/2019/12/b-chair-slider-gallery.jpg',
    thumbnail: 'http://lebello.com/wp-content/uploads/thumbs/b-chair-slider-gallery-302X202.png',
    alt: 'B Chair Piie Low & High Lounger Chair'
  },
  {
    title: 'Set of B Chair, B Chair 2 and Dot Table.',
    description: 'Set of B Chair, B Chair 2 and Dot Table.',
    image: 'https://lebello.com/wp-content/uploads/2019/12/b-chair-slider-gallery.jpg',
    thumbnail: 'http://lebello.com/wp-content/uploads/thumbs/b-chair-slider-gallery-302X202.png',
    alt: 'B Chair Piie Low & High Lounger Chair'
  }
])
// 4l-pixie-arms-chair
const router = useRouter();
const isOpenSidebarSlider = ref(false)
const isOpenSidebarSlider2 = ref(false)
const addiVisible = ref(false)
const arrowRotation = ref('down')
const isVisible = ref(false)
const arrowSvg = ref(null)
const landingPageData = ref([])
const arrowScroll = ref(0)
const arrowFillColor = ref('#4dc45c')
const arrowFillColor2 = ref('#333')
const closeMenu = ref(null)
const closeMenu2 = ref(null)
const configuration = ref('1')
const email = ref('')
const productData = ref([])
const productTypes = ref([])
const navColor = ref('#000000')
const slug = ref(router.currentRoute.value?.params?.slug);
if (!slug.value) slug.value = '4l-pixie-arms-chair';
const handleLandingPageData = async () => {
  const res = await getLandingPageData()
  console.log('getLandingPageData', res.data.data.home_slider)
  if (res.status === 200 && res.data.success) {
    landingPageData.value = res.data.data.home_slider
  }
}

const handleProductDetailData = async () => {
  const res = await getProductDetail(slug.value)
  if (res.status === 200 && res.data.success) {
    productData.value = res.data.data.product_data[0];
    productTypes.value = res.data.data?.product_types;

    console.log('productData', productData.value)
    console.log('productTypes', productTypes.value)
  }
  else
    router.push('/products')
}

const imageData = computed(() => {
  return productData.value.gallery_urls?.map(item => ({
    gallery: item
  }));
});

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

const updateNavColor = (newColor) => {
  navColor.value = newColor
  console.log('navColor', newColor)
}
onMounted(() => {
  handleLandingPageData()
  handleProductDetailData()
})

const handleStoreClick = () => {
  console.log('Email:', email.value)
}

const setArrowFillColor = (color) => (arrowFillColor.value = color)
const setArrowFillColor2 = (color) => (arrowFillColor2.value = color)

const handleSideMenu = () => {
  isOpenSidebarSlider.value = true
}
const closeSideMenu = () => {
  isOpenSidebarSlider.value = false
}
const handleSideMenu2 = () => {
  isOpenSidebarSlider2.value = true
}
const closeSideMenu2 = () => {
  isOpenSidebarSlider2.value = false
}

onClickOutside(closeMenu, closeSideMenu)
onClickOutside(closeMenu2, closeSideMenu2)

const rotate = () => {
  if (arrowSvg?.value && arrowSvg?.value?.rotate) {
    arrowSvg.value.rotate(arrowRotation.value)
    arrowRotation.value = arrowRotation.value === 'up' ? 'down' : 'up'
    toggleVisibility()
  }
}
const HandleAdditionalInfo = () => {
  addiVisible.value = !addiVisible.value
  isVisible.value = false
  if (addiVisible.value) scrollToTarget('scrollTOadditiona')
}

const scrollToTarget = () => {
  const targetDiv = document.getElementById('scrollTOadditiona')
  const startPosition = window.pageYOffset
  const targetPosition = targetDiv.getBoundingClientRect().top + startPosition
  const distance = targetPosition - startPosition
  const duration = 1000

  let startTime = null
  const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

  const animateScroll = (currentTime) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const run = easeInOutQuad(timeElapsed / duration) * distance + startPosition
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animateScroll)
    else window.scrollTo(0, targetPosition)
  }

  requestAnimationFrame(animateScroll)
}

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

.slider_text {
  position: absolute;
  z-index: 999;
  display: inline-block;
  bottom: 0;
  left: 104px;
}

.slider_text h1 {
  font-size: 40px;
  display: inline-block;
  line-height: 113px;
  color: #ffffff;
  font-weight: 400;
  font-family: "PT Serif";
}
</style>
