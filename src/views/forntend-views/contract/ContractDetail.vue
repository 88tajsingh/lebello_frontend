<template>
  <NavBar :absolute="false" />
  <div class="overflow-x-hidden md:mx-10 pb-10">
    <div
      class="`overflow-x-hidden mx-5  grid grid-cols-1 ${contractDesignData.contract_design !== 'New Contract Design' ? 'lg:grid-cols-5' : 'lg:grid-cols-12'}`">
      <div class="col-span-12 lg:col-span-4 container pt-7">
        <div class="flex">
          <h1 class="uppercase font-graphik text-[20px]">
            {{ contractDesignData?.contract_type_data?.length > 0 ?
              contractDesignData.contract_type_data[0].contract_name
              : 'No Contract Name' }}
          </h1>
        </div>
        <BreadcrumbSection :breadcrumbData="breadcrumbData" seprate="/" />
      </div>
      <!-- image view -->
      <div
        class="['col-span-12','container', 'pb-10', contractDesignData.contract_design !== 'New Contract Design' ? 'col-span-12' : 'lg:col-span-4']">
        <div class="bg-[#f7f7f7]" @click="toggleModal">
          <div id=" carouselExampleControls" class="relative " data-twe-carousel-init data-twe-ride="carousel">
            <!--Carousel items-->
            <div class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
              <!--First item-->

              <div v-for="(item, index) in contractDesignData?.gallery_urls" :key="index" :class="[
                'relative',
                'float-left',
                '-mr-[100%]',
                'w-full',
                'transition-transform',
                'duration-[600ms]',
                'ease-in-out',
                'motion-reduce:transition-none',

              ]">
                <img :src="$filePath(contractDesignData?.featured_image_data?.file_url)"
                  class="block  lg:h-full lg:w-full " :alt="item?.alt" />
              </div>
            </div>
            <div class=" absolute bottom-2 left-6 md:left-10 md:bottom-10 lg:bottom-14 lg:left-10">
              <p class="  md:text-[20px] lg:text-2xl sm:py-1 px-2 capitalize mb-1 sm:mb-3"
                :style="{ color: contractDesignData?.contract_title_color, background: contractDesignData?.contract_background_title }">

                {{ contractDesignData?.title }}</p>
              <span class="text-[11px] md:text-[16px] lg:text-1xl py-1 sm:py-2 px-3 capitalize mx-auto"
                :style="{ color: contractDesignData?.contract_location_color, background: contractDesignData?.contract_location_background }">
                {{ contractDesignData?.contract_location_data && contractDesignData.contract_location_data.length > 0 ?
                  contractDesignData.contract_location_data[0].contract_location : 'Default Location' }}
              </span>

            </div>
            <!--Carousel controls - prev item-->
            <button
              class="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
              type="button" @click="prevSlide">
              <span class="inline-block h-8 w-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </span>
              <span
                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
            </button>
            <!--Carousel controls - next item-->
            <button
              class="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
              type="button" @click="nextSlide">
              <span class="inline-block h-8 w-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </span>
              <span
                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
            </button>
          </div>
          <!-- thumbnil -->
          <div class="flex justify-between">
            <div class="m-2 flex">
              <div v-for="(item, index) in contractDesignData?.gallery_urls" :key="index">
                <img @click="handleClickOpen(index)" :src="$filePath(item?.file_url)"
                  class="block w-24 h-24 p-1 opacity-50 hover:opacity-100" :alt="item?.alt" />
              </div>
            </div>
            <div class="m-2">
              <img class="w-24 h-24" :src="$filePath(contractDesignData?.contract_logo_data?.file_url)" />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 my-2 items-center">
          <h3 class="text-[23px] font-graphikLight text-green">
            {{ contractDesignData?.contract_type_data?.length > 0 ?
              contractDesignData.contract_type_data[0].contract_name
              : 'No Contract Name' }}
          </h3>
          <div class="flex sm:gap-1 wrap md:justify-end">
            <div class="flex flex-col-reverse md:flex-row my-3">
              <div class="flex ">
                <a href="mailto:?subject=Parc 55 Hotel&amp;body=https://lebello.com/contract_design/parc-55-hotel/"
                  title="Parc 55 Hotel" class="flex items-center ">
                  <img src="https://lebello.com/wp-content/themes/lebello-ep/images/mailto.gif" alt="mail to"
                    class="mx-1 ">
                  <span class="text-blue font-graphik text-[14px] hover:text-[#23527C]">Email</span> </a>
                <a href="javascript:window.print()" class="flex items-center"><img
                    src="https://lebello.com/wp-content/themes/lebello-ep/images/print.gif" class="mx-2" alt="print">
                  <span class="hover:text-[#23527C] text-blue font-graphik text-[14px]">Print</span></a>
              </div>
              <div>
                <ul class="flex justify-center mb-3 md:mb-0 md:ml-2 ">
                  <li>
                    <a href="https://www.facebook.com/share.php?u=https://lebello.com/products/b-chair-1-2/&title=B Chair"
                      target="_blank" title="Facebook"
                      class="flex  items-center bg-[#DDDDDD]  justify-center w-9 h-9 bg-gray-300 rounded-full mx-1 hover:bg-green-500">
                      <svg width="17px" height="17px" viewBox="-5 0 20 20" version="1.1"
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
                                  id="facebook-[#fcfcfc]"> </path>
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
                      class="flex items-center bg-[#DDDDDD]  justify-center w-9 h-9 bg-gray-300 rounded-full mx-1">
                      <svg fill="#ffffff" width="17px" height="17px" viewBox="-5 0 24 24"
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
                      class="flex items-center bg-[#DDDDDD] justify-center w-9 h-9 bg-gray-300 rounded-full mx-1">
                      <svg width="17px" height="17px" viewBox="0 0 20 20" version="1.1"
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
                      class="flex items-center bg-[#DDDDDD]  justify-center w-9 h-9 bg-gray-300 rounded-full mx-1">
                      <img class="w-[17px] h-[17px]"
                        src="https://lebello.com/wp-content/themes/lebello-ep/images/Lebello-twitterx-icon.svg"
                        alt="Social Icon" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
        <p class="text-[14px] font-graphik text-[#666666] pb-6 mb-6 border-b">
          {{ contractDesignData?.description }}
        </p>
        <div class="grid  grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 text-[20px] text-green font-graphikLight">
          <div>
            <p>Designer</p>
            <p class="text-Black666 text-[14px] py-1 md:py-0">{{ contractDesignData?.contract_info_designer }}</p>
          </div>
          <div>
            <p>Client</p>
            <p class="text-Black666 text-[14px] py-1 md:py-0">{{ contractDesignData?.contract_info_client }}</p>
          </div>
          <div>
            <p>Product Featured:</p>
            <p class="text-[14px] py-1 md:py-0 cursor-pointer text-blue"
              v-for="product in contractDesignData?.feature_products_data" :key="product.id">
              <span
                @click.prevent="() => { store.dispatch('setCurrentId', product.id); router.push({ name: 'ProductDetail', params: { slug: product.slug } }); }">{{
                  product.name }}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- listing right -->
      <div v-if="contractDesignData.contract_design !== 'New Contract Design'" class="hidden lg:block pl-4 min-w-52">
        <div v-for="(item, key) in contractDesignSidebar" :key="key" class="border-0 rounded-lg">
          <h2 :id="'heading' + key" class="mb-0">
            <button @click="toggleAccordion(key)" :aria-expanded="activeIndex === key" :aria-controls="'collapse' + key"
              class="group relative flex w-full items-center hover:text-orange border-0 px-5 py-2 text-left transition hover:z-[2] focus:z-[3] focus:outline-none"
              :class="{ 'text-primary dark:bg-surface-dark dark:text-primary': activeIndex === key }" type="button">
              {{ key }}
              <span class="-me-1 ms-auto h-5 w-5 transition-transform duration-200 ease-in-out"
                :class="{ 'rotate-0': activeIndex !== key, 'rotate-[-180deg]': activeIndex === key }">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="10px" height="10px" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </button>
          </h2>

          <div :id="'collapse' + key" v-show="activeIndex === key" class="pl-7 py-0" :aria-labelledby="'heading' + key"
            data-twe-collapse-item data-twe-parent="#accordionExample">

            <div v-if="item">
              <ul>
                    <!-- Overview -->
                    <li v-if="item.overview">
                      <a @click.prevent="handleClick(item.overview)"
                        class="font-graphikLight text-[13px] cursor-pointer">{{
                        item.overview.title }}</a>
                    </li>
                    <!-- Location -->
                    <template v-if="Array.isArray(item)">
                      <li v-for="(sub, itemIndex) in item" :key="itemIndex">
                        <a @click.prevent="handleClick(sub)" class="font-graphikLight text-[13px] cursor-pointer">{{
                          sub.contract_location || sub.title }}</a>
                      </li>
                    </template>
                    <!-- Contract designs -->
                    <template v-else-if="item.designs">
                      <li v-for="(sub, itemIndex) in item.designs" :key="itemIndex">
                        <a @click.prevent="handleClick(sub)" class="font-graphikLight text-[13px] cursor-pointer">{{
                          sub.title }}</a>
                      </li>
                    </template>
                  </ul>
            </div>
          </div>
        </div>

      </div>
      <div v-else ref="closeMenu" class="absolute border mt-24 right-0 ">
        <SideMenu :handleSideMenu="handleSideMenu" :isOpen="isOpenSidebar" svgColor="#f9f9f9"
          menuClass="p-2 bg-[#9ce163]">
          <div class="flex border border-gray-400 items-center">
            <div class="sticky top-3 p-4 border-r border-gray-400">
              <MenuSvg size="15px" fillColor="black" />
            </div>
            <h3 class="text-[14px] font-medium">
              <a href="https://www.lebello.com/product/" class="uppercase">Collection 2024</a>
            </h3>
          </div>

          <div class="text-black">
            <div v-for="(item, key) in contractDesignSidebar" :key="key" class="border-0 rounded-lg">
              <h2 :id="'heading' + key" class="mb-0">
                <button @click="toggleAccordion(key)" :aria-expanded="activeIndex === key"
                  :aria-controls="'collapse' + key"
                  class="group relative flex w-full items-center hover:text-orange border-0 px-5 py-2 text-left transition hover:z-[2] focus:z-[3] focus:outline-none"
                  :class="{ 'text-primary dark:bg-surface-dark dark:text-primary': activeIndex === key }" type="button">
                  {{ key }}
                  <span class="-me-1 ms-auto h-5 w-5 transition-transform duration-200 ease-in-out"
                    :class="{ 'rotate-0': activeIndex !== key, 'rotate-[-180deg]': activeIndex === key }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="10px" height="10px" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>
              </h2>
              <div :id="'collapse' + key" v-show="activeIndex === key" class="pl-7 py-0"
                :aria-labelledby="'heading' + key" data-twe-collapse-item data-twe-parent="#accordionExample">
                <div v-if="item">
                  <ul>
                    <!-- Overview -->
                    <li v-if="item.overview">
                      <a @click.prevent="handleClick(item.overview)"
                        class="font-graphikLight text-[13px] cursor-pointer">{{
                        item.overview.title }}</a>
                    </li>
                    <!-- Location -->
                    <template v-if="Array.isArray(item)">
                      <li v-for="(sub, itemIndex) in item" :key="itemIndex">
                        <a @click.prevent="handleClick(sub)" class="font-graphikLight text-[13px] cursor-pointer">{{
                          sub.contract_location || sub.title }}</a>
                      </li>
                    </template>
                    <!-- Contract designs -->
                    <template v-else-if="item.designs">
                      <li v-for="(sub, itemIndex) in item.designs" :key="itemIndex">
                        <a @click.prevent="handleClick(sub)" class="font-graphikLight text-[13px] cursor-pointer">{{
                          sub.title }}</a>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </SideMenu>
      </div>
    </div>
    <div>
      <div v-show="isModalOpen"
        class="overflow-y-auto overflow-x-hidden fixed top-0 ml-auto z-50 justify-center items-center w-full max-h-full">
        <div class="justify-center items-center m-auto relative p-4 w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative top-0 bg-white rounded-lg shadow ease-in duration-300">
            <div class="bg-[#f7f7f7] p-3">
              <div id="carouselExampleControls" class="relative" data-twe-carousel-init data-twe-ride="carousel">
                <!--Carousel items-->
                <div class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                  <!--First item-->
                  <div v-for="(item, index) in contractDesignData?.gallery_urls" :key="index" :class="[
                    'relative',
                    'float-left',
                    '-mr-[100%]',
                    'w-full',
                    'object-cover',
                    'transition-transform',
                    'duration-[600ms]',
                    'ease-in-out',
                    'motion-reduce:transition-none',
                    { hidden: index !== modalactiveIndex },
                  ]">

                    <img :src="$filePath(item?.file_url)" :class="''"
                      class="block  object-cover fadeimg ease-in  max-w-800 max-h-300 overflow-y-hidden transition-max-height duration-700 linear"
                      :alt="item.alt" />

                    <div class="flex justify-between text-[#595b55]">
                      <p class="mt-1 pr-4 text-sm">{{ item?.alt }}</p>
                      <p class="mt-1 text-sm">
                        image {{ index + 1 }} of {{ contractDesignData?.gallery_urls?.length }}
                        <span><img @click="toggleModal"
                            src="https://lebello.com/wp-content/themes/lebello-ep/images/chocolat/close2.gif" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <!--Carousel controls - prev item-->
                <!-- v-if="!modalactiveIndex <= 0" -->
                <button v-if="!modalactiveIndex <= 0"
                  class="absolute left-0 top-0 z-[1] flex w-[50%] items-center m-auto pb-20 h-[90%] align-center transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] text-white hover:text-white hover:opacity-90 focus:text-white"
                  type="button" @click="prevSlide">
                  <span class="inline-block h-8 w-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5"
                      stroke="currentColor" class="h-24 w-24">
                      <!-- Increased height and width by 40px -->
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </span>
                  <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
                </button>
                <!--Carousel controls - next item-->
                <button v-if="modalactiveIndex < contractDesignData?.gallery_urls?.length - 1"
                  class="absolute bottom-10 right-0 top-0 z-[1] flex w-[50%] justify-right content-right self-right pt-10 pl-auto h-[80%] align-center transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] text-white hover:text-white hover:opacity-90 focus:text-white"
                  type="button" @click="nextSlide">
                  <span class="inline-block self-center pb-10 ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5"
                      stroke="currentColor" class="h-24 w-24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </span>
                  <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterSection />

