<template>
  <div class=" overflow-x-hidden">
    <NavMainSlider :list="products" :mainSlider="true" :showDropDown="false" :showHeading="true"
      :downDropdown="false" />
    <CollectionVideoc />
    <ProductCatergory />
    <LogoSection />
    <FooterSection />

  </div>
</template>

<script setup>
import CollectionVideoc from '@/components/frontend-components/Collection-Video.vue';
import ProductCatergory from '@/components/frontend-components/ProductCatergory.vue';
import FooterSection from '@/components/frontend-components/Footer-section.vue';
import NavMainSlider from '@/components/frontend-components/Nav-MainSlider.vue';
import LogoSection from '@/components/frontend-components/Logo-section.vue';
import { ref, } from 'vue'


const products = ref([
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
