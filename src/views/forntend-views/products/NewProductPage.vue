<template>
  <section class="product_banner font-graphik">
    <div class="slider_main">
      <swiper :effect="fade" :navigation="{ prevEl: '.custom-prev', nextEl: '.custom-next' }" :modules="[Navigation]"
        class="mySwiper">
        <swiper-slide v-for="(product, index) in products" :key="index">
          <div class="product_slide">
            <div class="slider_img">
              <img :src="product.image" :alt="product.altText" />
            </div>
            <div class="slider_text">
              <h1>{{ product.title }}</h1>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <button class="slider_arrow custom-prev" aria-label="Previous">
        <Arrow size="23px" direction="right" :strokeWidth="26.8" fillColor="#ffffff" />
      </button>
      <button class="slider_arrow custom-next" aria-label="Next">
        <Arrow size="23px" direction="left" :strokeWidth="26.8" fillColor="#ffffff" />
      </button>
    </div>
  </section>
  <Breadcrumb :breadcrumbData="breadcrumbData" />
  <section class="three_d_section_main">
    <div class="threed_inner_main">
        <div class="threed_img">
    <img v-if="!isIframeVisible" src="../../../assets/images/product/lebello-3d-image.png" alt="" />
    <iframe class="w-full max-h-[546px] h-[546px]"
      v-if="isIframeVisible"
      src="http://172.105.152.65/lebello_products/Tubo%20Sofa%20Low_Conf_2/Tubo%20Sofa%20Low_Conf_2_Product_detail.html"
      allowfullscreen
      frameborder="0"
      scrolling="no"
    />
    <button v-if="!isIframeVisible" @click="toggleIframe">
      <img src="../../../assets/images/product/3D Icon.png" alt="" />
    </button>
  </div>
      <div class="threed_cont">
        <div class="product_top_cont">
          <h2 >3D CONFIGURATOR</h2>
          <p><span>Recomended Configuration</span> Please select the configuration</p>
          <select id="configuration">
            <option value="1">Configuration 1</option>
            <option value="2">Configuration 2</option>
            <option value="3">Configuration 3</option>
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
        <h2>Tubo Sofa Exposed</h2>
        <p>
          The modern Tubo sofa and club loungers features a soft curved and classical shapes with a
          simple elegant frame and large round cushions.Available in a range of technical fabrics
          Tubo features a cataphorese metal powder-coated frame. The design evokes a classical yet
          timeless feel with large tall privacy options and additional curved pillow options –
          suitable for both residential or commercial contracts with endless bespoke options. The
          Tubo sofa and loungers’ collection is designed by French designer Christophe Pillet. 100%
          Made in Italy.
        </p>
        </div>

        <button @click="isExpanded = !isExpanded" class="hover:text-orange">
          <span>INSPIRATIONAL SCENE </span>
          <Arrow class="mt-0 ml-3 self-center" :strokeWidth="20.8" size="16px" fillColor="currentColor" />
        </button>
      </div>
      <div class="product_inner_img">
        <!-- <img src="../../../assets/images/product/lebello-tubo-sofa-exposed-feature.jpg" /> -->
      </div>
    </div>
    <div v-if="isVisible" class="info_div_product">
      <p></p>
    </div>
  </section>
  <section class="product_text_img">
    <TransitionExpand :isExpanded="isExpanded">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div class="product-item p-0" v-for="(product, index) in productData?.gallery_urls" :key="index">
          <div class="product_img max-h-[250px] h-full overflow-hidden cursor-pointer"
            @click="openModal(product, index)">
            <img
              class="w-full h-full opacity-75 hover:opacity-100 object-cover transition-transform duration-700 ease-in-out transform hover:scale-125"
              :src="$filePath(product?.file_url)" :alt="product?.title" />
          </div>
        </div>
      </div>
    </TransitionExpand>
  </section>
  <Transition name="modal-fade">
    <section class="modal popup" v-if="isModalOpen">
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
        <div class="bg-white p-4 rounded shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
          <div class="relative w-full h-full" :style="{
            maxWidth: `${modalWidth} px`,
            maxHeight: '85vh',
            height: `${modalHeight}px`
          }">
            <!-- Navigation Buttons -->
            <button
              class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full transition-opacity duration-300 z-10"
              @click.stop="prevImage" aria-label="Previous image">
              <Arrow class="mt-0 ml-3 self-center" direction="right" :strokeWidth="20.8" size="22px"
                fillColor="#000000" />
            </button>
            <button
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full transition-opacity duration-300 z-10"
              @click.stop="nextImage" aria-label="Next image">
              <Arrow class="mt-0 ml-3 self-center" direction="left" :strokeWidth="20.8" size="22px"
                fillColor="#000000" />
            </button>

            <!-- Image Display -->
            <Transition name="fade" mode="out-in">
              <img :key="$filePath(activeImage?.file_url)" :src="$filePath(activeImage?.file_url)" :alt="activeImage?.title"
                class="w-full h-full object-contain" @load="adjustModalSize" />
            </Transition>
          </div>
          <div class="bg-gray-800 text-black p-4 flex items-center justify-between">
            <!-- Left Text -->
            <div class="text-sm">
              Circle XK Side T.
            </div>

            <!-- Right Actions -->
            <div class="flex items-center space-x-4">
              <!-- Download Button -->
              <a href="#" class="flex items-center text-blue-400 text-sm hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 16.5v3.75a.75.75 0 00.75.75h16.5a.75.75 0 00.75-.75V16.5M12 3v13.5M8.25 11.25l3.75 3.75 3.75-3.75" />
                </svg>
                Download
              </a>

              <!-- Social Media Icons -->
              <ul class="flex">
                <!-- Facebook -->
                <li>
                  <Facebook bgColor="#333333" bgSize="33px" svgSize="15px" svgColor="#ffffff"
                    boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)" title="Facebook" hoverBgColor="#ce8d39"
                    href="https://www.houzz.com" hoverSvgColor="#000000" />
                </li>
                <!-- Houzz -->
                <li>
                  <Houzz bgColor="#333333" bgSize="33px" svgSize="15px" svgColor="#FFFFFF" hoverBgColor="#ce8d39"
                    hoverSvgColor="#ffffff" href="https://www.houzz.com" title="Houzz Share" />
                </li>
                <!-- Pinterest -->
                <li>
                  <Pinterest bgColor="#333333" bgSize="33px" svgSize="15px" svgColor="#ffffff" hoverBgColor="#ce8d39"
                    hoverSvgColor="#ffffff" href="https://pinterest.com" title="Pinterest" />
                </li>
                <!-- Twitter -->
                <li>
                  <Instagram bgColor="#333333" bgSize="33px" svgSize="15px" svgColor="#ffffff" hoverBgColor="#ce8d39"
                    hoverSvgColor="#ffffff" href="https://instagram.com" title="Instagram" />
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
          <li><router-link to="#" class="hover:text-orange hover:border-orange">DOWNLOAD CUT SHEET</router-link></li>
        </ul>
      </div>
      <StoreAccordion />
    </div>
  </section>
