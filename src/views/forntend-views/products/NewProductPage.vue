<template>
  <div class="relative overflow-hidden ">
       <NavBar :absolute="true" :navColor="'#000000'" :extraClass="['px-16']" navBackgroundColor="hover:bg-[#ffffff] bg-opacity-5"
       hovrednavColor="#000000" />
  <section class="product_banner">
    <SwiperSlider :images="imageData" imageKeyName="gallery">
        <template #utility>
          <!-- lebellow icon right top -->
          <a href="#" class="absolute z-50 top-11 right-0 mx-auto">
            <img src="/src/assets/logo/lebello-logo-right.png" />
          </a>
          <!-- text left bottom -->
          <span class="slider_text left-0">
            <h1> {{ productData?.title }} </h1>
          </span>
        </template>
      </SwiperSlider>
      <div class="absolute top-48 right-0">
        <SideMenu openClass="w-[230px] absolute z-50 right-0" closeClass="w-[230px] z-50 absolute right-[-250px]"
          height="" :closeSidebar="closeSidebar">
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
  </section>
  </div>
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
          <h2>3D CONFIGURATOR</h2>
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
        <h2>{{ productData?.title }}</h2>
        <p v-html="productData?.description"></p>
        <button @click="toggleVisibility">
          <span>INSPIRATIONAL SCENE</span>
          <Arrow class="mt-0 ml-3 self-center" size="16px" fillColor="currentColor" />
        </button>
      </div>
      <div class="product_inner_img">
        {{ productData?.new_product_additional_right_box_image_url?.alternative_text }}
        <img :src="$filePath(productData?.new_product_additional_right_box_image_url.file_url)" :alt="productData?.new_product_additional_right_box_image_url?.alternative_text || 'lebello'" />
      </div>
    </div>
    <div v-if="isVisible" class="info_div_product">
      <p></p>
    </div>
  </section>
  <section class="materils_main_sec">
    <div class="product_container">
      <div class="materils_cut_top">
        <ul>
          <li>MATERIALS</li>
          <li> <a class="uppercase" target="_blank" blank
              :href="$filePath(productData?.downloadable_files_url && productData?.downloadable_files_url[0]?.file_url)">Download
              Cut Sheet</a></li>
        </ul>
      </div>
      <StoreAccordion :accordionData="productData?.material_swatche_data" />
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
import SwiperSlider from '@/components/frontend-components/SwiperSlider.vue'
import { getProductDetail } from '@/helper/frontendHelpers'
import { useRouter } from 'vue-router';
import { Arrow } from '@/components/frontend-components/Svg/Icons'
import Image1 from '../../../assets/images/product/lebello-tubo-sofa-exposed.jpg'
import Image2 from '../../../assets/images/product/lebello-tubo-sofa-outdoor.jpg'
import Image3 from '../../../assets/images/product/lebello_tubo_sofa_outdoor.jpg'
import NavBar from '@/components/frontend-components/Nav-bar.vue';
const SideMenu = defineAsyncComponent(() => import('@/components/frontend-components/Side-Menu.vue'))

const StoreAccordion = defineAsyncComponent(() =>
  import('@/components/store-components/StoreAccordion.vue')
)
const Breadcrumb = defineAsyncComponent(() => import('@/components/frontend-components/BreadcrumbSection.vue'))

const breadcrumbData = ref([
  {
    label: 'Collection Tubo Sofa Exposed',
    href: '#',
    isActive: false,
  },
  {
    label: 'Tubo Sofa Exposed',
    href: '#',
    isActive: true,
  },
])
const router = useRouter();
const isVisible = ref(false)
const productData = ref([])
const productTypes = ref([])
const loading = ref(true)
const isIframeVisible = ref(false);
const slug = ref(router.currentRoute.value?.params?.slug);
if (!slug.value) slug.value = '4l-pixie-arms-chair';
const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}

const toggleIframe = () => {
  isIframeVisible.value = !isIframeVisible.value;
};

const handleProductDetailData = async () => {
  try {
    loading.value = true
    const res = await getProductDetail(slug.value)
    if (res.status === 200 && res.data.success) {
      productData.value = res.data.data.product_data[0];
      productTypes.value = res.data.data?.product_types;

      console.log('productData', productData.value)
      console.log('productTypes', productTypes.value)
    } else {
      router.push('/products')
    }
  } catch (error) {
    console.error('Error fetching product details:', error)
    // router.push('/error') // Redirect to an error page or handle it accordingly
  } finally {
    loading.value = false
    console.log('Product detail data fetch attempt complete')
  }
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

onMounted(() => {
  handleProductDetailData()
})

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

<style  scoped>
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
  font-size: 60px;
  line-height: 74px;
  color: #ffffff;
  font-weight: 400;
  font-family: 'PT Serif';
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
  font-weight: 600;
}

.threed_inner_main .threed_cont p {
  font-size: 24px;
  color: #000000;
  font-weight: 300;
  line-height: 34px;
  max-width: 340px;
  margin: 50px 0px 16px;
}

.threed_inner_main .threed_cont select {
  border-radius: 6px;
  border: 1px solid #cecece;
  font-size: 21px;
  color: #000000;
  padding: 20.5px 147px 21.5px 20px;
  background-image: url(/src/assets/images/product/select-arrow.svg);
  line-height: 25px;
  background-position: 95% 50%;
  background-size: 7% 20%;
}

