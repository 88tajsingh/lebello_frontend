<template>
  <div class="overflow-x-hidden">
    <NavBar :absolute="true" :navColor="navColor" />
    <Slider
      :images="landingPageData.home_slider"
      imageKeyName="featured_image_data"
      :navColor="'white'"
      :openClass="computedOpenClass"  
      :closeClass="computedCloseClass"
      height="100vh"
      :closeSidebar="closeSidebar"
      @updateNavColor="updateNavColor"
      sliderPageName="homeSlider"
    >
      <template #sidebar>
        <div class="z-50 pt-10 px-6 md:pl-16 md:pr-32">
          <div class="mt-4 mb-2 gap-5 flex items-center">
            <span class="sticky" @click="closeSidebar = !closeSidebar">
              <CloseSvg size="20px" fillColor="#000000" />
            </span>
            <h3 class="text-[20px] uppercase text-orange font-graphikMedium">
              <a href="https://www.lebello.com/listItem/" class="text-orange">Collection 2024</a>
            </h3>
          </div>
          <div class="">
            <div class="search mt-4">
              <form  @submit.prevent="handleSearch" role="search">
                <div class="relative border-b border-[#33333357] mt-2">
                  <input
                    @keydown.enter="handleSearch"
                    v-model="search"
                    class="w-full py-[1px] font-graphikLight text-[20px] border-none bg-transparent focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="Search"
                  />
                  <div class="absolute right-2 top-1 flex items-center">
                    <SearchSvg size="22px" fillColor="#000000" />
                  </div>
                </div>
              </form>
            </div>
            <div class="text-[#333]">
              <h3
                class="text-[19px] font-graphikMedium pb-3 pt-8 border-b border-[#33333357] uppercase"
              >
                Highlights
              </h3>
            </div>
            <ul class="max-h-full text-[19px] text-[#363636] pt-1">
              <li
                v-for="(listItem, index) in landingPageData.home_sidebar_first"
                :key="index"
                class="py-[9px] font-graphikLight"
              >
                <router-link :to="`/productDetail/${listItem?.slug}`" class="hover:text-orange">{{
                  listItem?.title
                }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </Slider>
    <CollectionVideoc :sidebarList="landingPageData?.home_sidebar" />
    <div
      id="sideText"
      class="block mx-4 lg:mx-7 md:flex md:gap-5 lg:gap-14 lg:mt-5 overflow-x-hidden max-w-[1400px] xl:mx-9 "
    >
      <div
        v-for="(data, index) in productdata"
        :key="index"
        class="flex m-auto md:w-4/12 bg-[#ddd7ce] mt-10"
      >
        <div
          @click="index === 1 ? handleModal() : router.push(data.urlLink)"
          class="pb-1 text-textColorBlack hover:bg-[#c68d39] hover:text-white cursor-pointer"
        >
          <div class="overflow-hidden">
            <img
              :src="data.img"
              class="w-full transition-transform duration-1000 ease-in-out transform hover:scale-125"
            />
          </div>
          <div class="mx-5 my-3 sm:min-h-[68px] lg:min-h-0">
            <h3 class="uppercase leading-none font-graphik text-[18px]">{{ data.heading }}</h3>
            <p class="text-[12px] font-graphik">{{ data.peragraph }}</p>
          </div>
        </div>
      </div>
      <!-- Modal Section -->
      <div
        v-if="open"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div
          class="inline-block bg-[rgb(220,214,205)] text-left shadow-xl max-w-[70vw] w-full sm:w-auto sm:align-middle border"
        >
          <div class="relative">
            <button
              @click="handleClose"
              type="button"
              class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <span class="sr-only">Close</span>
              <svg
                fill="#000"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div class="flex">
            <!-- Image Section -->
            <div class="w-7/12">
              <img
                src="@/assets/images/Catalog-Mockup3-1-scaled-1.jpg"
                alt="Catalog"
                class="w-full"
              />
            </div>
            <!-- Content Section -->
            <div class="w-5/12 bg-[rgb(220,214,205)] px-8 pt-10">
              <div class="text-lg uppercase font-graphikMedium text-[24px]">2022/23 Highlights</div>
              <p class="font-graphikLight pb-16 text-[15px]">
                Simple yet timeless, our new collection for the 2022 Forever Summer Collection ® is
                Inspired by Nature with warm and vibrant natural colors and materials.
              </p>
              <div class="flex justify-between items-center border-t-2 border-[#978b7a7d] pt-5">
                <div class="text-[15px] font-graphikLight">2022/23 Lebello Highlight</div>
                <div
                  class="border border-[#666] rounded-xl px-2 text-[13px]"
                  @click="embedPdfInNewTab"
                >
                  Download
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LogoSection />
    <FooterSection />
  </div>
</template>

<script setup>
import CloseSvg from '@/components/frontend-components/Svg/Close-Svg.vue'
import SearchSvg from '@/components/frontend-components/Svg/Search-Svg.vue'
import Slider from '@/components/frontend-components/Slider.vue'
import NavBar from '@/components/frontend-components/Nav-bar.vue'
import CollectionVideoc from '@/components/frontend-components/Collection-Video.vue'
import FooterSection from '@/components/frontend-components/Footer-section.vue'
import LogoSection from '@/components/frontend-components/Logo-section.vue'
import { onMounted, ref, computed, onUnmounted } from 'vue'
import { getLandingPageData } from '@/helper/frontendHelpers'
import { useRouter } from 'vue-router'

const landingPageData = ref([])
const router = useRouter()
const open = ref(false)
const closeSidebar = ref(null)
const navColor = ref('#000000')
const search = ref('')

const handleLandingPageData = async () => {
  const res = await getLandingPageData()
  if (res.status === 200 && res.data.success) {
    landingPageData.value = res.data.data
  }
}

const updateNavColor = (newColor) => {
  navColor.value = newColor
}

const embedPdfInNewTab = () => {
  const pdfUrl = '/src/assets/sample.pdf'
  const newTab = window.open()
  newTab.document.body.innerHTML = `
    <iframe src="${pdfUrl}" width="100%" height="100%" style="border:none;"></iframe>
    <p><a href="${pdfUrl}" download="my-pdf-file.pdf">Download PDF</a></p>
  `
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


const windowWidth = ref(window.innerWidth)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}
const computedOpenClass = computed(() =>
  windowWidth.value < 768
    ? 'w-screen fixed z-50 top-0 right-0'
    : 'w-[500px] fixed z-50 top-0 right-0'
)

const computedCloseClass = computed(() => {
  if (windowWidth.value < 768) {
    return `w-screen fixed z-50 top-0 right-[-700px]`
  } else {
    return 'w-[500px] fixed z-50 top-0 right-[-520px]'
  }
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
const productdata = ref([
  {
    img: 'https://lebello.com/wp-content/uploads/2022/09/Contract-Design-image-2.png',
    heading: 'Contract Design',
    peragraph: 'See our previous project around the world',
    urlLink: '/contract-designs'
  },
  {
    img: 'https://lebello.com/wp-content/uploads/2022/09/Product-Catalog-image.jpg',
    heading: 'Product Catalog',
    peragraph: 'Download our latest product',
    urlLink: '/productCatalog'
  },
  {
    img: 'https://lebello.com/wp-content/uploads/2023/05/our-material-lebello-1.jpg',
    heading: 'Our Material',
    peragraph: 'Discover our 100+ bespoke material options',
    urlLink: '/materials-shop'
  }
])

const handleModal = () => {
  open.value = !open.value
}

const handleClose = () => {
  open.value = false
}

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  handleLandingPageData()
})
</script>
