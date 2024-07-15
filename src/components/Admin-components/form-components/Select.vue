<template>
  <div class="">
    <select 
      class="rounded-lg border bg-white border-stroke bg-transparent outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
      v-bind="$attrs"
      v-model="selectedOption"
      :class="cusClass"
      @change="handleChange"
    >
      <option :value="selectedOption=== null ? null :0" disabled>{{ label }}</option>
      <template v-for="option in options" :key="option[valueField]">
                <option :value="option[valueField]" class="group-option">{{ option[showfield] }}</option>                
                <option v-if="option.children" v-for="child in option.children" :value="child[valueField]" :key="child[valueField]">
                  &nbsp;&nbsp;&nbsp;{{ child[showfield] }}</option>
            </template>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// Define props and emit setup
const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  showfield: {
    type: String,
    required: true,
  },
  valueField: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  cusClass: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number], 
    default: ''
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedOption = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  selectedOption.value = newValue;
});

const handleChange = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>
