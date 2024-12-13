<template>
  <div class="flex w-full px-10 pt-1 text-[13px]">
    <!-- Desktop Navigation -->
    <div class="hidden lg:flex items-center justify-between w-full">
      <div v-for="link in props?.links" :key="link.text" class="relative group" @mouseenter="openMenu(link.text)"
        @mouseleave="closeMenu(link.text)">
        <router-link :to="link.to" class="flex items-center cursor-pointer lg:gap-2 xl:gap-5 py-1 pb-4 text-[15px] font-graphik"
          :style="{ color: props?.navColor }" >
          <span>{{ link.text }}  </span>
          <Arrow size="14px" direction="left" :strokeWidth="22.5" :fillColor="'currentColor'" />
        </router-link>
        <!-- First Level Dropdown -->
        <div v-if="isMenuActive(link.text)" class="absolute left-0  top-full min-w-[200px] bg-[#000000CC] py-1">
          <div v-for="sublink in link.sublinks" :key="sublink.text" class="relative group/sub"
            @mouseenter="openMenu(sublink.text)" @mouseleave="closeMenu(sublink.text)">
            <router-link :to="sublink.to"
              class="flex items-center border-b border-[#D0D0D029] justify-between mx-4 py-1 text-[13px] font-graphik hover:text-blue">
              <span>{{ sublink.text }} </span>
              <Arrow v-if="sublink.submenu" size="8px" direction="left" :strokeWidth="22.5"
                :fillColor="'currentColor'" />
            </router-link>

            <!-- Second Level Dropdown -->
            <div v-if="isMenuActive(sublink.text) && sublink.submenu"
              class="absolute left-full top-[-4px] min-w-[200px] bg-[#000000CC] py-1">
              <div v-for="submenuItem in sublink.submenu" :key="submenuItem.text" class="relative group/super"
                @mouseenter="openMenu(submenuItem.text)" @mouseleave="closeMenu(submenuItem.text)">
                <router-link :to="submenuItem.to"
                  class="flex items-center justify-between mx-4 border-b border-[#D0D0D029] py-1 text-[13px] font-graphik hover:text-blue hover:bg-gray-800">
                  <span>{{ submenuItem.text }}</span>
                  <Arrow v-if="submenuItem.supermenu" size="8px" :strokeWidth="22.5" direction="left"
                    :fillColor="'currentColor'" />
                </router-link>

                <!-- Third Level Dropdown -->
                <div v-if="isMenuActive(submenuItem.text) && submenuItem.supermenu"
                  class="absolute left-full top-[-4px] min-w-[200px] bg-[#000000CC] py-1">
                  <router-link v-for="supermenuItem in submenuItem.supermenu" :key="supermenuItem.text"
                    :to="supermenuItem.to"
                    class="block mx-4 border-b border-[#D0D0D029] py-1 text-[13px] font-graphik hover:text-blue hover:bg-gray-800">
                    {{ supermenuItem.text }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { Arrow, Search, Menu } from './Svg/Icons';
const props = defineProps({
  links: {
    type: Array,
    required: true,
  },
  navColor: {
    type: String,
    required: true,
  },
});
const isOpen = ref(false);
const activeMenus = ref([]);
const navColor = ref(props?.navColor || '#ffffff');
const openMenu = (menuText) => {
  if (!activeMenus.value.includes(menuText)) {
    activeMenus.value.push(menuText);
  }
};

const closeMenu = (menuText) => {
  activeMenus.value = activeMenus.value.filter((item) => item !== menuText);
};

const isMenuActive = (menuText) => activeMenus.value.includes(menuText);
</script>