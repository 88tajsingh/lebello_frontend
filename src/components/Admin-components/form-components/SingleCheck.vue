<template>
    <div class="flex items-center">
      <input
        type="checkbox"
        :id="id"
        class="form-checkbox h-5 w-5 text-blue-600"
        v-model="booleanModelValue"
        @change="onChange"
      >
      <label :for="id" class="ml-2 text-gray-700">{{ label }}</label>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, watch,computed } from 'vue';
  
  const props = defineProps({
    id: { type: String, required: true },
    label: { type: String, default: '' },
    modelValue: { type: Boolean, default: false }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const isChecked = ref(props.modelValue);
  
  watch(() => props.modelValue, (newValue) => {
    isChecked.value = newValue;
  });

  const booleanModelValue = computed({
  get() {
    return Boolean(props.modelValue);
  },
  set(value) {
    emit('update:modelValue', Boolean(value));
  }
});

  
  const onChange = () => {
    emit('update:modelValue', isChecked.value);
  };
  </script>
  
  