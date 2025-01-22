<template>  
    <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <div v-show="isExpanded" class="overflow-hidden">
        <slot></slot>
      </div>
    </transition>
  </template>
    
  <script setup>  
  defineProps({
    isExpanded: {
      type: Boolean,
      default: false,
    },
  });
  
  const enter = (element) => {
    const width = getComputedStyle(element).width;
    element.style.width = width;
    element.style.position = 'absolute';
    element.style.visibility = 'hidden';
    element.style.height = 'auto';
  
    const height = getComputedStyle(element).height;
  
    element.style.width = null;
    element.style.position = null;
    element.style.visibility = null;
    element.style.height = 0;
  
    // Trigger the browser to recalculate styles
    getComputedStyle(element).height;
  
    requestAnimationFrame(() => {
      element.style.height = height;
    });
  };
  
  const afterEnter = (element) => {
    element.style.height = 'auto';
  };
  
  const leave = (element) => {
    const height = getComputedStyle(element).height;
  
    element.style.height = height;
  
    // Trigger the browser to recalculate styles
    getComputedStyle(element).height;
  
    requestAnimationFrame(() => {
      element.style.height = 0;
    });
  };
  </script>
    
  <style scoped>
  .expand-enter-active,
  .expand-leave-active {
    transition: height 0.7s ease-out;
    overflow: hidden;
  }
  
  .expand-enter-from,
  .expand-leave-to {
    height: 0;
  }
  </style>
  