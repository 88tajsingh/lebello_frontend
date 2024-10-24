<template>
  <div class="block mx-4  lg:mx-7 md:flex md:gap-5 lg:gap-14 lg:mt-5 overflow-x-hidden">
    <div v-for="(data, index) in productdata" :key="index" class="flex m-auto md:w-4/12 bg-[#ddd7ce] mt-10">
      <div @click="router.push(data.urlLink)" class="pb-1 text-textColorBlack hover:bg-[#c68d39] hover:text-white">
        <div class="overflow-hidden">
          <img :src="data.img" class="w-full transition-transform duration-1000 ease-in-out transform hover:scale-125" />
        </div>
        <div class="mx-5 my-5  sm:min-h-[68px] lg:min-h-0">
          <h3 class="uppercase leading-none font-graphik text-[18px]">{{ data.heading }}</h3>
          <p class="text-[12px] font-graphik">{{ data.peragraph }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const props=defineProps({
  sidebarList: {
    type: Array,
    required: true,
  },
});

const productdata = ref([
  {
    img: 'https://lebello.com/wp-content/uploads/2022/09/Contract-Design-image-2.png',
    heading: 'Contract Design',
    peragraph: 'See our previous project around the world',
    urlLink:'/contractDesign'
  },
  {
    img: 'https://lebello.com/wp-content/uploads/2022/09/Product-Catalog-image.jpg',
    heading: 'Product Catalog',
    peragraph: 'Download our latest product',
    urlLink:'/productCatalog'
  },
  {
    img: 'https://lebello.com/wp-content/uploads/2023/05/our-material-lebello-1.jpg',
    heading: 'Our Material',
    peragraph: 'Discover our 100+ bespoke material options',
    urlLink:'/ourMaterial'
  }
])
</script>

<style scoped></style>
