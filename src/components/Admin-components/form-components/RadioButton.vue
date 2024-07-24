<template>
    <div>
      <label :class="labelClass">
        <input 
          type="radio" 
          :name="name" 
          :value="value" 
          :checked="modelValue === value"
          @change="updateValue"
          :class="radioClass"
        >
        <span :class="textClass">{{ label }}</span>
      </label>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    modelValue: String,
    name: String,
    label: String,
    value: {
      type: [String,Number],
      default: 'inline-flex items-center'
    },
    labelClass: {
      type: String,
      default: 'inline-flex items-center'
    },
    radioClass: {
      type: String,
      default: 'class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"'
    },
    textClass: {
      type: String,
      default: 'ml-2'
    }
  })
  
  const emits = defineEmits(['update:modelValue'])
  
  const updateValue = () => {
    emits('update:modelValue', props.value)
  }
  </script>
  
  <style>
  /* Additional custom styles if needed */
  </style>
  