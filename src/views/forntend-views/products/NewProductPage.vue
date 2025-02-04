<template class=" overflow-y-hidden">
  <section class="product_banner font-graphik ">
    <div class="relative overflow-hidden ">
      <NavbarStatic />
      <SwiperSlider :images="imageData" imageKeyName="gallery">
        <template #utility>
          <!-- lebellow icon right top -->
          <a href="#" class="absolute top-11 right-0 mx-auto" style="z-index:9999999999999;">
            <img src="/src/assets/logo/lebello-logo-right.png" />
          </a>
          <!-- text left bottom -->
          <span class="slider_text ">
            <h1> {{ productData?.title }} </h1>
          </span>
        </template>
      </SwiperSlider>
      <!-- <div class="absolute top-48 right-0">
        <SideMenu openClass="w-[230px] absolute z-50 right-0" closeClass="w-[230px] z-50 absolute right-[-250px]"
          height="">
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
      </div> -->
    </div>
  </section>
  <Breadcrumb :breadcrumbData="breadcrumbData" />
 
  <section class="three_d_section_main bg-white">
    <div class="threed_inner_main">
      
  <div class="threed_img" ref="containerRef">
    <img v-if="!isIframeVisible" :src="$filePath(imageSrc,true)" :alt="$filePath(imageAlt)" class="w-full h-auto" ref="imageRef"
      @load="updateDimensions" />
    <iframe v-if="isIframeVisible" :src="iframeSrc" :style="{ width: `${width}px`, height: `${height}px` }"
      class="w-full" allowfullscreen frameborder="0" scrolling="no" />
    <button v-if="!isIframeVisible && iframeSrc" @click="toggleIframe"
      class="absolute right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
      <img src="../../../assets/images/product/3D Icon.png" alt="View 3D" class="w-6 h-6" />
    </button>
  </div>
  <div class="threed_cont">
    <div class="product_top_cont">
      <h2>3D CONFIGURATOR</h2>
      <p><span>Recomended Configuration</span> Please select the configuration</p>
      <select id="configuration" v-model="selectedConfig">
        <option v-for="(item, index) in productData?.product_url_for_three_d" :key="index" :value="item.config_url">
          {{ item.config_name }}
        </option>
      </select>
    </div>
    <div class="threed_btns">
      <a href="#">ENQUIRE / EMAIL</a>
      <a href="#" class="see_store_btn">SEE AT STORE</a>
    </div>
  </div>
