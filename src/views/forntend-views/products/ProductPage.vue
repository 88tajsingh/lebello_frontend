<template>
  <div class="relative">
    <NavBar :absolute="false" background="red" />
    <img class="absolute top-8 right-0 mx-auto"
      src="/src/assets/logo/logohori.png" />
    <!-- side menu  -->
    <div class="relative">
      <div class="absolute top-44 right-0" ref="closeMenu" :class="{ 'w-0': isOpenSidebarSlider }">
        <div class="">
          <SideMenu menuClass="p-2 bg-[#9ce163]" svgSize="30px" svgColor="white"
            openClass="w-[230px] absolute z-50 top-0 right-0 " closeClass="w-[230px] absolute z-50 top-0 right-[-250px]"
            height="">
            <div class="z-50">
              <div class="flex border border-[#33333357] items-center">
                <span class="sticky top-3 p-4 border-r  mr-2 border-[#33333357] bg-transparent">
                  <Menu size="15px" fillColor="#000000" />
                </span>
                <div class="h-auto">
                  <h3 class="text-[14px] font-medium">
                    <a href="https://www.lebello.com/listItem/"
                      class="uppercase text-graphikMedium text-[14px] text-textColorBlack">Collection 2024</a>
                  </h3>
                </div>
              </div>
              <div class="px-4">
                <form  @submit.prevent="handleSearch" role="search">
                <div class="relative border-b border-[#33333357] mt-2">
                  <input
                    @keydown.enter="handleSearch"
                    v-model="search"
                    class="w-full py-[1px] font-graphikLight text-[13px] px-0 border-none bg-transparent focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="Search"
                  />
                  <div class="absolute right-2 top-1 flex items-center">
                    <Search size="22px" fillColor="#000000" />
                  </div>
                </div>
              </form>
                <div class="h-auto mb-2 border-y border-[#33333357] py-2 border-b border-gray-400">
                  <h3 class="text-[14px]">
                    <a href="https://www.lebello.com/listItem/"
                      class="uppercase font-graphikMedium text-[14px] text-textColorBlack">Collection 2024</a>
                  </h3>
                </div>
                <ul class="font-graphikLight text-[13px] my-1 text-textColorBlack overflow-auto max-h-52 ">
                  <PerfectScrollbar class="max-h-52">
                    <li class="mt-1" v-for="(listItem, index) in products.product_series_data" :key="index">
                      <a @click="handelProductSeriesNavigation(listItem)" class="hover:text-orange">{{ listItem?.name
                        }}</a>

                    </li>
                  </PerfectScrollbar>
                </ul>
                <div class="border-t border-[#33333357] my-3">
                  <ul class="flex mt-2 ">
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
                      <Pinterest bgColor="#333333" bgSize="33px" svgSize="15px" svgColor="#ffffff"
                        hoverBgColor="#ce8d39" hoverSvgColor="#ffffff" href="https://pinterest.com" title="Pinterest" />
                    </li>
                    <!-- Twitter -->
                    <li>
                      <Instagram bgColor="#333333" bgSize="33px" svgSize="15px" svgColor="#ffffff"
                        hoverBgColor="#ce8d39" hoverSvgColor="#ffffff" href="https://instagram.com" title="Instagram" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </SideMenu>
        </div>
      </div>
    </div>
    <!-- main page  -->
    <div class="py-5 mx-7 md:mx-20">
      <div class="py-10 ">
        <div class="uppercase font-graphik mb-3 text-[24px] text-[#3d3d3d]">2024 OUTDOOR FURNITURE</div>
        <p class="font-graphikLight font-light text-[17px] text-textColorBlack">
          Lebello is an exclusive outdoor furniture manufacturer of innovative outdoor designs for home residential and
          commercial hospitality projects. The lebello range offers, sofas, tables, lounger and various timeless outdoor
          furnishings. </p>
        <div class="flex mt-2">
          <span class="font-graphikLight self-center mr-2 text-[13px] text-Black666 uppercase">Sort By</span>
          <div class="group relative cursor-pointer">
            <div :class="{ 'bg-[#000000CC]': dropdownHoverColor }"
              class="flex items-center justify-between hover:bg-[#000000CC] text-[13px] pr-6 bg-gray-100 text-[#4dc45c]">
              <a class="menu-hover font-graphik uppercase text-green mx-2 py-1">Product Type</a>
              <Arrow size="12px" strokeWidth="22.5" initialRotation="left" />
            </div>
            <div @mouseenter="dropdownHoverColor = true" @mouseleave="dropdownHoverColor = false"
              class="invisible absolute bg-[#000000CC] z-50 flex w-full flex-col text-gray-800 shadow-xl group-hover:visible">
              <a v-for="link in products.product_types" :key="link.url" @click="handleProductType(link)"
                class="block border-b text-[12px] border-[#000000AA] py-1 px-2 font-graphikLight text-white hover:text-green">
                {{ link?.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <div v-for="(product, index) in products?.product_series_data || []" :key="product.id"
          class="prod_content overflow-hidden pb-6 hover:bg-[#efefef]" @mouseenter="toggleOverlay(index, true)"
          @mouseleave="toggleOverlay(index, false)">
          <div class="relative overflow-hidden h-full max-h-[190px]">
            <a :href="product?.link">
              <img @click="handelProductSeriesNavigation(product)"
                class="opacity-60 transition-transform duration-700 ease-in-out transform hover:scale-110 hover:opacity-100 h-full w-full "
                ref="element" :data-aos="animationType" :src="$filePath(product?.featured_image_data?.file_url)"
                :alt="product?.name" />
            </a>
            <div class="prod-overlay" :class="{ 'show-overlay': isHovered[index] }">
              <div class="overlay-content">
                <h1 class="hover:text-green text-[13px] font-graphik">{{ product?.name }}</h1>
              </div>
            </div>
          </div>
          <p v-for="(prod, index) in product.products" @click="handelProductDetailNavigation(prod)"
            class="pl-5 pt-1 cursor-pointer text-[#3d3d3d] font-graphikLight text-[13px]">{{ prod?.title }}</p>
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
import { Arrow, Menu, Facebook, Twitter,Search, Houzz, Pinterest, Instagram } from "@/components/frontend-components/Svg/Icons";
import LogoSection from "@/components/frontend-components/Logo-section.vue";
import SideMenu from '@/components/frontend-components/Side-Menu.vue';
import { ref, onMounted } from "vue";
import { onClickOutside } from '@vueuse/core'
import { getProductList } from "@/helper/frontendHelpers";
import { useRouter } from 'vue-router';

const router = useRouter();
const isHovered = ref([]);
const toggleOverlay = (index, show) => { isHovered.value[index] = show; };
const dropdownHoverColor = ref(false);
const closeMenu = ref(null);
const products = ref([]);
const isOpenSidebarSlider = ref(false);
const search = ref('');


const closeSideMenu = () => { isOpenSidebarSlider.value = false; };
onClickOutside(closeMenu, closeSideMenu);
const handleSideMenu = () => { isOpenSidebarSlider.value = true; };

const handleProductsData = async () => {
  const { status, data } = await getProductList();
  if (status === 200 && data.success) {
    products.value = data.data;
  }
}

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  handleProductsData();
});

const handelProductSeriesNavigation = (prod) => {
  // window.location.href = prod.link;
  sessionStorage.setItem('Product_series', prod.id);
  router.push({ name: 'product_series', params: { slug: prod.slug } });
}

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

const handelProductDetailNavigation = (prod) => {
  // window.location.href = prod.link;
  sessionStorage.setItem('productDetail', prod.id);
  router.push({ name: 'productDetail', params: { slug: prod.slug } });
}
const handleProductType = (productType) => {
  // window.location.href = prod.link;
  sessionStorage.setItem('Product_Type', productType.id);
  router.push({ name: 'product_type', params: { slug: productType.slug } });
}

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