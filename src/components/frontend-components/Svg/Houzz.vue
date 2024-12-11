<template>
  <a
    :href="href"
    target="_blank"
    :title="title"
    :class="['flex', 'items-center', 'justify-center', 'rounded-full', 'mx-1']"
    :style="{
      backgroundColor: isHovered ? hoverBgColor : bgColor,
      width: bgSize,
      height: bgSize,
      transition: 'background-color 0.3s ease'
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <svg
      :width="svgSize"
      :height="svgSize"
      viewBox="-5 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      :fill="isHovered ? hoverSvgColor : svgColor"
      :stroke="isHovered ? hoverSvgColor : svgColor"
      :style="{ transition: 'all 0.3s ease' }"
    >
      <g id="SVGRepo_iconCarrier">
        <path
          d="m6.926 15.991 6.927-3.991v7.995l-6.927 4.005zm-6.926-3.991v7.995l6.926-4.005zm6.926-12v7.995l-6.926 4.005v-7.995zm0 7.995 6.926-3.991v7.996z"
        ></path>
      </g>
    </svg>
  </a>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  href: {
    type: String,
    default: 'https://www.houzz.com/',
  },
  title: {
    type: String,
    default: 'Houzz',
  },
  bgColor: {
    type: String,
    default: '#DDDDDD',
  },
  bgSize: {
    type: String,
    default: '36px',
  },
  svgSize: {
    type: String,
    default: '17px',
  },
  svgColor: {
    type: String,
    default: '#ffffff',
  },
  hoverBgColor: {
    type: String,
    default: '#BBBBBB',
  },
  hoverSvgColor: {
    type: String,
    default: '#000000',
  },
});

let isHovered = ref(false);

const handleMouseEnter = () => {
  isHovered.value = true;
};

const handleMouseLeave = () => {
  isHovered.value = false;
};
</script>