</div>

  </section>

  <section class="product_text_img">
    <div class="text_img_inner_main">
      <div class="product_inner_cont">
        <div>

          <h2>{{ productData.title }}</h2>
          <p v-html="productData.description"></p>
        </div>
        <button @click="isExpanded = !isExpanded" class=" flex pb-5 hover:text-orange">
          <span>INSPIRATIONAL SCENE</span>
          <Arrow class="mt-0 ml-3 self-center" :strokeWidth="20.8" size="16px" fillColor="currentColor" />
        </button>
      </div>
      <div v-if="rightBoxImage" class="product_inner_img aspect-square"
        :style="{ backgroundImage: `url(${rightBoxImage})` }">
      </div>
    </div>
    <div v-if="isVisible" class="info_div_product">
      <p></p>
    </div>
  </section>
  <section class="product_text_img product_new_gallery">
    <TransitionExpand :isExpanded="isExpanded">
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div class="product-item p-0" v-for="(product, index) in productData?.gallery_urls" :key="index">
          <div class="product_img max-h-[250px] h-full overflow-hidden cursor-pointer"
            @click="openModal(product, index)">
            <img
              class="w-full h-full opacity-75 hover:opacity-100 object-cover transition-transform duration-700 ease-in-out transform hover:scale-125"
              :src="$filePath(product?.file_url)" :alt="product?.title" :title="product?.title" />
          </div>
        </div>
      </div>
    </TransitionExpand>
  </section>
  <Transition name="modal-fade">
    <section class="modal popup" v-if="isModalOpen">
      <div class=" fixed top-0 left-0 w-full h-full bg-[#c3c1be] bg-opacity-75 flex items-center justify-center z-50"
        @click.self="closeModal">
        <div class="bg-white rounded shadow-lg transition-all  pt-[15px] duration-300 ease-in-out" :style="modalStyle">
          <div class="relative px-[15px]">
            <button @click="closeModal" class="close_btn_popup absolute top-0 right-0 z-10">
              <img src="/public/close-button.png" alt="Close">
            </button>

            <Transition name="fade" mode="out-in">
              <img :key="activeImage?.file_url" :src="$filePath(activeImage?.file_url)" :alt="activeImage?.title"
                class="w-full h-full object-contain" @load="adjustModalSize" ref="imageRef" />
            </Transition>

            <div class="absolute mx-4 inset-0 z-10 flex justify-between">
              <button @click.stop="prevImage" @mouseenter="hoveredSide = 'left'" @mouseleave="hoveredSide = null"
                class="w-1/3 h-full cursor-pointer flex items-center justify-start">
                <Arrow v-if="hoveredSide === 'left'" class="ml-2" direction="right" :strokeWidth="20.8" size="22px"
                  fillColor="#FFF" />
              </button>
              <button @click.stop="nextImage" @mouseenter="hoveredSide = 'right'" @mouseleave="hoveredSide = null"
                class="w-1/3 h-full cursor-pointer flex items-center justify-end">
                <Arrow v-if="hoveredSide === 'right'" class="mr-2" direction="left" :strokeWidth="20.8" size="22px"
                  fillColor="#FFF" />
              </button>
            </div>
          </div>
          <div
            class="bg-white rounded-b-lg text-black w-full font-graphik p-4 flex flex-wrap justify-between sm:flex  sm:items-center sm:justify-between sm:space-y-0">
            <div class="text-sm">
              {{ activeImage?.description || productData?.title }}
            </div>
            <div class="flex flex-wrap  sm:flex-row items-end justify-center sm:items-end  sm:space-y-0 ">
              <a href="#" class="flex items-end text-sm hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 16.5v3.75a.75.75 0 00.75.75h16.5a.75.75 0 00.75-.75V16.5M12 3v13.5M8.25 11.25l3.75 3.75 3.75-3.75" />
                </svg>
                Download
              </a>
              <ul class="hidden md:flex space-x-1 ">
                <li v-for="social in socialIcons" :key="social.name">
                  <component :is="social.component" v-bind="social.props" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Transition>
  <section class="materils_main_sec">
    <div class="product_container">
      <div class="materils_cut_top">
        <ul>
          <li>MATERIALS</li>
          <li><a :href="$filePath(productData?.downloadable_files_url?.[0].file_url, true)"
              class="hover:text-orange border-b hover:border-orange" target="_blank">
              DOWNLOAD CUT SHEET
            </a></li>
        </ul>
      </div>
      <StoreAccordion :accordionData="productData?.material_swatche_data" />
    </div>
  </section>
  <section class="footer_section">
    <FooterSection :extraClasses="['text-black', 'bg-[#eae6e1]']" />
  </section>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed, watch, defineAsyncComponent, nextTick } from 'vue'
import { useRouter } from 'vue-router';
import { Arrow, Facebook, Menu, Instagram, Houzz, Pinterest, } from '@/components/frontend-components/Svg/Icons';
import { getProductDetail } from '@/helper/frontendHelpers'
import { useStore } from 'vuex'
import Image1 from '../../../assets/images/product/lebello-tubo-sofa-exposed.jpg'
import Image2 from '../../../assets/images/product/lebello-tubo-sofa-outdoor.jpg'
import Image3 from '../../../assets/images/product/lebello_tubo_sofa_outdoor.jpg'
import TransitionExpand from '@/components/TransitionExpand.vue';
import NavbarStatic from '@/components/frontend-components/NavbarStatic.vue';
import { filePath } from '@/helper/functions';

