<template>
    <div>
      <InputLabel :for="id" >{{ label }}</InputLabel>
      <DateTimePicker
        v-model="internalValue"
        :format="format"
        :use12-hour="use12Hour"
        :id="id"
        class="mt-1 block w-full  "
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import InputLabel from './InputLabel.vue';
  import DateTimePicker from '@vuepic/vue-datepicker';
  import dayjs from 'dayjs';

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
      default: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
    },
    use12Hour: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: 'datetime-picker',
    },
    dayjsFormat: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss',
    },
  });
  
  const emits = defineEmits(['update:modelValue']);
  
  const internalValue = ref(props.modelValue);
  
  watch(internalValue, (newValue) => {
    emits('update:modelValue', newValue);
  });
  
  watch(internalValue, (newValue) => {
  emits('update:modelValue', newValue);
});
  </script>
  
  <style scoped>
  /* Add any additional styling if needed */
  </style>
  