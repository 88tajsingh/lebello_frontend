<template>
    {{ src }}
    <img
      v-if="isIntersecting"
      :src="src"
      :alt="alt"
      class="lazy-load-image"
      ref="imageRef" 
    />
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  const props = defineProps({
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
    },
  });
  
  const isIntersecting = ref(false);
  const imageRef = ref(null);
  
  // Set up Intersection Observer once the component is mounted
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isIntersecting.value = true;
          observer.unobserve(entry.target); // Stop observing after loading
        }
      });
    });
  
    if (imageRef.value) {
      observer.observe(imageRef.value); // Observe the image element
    }
  });
  
  console.log('Image source changed:', props.src);
  watch(
    () => props.src,
    () => {
      isIntersecting.value = false; 
      if (imageRef.value) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              isIntersecting.value = true;
              observer.unobserve(entry.target);
            }
          });
        });
        observer.observe(imageRef.value);
      }
    }
  );
  
  </script>
  
  <style scoped>
  
  </style>
  