<template>
  <div ref="closeMenu" class="relative">
    <div 
      :class="{
        'w-[230px] z-50 right-0': isOpen,
        'w-[230px] z-50 right-[-250px]': !isOpen
      }"
      class="sidenav borderborder-red bg-[#ededed] pb-2 z-50 absolute top-7 right-0 transition-all duration-1000 ease-in-out"
    >
      <slot></slot>
    </div>
    <span
      v-if="!isOpen"
      @click="toggleSidebar"
      class="text-9xl inline-block bg-transparent sticky top-5 pr-3 z-[9999]"
    >
      <MenuSvg :size="svgSize" :fillColor="svgColor" :class="menuClass" />
    </span>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { onClickOutside } from '@vueuse/core';
import MenuSvg from './Svg/Menu-Svg.vue';

// Define props
const { svgColor, svgSize = '30px', menuClass, } = defineProps({
  svgColor: { type: String, required: true },
  svgSize: { type: String, default: '30px' },
  menuClass: { type: String, default: '' },
});

const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = ref(null);
const closeSideMenu = () => {
  isOpen.value = false;
};

onClickOutside(closeMenu, closeSideMenu); 
</script>

<style scoped>

</style>
