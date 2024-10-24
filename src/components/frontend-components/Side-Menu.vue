<template>
  <div class="">
    <v-card :class="{ 'w-[230px] z-50 right-0': isOpen, 'w-[230px] z-50 right-[-250px]': !isOpen }"
      class="sidenav bg-[#ededed] pb-2 z-50 absolute top-7  transition-all duration-1000 ease-in-out">
      <!-- <div class="z-50">
        <div v-if="mainSlider" class="h-auto mb-2 mx-7 mt-4">
          <h3 class="text-[14px]">
            <a href="https://www.lebello.com/listItem/"
              class="uppercase font-graphikMedium text-[14px] text-textColorBlack">Collection 2024</a>
          </h3>
        </div>
        <div v-else class="flex border border-gray-400 items-center">
          <span class="sticky top-3 p-4 border-r mr-4 border-gray-400 bg-transparent">
            <MenuSvg size="15px" fillColor="black" />
          </span>
          <div class="h-auto">
            <h3 class="text-[14px] font-medium">
              <a href="https://www.lebello.com/listItem/"
                class="uppercase text-graphikMedium text-[14px] text-textColorBlack">Collection 2024</a>
            </h3>
          </div>
        </div>
        <div class="px-7">
          <div class="search">
            <form role="search">
              <div v-if="showDropDown">
                <FormDropdown />
              </div>
              <div class="relative border-b border-gray-400 mt-2">
                <input
                  class="appearance-none mt-2 border-none bg-transparent hover:border-gray-400 w-full py-[1px] pl-0 text-[14px] font-graphikLight ring-0 focus:outline-none focus:ring-0 focus:border-0"
                  id="username" type="text" placeholder="Search" />
                <div class="absolute right-2 inset-y-0 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-3 text-gray-400 hover:text-gray-500"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" transform="scale(-1, 1)">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </form>
          </div>
          <div v-if="showHeading" class="mb-2">
            <h3 class="py-4 font-graphik hover:text-orange border-b border-gray-400 text-[14px] text-textColorBlack">
              Highlights
            </h3>
          </div>
          <ul class="font-graphikLight text-[13px] my-1 text-textColorBlack overflow-auto max-h-52 ">
            <PerfectScrollbar class="max-h-52">
              <li class="mt-1" v-for="(listItem, index) in list" :key="index">
                <a :href="listItem?.link" class="hover:text-orange">{{ listItem?.name }}</a>
              </li>
            </PerfectScrollbar>
          </ul>
          <div v-if="downDropdown" class="mb-2">
            <FormDropdown />
          </div>
          <div v-if="showMediaIcon" class="border-t border-gray-400 my-3">
            <ul class="flex justify-center mt-3">
              <li>
                <a href="https://www.facebook.com/share.php?u=https://lebello.com/products/b-chair-1-2/&title=B Chair"
                  target="_blank" title="Facebook"
                  class="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full mx-2 hover:bg-green-500">
                  <svg width="14px" height="14px" viewBox="-5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fcfcfc" stroke="#fcfcfc">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Dribbble-Light-Preview" transform="translate(-385.000000, -7399.000000)" fill="#ffffff">
                          <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path
                              d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z"
                              id="facebook-[#fcfcfc]"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.houzz.com/imageClipperUpload?link=https://lebello.com/products/b-chair-1-2/&source=button&hzid=8628&imageUrl=https://lebello.com/wp-content/uploads/2019/12/b-chair-slider-gallery.jpg&title=B Chair&ref=https://lebello.com/products/b-chair-1-2/"
                  target="_blank" title="Houzz"
                  class="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full mx-2">
                  <svg fill="#ffffff" width="14px" height="14px" viewBox="-5 0 24 24" xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="m6.926 15.991 6.927-3.991v7.995l-6.927 4.005zm-6.926-3.991v7.995l6.926-4.005zm6.926-12v7.995l-6.926 4.005v-7.995zm0 7.995 6.926-3.991v7.996z">
                      </path>
                    </g>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://pinterest.com/pin/create/bookmarklet/?media=https://lebello.com/wp-content/uploads/2019/12/b-chair-slider-gallery.jpg&url=https://lebello.com/products/b-chair-1-2/&is_video=false&description=B Chair"
                  target="_blank" title="Pinterest"
                  class="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full mx-2">
                  <svg width="16px" height="16px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" fill="#f5f5f5" stroke="#f5f5f5">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>pinterest [#180]</title>
                      <desc>Created with Sketch.</desc>
                      <defs> </defs>
                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Dribbble-Light-Preview" transform="translate(-220.000000, -7399.000000)" fill="#ffffff">
                          <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path
                              d="M173.876,7239 C168.399,7239 164,7243.43481 164,7248.95866 C164,7253.05869 166.407,7256.48916 169.893,7258.07936 C169.893,7256.21186 169.88,7256.45286 171.303,7250.38046 C170.521,7248.80236 171.129,7246.19673 172.88,7246.19673 C175.31,7246.19673 173.659,7249.79964 173.378,7251.2174 C173.129,7252.30544 173.959,7253.14238 174.955,7253.14238 C176.864,7253.14238 178.108,7250.71524 178.108,7247.87063 C178.108,7245.69456 176.615,7244.10437 174.042,7244.10437 C169.467,7244.10437 168.307,7249.19966 169.893,7250.79893 C170.292,7251.40294 169.893,7251.43118 169.893,7252.22174 C169.616,7253.05768 167.403,7251.84259 167.403,7248.70757 C167.403,7245.86195 169.727,7242.51518 174.457,7242.51518 C178.191,7242.51518 180.681,7245.27609 180.681,7248.2054 C180.681,7252.13805 178.523,7254.98366 175.37,7254.98366 C174.291,7254.98366 173.295,7254.3978 172.963,7253.72824 C172.36,7256.07371 172.238,7257.26258 171.303,7258.58153 C172.216,7258.83261 173.129,7259 174.125,7259 C179.602,7259 184,7254.56519 184,7249.04235 C183.752,7243.43481 179.353,7239 173.876,7239"
                              id="pinterest-[#180]"> </path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/intent/tweet?status=Discover Lebello - B Chair+https://lebello.com/products/b-chair-1-2/"
                  target="_blank" title="Twitter" class="flex items-center justify-center w-8 h-8 rounded-full mx-2">
                  <svg fill="#000000" height="31px" width="31px" version="1.1" id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="-143 145 512 512" xml:space="preserve">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <path
                          d="M113,446c24.8,0,45.1-20.2,45.1-45.1c0-9.8-3.2-18.9-8.5-26.3c-8.2-11.3-21.5-18.8-36.5-18.8s-28.3,7.4-36.5,18.8 c-5.3,7.4-8.5,16.5-8.5,26.3C68,425.8,88.2,446,113,446z">
                        </path>
                        <polygon points="211.4,345.9 211.4,308.1 211.4,302.5 205.8,302.5 168,302.6 168.2,346 ">
                        </polygon>
                        <path
                          d="M183,401c0,38.6-31.4,70-70,70c-38.6,0-70-31.4-70-70c0-9.3,1.9-18.2,5.2-26.3H10v104.8C10,493,21,504,34.5,504h157 c13.5,0,24.5-11,24.5-24.5V374.7h-38.2C181.2,382.8,183,391.7,183,401z">
                        </path>
                        <path
                          d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M241,374.7v104.8 c0,27.3-22.2,49.5-49.5,49.5h-157C7.2,529-15,506.8-15,479.5V374.7v-52.3c0-27.3,22.2-49.5,49.5-49.5h157 c27.3,0,49.5,22.2,49.5,49.5V374.7z">
                        </path>
                      </g>
                    </g>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> -->
      <slot></slot>
    </v-card>
    <span v-if="!isOpen" @click="handleSideMenu" class="text-9xl bg-transparent sticky top-5">
      <MenuSvg :size="svgSize" :fillColor="svgColor" />
    </span>
  </div>
</template>

<script setup>
import MenuSvg from "./Svg/Menu-Svg.vue";
// import { VCard } from 'vuetify/lib';
import FormDropdown from "./Form-components/Form-Dropdown.vue";
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/style.css';

const {
  handleSideMenu,
  list,
  isOpen,
  showHeading = true,
  mainSlider = false,
  downDropdown = false,
  dropdown,
  svgColor,
  svgSize = '30px',
  showMediaIcon = true,
  showDropDown = false,
} = defineProps([
  "handleSideMenu",
  "dropdown",
  "showMediaIcon",
  "list",
  "showHeading",
  "downDropdown",
  "showDropDown",
  "isOpen",
  "mainSlider",
  "svgSize",
  "svgColor",
]);
</script>
