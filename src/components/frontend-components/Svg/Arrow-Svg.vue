<template>
  <div :style="{ transform: `rotate(${rotation}deg)` }">
    <svg
      :width="props?.size"
      :height="props?.size"
      :fill="computedFillColor"
      viewBox="0 0 1024 1024"
      class="icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      :stroke="computedFillColor"
      :stroke-width="props?.strokeWidth"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
          :fill="computedFillColor"
        ></path>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  initialRotation: {
    type: String,
    default: 'up',
  },
  direction: {
    type: String,
    default: 'up',
  },
  size: {
    type: String,
    default: '15px',
  },
  fillColor: {
    type: String,
    default: '#0fc000', 
  },
  strokeWidth: {
    type: Number,
    default: 77.824,
  },
})

const rotation = ref(0)
const computedFillColor = computed(() => {
  return props?.fillColor || '#000000'
})

function rotate(direction) {
  switch (direction) {
    case 'up':
      rotation.value = 0
      break
    case 'down':
      rotation.value = 180
      break
    case 'left':
      rotation.value = -90
      break
    case 'right':
      rotation.value = 90
      break
    default:
      rotation.value = 0
  }
}

rotate(props.initialRotation)

watch(
  () => props.direction,
  (newDirection) => {
    rotate(newDirection)
  },
  { immediate: true }
)

defineExpose({
  rotate,
})
</script>

<style scoped>
/* Additional styles */
</style>
