<template>
  <div class="rounded-lg border border-[#E2E8F0] px-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div class=" flex justify-between items-center border-b text-xl  py-3 px-6.5 dark:border-strokedark" :class="{ 'border-stroke': props.cardTitle }">
      <h3 class="font-medium text-black dark:text-white">{{ props.cardTitle }}</h3>
        <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>

const emit = defineEmits(['customChange'])
const props = defineProps({
  cardTitle: {
    type: String,
    default: ' ',
  },
});
</script>