.threed_btns {
  display: flex;
  column-gap: 34px;
}

.threed_btns a {
  border-radius: 13px;
  background-color: #ffffff;
  border: 1px solid #bcb3a6;
  font-size: 15px;
  color: #333333;
  font-weight: 300;
  padding: 7px 35px;
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
  align-items: center;
}

.text_img_inner_main .product_inner_img {
  display: flex;
  justify-content: flex-end;
}

.product_inner_cont {
  padding: 64px 150px 56px 124px;
}

.product_inner_cont h2 {
  font-size: 40px;
  line-height: 46px;
  color: #333333;
  font-weight: 300;
  margin-bottom: 60px;
}

.product_inner_cont p {
  font-size: 24px;
  line-height: 39px;
  color: #555555;
  font-weight: 300;
}

.product_inner_cont button {
  font-size: 20px;
  line-height: 20px;
  color: #333333;
  font-weight: 600;
  display: flex;
  align-items: center;
  column-gap: 16px;
  margin-top: 96px;
}

.product_text_img {
  background-color: #eae6e1;
}

.materils_main_sec {
  background-color: #eae6e1;
  padding: 70px 0px;
}

.materils_cut_top ul {
  display: flex;
  align-items: center;
  column-gap: 130px;
}

.materils_cut_top ul li {
  font-size: 24px;
  line-height: 24px;
  color: #333333;
  font-weight: 600;
}

.materils_cut_top ul li a {
  border-bottom: 1px solid #7c7369;
}

.threed_inner_main .threed_cont p span {
  font-weight: 600;
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
    padding: 44px 90px 46px 94px;
  }

  .product_inner_cont button {
    margin-top: 76px;
  }

  .product_inner_cont h2 {
    font-size: 40px;
    margin-bottom: 40px;
  }

  .product_inner_cont p {
    max-width: 666px;
  }

}

@media (max-width: 1699px) {
  .slider_text {
    padding: 0px 82px 45px;
  }

  .slider_text h1 {
    font-size: 50px;
    line-height: 50px;
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

  .threed_inner_main .threed_cont h2 {
    font-size: 26px;
  }

  .threed_inner_main .threed_cont p {
    font-size: 19px;
    line-height: 28px;
    max-width: 300px;
    margin: 40px 0px 16px;
  }

  .threed_inner_main .threed_cont select {
    font-size: 18px;
    padding: 15.5px 102px 17.5px 20px;
  }

  .product_inner_cont h2 {
    font-size: 36px;
    margin-bottom: 30px;
  }

  .product_inner_cont p {
    max-width: 586px;
    font-size: 21px;
    line-height: 35px;
  }

  .product_inner_cont button {
    margin-top: 56px;
    font-size: 18px;
  }

  .product_inner_cont {
    padding: 40px 82px 40px 82px;
  }

  .materils_cut_top ul li {
    font-size: 18px;
    line-height: 24px;
    color: #333333;
    font-weight: 600;
  }

  .materils_cut_top ul {
    column-gap: 100px;
  }

  .materils_cut_top ul li {
    font-size: 16px;
    line-height: 24px;
  }

}

@media(max-width:1599px) {
  .product_inner_cont p {
    max-width: 506px;
    font-size: 18px;
    line-height: 30px;
  }

  .product_inner_cont button {
    margin-top: 44px;
  }

  .threed_inner_main .threed_cont {
    max-width: 510px;
    padding: 30px 60px 72px;
  }

}

@media (max-width: 1399px) {
  .slider_text h1 {
    font-size: 40px;
    line-height: 40px;
  }

  .threed_inner_main .threed_cont {
    max-width: 480px;
    padding: 30px 60px 55px;
  }

  .threed_inner_main .threed_cont h2 {
    font-size: 21px;
    line-height: 21px;
  }

  .threed_inner_main .threed_cont p {
    font-size: 16px;
    line-height: 21px;
    max-width: 250px;
    margin: 40px 0px 16px;
  }

  .threed_inner_main .threed_cont select {
    font-size: 14px;
    padding: 8.5px 97px 11.5px 14px;
  }

  .threed_btns a {
    font-size: 11px;
    padding: 1px 23px;
  }

  .threed_inner_main .threed_img iframe {
    height: 533px;
  }

  .product_inner_cont p {
    max-width: 456px;
    font-size: 16px;
    line-height: 26px;
  }

  .product_inner_cont h2 {
    font-size: 26px;
    margin-bottom: 30px;
    line-height: 26px;
  }

  .product_inner_cont button {
    margin-top: 50px;
    font-size: 13px;
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
    padding: 40px 52px 40px 52px;
}
.product_inner_cont h2 {
    margin-bottom: 24px;
}
.product_inner_cont p {
    max-width: 390px;
    font-size: 14px;
    line-height: 24px;
}
.product_inner_cont button {
    margin-top: 40px;
    font-size: 13px;
}
.text_img_inner_main .product_inner_img img {
    height: 420px;
    object-fit: cover;
}
.product_container {
    padding: 0px 52px;
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
    padding: 34px 32px 30px 32px;
}
.text_img_inner_main {
    align-items: flex-start;
}
.popup_gallery_cont button svg {
    width: 26px;
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
}

@media(max-width:574px){
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
