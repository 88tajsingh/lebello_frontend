<template>
   <a v-for="(link, index) in links" :key="index" :href="link.to" class="text-[15px] m-auto">
  <div class=" flex-inline text-[15px]  items-center group top-12">
    <button
    :class="navColor1 ? 'text-white' : (navColor === 'white' ? 'text-white' : 'text-black')"
     class=" outline-none rounded-sm py-3 flex items-center min-w-32 "
      >
      <router-link :to="link.to" class="text-[13px]">
        <div class="px-1 flex justify-between w-full hover:text-blue">
          <span class="uppercase">{{ link?.text }}</span>
          <div class="my-auto ml-2">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
              style="stroke-width: 2px; transform: rotate(270deg);">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </router-link>
    </button>

    <ul class="bg-[#0e0e0ec9] bg-opacity-5 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top list-wid mt-0">
      <div v-for="(sublink, subIndex) in link.sublinks" :key="subIndex" class="px-4 bg-[#0e0e0ec9]">
        <li v-if="sublink?.submenu && sublink?.submenu.length > 0"
          class="relative  py-1 border-b hover:text-[#c9d8e8] border-[rgba(208,208,208,0.16)]">
          <button class="w-full text-left flex items-center outline-none focus:outline-none">
            <div class="flex justify-between text-[13px] w-full hover:text-blue">
              <router-link :to="sublink.to" class="text-[13px]">{{ sublink?.text }}</router-link>
              <div class="my-auto">
                <svg class="fill-current h-3 w-3 transition duration-150 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </button>

          <ul class=" bg-opacity-5 absolute top-0 right-0 transition bg-[#0e0e0ec9] duration-150 ease-in-out origin-top-left list-wid mt-0">
           <div class="bg-[#0e0e0ec9] py-1">
            <div v-for="(submenu, ubIndex) in sublink?.submenu" :key="ubIndex" class="mx-3 border-b border-[rgba(208,208,208,0.16)]">
              <li v-if="submenu?.supermenu?.length > 0" class="">
                <button class="w-full text-left flex items-center outline-none focus:outline-none">
                  <div class="px-1 flex justify-between w-full hover:text-blue">
                    <router-link :to="submenu.to" class="text-[13px]">{{ submenu?.text }}</router-link>
                    <div class="my-auto">
                      <svg class="fill-current h-3 w-3 transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </button>
                <ul class="bg-[#0e0e0ec9] bg-opacity-5 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left list-wid mt-0">
                  <li v-for="(supermenu, ubIndex) in submenu?.supermenu" :key="ubIndex"
                    class="px-4 py-1 border-b hover:text-blue bg-[#0e0e0ec9]  border-[rgba(208,208,208,0.16)]">
                    <router-link :to="supermenu.to" class="text-[13px]">
                      {{ supermenu?.text }}
                    </router-link>
                  </li>
                </ul>
              </li>
              <li v-else class="px-1 border-b py-1 hover:text-blue border-[rgba(208,208,208,0.16)]">
                <router-link :to="submenu.to" class="text-[13px]">{{ submenu?.text }}</router-link>
              </li>
            </div>
        </div>
          </ul>
        </li>

        <li v-else class="px-1 py-1 border-b max-h-20 hover:text-blue border-[rgba(208,208,208,0.16)]">
          <router-link :to="sublink.to" class="text-[13px]">{{ sublink.text }}</router-link>
        </li>
      </div>
    </ul>
  </div>
</a>

  </template>
  
  <script setup>
  defineProps(['links', 'navColor', 'navColor1']);
  </script>
  
  <style scoped>
    .group:hover .scale-100 {
    transform: scale(1);
  }
  .bg-opacity-5 {
    background-color: rgba(0, 0, 0, 0.05);
  }
  </style>
  