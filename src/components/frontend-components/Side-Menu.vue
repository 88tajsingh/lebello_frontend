<template>
  <div ref="closeMenu" class="relative ">
    <div
      :class="isOpen ? openClass : closeClass"
      :style="{ height: height }"
      class="sidenav border bg-[#ededed] z-99999 pb-2 transition-all duration-2000 ease-in-out"
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
const { svgColor, svgSize = '30px', menuClass,openClass = 'w-[230px] z-50 right-0',
  closeClass = 'w-[230px] z-50 absolute right-[-250px]',
  height = '', } = defineProps({
  svgColor: { type: String, required: true },
  svgSize: { type: String, default: '30px' },
  menuClass: { type: String, default: '' },
  openClass: { type: String, default: 'w-[230px] absolute z-50 right-0' },
  closeClass: { type: String, default: 'w-[230px] z-50 absolute right-[-250px]' },
  height: { type: String, default: '' },
  
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
