<template>
    <div class=" mx-auto border border-[#33333357] rounded-sm text-[16px]">
      <!-- Dropdown Header -->
      <div 
        class="flex justify-between hover:text-orange items-center px-4 py-3 cursor-pointer font-graphik"
        @click="toggleDropdown"
      >
        <span class='text-[16px]'>PRODUCT TYPE</span>
        <span class="transition-transform duration-300 ">               
           <Arrow size="13px" fillColor="currentColor" strokeWidth="55.77" direction="bottom" />
        </span>
      </div>
  
      <!-- Dropdown Menu -->
      <ul 
        v-show="isOpen" 
        class=" divide-y divide-[#33333357] shadow-md"
      >
        <li 
          v-for="(item, index) in options" 
          :key="index" 
          class="px-4 py-3 text-[16px] hover:text-orange cursor-pointer text-gray-800"
          @click="selectOption(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import {Arrow} from "../Svg/Icons.js";
  
  const isOpen = ref(false);
  const options = ['Modular / Sofas', 'Lounge Poufs', 'Daybed', 'Archives'];
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  const selectOption = (option) => {
    console.log('Selected:', option);
    isOpen.value = false; 
  };
  </script>
  