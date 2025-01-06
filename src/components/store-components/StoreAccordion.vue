<template>
  <div class="w-full mx-auto border-t border-gray-4">
    <!-- Accordion -->
    <div v-for="(item, index) in items" :key="index" class="border-b border-gray-4">
      <!-- Parent Item -->
      <div
        class="flex w-full md:w-1/3 border justify-between items-center p-4 cursor-pointer transition-all duration-300"
        @click="toggleParent(index)">
        <div>
          <span :class="activeParent === index ? 'text-orange' : 'text-black'">{{ item.title }}</span>
        </div>
        <div :class="['w-3 h-3 transition-transform duration-300', activeParent === index ? 'rotate-90' : '']">
          <Arrow direction="left" :strokeWidth="22.5" :fillColor="activeParent === index ? '#d98c3a' : '#000000'" />
        </div>
      </div>
      <!-- Child Items -->
      <TransitionRoot
        as="template"
        :show="activeParent === index"
        enter="transition-all duration-1000 ease-in"
        enterFrom="max-h-0 overflow-hidden"
        enterTo="max-h-screen overflow-hidden"
        leave="transition-all duration-700 ease-out"
        leaveFrom="max-h-screen overflow-hidden"
        leaveTo="max-h-0 overflow-hidden">
        <div>
          <div v-for="(child, childIndex) in item.children" :key="childIndex"
            class="border-t cursor-pointer transition-colors hover:bg-gray-100"
            @click="openPopup(item, child, childIndex)">
            <div class="flex items-center justify-between w-full pr-10 md:w-1/3 p-3 pl-6"
              :class="activeChild === childIndex ? 'text-orange' : 'text-black'">
              <span>{{ child.name }}</span>
              <Arrow direction="left" :strokeWidth="22.5" :fillColor="'currentColor'" />
            </div>
          </div>
        </div>
      </TransitionRoot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { TransitionRoot } from '@headlessui/vue';
import { Arrow } from '../frontend-components/Svg/Icons';
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  accordionData: {
    type: Array,
    default: () => [],
  },
});

const items = ref(props.accordionData);
const activeParent = ref(null);
const activeChild = ref(null);
const showPopup = ref(false);
const popupTitle = ref('');
const popupDescription = ref('');
const currentItem = ref({});
const selectedMaterialName = ref('');
const selectedMaterialImages = ref([]);

const toggleParent = (index) => {
  activeParent.value = activeParent.value === index ? null : index;
};

const openPopup = (item, child) => {
  currentItem.value = item;
  popupTitle.value = item.title;
  popupDescription.value = item.description;
  selectedMaterialName.value = child.name;
  selectedMaterialImages.value = child.images.map((image, i) => ({
    name: `${child.name} Image ${i + 1}`,
    file_url: image,
  }));
  showPopup.value = true;
};

const closeMenu = ref(null);
const closePopup = () => {
  showPopup.value = false;
  activeChild.value = null;
};

onClickOutside(closeMenu, closePopup);

watch(
  () => props.accordionData,
  (newData) => {
    items.value = newData;
  },
  { immediate: true }
);
</script>