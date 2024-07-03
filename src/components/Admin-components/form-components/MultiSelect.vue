<template>
  <div class="multi-select" ref="multiSelectRef">
    <div @click="toggleDropdown" class="multi-select-input rounded-lg border border-stroke bg-transparent outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white">
      <span v-if="selectedOptions.length === 0">{{ placeHolder }}</span>
      <span v-else>{{ selectedOptions.join(', ') }}</span>
      <button v-if="selectedOptions.length > 0" @click="clearAll" class="clear-button">
        <svg width="20px" height="18px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- SVG content -->
        </svg>
      </button>
      <span v-if="selectedOptions.length === 0" class="clear-button">
        <svg fill="#5c5c5c" height="12px" width="12px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 491.996 491.996" xml:space="preserve" stroke="#5c5c5c">
          <!-- SVG content -->
        </svg>
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
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  placeHolder: String
});

const selectedOptions = ref(props.modelValue ? [...props.modelValue] : []);
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
  border: 1px solid #707070;
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