</template>

<script setup>
import NavBar from "@/components/frontend-components/Nav-bar.vue";
import FooterSection from "@/components/frontend-components/Footer-section.vue";
import BreadcrumbSection from "@/components/frontend-components/BreadcrumbSection.vue";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import MenuSvg from "@/components/frontend-components/Svg/Menu-Svg.vue";
import { onClickOutside } from "@vueuse/core";
import { getContractDesign } from "@/helper/frontendHelpers";
import { useRouter } from "vue-router";
import SideMenu from "@/components/frontend-components/Side-Menu.vue";

const store = useStore();
const router = useRouter();
const contractDesignSidebar = ref([]);
const contractDesignData = ref([]);
const breadcrumbData = ref([]);
const loading = ref(true);
const id = sessionStorage.getItem('contract_design_id');

const handleContractDesignData = async () => {
  const { status, data } = await getContractDesign(id);
  if (status === 200 && data.success) {
    contractDesignSidebar.value = data.data.contract_design_sidebar;
    contractDesignData.value = data.data.contract_desing[0];
  } else {
    console.log("error");
    contractDesignData.value = [];
  }
};

const isOpenSidebar = ref(false);
const closeMenu = ref(null);
const handleSideMenu = () => {
  isOpenSidebar.value = !isOpenSidebar.value;
};

