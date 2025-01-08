<template>
  <section class="product_banner">
    <div class="slider_main">
      <swiper
        :effect="fade"
        :navigation="{ prevEl: '.custom-prev', nextEl: '.custom-next' }"
        :modules="[Navigation]"
        class="mySwiper"
      >
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
  <section class="breadcrem_section">
    <div class="product_container">
      <div class="breadcrem_text">
        <ul>
          <li><a href="#">Collection Tubo Sofa Exposed</a></li>
          <li>/</li>
          <li><a href="#" class="active_link">Tubo Sofa Exposed</a></li>
        </ul>
      </div>
    </div>
  </section>
  <section class="three_d_section_main">
    <div class="threed_inner_main">
        <div class="threed_img">
    <img v-if="!isIframeVisible" src="../../../assets/images/product/lebello-3d-image.png" alt="" />
    <iframe
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
        <button @click="toggleVisibility">
          <span>INSPIRATIONAL SCENE</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-down"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      <div class="product_inner_img">
        <img src="../../../assets/images/product/lebello-tubo-sofa-exposed-feature.jpg" />
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
          <li><a href="#">DOWNLOAD CUT SHEET</a></li>
        </ul>
      </div>
      <StoreAccordion />
    </div>
  </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css/effect-fade'
import 'swiper/css'
import { Arrow } from '@/components/frontend-components/Svg/Icons'
import Image1 from '../../../assets/images/product/lebello-tubo-sofa-exposed.jpg'
import Image2 from '../../../assets/images/product/lebello-tubo-sofa-outdoor.jpg'
import Image3 from '../../../assets/images/product/lebello_tubo_sofa_outdoor.jpg'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { ref,defineAsyncComponent  } from 'vue'

const StoreAccordion = defineAsyncComponent(() =>
  import('@/components/store-components/StoreAccordion.vue')
)

const isVisible = ref(false) // Initially hidden
const isIframeVisible = ref(false);

const toggleVisibility = () => {
  isVisible.value = !isVisible.value // Toggle the visibility
}

