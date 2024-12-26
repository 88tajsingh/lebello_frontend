<template>
    <div class="relative min-h-screen ">
        <div class="">
            <NavBar :absolute="true" :storePages='true' />
        </div>
        <!-- right logo -->
        <div class="absolute top-16 right-0">
            <img src="@/assets/logo/lebello-logo-right.png" alt="">
        </div>
        <!-- breadcrumbs -->
        <div>
            Home / <span class="text-[#c59233]">Tubo Sofa</span>
        </div>
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide first_slide_body">
                    <div class="slider_main_img">
                        <div class="relative aspect-square bg-gray-50 rounded-lg overflow-y-hidden">
                            <iframe :src="frame3d" allowfullscreen
                                style="position: absolute; top: 0px; left: 0px; height: 100%; width: 1px; min-width: 100%; width:100%;"
                                frameborder="0" scrolling="no"></iframe>
                            <div id="zoom-controls"
                                class="absolute right-4 top-2 flex flex-col items-center gap-4 z-[9999] text-yellow-600">
                                <!-- Fullscreen Icon -->
                                <button @click="toggleFullscreen" class="rounded-full p-2">
                                    <svg height="20px" width="20px" viewBox="0 0 512 512" fill="#000000">
                                        <polygon fill="#c2a02f"
                                            points="481.706,337.186 481.711,460.288 277.415,256 481.711,51.704 481.711,174.821 511.996,174.821 512,0 337.175,0 337.175,30.294 460.292,30.294 256,234.588 51.704,30.294 174.817,30.294 174.817,0 0,0 0.004,174.821 30.289,174.821 30.289,51.704 234.581,256 30.289,460.288 30.289,337.17 0.004,337.179 0,512 174.817,512 174.817,481.706 51.704,481.706 256,277.419 460.292,481.706 337.175,481.706 337.175,512 512,512 511.996,337.179" />
                                    </svg>
                                </button>

                                <div
                                    class="flex flex-col items-center bg-white rounded-full shadow-lg border border-yellow-600">
                                    <button @click="zoomIn" class="py-2 px-[5px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m-7-7h14" />
                                        </svg>
                                    </button>
                                    <div class="border-t border-yellow-600 w-full"></div>
                                    <button @click="zoomOut" class="py-2 px-[5px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                        </svg>
                                    </button>
                                </div>

                                <button @click="resetZoom" class="rounded-full p-2">
                                    <svg width="28px" height="28px" viewBox="0 0 1024 1024"
                                        xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                        <path fill="#c2a02f"
                                            d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="slider_main_img">
                        <img src="@/assets/lebello-tubo-sofa-outdoor.jpg" />
                    </div>
                </div>
            </div>

        </div>

        <!-- <div>
            <AccordionNew />
        </div> -->
    </div>

    <!-- <div class="flex flex-col absolute gap-5 left-5 top-[48vh]">
        <div id="custom-prev" class="btn-next"><i class="fa fa-angle-right " aria-hidden="true"></i></div>
        <div id="custom-next" class="btn-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>
        <div class="flex rotate-90">
            <div class="swiper-pagination"></div>
        </div>
    </div> -->

    <div class="custom-navigation">
        <div id="custom-prev" class="btn-prev"><i class="fa fa-angle-right " aria-hidden="true"></i></div>
        <div id="custom-next" class="btn-next"><i class="fa fa-angle-left" aria-hidden="true"></i></div>
    </div>
</template>
<script setup>
import NavBar from '@/components/frontend-components/Nav-bar.vue';
import AccordionNew from '@/components/frontend-components/AccordionNew.vue';
import Swiper from "swiper";
import frame3d from '@/assets/lebello/Stone Tables White Background.1/Stone Tables White Background.1.html';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { onMounted } from "vue";

onMounted(() => {
    new Swiper(".mySwiper", {
        modules: [Navigation, Pagination],
        navigation: {
            nextEl: '#custom-next', // Link to custom "Next" button
            prevEl: '#custom-prev', // Link to custom "Previous" button
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
});

function toggleFullscreen() {
    console.log("Fullscreen toggled!");
}

function zoomIn() {
    console.log("Zoom in!");
}

function zoomOut() {
    console.log("Zoom out!");
}

function resetZoom() {
    console.log("Zoom reset!");
}
</script>

<style scoped>
.custom-navigation .btn-prev,
.custom-navigation .btn-next {
    background-color: #000000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    width: fit-content;
}

.custom-navigation .btn-prev:hover,
.custom-navigation .btn-next:hover {
    background-color: #a7892f;
    
}
</style>