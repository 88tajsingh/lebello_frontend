<template>
  <div class="bg-white border-t-2 pb-10 border-[#f3f3f3]">
    <div class="grid">
      
      <div v-for="(item, index) in AccordionData" :key="item.id" class="py-5 border-b-2 px-16 border-[#f3f3f3]">
        <details class="group transition-all duration-500 ease-in">
           
          <summary @click="toggleFAQ(index)" class="flex justify-between items-center text-[#64748b] font-graphik text-[23px] cursor-pointer list-none hover:text-green">
            <span class="text-2xl font-normal" :class="{ 'text-black ': item.open }">{{ item?.swatch?.title }}</span>
            <span class="transition-all duration-300 ease-in-out" :class="{ 'group-open:rotate-90 ': item.open, 'text-[#64748b] ': item.open }">
              <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" transform="rotate(-90)">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </summary>
          <transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
            <div v-if="item.title === 'Specifications'" class="spec-section">
              <div class="grid grid-cols-1 font-graphik text-[14px] text-textColorBlack md:grid-cols-4 gap-4">
                <div v-for="(spec, spIndex) in item" :key="spIndex" class="pr-4">
                  <p class="text-base font-graphik mt-5">{{ spec }}</p>
                  <p><strong>{{ spec?.sku }}</strong></p>
                  <p>{{ spec?.frame }}</p>
                  <p>{{ spec?.dimension }}</p>
                  <p>{{ spec?.seatHeight }}</p>
                </div>
              </div>
            </div>
          </transition>

          <!-- Tabs -->
          <ul class="flex list-none flex-row flex-wrap mb-3" role="tablist" data-twe-nav-ref>
            <li v-for="(tab, tIndex) in item.materials" :key="tIndex" role="presentation">
              <a :href="'#' + tab.id" :class="{ 'mt-3 block px-4 pt-3 text-[13px] pb-4 uppercase leading-tight hover:text-blue': true, 'disabled pointer-events-none': tab.disabled, 'text-green border-b border-green': activeTabs[index] === tab.id, 'text-[#64748b]': activeTabs[index] !== tab.id }" :data-twe-toggle="tab.id" data-twe-nav-active role="tab" :aria-controls="tab.id" :aria-selected="tab.active" @click.prevent="activateTab(tab, index)">
                {{ tab?.name }}
              </a>
            </li>
          </ul>

          <!-- Tabs content -->
          <div class="mb-6">
            <div v-for="(tab, tabIndex) in item.materials" :key="tabIndex" :class="{ hidden: !tab.active, 'opacity-100 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block': tab.active, 'opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block': !tab.active }" :id="tab.id" role="tabpanel" :aria-labelledby="tab.id + '-tab'" data-twe-tab-active>
              
              <!-- Material Images -->
              <div v-if="tab.active && Array.isArray(tab.children)" class="container w-5/6">
                <div class="grid grid-cols-5 justify-items-start">
                  <div v-for="(item, index) in tab?.children" :key="index" class="bg-white">
                    <div class="w-48 h-48 mx-auto mb-10">
                      <div class="w-full h-full relative overflow-hidden">
                        <img :src="$filePath(item?.media_data?.file_url)" alt="Material Image" class="object-cover w-[185px] h-[185px] pr-2" />
                        <div class="text-center absolute bottom-1">
                          <p class="p-[4px] px-[6px] font-graphik text-[14px] text-Black666 bg-[#ffffffc9]">{{ item?.name }}</p>
                        </div>
                      </div>
                      <p class="text-gray-600 font-graphik text-[13px] text-Black666">{{ item?.code }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Description Tab Content -->
              <div v-if="tab.name === 'Description'" class="px-5 py-3 text-gray-700" v-show="tab.active">
                  {{tab?.description
                  }}
                <div v-html="item.swatch.description"></div>
              </div>
              
            </div>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Accordion data passed as prop
const { AccordionData } = defineProps({
  AccordionData: {
    type: Array,
    required: true,
  },
});

// Active tab index for each accordion item
const activeTabs = ref([]);

// Before and after enter/leave animations
const beforeEnter = (el) => { el.style.height = '0'; };
const enter = (el) => { el.style.height = el.scrollHeight + 'px'; };
const beforeLeave = (el) => { el.style.height = el.scrollHeight + 'px'; };
const leave = (el) => { el.style.height = '0'; };

// Activate tab for each section independently
const activateTab = (tab, index) => {
  if (!tab.disabled) {
    // Set the active tab for the specific accordion item
    activeTabs.value[index] = tab.id;
    AccordionData[index]?.materials.forEach((t) => {
      t.active = t.id === tab.id;
    });
  }
};

// Toggle FAQ open/close and set the default active tab to the first tab
const toggleFAQ = (index) => {
  AccordionData[index].open = !AccordionData[index].open;

  // Set the first tab as active when the accordion is opened
  if (AccordionData[index].open) {
    const firstTab = AccordionData[index]?.materials[0];
    if (firstTab) {
      activeTabs.value[index] = firstTab.id;
      firstTab.active = true;
    }
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: height 0.5s ease-in-out;
  overflow: hidden;
}
.fade-enter, .fade-leave-to {
  height: 0;
}
</style>
