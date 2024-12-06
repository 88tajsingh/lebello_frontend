<template>
  <div class="overflow-x-hidden">
       <NavBar :absolute="true" :navColor="navColor" />
       <Slider :images="landingPageData.home_slider" imageKeyName='featured_image_data'  :navColor="'white'">
       <template #sidebar>
      <div class="z-50">
        <div  class="mx-7 mt-4 mb-2">
          <h3 class="text-[14px] uppercase font-graphikMedium">
            <a href="https://www.lebello.com/listItem/" class="text-textColorBlack">Collection 2024</a>
          </h3>
        </div>
        <div class="px-7">
          <div class="search">
            <form role="search">
              <div class="relative border-b border-gray-4 mt-2">
                <input class="w-full py-[1px] text-[14px] font-graphikLight border-none bg-transparent focus:outline-none" id="username" type="text" placeholder="Search" />
                <div class="absolute right-2 top-1 flex items-center">
                  <SearchSvg size="22px" fillColor="#000000" />
                </div>
              </div>
            </form>
          </div>
          <ul class="max-h-52 overflow-auto text-[13px] text-textColorBlack">
            <PerfectScrollbar>
              <li v-for="(listItem, index) in landingPageData.home_sidebar_first" :key="index">
                <a @click="handleProductNav(listItem)" class="hover:text-orange">{{ listItem?.title }}</a>
              </li>
            </PerfectScrollbar>
          </ul>
        </div>
      </div>
       </template>
    </Slider> 
    <CollectionVideoc :sidebarList="landingPageData?.home_sidebar" />
    <div class="block mx-4 lg:mx-7 md:flex md:gap-5 lg:gap-14 lg:mt-5 overflow-x-hidden">
    <div v-for="(data, index) in productdata" :key="index" class="flex m-auto md:w-4/12 bg-[#ddd7ce] mt-10">
      <div @click="index === 1 ? handleModal() : router.push(data.urlLink)" class="pb-1 text-textColorBlack hover:bg-[#c68d39] hover:text-white cursor-pointer">
        <div class="overflow-hidden">
          <img :src="data.img" class="w-full transition-transform duration-1000 ease-in-out transform hover:scale-125" />
        </div>
        <div class="mx-5 my-3 sm:min-h-[68px] lg:min-h-0">
          <h3 class="uppercase leading-none font-graphik text-[18px]">{{ data.heading }}</h3>
          <p class="text-[12px] font-graphik">{{ data.peragraph }}</p>
        </div>
      </div>
    </div>
    <!-- Modal Section -->
    <div v-if="open" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div class="inline-block bg-[rgb(220,214,205)] text-left shadow-xl max-w-[70vw] w-full sm:w-auto sm:align-middle border">
    <div class="relative ">
      <button @click="handleClose" type="button" class=" absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <span class="sr-only">Close</span>
        <svg fill="#000" width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fill-rule="evenodd"></path>
        </svg>
      </button>
    </div>
    <div class="flex">
      <!-- Image Section -->
      <div class="w-7/12">
        <img src="@/assets/images/Catalog-Mockup3-1-scaled-1.jpg" alt="Catalog" class="w-full"/>
      </div>
      <!-- Content Section -->
      <div class="w-5/12 bg-[rgb(220,214,205)] px-8 pt-10">
        <div class="text-lg uppercase font-graphikMedium text-[24px]">2022/23 Highlights</div>
        <p class="font-graphikLight pb-16 text-[15px]">
          Simple yet timeless, our new collection for the 2022 Forever Summer Collection ® is Inspired by Nature with warm and vibrant natural colors and materials.
        </p>
        <div class="flex justify-between items-center border-t-2 border-[#978b7a7d] pt-5">
          <div class="text-[15px] font-graphikLight">2022/23 Lebello Highlight</div>
          <div class="border border-[#666] rounded-xl px-2 text-[13px]" @click="embedPdfInNewTab">
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
import SearchSvg from '@/components/frontend-components/Svg/Search-Svg.vue'
import Slider from '@/components/frontend-components/Slider.vue'
import NavBar from '@/components/frontend-components/Nav-bar.vue'
import CollectionVideoc from '@/components/frontend-components/Collection-Video.vue'
import FooterSection from '@/components/frontend-components/Footer-section.vue'
import LogoSection from '@/components/frontend-components/Logo-section.vue'
import { onMounted, ref } from 'vue'
import { getLandingPageData } from '@/helper/frontendHelpers'
import { useRouter } from 'vue-router';

const  landingPageData = ref([])
const router = useRouter();
const open = ref(false);

const  handleLandingPageData = async () => {
   const res = await getLandingPageData()
  if (res.status === 200 && res.data.success) {
     landingPageData.value = res.data.data
  }
}

const embedPdfInNewTab = () => {
  const pdfUrl = '/src/assets/sample.pdf';
  const newTab = window.open();
  newTab.document.body.innerHTML = `
    <iframe src="${pdfUrl}" width="100%" height="100%" style="border:none;"></iframe>
    <p><a href="${pdfUrl}" download="my-pdf-file.pdf">Download PDF</a></p>
  `;
};

const productdata = ref([
  {
    img: 'https://lebello.com/wp-content/uploads/2022/09/Contract-Design-image-2.png',
    heading: 'Contract Design',
    peragraph: 'See our previous project around the world',
    urlLink: '/contract_designs',
  },
  {
    img: 'https://lebello.com/wp-content/uploads/2022/09/Product-Catalog-image.jpg',
    heading: 'Product Catalog',
    peragraph: 'Download our latest product',
    urlLink: '/productCatalog',
  },
  {
    img: 'https://lebello.com/wp-content/uploads/2023/05/our-material-lebello-1.jpg',
    heading: 'Our Material',
    peragraph: 'Discover our 100+ bespoke material options',
    urlLink: '/materials-shop',
  },
]);

const handleModal = () => {
  open.value = !open.value;
};

const handleClose = () => {
  open.value = false;
};

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
   handleLandingPageData()
})

</script>