const SideMenu = defineAsyncComponent(() => import('@/components/frontend-components/Side-Menu.vue'))
const SwiperSlider = defineAsyncComponent(() => import('@/components/frontend-components/SwiperSlider.vue'))
const NavBar = defineAsyncComponent(() => import('@/components/frontend-components/Nav-bar.vue'))
const FooterSection = defineAsyncComponent(() => import('@/components/frontend-components/Footer-section.vue'))
const StoreAccordion = defineAsyncComponent(() => import('@/components/store-components/StoreAccordion.vue'))
const Breadcrumb = defineAsyncComponent(() => import('@/components/frontend-components/BreadcrumbSection.vue'))


const store = useStore();
const router = useRouter();
const isVisible = ref(false)
const isIframeVisible = ref(false);
const loading = ref(false)
const isExpanded = ref(false)
const productData = ref([])
const rightBoxImage = ref('')
const productTypes = ref([])
const isModalOpen = ref(false);
const imageRef = ref(null);
const modalStyle = ref({});
const hoveredSide = ref(null);
const activeImage = ref(null);
const activeIndex = ref(0);
const modalWidth = ref(0);
const modalHeight = ref(0);
const width = ref(0)
const height = ref(0)
const selectedConfig = ref(null)
const containerRef = ref(null)
const slug = ref(router.currentRoute.value?.params?.slug);
if (!slug.value) slug.value = 'pisa-dining-t';

const socialIcons = computed(() => [
  { name: 'Facebook', component: Facebook, props: { bgColor: "#333333", bgSize: "28px", svgSize: "15px", svgColor: "#ffffff", hoverBgColor: "#ce8d39", hoverSvgColor: "#000000", href: "https://www.facebook.com", title: "Facebook" } },
  { name: 'Houzz', component: Houzz, props: { bgColor: "#333333", bgSize: "28px", svgSize: "15px", svgColor: "#FFFFFF", hoverBgColor: "#ce8d39", hoverSvgColor: "#ffffff", href: "https://www.houzz.com", title: "Houzz Share" } },
  { name: 'Pinterest', component: Pinterest, props: { bgColor: "#333333", bgSize: "28px", svgSize: "15px", svgColor: "#ffffff", hoverBgColor: "#ce8d39", hoverSvgColor: "#ffffff", href: "https://pinterest.com", title: "Pinterest" } },
  { name: 'Instagram', component: Instagram, props: { bgColor: "#333333", bgSize: "28px", svgSize: "15px", svgColor: "#ffffff", hoverBgColor: "#ce8d39", hoverSvgColor: "#ffffff", href: "https://instagram.com", title: "Instagram" } },
]);

console.log("productData?.product_image_data?.[0]?.file_url",productData?.product_image_data?.[0]?.file_url);

const imageSrc = computed(() => {
  return productData.value?.product_image_data?.[0]?.file_url || '';
});

const imageAlt = computed(() => {
  return productData.value?.product_image_data?.[0]?.alternative_text || '';
});

const iframeSrc = computed(() => {
  return selectedConfig.value || '';
});

const updateDimensions = () => {
  if (imageRef.value) {
    width.value = imageRef.value.naturalWidth;
    height.value = imageRef.value.naturalHeight;
    adjustDimensions();
  }
};

const adjustDimensions = () => {
  if (containerRef.value) {
    const containerWidth = containerRef.value.offsetWidth;
    const aspectRatio = width.value / height.value;

    if (containerWidth < width.value) {
      width.value = containerWidth;
      height.value = containerWidth / aspectRatio;
    }
  }
};

const handleResize = () => {
  adjustDimensions();
};