const toggleIframe = () => {
  isIframeVisible.value = !isIframeVisible.value;
};

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
.breadcrem_text ul {
  display: flex;
  align-items: center;
  column-gap: 12px;
}
.breadcrem_text ul li {
  font-size: 24px;
  line-height: 27px;
  color: #000000;
}
.breadcrem_text ul li a.active_link {
  color: #cc9933;
}
.breadcrem_text ul li a {
  transition: all 0.5s;
}
.breadcrem_text ul li a:hover {
  color: #cc9933;
}
.breadcrem_section {
  padding: 38px 0px;
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
.faq_main_div {
  margin-top: 44px;
  border-top: 1px solid #7c7369;
}
.faq_main_div .faq_haed {
  display: flex;
  align-items: center;
  max-width: 574px;
  justify-content: space-between;
  font-size: 24px;
  line-height: 32px;
  color: #000000;
}
.faq_head_mian {
  border-bottom: 1px solid #7c7369;
  border-left: none;
  padding: 30px 0px;
}
.faq_main_div .faq_haed span {
  color: #000;
}
.faq_main_div .faq_haed svg {
  width: 20px;
  height: 20px;
}
.faq_main_div .faq_haed span.text-orange {
  color: rgb(217 140 58 / var(--tw-text-opacity, 1));
}
.inner_faq .faq_inner_cont {
  border-bottom: 1px solid #7c7369;
  border-left: none;
  padding: 30px 0px 30px 30px;
}
.inner_faq .faq_inner_cont .inner_faq_head {
  display: flex;
  align-items: center;
  max-width: 544px;
  justify-content: space-between;
  font-size: 24px;
  line-height: 32px;
  color: #000000;
  cursor: pointer;
  transition: all 0.5s;
}
.inner_faq .faq_inner_cont svg.icon {
  width: 20px;
  height: 20px;
  transform: rotate(-91deg);
}
.inner_faq .faq_inner_cont .inner_faq_head:hover {
  color: rgb(217 140 58 / var(--tw-text-opacity, 1));
}
h1.popup_title {
  font-size: 62px;
  line-height: 62px;
  color: #000000;
}
h1.popup_title {
  font-size: 62px;
  line-height: 62px;
  color: #000000;
}
.popup_select_box {
  margin-top: 34px;
  font-size: 20px;
  color: #000000;
  line-height: 30px;
  border-radius: 16px;
  padding: 9px 109px 9px 20px;
  margin-bottom: 42px;
  background-image: url(/src/assets/images/product/select-arrow.svg);
  background-position: 95% 50%;
  background-size: 12% 30%;
}
p.popup_desc {
  font-size: 24px;
  line-height: 46px;
  color: #000000;
  margin-top: 10px;
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
.popup_gallery_cont {
    max-width: 1471px;
    padding: 100px 240px 0px 100px;
}
.gallery_popup_main {
    background-color: #c3c1beb5;
}
.gallery_popup_imgs {
    padding-left: 90px;
}
.gallery_images_main {
    gap: 40px;
    margin-top: 0px;
}
.popup_gallery_cont button {
    margin-top: 10px;
}
.gallery_images_height {
    height: 50vh;
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
  .popup_gallery_cont {
    max-width: 1340px;
    padding: 80px 140px 0px 80px;
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
  .breadcrem_section {
    padding: 28px 0px;
  }
  .breadcrem_text ul li {
    font-size: 18px;
    line-height: 18px;
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
  .faq_head_mian {
    padding: 24px 0px;
  }
  .faq_main_div .faq_haed {
    font-size: 19px;
    line-height: 22px;
  }
  .inner_faq .faq_inner_cont {
    padding: 24px 0px 30px 24px;
  }
  .inner_faq .faq_inner_cont .inner_faq_head {
    font-size: 19px;
    line-height: 22px;
    max-width: 550px;
  }
  .popup_gallery_cont {
    max-width: 1230px;
    padding: 80px 157px 0px 80px;
}
h1.popup_title {
    font-size: 46px;
    line-height: 46px;
}
p.popup_desc {
    font-size: 21px;
    line-height: 40px;
}
}

@media(max-width:1599px){
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
    .popup_gallery_cont button {
        margin-top: 4px;
    }
    .popup_gallery_cont {
        max-width: 1130px;
        padding: 66px 148px 0px 60px;
    }
    .gallery_popup_imgs {
        padding-left: 80px;
    }
    p.popup_desc {
        font-size: 20px;
        line-height: 38px;
    }
    .gallery_images_main {
        gap: 25px;
    }
    .gallery_popup_imgs {
        padding-left: 60px;
    }
}

@media (max-width: 1399px) {
  .slider_text h1 {
    font-size: 40px;
    line-height: 40px;
  }
  .breadcrem_text ul li {
    font-size: 16px;
    line-height: 18px;
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
  .faq_main_div {
    margin-top: 28px;
  }
  .faq_main_div .faq_haed {
    font-size: 16px;
    line-height: 21px;
    max-width: 384px;
  }
  .faq_head_mian {
    padding: 19px 0px;
  }
  .faq_main_div .faq_haed svg {
    width: 16px;
    height: 16px;
  }
  .inner_faq .faq_inner_cont {
    padding: 19px 0px 19px 20px;
  }
  .inner_faq .faq_inner_cont svg.icon {
    width: 16px;
    height: 16px;
    transform: rotate(-91deg);
  }
  .inner_faq .faq_inner_cont .inner_faq_head {
    font-size: 16px;
    line-height: 21px;
    max-width: 365px;
  }
  .popup_gallery_cont {
    max-width: 982px;
    padding: 66px 130px 0px 60px;
}
h1.popup_title {
    font-size: 42px;
    line-height: 42px;
}
p.popup_desc {
    font-size: 16px;
    line-height: 31px;
}
.popup_select_box {
    margin-top: 24px;
    font-size: 14px;
    line-height: 26px;
    padding: 3px 46px 3px 16px;
    margin-bottom: 34px;
}
.popup_gallery_cont svg.icon {
    height: 22px;
}
.popup_gallery_cont button {
    margin-top: 12px;
}
.gallery_images_height {
    height: 60vh;
}
.popup_gallery_cont {
    max-width: 982px;
    padding: 66px 164px 0px 60px;
}
}
</style>
