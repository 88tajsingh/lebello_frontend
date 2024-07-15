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
    value: String,
    name: String,
    label: String,
    labelClass: {
      type: String,
      default: 'inline-flex items-center'
    },
    radioClass: {
      type: String,
      default: 'form-radio h-5 w-5 text-blue-600'
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
  