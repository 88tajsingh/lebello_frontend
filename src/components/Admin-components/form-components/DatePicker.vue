<template>
    <div>
      <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <DateTimePicker
        v-model="internalValue"
        :format="format"
        :use12-hour="use12Hour"
        :id="id"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import DateTimePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'Select Date and Time',
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss',
    },
    use12Hour: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: 'datetime-picker',
    },
  });
  
  const emits = defineEmits(['update:modelValue']);
  
  const internalValue = ref(props.modelValue);
  
  watch(internalValue, (newValue) => {
    emits('update:modelValue', newValue);
  });
  
  watch(
    () => props.modelValue,
    (newValue) => {
      internalValue.value = newValue;
    }
  );
  </script>
  
  <style scoped>
  /* Add any additional styling if needed */
  </style>
  