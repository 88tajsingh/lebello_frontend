<script setup>
import { ref, onMounted } from 'vue'
import Slider from '@/components/frontend-components/Slider.vue';
import { useRouter } from 'vue-router';
import FooterSection from '@/components/frontend-components/Footer-section.vue'
import { getSwatchList } from '@/helper/frontendHelpers';
import NavBar from '@/components/frontend-components/Nav-bar.vue';
import LogoSection from '@/components/frontend-components/Logo-section.vue';

const router = useRouter();
const navColor = ref('')
const ourMaterialData = ref([])

const handleOurMaterials = async () => {
  const res = await getSwatchList();
  if (res.status === 200 && res.data.success) {
    ourMaterialData.value = res.data.data
  }
}

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  handleOurMaterials()
})
const handleRoute = (sub) => {
  sessionStorage.setItem('materialDetail', sub.id);
  router.push({ name: 'materialDetail', params: { slug: sub.slug } });
};
4
</script>
<template>
  <NavBar absolute="true" :navColor="navColor" />
  <Slider :images="ourMaterialData.swatch_data" imageKeyName='featured_image_data' :disableSideText="true"
    :navColor="'white'" sliderPageName="ourMaterials" :hasSidebar="true">
    <template #utility>
      
      <!-- lebellow icon right top -->
      <a href="#" class="absolute z-50 top-11 right-0 mx-auto">
        <img src="https://lebello.com/wp-content/themes/lebello-ep/images/logo2.png" />
      </a>
      <div class="absolute mx-auto top-1/2 w-[700px] left-20  transform -translate-y-1/2 "
        :class="['absolute transition-all duration-1000 ease-in-out']">

        <div
          class=" text-white font-graphik font-bold  uppercase opacity-90 sm:text-[20px] md2:text-[60px] leading-snug">
          Performance Outdoor Materials
        </div>
        <h6
          class=" text-white font-graphik font-bold uppercase opacity-100 sm:text-[20px] md2:text-[40px] leading-snug">
          #ENDLESSBESPOKE
        </h6>
      </div>
    </template>
    <template #sidebar>
      <div class="z-50">
        <div class="h-auto mb-2 mx-3 mt-4 border-b border-[#898989]">
          <h3 class="text-[14px]">
            <a href="https://www.lebello.com/listItem/"
              class="uppercase font-graphikMedium text-[14px]  text-textColorBlack">MATERIALS</a>
          </h3>
        </div>
        <div class="px-5">
          <ul class="font-graphikLight text-[13px] my-1 text-textColorBlack overflow-auto max-h-52 ">
              <li class="mt-1" v-for="(listItem, index) in ourMaterialData.swatch_side_bar" :key="index">
                <a :href="listItem?.link" class="hover:text-orange">{{ listItem?.title }}</a>
              </li>
          </ul>
        </div>
      </div>
    </template>
  </Slider>

  <div id="sideText" class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 px-16">
    <div v-for="collection in ourMaterialData.swatch_data" :key="collection.title"
      class="bg-gray-5 p-4 rounded-lg overflow-hidden shadow-lg">
      <div class="relative overflow-hidden group cursor-pointer" :onclick="() => handleRoute(collection)">
        <img :src="$filePath(collection?.featured_image_data?.file_url)" :alt="collection.title"
          class="w-full h-48 object-cover filter grayscale transition duration-700 ease-in-out transform group-hover:scale-110 group-hover:filter-none">
        <span class="absolute top-4 right-4 text-white font-bold text-lg">{{ collection.trade_mark_label ?
          collection.trade_mark_label.toUpperCase() : collection.title }}</span>
      </div>

      <div class="pt-5 flex justify-between items-center">
        <h2 class="text-[26px] font-graphikLight text-[#070707]">{{ collection.title }}</h2>
        <button
          class="px-4 p-[4px] bg-[#978b7a] text-[12px] uppercase font-graphik text-white rounded-full hover:bg-gray-500"
          :onclick="() => handleRoute(collection)">
          View Collection
        </button>
      </div>
    </div>

  </div>
  <LogoSection />
  <FooterSection />
</template>
