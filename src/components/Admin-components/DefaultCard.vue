<template>
  <div class="rounded-lg border border-stroke px-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div class="border-b text-xl py-4 px-6.5 dark:border-strokedark" :class="{ 'border-stroke': props.cardTitle }">
      <h3 class="font-medium text-black dark:text-white">{{ props.cardTitle }}</h3>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const emit = defineEmits(['customChange'])

const props = defineProps({
  cardTitle: {
    type: String,
    default: ' ',
  },
});

</script>

<style scoped>
/* Add your component-specific styles here */
</style>
