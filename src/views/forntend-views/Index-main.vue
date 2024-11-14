<template>
  <div class="overflow-x-hidden">
    <!-- v-if=" landingPageData.length > 0"  -->
    <MainSlider
      :sidebarList="landingPageData.home_sidebar_first"
      :sliderImages=" landingPageData.home_slider"
      :mainSlider="true"
      :showDropDown="false"
      :showHeading="true"
      :downDropdown="false"
    />
    <CollectionVideoc :sidebarList="landingPageData.home_sidebar" />
    <ProductCatergory />
    <LogoSection />
    <FooterSection />
  </div>
</template>

<script setup>
import MainSlider from '@/components/frontend-components/Main-Slider.vue'
import CollectionVideoc from '@/components/frontend-components/Collection-Video.vue'
import ProductCatergory from '@/components/frontend-components/ProductCatergory.vue'
import FooterSection from '@/components/frontend-components/Footer-section.vue'
import LogoSection from '@/components/frontend-components/Logo-section.vue'
import { onMounted, ref } from 'vue'
import { getLandingPageData } from '@/helper/frontendHelpers'

const  landingPageData = ref([])

const  handleLandingPageData = async () => {
   const res = await getLandingPageData()
   console.log("getLandingPageData", res);
  if (res.status === 200 && res.data.success) {
     landingPageData.value = res.data.data
  }
}

onMounted(() => {
   handleLandingPageData()
})

</script>
