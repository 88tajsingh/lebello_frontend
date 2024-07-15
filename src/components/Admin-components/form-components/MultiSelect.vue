<template>
  <div class="multi-select border-stroke" ref="multiSelectRef">
    <div @click="toggleDropdown" class="multi-select-input rounded-lg border border-stroke bg-transparent outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white">
      <span v-if="selectedOptions.length === 0">{{ placeHolder }}</span>
      <span v-else>{{ selectedOptions.join(', ') }}</span>
      <button v-if="selectedOptions.length > 0" @click.stop="clearAll" class="clear-button">
        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#757575"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#757575"></path> </g></svg>
      </button>
      <span v-if="selectedOptions.length === 0" class="clear-button">
        <svg fill="#757575" height="12px" width="12px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z"></path> </g> </g> </g></svg>
      </span>
    </div>
    <div v-if="isOpen" class="multi-select-dropdown rounded-md ring-0 py-auto ring-black ring-opacity-5">
      <div v-for="option in options" :key="option.value" @click="selectOption(option.value)" class="multi-select-option" :class="{ selected: selectedOptions.includes(option.value) }">
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  placeHolder: {
    type: String,
    default: 'Select options'
  }
});

const emit = defineEmits(['update:modelValue']);

const selectedOptions = ref(Array.isArray(props.modelValue) ? [...props.modelValue] : []);
const isOpen = ref(false);
const multiSelectRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  if (selectedOptions.value.includes(option)) {
    selectedOptions.value = selectedOptions.value.filter((o) => o !== option);
  } else {
    selectedOptions.value.push(option);
  }
  emit('update:modelValue', selectedOptions.value);
};

const clearAll = () => {
  selectedOptions.value = [];
  emit('update:modelValue', selectedOptions.value);
};

const handleClickOutside = (event) => {
  if (multiSelectRef.value && !multiSelectRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.multi-select {
  position: relative;
  background-color: white;
}

.multi-select-input {
  border: 1px solid #e9e2e2;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.clear-button {
  margin-left: auto;
  padding: 4px 8px;
  color: white;
  border: none;
  cursor: pointer;
}

.multi-select-dropdown {
  position: absolute;
  border: 1px solid #868484;
  width: 100%;
  max-height: 100px; 
  overflow-y: auto; 
  background: white;
  z-index: 1000;
}

.multi-select-option {
  padding-left: 8px;
  cursor: pointer;
  height: 30px; 
  margin: auto 0;
  line-height: 30px; 
}

.multi-select-option.selected {
  background-color: #007bff;
  color: white;
}
</style>
