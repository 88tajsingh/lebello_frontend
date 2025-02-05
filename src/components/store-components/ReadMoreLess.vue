<template>
    <div>
      <!-- Truncated text with "Read More" button -->
      <div v-if="!isExpanded" class="overflow-hidden ">
        <div v-html="truncatedHtml" v-bind-html-events></div>
      </div>
      <!-- Full text on md to  large devices -->
      <!-- <div v-show="!isExpanded" class="hidden overflow-hidden sm:block" v-html="text"></div> -->

      <!-- Full text with "Read Less" button -->
      <transition name="expand" @enter="setHeight" @leave="setHeight">
        <div v-if="isExpanded" class="overflow-hidden ">
          <div v-html="fullTextWithButton" v-bind-html-events></div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps } from 'vue';
  
  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
    maxLength: {
      type: Number,
      default: 120,
    },
    handleAdjustHeight: {
      type: Function,
    }
  });
  
  const isExpanded = ref(false);

  const truncatedHtml = computed(() => {
    const textContent = props.text;
  
    if (textContent.length <= props.maxLength) {
      return textContent;
    }
  
    let truncated = textContent.slice(0, props.maxLength);
  
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 0) {
      truncated = truncated.substr(0, lastSpace);
    }
      return `${truncated}... <button class="text-orange font-graphik " data-action="toggleExpand">read more</button>`;
  });
  
  const fullTextWithButton = computed(() => {
    return `${props.text} <button class="text-orange font-graphik " data-action="toggleExpand">read less</button>`;
  });
  
  const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
    if (props.handleAdjustHeight) {
      props.handleAdjustHeight();
    }
  };
  
  const setHeight = (el, done) => {
    const height = isExpanded.value ? el.scrollHeight : 0;
    el.style.height = `${height}px`;
    el.addEventListener('transitionend', done, { once: true });
  };
  
  const vBindHtmlEvents = {
    mounted(el) {
      el.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'BUTTON' && target.dataset.action) {
          const action = target.dataset.action;
          if (typeof window[action] === 'function') {
            window[action]();
          }
        }
      });
    },
  };
  
  // Expose toggleExpand to the window object so it can be called from the v-html content
  window.toggleExpand = toggleExpand;
  </script>
  
  <style scoped>
  .read-more-btn {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-weight: bold;
    padding: 0;
    text-decoration: underline;
  }
  
  .expand-enter-active,
  .expand-leave-active {
    transition: height 0.4s ease-out;
    overflow: hidden;
  }
  
  .expand-enter-from,
  .expand-leave-to {
    height: 0;
  }
  </style>
  