const closeSideMenu = () => {
  isOpenSidebar.value = false;
};
onClickOutside(closeMenu, closeSideMenu);

const handleClick = (sub) => {
  let route;
  if (sub.title === 'overview' || sub.title === 'Overview') {
    route = { name: 'contractType', params: { slug: sub.slug } };
  } else if (sub.title) {
    route = { name: 'contractDesign', params: { slug: sub.slug } };
  } else {
    route = { name: 'ContractLocation', params: { slug: sub.slug } };
  }
  console.log("sub.title", sub.title);
  if (sub.title === 'overview' || sub.title === 'Overview') {
    sessionStorage.setItem('contract_type_id', sub.id);
  } else if (sub.title) {
    sessionStorage.setItem('contract_design_id', sub.id);
  } else {
    sessionStorage.setItem('contract_location_id', sub.id);
  }

  router.push(route);
};

onMounted(() => {
  handleContractDesignData();
});

const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

watch(
  () => contractDesignData.value,
  () => {

    breadcrumbData.value = [
      { name: 'Contract Design', link: '/contract_designs' },
      {
        name: contractDesignData.value?.contract_type_data?.[0]?.contract_name ,
        link: `/contract_type`,
        contractTypeId: contractDesignData.value?.contract_type_data?.[0]?.id
      },
      {
        name: contractDesignData.value?.title || 'Default Title',
        link: `/contract_design/${contractDesignData.value?.slug || 'default-slug'}`
      }
    ];
  }
);

