<template>
<section class="product_banner">
    <div class="slider_main">
        <swiper :effect="fade" :navigation="{prevEl: '.custom-prev',
        nextEl: '.custom-next'}" :modules="[Navigation]" class="mySwiper">
            <swiper-slide>
                <div class="product_slide">
                    <div class="slider_img">
                        <img src="../../../assets/images/product/lebello-tubo-sofa-exposed.jpg" alt="">
                    </div>
                    <div class="slider_text">
                        <h1>Tubo Sofa Exposed</h1>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="product_slide">
                    <div class="slider_img">
                        <img src="../../../assets/images/product/lebello-tubo-sofa-outdoor.jpg" alt="">
                    </div>
                    <div class="slider_text">
                        <h1>Tubo Sofa Exposed</h1>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="product_slide">
                    <div class="slider_img">
                        <img src="../../../assets/images/product/lebello_tubo_sofa_outdoor.jpg" alt="">
                    </div>
                    <div class="slider_text">
                        <h1>Tubo Sofa Exposed</h1>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
        <button class="slider_arrow custom-prev" aria-label="Previous">
            <span><img src="../../../assets/images/product/swiper-left.svg"></span>
        </button>
        <button class="slider_arrow custom-next" aria-label="Next">
            <span><img src="../../../assets/images/product/swiper-right.svg"></span>
        </button>
    </div>
</section>
<section class="breadcrem_section">
    <div class="product_container">
        <div class="breadcrem_text">
            <ul>
                <li><a href="#">Collection    Tubo Sofa Exposed</a></li>
                <li>/</li>
                <li><a href="#" class="active_link">Tubo Sofa Exposed</a></li>
            </ul>
        </div>
    </div>
</section>
<section class="three_d_section_main">
    <div class="threed_inner_main">
        <div class="threed_img">
            <iframe src="http://172.105.152.65/lebello_products/Tubo%20Sofa%20Low_Conf_2/Tubo%20Sofa%20Low_Conf_2_Product_detail.html" allowFullScreen frameborder="0" scrolling="no" />
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
            <p>The modern Tubo sofa and club loungers features a soft curved and classical shapes with a simple elegant frame and large round cushions.Available in a range of technical fabrics Tubo features a cataphorese metal powder-coated frame. The design evokes a classical yet timeless feel with large tall privacy options and additional curved pillow options – suitable for both residential or commercial contracts with endless bespoke options. The Tubo sofa and loungers’ collection is designed by French designer Christophe Pillet. 100% Made in Italy.</p>
            <button @click="toggleVisibility">
                <span>INSPIRATIONAL SCENE</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
        </div>
        <div class="product_inner_img">
            <img src="../../../assets/images/product/lebello-tubo-sofa-exposed-feature.jpg">
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
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css/effect-fade';
  import 'swiper/css';
  import StoreAccordion from '@/components/store-components/StoreAccordion.vue'

import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

import { ref } from 'vue'

const isVisible = ref(false)  // Initially hidden

const toggleVisibility = () => {
  isVisible.value = !isVisible.value  // Toggle the visibility
}
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
    font-family: "PT Serif";
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
    grid-template-columns: repeat(2,1fr);
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
</style>