onMounted(() => {
  nextTick(() => {
    updateDimensions();
  });
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

watch(selectedConfig, (newConfig) => {
  iframeSrc.value = newConfig;
});

const breadcrumbData = ref([
  {
    label: 'Collection',
    href: '#',
    isActive: false,
  },
  {
    label: `${productData.value?.name}`,
    href: '#',
    isActive: true,
  },
])
const handleProductDetailData = async () => {
  try {
    loading.value = true
    const res = await getProductDetail(slug.value)
    if (res.status === 200 && res.data.success) {
      productData.value = res.data.data.product_data[0];
      productTypes.value = res.data.data?.product_types;
      rightBoxImage.value = filePath(productData.value?.new_product_additional_right_box_image_url?.file_url)
      selectedConfig.value = productData.value?.product_url_for_three_d?.[0].config_url;
      console("product_url_for_three_d", productData.value?.product_url_for_three_d);
    } else {
      window.location.href = 'https://lebello.com/product/';
    }
  } catch (error) {
    console.error('Error fetching product details:', error)
  } finally {
    loading.value = false
    console.log('Product detail data fetch attempt complete')
  }
}


const imageData = computed(() => {
  return productData.value.new_product_slider_url?.map(item => ({
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

const adjustModalSize = () => {
  if (!imageRef.value) return;

  const img = imageRef.value;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const imageAspectRatio = img.naturalWidth / img.naturalHeight;

  let modalWidth, modalHeight;

  if (imageAspectRatio > screenWidth / screenHeight) {
    modalWidth = Math.min(img.naturalWidth, screenWidth * 0.9);
    modalHeight = modalWidth / imageAspectRatio;
  } else {
    modalHeight = Math.min(img.naturalHeight, screenHeight * 0.8);
    modalWidth = modalHeight * imageAspectRatio;
  }

  modalStyle.value = {
    width: `${modalWidth}px`,
    height: `${modalHeight}px`,
    maxWidth: '80vw',
    maxHeight: '80vh',
  };
};

const isSmallScreen = computed(() => {
  return window.innerWidth < 640;
});

const footerClasses = computed(() => {
  return {
    'flex flex-col space-y-4': isSmallScreen.value,
    'flex items-center justify-between': !isSmallScreen.value
  };
});

onMounted(() => {
  handleProductDetailData()
  window.addEventListener('resize', adjustModalSize);
})

onUnmounted(() => {
  window.removeEventListener('resize', adjustModalSize);
});
watch([() => isModalOpen, () => activeImage], () => {
  if (isModalOpen) {
    nextTick(() => {
      adjustModalSize();
    });
  }
});
const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}

const toggleIframe = () => {
  isIframeVisible.value = !isIframeVisible.value;
};

const openModal = (product, index) => {
  activeImage.value = product;
  activeIndex.value = index;
  isModalOpen.value = true;
  // Set initial modal size
  modalWidth.value = window.innerWidth * 0.9;
  modalHeight.value = window.innerHeight * 0.9;
  // Use nextTick to ensure the modal is rendered before adjusting size
  nextTick(() => {
    adjustModalSize();
  });
};

const closeModal = () => {
  isModalOpen.value = false;
  activeImage.value = null;
  activeIndex.value = 0;
};

const nextImage = () => {
  if (activeIndex.value < productData.value.gallery_urls.length - 1) {
    activeIndex.value++;
    activeImage.value = productData.value.gallery_urls[activeIndex.value];
    adjustModalSize();
  }
};

const prevImage = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
    activeImage.value = productData.value.gallery_urls[activeIndex.value];
    adjustModalSize();
  }
};
onUnmounted(() => {
  document.body.style.overflow = '';
});

// Watch for changes in the active image and adjust modal size
watch(rightBoxImage, (newVal) => {
  rightBoxImage.value = newVal
});
watch(isModalOpen, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : '';
});
watch(isModalOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
watch(productData, (newVal) => {
  breadcrumbData.value = [
    {
      label: 'Collection',
      href: '#',
      isActive: false,
    },
    {
      label: `${newVal?.title}`,
      href: '#',
      isActive: true,
    },
  ]
});
const products = ref([
  {
    image: Image1,
    altText: 'Tubo Sofa Exposed',
    title: 'Tubo Sofa Exposed'
  },
  {
    image: Image2,
    altText: 'Tubo Sofa Outdoor',
    title: 'Tubo Sofa Exposed'
  },
  {
    image: Image3,
    altText: 'Tubo Sofa Outdoor Alternative',
    title: 'Tubo Sofa Exposed'
  }
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');



.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Smooth width and height transition */
.modal.popup .bg-white {
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
}

body {
  font-family: 'GraphikRegular';
}

.product_banner {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.product_banner .slider_img img {
  height: 100vh;
  width: 100%;
  object-fit: cover;
}

.slider_text {
  padding: 0px 124px 60px;
  position: absolute;
  z-index: 999;
  bottom: 0;
  width: 100%;
}

.slider_text h1 {
  font-size: 45px;
  line-height: 49px;
  color: #ffffff;
  font-weight: 400;
  font-family: "Noto Serif", serif;
}

button.slider_arrow {
  position: absolute;
  z-index: 99999;
  top: 50%;
  transform: translate(0px, -50%);
}

button.slider_arrow.custom-next {
  right: 60px;
}

.slider_arrow.custom-prev {
  left: 60px;
}

.product_container {
  padding: 0px 124px;
}

.threed_inner_main {
  display: flex;
}

.threed_inner_main .threed_img {
  width: 100%;
  /* max-width: 1202px; */
  position: relative;
}

.threed_inner_main .threed_img iframe {
  width: 100%;
  /* height: 647px; */
}

.threed_inner_main .threed_cont {
  width: 100%;
  max-width: 718px;
  padding: 40px 90px 82px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.threed_inner_main .threed_cont h2 {
  font-size: 31px;
  line-height: 30px;
  color: #333333;
  font-family: 'GraphikMedium';
}

.threed_inner_main .threed_cont p {
  font-size: 16px;
  color: #000000;
  font-weight: 300;
  line-height: 24px;
  max-width: 240px;
  margin: 36px 0px 16px;
}

.threed_inner_main .threed_cont select {
  border-radius: 6px;
  border: 1px solid #cecece;
  font-size: 16px;
  color: #000000;
  padding: 10.5px 0px 12.5px 20px;
  background-image: url(/src/assets/images/product/select-arrow.svg);
  line-height: 25px;
  background-position: 95% 50%;
  background-size: 7% 20%;
  width: 100%;
  max-width: 340px;
}

.threed_btns {
  display: flex;
  column-gap: 34px;
}

.threed_btns a {
  border-radius: 13px;
  background-color: #ffffff;
  border: 1px solid #bcb3a6;
  font-size: 14px;
  color: #333333;
  font-weight: 300;
  padding: 5px 23px;
  text-transform: uppercase;
  transition: all 0.5s;
}

.threed_btns a.see_store_btn {
  background-color: #cc9933;
  border-color: #cc9933;
  color: #fff;
}

.threed_btns a.see_store_btn:hover {
  background-color: #ffffff;
  border: 1px solid #bcb3a6;
  color: #333333;
}

.threed_btns a:hover {
  background-color: #cc9933;
  border-color: #cc9933;
  color: #fff;
}

.text_img_inner_main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.product_inner_cont {
  padding: 80px 150px 0px 124px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.product_inner_cont h2 {
  font-size: 31px;
  line-height: 36px;
  color: #333333;
  font-family: 'GraphikMedium';
  margin-bottom: 34px;
}

.product_inner_cont p {
  font-size: 16px;
  line-height: 28px;
  color: #555555;
  font-weight: 300;
  font-family: 'GraphikLight';
}

.product_inner_cont button {
  font-size: 16px;
  line-height: 20px;
  color: #333333;
  font-weight: 600;
  display: flex;
  align-items: center;
  -moz-column-gap: 16px;
  column-gap: 16px;
  margin-top: 60px;
  margin-bottom: 44px;
}

.product_inner_cont button:hover {
  color: #cc9933;
}

.product_text_img {
  background-color: #eae6e1;
}

.materils_main_sec {
  background-color: #eae6e1;
  padding: 30px 0px 70px;
}

.close_btn_popup {
  position: absolute;
  top: -38px;
  z-index: 99999;
  right: -15px;
}

.close_btn_popup img {
  max-width: 20px;
}

.materils_cut_top ul {
  display: flex;
  align-items: center;
  column-gap: 130px;
}

.materils_cut_top ul li {
  font-size: 16px;
  line-height: 24px;
  color: #333333;
  font-family: 'GraphikMedium';
}

.materils_cut_top ul li a {
  border-bottom: 1px solid #7c7369;
}

.materils_cut_top ul li a:hover {
  border-bottom: 1px solid #cc9933;
}

.threed_inner_main .threed_cont p span {
  font-family: 'GraphikMedium';
}


.threed_inner_main .threed_img button {
  position: absolute;
  top: 16px;
  right: 14px;
  cursor: pointer;
}

.threed_inner_main .threed_img button img {
  max-width: 36px;
}

.text_img_inner_main .product_inner_img {
  /* background-image: url(/src/assets/images/product/lebello-tubo-sofa-exposed-feature.jpg); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 527px;
}

.product_new_gallery .product_img {
  max-height: initial !important;
  height: 280px;
  object-fit: cover !important;
}

.product_new_gallery {
  background: #fff !important;
}

.popup_inner {
  background: #c3c1beb5;
  padding: 0px 20px;
  z-index: 99999999999 !important;
}

.close_btn_popup {
  position: absolute;
  top: -38px;
  z-index: 99999;
  right: -15px;
}

.close_btn_popup img {
  max-width: 20px;
}


/* media css start */
@media (max-width: 1879px) {
  .slider_text {
    padding: 0px 94px 60px;
  }

  .product_container {
    padding: 0px 94px;
  }

  .threed_inner_main .threed_img iframe {
    /* height: 577px; */
  }

  .slider_arrow.custom-prev {
    left: 50px;
  }

  button.slider_arrow.custom-next {
    right: 50px;
  }

  .product_inner_cont {
    padding: 80px 90px 0px 94px;
  }

}

@media (max-width: 1699px) {
  .slider_text {
    padding: 0px 82px 45px;
  }

  .slider_arrow.custom-prev {
    left: 40px;
  }

  button.slider_arrow.custom-next {
    right: 40px;
  }

  .product_container {
    padding: 0px 82px;
  }

  .threed_inner_main .threed_cont {
    max-width: 618px;
    padding: 40px 60px 82px;
  }

  /* .threed_inner_main .threed_cont select {
    font-size: 18px;
    padding: 15.5px 102px 17.5px 20px;
  } */

  .product_inner_cont {
    padding: 80px 67px 0px 82px;
  }



  .materils_cut_top ul {
    column-gap: 100px;
  }




}

@media(max-width:1599px) {



  .threed_inner_main .threed_cont {
    max-width: 510px;
    padding: 30px 60px 72px;
  }

}

@media (max-width: 1399px) {

  .threed_inner_main .threed_cont {
    max-width: 480px;
    padding: 30px 60px 55px;
  }


  .product_new_gallery .product_img[data-v-0cdd39bd] {
    height: 220px;
  }

  /* .threed_inner_main .threed_cont select {
    font-size: 14px;
    padding: 8.5px 97px 11.5px 14px;
  } */

  /* .threed_btns a {
    font-size: 11px;
    padding: 1px 23px;
  } */

  .threed_inner_main .threed_img iframe {
    /* height: 533px; */
  }


  .product_inner_cont button svg {
    width: 21px;
  }
}

@media(max-width:1199px) {
  .slider_arrow.custom-prev {
    left: 20px;
  }

  button.slider_arrow.custom-next {
    right: 20px;
  }

  .slider_text {
    padding: 0px 52px 45px;
  }

  .threed_inner_main .threed_img button img {
    height: auto;
  }

  .product_inner_cont {
    padding: 60px 52px 0px 52px;
  }

  .product_inner_cont p {
    font-size: 14px;
    line-height: 24px;
  }

  .product_inner_cont button {
    margin-top: 40px;
    font-size: 13px;
  }

  .product_container {
    padding: 0px 52px;
  }

  .text_img_inner_main .product_inner_img {
    height: 430px;
  }

  .threed_inner_main .threed_img img {
    height: 360px;
    object-fit: cover;
    width: 100%;
  }

  .threed_inner_main .threed_cont h2 {
    font-size: 24px;
    line-height: 30px;
  }

  .threed_inner_main .threed_cont p {
    margin: 26px 0px 16px;
  }
}

@media(max-width:991px) {
  .slider_text {
    padding: 0px 32px 35px;
  }

  .threed_inner_main .threed_cont {
    max-width: 370px;
    padding: 20px 32px 35px;
  }

  .product_inner_cont {
    padding: 40px 32px 0px 32px;
  }

  .popup_gallery_cont button svg {
    width: 26px;
  }

  .threed_btns {
    column-gap: 18px;
  }

  .threed_btns a {
    padding: 5px 18px;
  }

  .product_container {
    padding: 0px 32px;
  }
}

@media(max-width:767px) {
  .threed_inner_main {
    flex-direction: column;
  }

  .slider_text h1 {
    font-size: 36px;
    line-height: 32px;
  }

  .threed_inner_main .threed_cont {
    max-width: 100%;
    padding: 50px 32px 50px;
    row-gap: 80px;
  }

  .text_img_inner_main {
    display: flex;
    flex-direction: column-reverse;
  }

  .text_img_inner_main .product_inner_img img {
    height: auto;
    -o-object-fit: cover;
    object-fit: cover;
  }

  .threed_inner_main .threed_img img {
    height: auto;
    -o-object-fit: cover;
    object-fit: cover;
  }

  .product_container {
    padding: 0px 32px;
  }

  .text_img_inner_main .product_inner_img {
    height: 290px;
  }

  .product_inner_cont button[data-v-0cdd39bd] {
    margin-bottom: 0px;
  }

}

@media(max-width:574px) {
  .breadcrem_text ul li {
    font-size: 15px;
  }

  .slider_text {
    padding: 0px 22px 35px;
  }

  .slider_text h1 {
    font-size: 30px;
    line-height: 20px;
  }

  .slider_arrow.custom-prev {
    left: 15px;
  }

  button.slider_arrow.custom-next {
    right: 15px;
  }

  .threed_inner_main .threed_cont {
    max-width: 100%;
    padding: 40px 22px 40px;
    row-gap: 60px;
  }

  .threed_inner_main .threed_cont h2 {
    font-size: 20px;
    line-height: 20px;
  }

  .threed_inner_main .threed_cont p {
    font-size: 15px;
    line-height: 21px;
    max-width: 220px;
    margin: 24px 0px 15px;
  }

  .threed_btns {
    column-gap: 16px;
  }

  .product_inner_cont {
    padding: 34px 22px 0px 22px;
  }

  .product_inner_cont h2 {
    margin-bottom: 18px;
    font-size: 24px;
  }

  .product_inner_cont button svg {
    width: 12px;
  }

  .product_inner_cont button {
    margin-top: 30px;
    font-size: 13px;
  }

  .materils_main_sec {
    padding: 40px 0px;
  }

  .product_container {
    padding: 0px 22px;
  }

  .materils_cut_top ul {
    column-gap: 40px;
  }

  .materils_cut_top ul li {
    font-size: 14px;
    line-height: 18px;
  }

  .popup_gallery_cont button svg {
    width: 18px;
  }

  button.slider_arrow.custom-next {
    right: 16px;
  }

  .slider_arrow.custom-prev {
    left: 16px;
  }

  .product_new_gallery .product_img {
    height: 130px !important;
  }
}
</style>