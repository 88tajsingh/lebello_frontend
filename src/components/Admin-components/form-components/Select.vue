<template>
  <div class="flex">
    <SingleCheck 
      v-if="hasCheckBox" 
      :id="`${label}-checkbox`" 
      v-model:checked="checked" 
      @change="handleCheckboxChange"
    />
    <select 
      class="rounded-lg border bg-white border-stroke bg-transparent outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
      v-bind="$attrs"
      v-model="selectedOption"
      :class="[cusClass]"
      :disabled="disabled"
      @change="handleSelectChange"
    >
      <!-- Optional placeholder option -->
      <option v-if="defaultZero" value='0'>{{ label }}</option>
      <option v-else :value="selectedOption === null ? null : ''">{{ label }}</option>
      <template v-for="option in options" :key="option[valueField]">
        <option :value="option[valueField]" class="group-option">{{ option[showfield] }}</option>
        <template v-if="option.children">
          <option v-for="child in option.children" :value="child[valueField]" :key="child[valueField]">
            &nbsp;&nbsp;&nbsp;{{ child[showfield] }}
          </option>
        </template>
      </template>
    </select>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';
import SingleCheck from './SingleCheck.vue';

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
  defaultZero: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [Number, String], 
    default: 0
  },
  hasCheckBox: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'update:checkValue']);

const selectedOption = ref(props.modelValue);
const checked = ref(false);

watch(() => props.modelValue, (newValue) => {
  selectedOption.value = newValue;
});

const handleSelectChange = (event) => {
  emit('update:modelValue', event.target.value);
};

const handleCheckboxChange = (event) => {
  checked.value = event.target.checked;
  emit('update:checkValue', checked.value);
};

watch(checked, (newChecked) => {
  emit('update:checkValue', newChecked);
});
</script>