</template>
<script setup>
import { ref, defineAsyncComponent, onMounted, onUnmounted,watch  } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import { Arrow, Facebook, Menu, Instagram, Houzz, Pinterest, } from '@/components/frontend-components/Svg/Icons';
import Image1 from '../../../assets/images/product/lebello-tubo-sofa-exposed.jpg'
import Image2 from '../../../assets/images/product/lebello-tubo-sofa-outdoor.jpg'
import Image3 from '../../../assets/images/product/lebello_tubo_sofa_outdoor.jpg'
import TransitionExpand from '@/components/TransitionExpand.vue';

import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import 'swiper/css'
const StoreAccordion = defineAsyncComponent(() =>
  import('@/components/store-components/StoreAccordion.vue')
)
const Breadcrumb = defineAsyncComponent(() => import('@/components/frontend-components/BreadcrumbSection.vue'))
const isExpanded = ref(false)
const isModalOpen = ref(false);
const activeImage = ref(null);
const activeIndex = ref(0);
const modalWidth = ref(0);
const modalHeight = ref(0);
const productData = ref(
 {gallery_urls: [
    {
        "id": 25,
        "file_url": "products/lebello_4l-arrow.jpg",
        "title": "lebello_4l-arrow.jpg",
        "alternative_text": null,
        "description": null
    },
    {
        "id": 26,
        "file_url": "products/lebello-4l_arrow.jpg",
        "title": "lebello-4l_arrow.jpg",
        "alternative_text": null,
        "description": null
    },
    {
        "id": 27,
        "file_url": "products/lebello-4l-arrow.jpg",
        "title": "lebello-4l-arrow.jpg",
        "alternative_text": null,
        "description": null
    },
    {
        "id": 32,
        "file_url": "products/lebello_4l-arrow-detailed.jpg",
        "title": "lebello_4l-arrow-detailed.jpg",
        "alternative_text": null,
        "description": null
    },
    {
        "id": 33,
        "file_url": "products/lebello_4l_arrowdetail.jpg",
        "title": "lebello_4l_arrowdetail.jpg",
        "alternative_text": null,
        "description": null
    }
]})
const breadcrumbData = ref([
  {
    label: 'Collection',
    href: '#',
    isActive: false,
  },
  {
    label: 'Tubo Sofa Exposed',
    href: '#',
    isActive: true,
  },
])

