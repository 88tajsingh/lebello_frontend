<template>
  <div class="flex w-full px-10 z-[999999] pt-1 text-[13px]">
    <!-- Desktop Navigation -->
    <div class="hidden lg:flex items-center w-full" :class="storePages ? 'justify-start gap-6' : 'justify-between'">
      <div v-for="link in props?.links" :key="link.text" class="relative group" @mouseenter="openMenu(link.text)"
        @mouseleave="closeMenu(link.text)">
        <router-link :to="link.to"
          class="flex items-center cursor-pointer py-1 pb-2  leading-9 text-[14px]  font-graphik"
          :class="storePages ? 'gap-2' : 'lg:gap-2 xl:gap-3'"
          :style="{ color: props?.navColor }">
          <span>{{ link.text }} </span>
          <Arrow v-if="link.sublinks" :size="storePages? '11px' : '12px'" direction="left" :strokeWidth="22.5" :fillColor="'currentColor'" />
        </router-link>
        <!-- First Level Dropdown -->
        <div v-if="link.sublinks" >
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
  </div>
  <div 
  v-if="storePages" 
  :style="{ color: props?.navColor }"
  class="flex justify-center items-center pt-1 gap-10  text-[14px] leading-[35px] uppercase text-white font-['Graphik'] text-left"
>
  <div class="w-full">CONTACT&nbsp;/&nbsp;HELP&nbsp;?</div>
  <div class="flex">
    <a class="flex justify-center gap-2 items-center" href="#">
      <span>CHECKOUT</span>
      <span>|</span>
      <i class="fa fa-shopping-bag" aria-hidden="true"></i>
    </a>
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
  storePages: {
    type: Boolean,
    default: false
  }
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