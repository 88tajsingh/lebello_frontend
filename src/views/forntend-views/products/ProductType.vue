<template>
  <div class="relative ">
    <NavBar :absolute="false" background="red" />
    <img class="absolute top-8 right-0 mx-auto"
      src="https://lebello.com/wp-content/themes/lebello-ep/images/logo2.png" />

    <div class="relative">
      <div class="absolute top-44 right-0" ref="closeMenu" :class="{ 'w-0': isOpenSidebarSlider }">
        <div class="bg-[#7bd923] p-3">
          <SideMenu key="firstKey" :list="[]" :handleSideMenu="handleSideMenu" :isOpen="isOpenSidebarSlider"
            :mainSlider="mainSlider" :showDropDown="showDropDown" :showHeading="true" :downDropdown="downDropdown"
            :showMediaIcon="true" svgSize="14px" svgColor="white">
            <div class="z-50">
              <div class="flex border border-[#33333357] items-center">
                <span class="sticky top-3 p-4 border-r  mr-2 border-[#33333357] bg-transparent">
                  <MenuSvg size="15px" fillColor="#000000" />
                </span>
                <div class="h-auto">
                  <h3 class="text-[14px] font-medium">
                    <a href="https://www.lebello.com/listItem/"
                      class="uppercase text-graphikMedium text-[14px] text-textColorBlack">Collection 2024</a>
                  </h3>
                </div>
              </div>
              <div class="px-4">
                <div class="search">
                  <form role="search">
                    <div class="border ">
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
                <div class="h-auto mb-2 border-y border-[#33333357] py-2 border-b border-gray-400">
                  <h3 class="text-[14px]">
                    <a href="https://www.lebello.com/listItem/"
                      class="uppercase font-graphikMedium text-[14px] text-textColorBlack">Collection 2024</a>
                  </h3>
                </div>
                <ul class="font-graphikLight text-[13px] my-1 text-textColorBlack overflow-auto max-h-52 ">
                  <PerfectScrollbar class="max-h-52">
                    <li class="mt-1" v-for="(listItem, index) in []" :key="index">
                      <a :href="listItem?.link" class="hover:text-orange">{{ listItem?.name }}</a>

                    </li>
                  </PerfectScrollbar>
                </ul>
                <div class="border-t border-[#33333357] my-3">
                  <ul class="flex justify-center mt-3">
                    <li>
                      <a href="https://www.facebook.com/share.php?u=https://lebello.com/products/b-chair-1-2/&title=B Chair"
                        target="_blank" title="Facebook"
                        class="flex bg-black items-center justify-center w-8 h-8 bg-gray-900 rounded-full mx-2 hover:bg-green-500">
                        <svg width="14px" height="14px" viewBox="-5 0 20 20" version="1.1"
                          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fcfcfc"
                          stroke="#fcfcfc">
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                              <g id="Dribbble-Light-Preview" transform="translate(-385.000000, -7399.000000)"
                                fill="#ffffff">
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
                        class="flex bg-black items-center justify-center w-8 h-8 bg-gray-900 rounded-full mx-2">
                        <svg fill="#ffffff" width="14px" height="14px" viewBox="-5 0 24 24"
                          xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
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
                        class="flex bg-black items-center justify-center w-8 h-8 bg-gray-900 rounded-full mx-2">
                        <svg width="16px" height="16px" viewBox="0 0 20 20" version="1.1"
                          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#f5f5f5"
                          stroke="#f5f5f5">
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <title>pinterest [#180]</title>
                            <desc>Created with Sketch.</desc>
                            <defs> </defs>
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                              <g id="Dribbble-Light-Preview" transform="translate(-220.000000, -7399.000000)"
                                fill="#ffffff">
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
                        target="_blank" title="Twitter"
                        class="flex items-center justify-center w-8 h-8 rounded-full mx-2">
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
            </div>
          </SideMenu>
        </div>
      </div>
    </div>

    <div class="py-5 mx-7 md:mx-20">
      <div class="py-10 ">
        <div class="uppercase font-graphik mb-3 text-[24px] text-[#3d3d3d]">{{ productType.title }}</div>
        <p class="font-graphikLight text-[17px] text-textColorBlack">
          Lebello is an exclusive outdoor furniture manufacturer of innovative outdoor designs for home residential and
          commercial hospitality projects. The lebello range offers sofas, tables, loungers, and various timeless
          outdoor furnishings.
        </p>

        <div class="flex mt-2">
          <span class="font-graphikLight self-center  text-[13px] text-Black666 uppercase">Sort By</span>
          <div class="group relative cursor-pointer">
            <div
              class="flex  items-center justify-between  hover:bg-[#000000CC]  text-[13px] pr-6 bg-gray-100 text-[#4dc45c]"
              :class="{
                'bg-[#000000CC]': dropdownHoverColor,
                'bg-[#f8f8f8]': !dropdownHoverColor
              }">
              <a class="menu-hover font-graphik uppercase text-green mx-2 py-1">Product Type</a>
              <ArrowSvg size="8px" initialRotation="left" :fillColor="arrowFillColor2" />
            </div>
            <div @mouseenter="dropdownHoverColor = true" @mouseleave="dropdownHoverColor = false"
              class="invisible absolute bg-[#000000CC] z-50 flex w-full flex-col text-gray-800 shadow-xl group-hover:visible">
              <a v-for="link in links" :key="link.url" :href="link.url"
                class="block border-b text-[12px] border-[#000000AA] py-1 px-2 font-graphikLight text-white hover:text-green">
                {{ link.name }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="(product, index) in productType.products" :key="product.id"
          class="prod_content overflow-hidden mt-6 hover:bg-[#efefef]" @mouseenter="toggleOverlay(index, true)"
          @mouseleave="toggleOverlay(index, false)">
          <div class="relative overflow-hidden">
            <a @click="handleProductDetailNavigation(product)">
              <img
                class="opacity-60 transition-transform duration-700 ease-in-out transform hover:scale-105 hover:opacity-100"
                ref="element" :data-aos="animationType" :src="$filePath(product?.featured_image_data?.file_url)" :alt="product?.title" />
            </a>
            <div class="prod-overlay" :class="{ 'show-overlay': isHovered[index] }">
              <div class="overlay-content">
                <h1 class="hover:text-green text-[13px] font-graphik">{{ product?.title }}</h1>
              </div>
            </div>
          </div>
          <p class="pl-5 mt-3 pb-4 text-[#3d3d3d] font-graphikLight text-[13px]">{{ product.title }}</p>
        </div>
      </div>
    </div>

    <LogoSection />
    <FooterSection />
  </div>
</template>

<script setup>
import NavBar from "@/components/frontend-components/Nav-bar.vue";
import FooterSection from "@/components/frontend-components/Footer-section.vue";
import MenuSvg from "@/components/frontend-components/Svg/Menu-Svg.vue";
import LogoSection from "@/components/frontend-components/Logo-section.vue";
import SideMenu from '@/components/frontend-components/Side-Menu.vue';
import { ref, watch, onMounted } from "vue";
import ArrowSvg from "@/components/frontend-components/Svg/Arrow-Svg.vue";
import { onClickOutside } from '@vueuse/core'
import { useRouter } from "vue-router";
import { getProductTypeList } from "@/helper/frontendHelpers";

const router = useRouter();
const isHovered = ref([]);
const toggleOverlay = (index, show) => { isHovered.value[index] = show; };
const dropdownHoverColor = ref(false);
const closeMenu = ref(null);
const isOpenSidebarSlider = ref(false);
const id = ref(sessionStorage.getItem('Product_Type'));
const productType = ref([]);

const closeSideMenu = () => { isOpenSidebarSlider.value = false; };
onClickOutside(closeMenu, closeSideMenu);
const handleSideMenu = () => { isOpenSidebarSlider.value = true; };
console.log("Product_Type id", id.value);

const handleProductTypeData = async () => {
  const { status, data } = await getProductTypeList(id.value);
  if (status === 200 && data.success) {
    console.log("data", data);
    productType.value = data.data.product_types[0];
    // productType.value = data.data.product_types;
    // productsSidebar.value = data.data.product_series_sidebar;
  }
}

const handleProductDetailNavigation = (product) => {
  sessionStorage.setItem('productDetail', product.id);
  router.push({ name: 'productDetail', params: { slug: product.slug } });
}
onMounted(() => {
  handleProductTypeData();
});
const products = [
  { id: 1, name: "Sandbar Jax Bch | Springhill Suites By Marriott", location: "Jacksonville Beach, FL", link: "https://lebello.com/contract_design/springhill-suites/", image: "http://lebello.com/wp-content/uploads/thumbs/SpringhillSuites-JacksonvilleFL-350X234.png" },
  { id: 2, name: "Watt Plaza", location: "Los Angeles, CA", link: "https://lebello.com/contract_design/watt-plaza/", image: "http://lebello.com/wp-content/uploads/thumbs/watt-plaza-350X234.png" },
  { id: 3, name: "Ebbdunedin", location: "EBB Bunded In, New Zealand", link: "https://lebello.com/contract_design/ebbdunedin/", image: "http://lebello.com/wp-content/uploads/thumbs/lebello-ebbdunedin-350X234.png" },
];

const links = [
  { name: "Modular / Sofas", url: "https://lebello.com/product_type/modularsofas/" },
  { name: "Lounge Poufs", url: "https://lebello.com/product_type/lounge-poufs/" },
  { name: "Daybed", url: "https://lebello.com/product_type/daybed/" },
  { name: "Outdoor Carpets", url: "https://lebello.com/product_type/outdoor-carpets/" },
  { name: "Lounge Chairs", url: "https://lebello.com/product_type/lounge-chairs/" },
];

</script>

<style scoped>
.prod-overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.prod-overlay.show-overlay {
  opacity: 1;
}

.overlay-content {
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  color: white;
  background-color: #0e0e0e89;
  padding: 10px;
}
</style>