<template>
  <svg :width="props.size" :height="props.size" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path :stroke="props.fillColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 27l7.5-7.5"></path> <circle cx="19" cy="13" r="9" :stroke="props.fillColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g></svg>
</template>

<script setup>

const props = defineProps({
  size: {
    type: String,
    default: "30px",
  },
  fillColor: {
    type: String,
    default: "#000000",
  },
});
</script>