const activeIndex = ref(0);
const modalactiveIndex = ref(0);

const nextSlide = () => {
  modalactiveIndex.value = (modalactiveIndex.value + 1) % contractDesignData?.value?.gallery_urls?.length;
};

const prevSlide = () => {
  modalactiveIndex.value =
    (modalactiveIndex.value - 1 + contractDesignData?.value?.gallery_urls?.length) %
    contractDesignData?.value?.gallery_urls?.length;
};

const isModalOpen = ref(false);

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const openSections = ref({});

const toggle = (key) => {
  Object.keys(openSections.value).forEach((k) => {
    openSections.value[k] = false;
  });
  openSections.value[key] = true;
};

const isOpen = (key) => {
  return openSections.value[key];
};

const beforeEnter = async (el) => {
  loading.value = true;
  el.style.height = '0';
  el.style.overflow = 'hidden';
  await handleContractDesignData();
  loading.value = false;
};

const enter = (el) => {
  el.offsetHeight; // Trigger reflow
  el.style.height = `${el.scrollHeight}px`;
};

const leave = (el) => {
  el.style.height = `${el.scrollHeight}px`;
  el.offsetHeight; // Trigger reflow
  el.style.height = '0';
};
</script>


<style scoped>
.expand-fade-enter-active,
.expand-fade-leave-active {
  transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.expand-fade-enter,
.expand-fade-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.expand-fade-enter-to,
.expand-fade-leave {
  max-height: 500px;
  /* Adjust this value to the maximum expected height */
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}

.fadeimg {
  animation: fadeInAnimation ease 5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;


}

@keyframes fadeInAnimation {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
