<script setup>
// Define props
const props = defineProps({
  value: {
    type: String,
  },
  for: {
    type: String,
  },
});
</script>

<template>
  <label :for="props.for" v-bind="$attrs" class="block text-sm font-medium mb-1">
    <span v-if="props.value">{{ props.value }}</span>
    <span v-else><slot /></span>
  </label>
</template>