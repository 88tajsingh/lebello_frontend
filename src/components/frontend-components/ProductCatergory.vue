<template>
  <div class="block mx-4 lg:mx-7 md:flex md:gap-5 lg:gap-14 lg:mt-5 overflow-x-hidden">
    <div v-for="(data, index) in productdata" :key="index" class="flex m-auto md:w-4/12 bg-[#ddd7ce] mt-10">
      <div @click="index === 1 ? handleModal() : router.push(data.urlLink)" class="pb-1 text-textColorBlack hover:bg-[#c68d39] hover:text-white">
        <div class="overflow-hidden">
          <img :src="data.img" class="w-full transition-transform duration-1000 ease-in-out transform hover:scale-125" />
        </div>
        <div class="mx-5 my-3 sm:min-h-[68px] lg:min-h-0">
          <h3 class="uppercase leading-none font-graphik text-[18px]">{{ data.heading }}</h3>
          <p class="text-[12px] font-graphik">{{ data.peragraph }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Section -->
  <div v-if="open"
        class="fixed z-[100] top-0 left-0 w-full h-full   flex items-center justify-center bg-black bg-opacity-50">
    <div class="flex items-end justify-center min-h-screen text-center sm:block">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-[rgb(220,214,205)] text-left shadow-xl transform transition-all sm:align-middle w-[70vw]" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="hidden sm:block absolute top-4 right-4">
          <button @click="handleClose" type="button" data-behavior="cancel" class="rounded-md text-black-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <span class="sr-only">Close</span>
            <svg fill="#000000" class="text-gray-500" width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fill-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div class="flex m-auto">
          <div class="w-7/12">
            <img src="@/assets/images/Catalog-Mockup3-1-scaled-1.jpg" alt="">
          </div>
          <div class="w-5/12 bg-[rgb(220,214,205)] px-8 pt-10 text-textColorBlack">
            <div class="text-lg pt-10  uppercase font-graphikMedium text-[24px] ">
              2022/23 Highlights
            </div>
            <p class=" font-graphikLight pb-16 text-[15px]">Simple yet timeless, our new collection for the 2022 Forever Summer Collection ® is Inspired by Nature with warm and vibrant natural colors and materials.</p>
         
          <div class="flex justify-between items-center border-t-2 border-[#978b7a7d] pt-5 ">
            <div class="text-[15px] font-graphikLight" >2022/23 Lebello Highlight</div>
            <div class="border border-[#666] rounded-xl px-2 text-[13px]" @click="embedPdfInNewTab" >download</div>
            <!-- <div class="border border-[#666] rounded-xl px-2 text-[13px]"  >download</div> -->
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const open = ref(false);

const embedPdfInNewTab = () => {
  const pdfUrl = '/src/assets/sample.pdf';
  
  const newTab = window.open();
  
  newTab.document.body.innerHTML = `
    <iframe src="${pdfUrl}" width="100%" height="100%" style="border:none;"></iframe>
    <p><a href="${pdfUrl}" download="my-pdf-file.pdf">Download PDF</a></p>
  `;
};

const productdata = ref([
  {
    img: 'https://lebello.com/wp-content/uploads/2022/09/Contract-Design-image-2.png',
    heading: 'Contract Design',
    peragraph: 'See our previous project around the world',
    urlLink:'/contract_designs'
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
    urlLink:'/materials-shop'
  }
]);

const handleModal = () => {
  open.value = !open.value;
};

const handleClose = () => {
  open.value = false;
};
</script>
