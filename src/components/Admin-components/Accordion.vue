<template>
  <div class="border font-graphik border-[#e6e3e3] rounded-md shadow-sm">
    <div class="">
      <details class="group" :open="modelValue">
        <summary
          @click="toggle"
          class="flex rounded-md items-center justify-between px-4 py-3 cursor-pointer bg-white transition-colors duration-150 ease-in-out"
        >
          <div class="flex items-center ">
            <CheckBox
              v-if="checkBox"
              :checked="isChecked"
              @update:checked="updateChecked"
              :label="header"
              class="mr-2"
            />
            <span v-else class="font-medium text-gray-900">
              {{ header }}
            </span>
          </div>
          <svg
            class="w-5 h-5 transition-transform duration-200 ease-in-out"
            :class="{ 'rotate-180': isOpen }"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </summary>
        <div :class="['p-4 bg-white rounded-md shadow-sm', containerClass]">
          <slot />
        </div>
      </details>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import CheckBox from './form-components/CheckBox.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  header: {
    type: String,
    required: true
  },
  checkBox: {
    type: Boolean,
    default: false
  },
  containerClass: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'update:checked']);

const isOpen = ref(props.modelValue);
const isChecked = ref(false);

watch(() => props.modelValue, (newValue) => {
  isOpen.value = newValue;
});

const toggle = () => {
  isOpen.value = !isOpen.value;
  emit('update:modelValue', isOpen.value);
};

const updateChecked = (value) => {
  isChecked.value = value;
  emit('update:checked', value);
};
</script>