const isVisible = ref(false)
const isIframeVisible = ref(false);

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

const adjustModalSize = () => {
  if (activeImage.value) {
    const img = new Image();
    img.onload = () => {
      const maxWidth = Math.min(window.innerWidth * 0.9, img.width);
      const maxHeight = Math.min(window.innerHeight * 0.9, img.height);
      const aspectRatio = img.width / img.height;

      if (img.width / maxWidth > img.height / maxHeight) {
        modalWidth.value = maxWidth;
        modalHeight.value = Math.min(maxWidth / aspectRatio, maxHeight);
      } else {
        modalHeight.value = maxHeight;
        modalWidth.value = Math.min(maxHeight * aspectRatio, maxWidth);
      }
    };
    img.src = activeImage.value.file_url;
  }
};

const handleResize = () => {
  if (isModalOpen.value) {
    adjustModalSize();
  }
};
onUnmounted(() => {
  document.body.style.overflow = '';
});

// Watch for changes in the active image and adjust modal size
watch(activeImage, adjustModalSize);
watch(isModalOpen, (newVal) => {
  console.log('Modal state changed:', newVal);
  document.body.style.overflow = newVal ? 'hidden' : '';
});
// Lifecycle hooks for window resize event
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
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

<style>
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

body{
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
  max-width: 1202px;
  position: relative;
}

.threed_inner_main .threed_img iframe {
  width: 100%;
  height: 647px;
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
}

.product_text_img {
  background-color: #eae6e1;
}

.materils_main_sec {
  background-color: #eae6e1;
  padding: 50px 0px 70px;
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
  background-image: url(/src/assets/images/product/lebello-tubo-sofa-exposed-feature.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 500px;
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
    height: 577px;
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

  

  /* .threed_inner_main .threed_cont select {
    font-size: 14px;
    padding: 8.5px 97px 11.5px 14px;
  } */

  /* .threed_btns a {
    font-size: 11px;
    padding: 1px 23px;
  } */

  .threed_inner_main .threed_img iframe {
    height: 533px;
  }


  .product_inner_cont button svg {
    width: 21px;
  }
}

@media(max-width:1199px){
  .slider_arrow.custom-prev {
    left: 20px;
  }
  button.slider_arrow.custom-next {
    right: 20px;
  }
  .slider_text {
    padding: 0px 52px 45px;
  }
  .threed_inner_main .threed_img img {
    height: 350px;
    object-fit: cover;
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
}

@media(max-width:991px){
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
}

@media(max-width:767px){
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
}

@media(max-width:574px){
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

}
</style>
