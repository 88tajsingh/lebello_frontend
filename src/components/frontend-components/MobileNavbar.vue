<template>
  <div class=" z-[9999999] bg-gray-50">
    <span @click="toggleMenu" class="z-30">
      <Menu size="26px" :fillColor="navColor || '#ffffff'" />
    </span>

    <!-- Sidebar -->
    <div
      class="fixed inset-0 z-40 bg-white transform transition-transform duration-1000"
      :class="menuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="p-6 pr-16">
        <!-- Header -->
         <Close size="18px" fillColor="#" @click="toggleMenu" />
        <div class="mb-8 flex justify-end ">
          <nav class="text-orange text-sm m-auto">
            <span>HOME</span>
            <span class="mx-2">/</span>
            <span>CONTACT US</span>
          </nav>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 overflow-y-auto">
          <div
            v-for="(item, index) in currentMenu.sublinks || links"
            :key="`${item.text}-${index}`"
            class="py-4 border-b border-gray text-black flex items-center justify-between cursor-pointer"
            @click="handleItemClick(item)"
          >
            {{ item.text }}
            <Arrow
              v-if="item.sublinks || item.submenu || item.supermenu"
              size="12px"
              direction="left"
              strokeWidth="22.5"
              :fillColor="'e8e8e8'"
            />
          </div>
        </nav>

        <!-- Footer -->
        <div class="relative mt-8">
          <input
            type="search"
            placeholder="Search"
            class="w-full pl-4 pr-10 py-2 rounded-full border border-gray"
          />
          <Search size="18px" fillColor="#000000" class="absolute right-3 top-3" />
        </div>
      </div>

      <!-- Submenu Panel -->
      <div
        class="fixed inset-0 bg-white transform transition-transform duration-300 z-50"
        :class="menuStack.length > 0 ? 'translate-y-0' : 'translate-y-full'"
      >
        <div class="p-6 pr-16 h-full flex flex-col">
          <!-- Submenu Header -->
          <Close size="18px" fillColor="#" @click="toggleMenu" />
          <div class="mb-8 flex justify-end ">
          <nav class="text-orange text-sm m-auto">
            <span>HOME</span>
            <span class="mx-2">/</span>
            <span>CONTACT US</span>
          </nav>
        </div>

        <div class="flex items-center justify-between pb-2 border-b border-orange" v-if="menuStack.length > 0">
  <button @click="popMenu" class="flex items-center gap-4 text-orange text-[16px] font-semibold">
    <Arrow size="13px" direction="right" strokeWidth="99.5" :fillColor="'currentColor'" />
    <span @click.stop="handleNavigation(currentMenu)">{{ currentMenu.text }}</span>  
  </button>
  <button @click="clearMenuStack" class="p-2">
    <Close size="15px" fillColor="#" />
  </button>
</div>


          <!-- Submenu Items -->
          <div class="flex-1 overflow-y-auto">
            <div
              v-for="(item, index) in currentMenu.sublinks || currentMenu.submenu || currentMenu.supermenu || []"
              :key="`${item.text}-${index}`"
              class="py-4 border-b border-gray text-black flex items-center justify-between cursor-pointer"
              @click="handleItemClick(item)"
            >
              {{ item.text }}
              <Arrow
                v-if="item.sublinks || item.submenu || item.supermenu"
                size="8px"
                direction="left"
                :strokeWidth="22.5"
                :fillColor="'#000000'"
              />
            </div>
          </div>

          <!-- Footer -->
          <div class="relative mt-8">
            <input
              type="search"
              placeholder="Search"
              class="w-full pl-4 pr-10 py-2 rounded-full border border-gray"
            />
            <Search size="18px" fillColor="#000000" class="absolute right-3 top-3" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed,watch } from 'vue';
import { Search, Close, Arrow, Menu } from './Svg/Icons';
import { useRouter } from 'vue-router';

const menuOpen = ref(false);
const menuStack = ref([]);
const router = useRouter();

const { links, navColor } = defineProps({
  links: { type: Array, required: true },
  navColor: { type: String, required: true },
});

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const handleNavigation = (current) => {
  console.log("current",current);
    router.push(current.to);
};

const handleItemClick = (item) => {
  if (item.sublinks || item.submenu || item.supermenu) {
    pushMenu(item);
  }
};

const pushMenu = (item) => {
  menuStack.value.push(item);
};

const popMenu = () => {
  menuStack.value.pop();
};

const clearMenuStack = () => {
  menuStack.value = [];
};

const currentMenu = computed(() => {
  return menuStack.value.length > 0
    ? menuStack.value[menuStack.value.length - 1]
    : { text: '', sublinks: links };
});

watch(menuOpen, (newVal) => {
  if (newVal) {
    console.log("newVal");
    document.body.classList.add('overflow-hidden'); 
  } else {
    document.body.classList.remove('overflow-hidden'); 
  }
});
</script>

<style scoped>
button {
  transition: background-color 0.3s;
}

</style>
