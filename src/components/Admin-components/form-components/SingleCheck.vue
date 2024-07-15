<template>
    <div class="flex items-center">
      <input
        type="checkbox"
        :id="id"
        class="form-checkbox h-5 w-5 text-blue-600"
        v-model="isChecked"
        @change="onChange"
      >
      <label :for="id" class="ml-2 text-gray-700">{{ label }}</label>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, watch } from 'vue';
  
  const props = defineProps({
    id: { type: String, required: true },
    label: { type: String, default: '' },
    modelValue: { type: Boolean, default: false }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const isChecked = ref(props.modelValue);
  
  watch(() => props.modelValue, (newValue) => {
    isChecked.value = newValue;
    console.log(newValue)
  });
  
  const onChange = () => {
    emit('update:modelValue', isChecked.value);
  };
  </script>
  
  