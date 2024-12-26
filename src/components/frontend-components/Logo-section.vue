<template>
  <div class=" max-w-[1400px] mx-auto grid place-items-center grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 py-12 px-10 md:px-0 ">
    <div v-for="(logo, index) in logoData" :key="index" class="flex justify-center items-center py-4">
      <a :href="logo.href">
        <img 
          class="opacity-80 hover:opacity-100 transition" 
          :src="logo.image" 
          :title="logo.alt" 
          :alt="logo.alt" 
        />
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const logoData = ref([
  {
    href: ' #',
    image: 'https://lebello.com/wp-content/uploads/2015/03/hyatt-logo-1.png',
    alt: 'hyatt'
  },
  {
    href: ' #',
    image: 'http://lebello.com/wp-content/uploads/2015/03/one-and-only-logo-1.png',
    alt: 'one-and-only'
  },
  {
    href: ' #',
    image: 'http://lebello.com/wp-content/uploads/2015/03/w-hotels-logo-1.png',
    alt: 'w-hotels'
  },
  {
    href: ' #',
    image: 'https://lebello.com/wp-content/uploads/2015/03/ink-logo_1-1.gif',
    alt: 'ink-logo'
  },
  {
    href: ' #',
    image: 'http://lebello.com/wp-content/uploads/2015/03/marriot-resorts-logo-1.png',
    alt: 'marriot-resorts'
  },
  {
    href: ' #',
    image: 'http://lebello.com/wp-content/uploads/2015/03/marriot-resorts-logo-1.png',
    alt: 'marriot-resorts'
  }
])
</script>

<style scoped>
/* Add any specific styles for this component here */
</style>
