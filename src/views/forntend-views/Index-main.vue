<template>
  <div class=" overflow-x-hidden">
    <!-- v-if="sliderImages.length > 0"  -->
    <MainSlider 
  :sidebarList="sidebarList" 
  :sliderImages="sliderImages" 
  :mainSlider="true" 
  :showDropDown="false" 
  :showHeading="true" 
  :downDropdown="false" 
/>
    <CollectionVideoc />
    <ProductCatergory  />
    <LogoSection />
    <FooterSection />

  </div>
</template>

<script setup>
import MainSlider from '@/components/frontend-components/Main-Slider.vue';
import CollectionVideoc from '@/components/frontend-components/Collection-Video.vue';
import ProductCatergory from '@/components/frontend-components/ProductCatergory.vue';
import FooterSection from '@/components/frontend-components/Footer-section.vue';
import LogoSection from '@/components/frontend-components/Logo-section.vue';
import { onMounted, ref, } from 'vue'
import PublicServices from '@/services/publicServices/PublicServices';

const sliderImages = ref([]);

const handleSliderImages =async () => {
   const res = await PublicServices.getHomeSlider();
  //  console.log("slider images", res);
   if (res.status === 200 && res.data.success) {
     sliderImages.value = res.data.data;
    //  console.log("slider images", sliderImages.value);
   }
}

onMounted(() => {
  handleSliderImages();
})

const sidebarList = ref([
  { name: 'Trixie Lounger', link: 'https://lebello.com/products/trixie-lounger/' },
  { name: '4L Pixie Arms Chair', link: 'https://lebello.com/products/4l-pixie-arms-chair/' },
  { name: 'Monyet Stool', link: 'https://lebello.com/products/monyet-stool/' },
  { name: 'Monyet Stool', link: 'https://lebello.com/products/monyet-stool/' },
  { name: 'Mogul Lounger', link: 'https://lebello.com/products/mogul_lounger/' },
  { name: 'Tubo Club', link: 'https://lebello.com/products/tubo-club-chair/' },
  { name: 'Mogul Puff Lounger', link: 'https://lebello.com/products/mogul-puff-lounger/' },
  { name: 'Mogul Puff Lounger', link: 'https://lebello.com/products/mogul-puff-lounger/' },
  { name: 'Tubo Chair', link: 'https://lebello.com/products/tubo-chair/' },
  { name: 'Monyet Stool', link: 'https://lebello.com/products/monyet-stool/' },
  { name: 'Mogul Lounger', link: 'https://lebello.com/products/mogul_lounger/' },
  { name: 'Tubo Club', link: 'https://lebello.com/products/tubo-club-chair/' },
  { name: 'Mogul Puff Lounger', link: 'https://lebello.com/products/mogul-puff-lounger/' },
  { name: 'Mogul Puff Lounger', link: 'https://lebello.com/products/mogul-puff-lounger/' },
  { name: 'Tubo Chair', link: 'https://lebello.com/products/tubo-chair/' },
]);
</script>
