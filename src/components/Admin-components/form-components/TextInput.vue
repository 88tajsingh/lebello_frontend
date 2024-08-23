<template>
  <InputLabel :for="props.label"> {{ props.label }}</InputLabel>
  <div v-if="isTextarea" class="m-0 p-0 border-0 flex">
    <SingleCheck v-if="hasCheckBox" :id="`${id}${label}`" label=""
      v-model:modelValue="checked"></SingleCheck>
    <textarea :id="`${id} ${label}`" :class="textareaClass" v-model="model" ref="inputRef" :rows="rows" :placeholder="placeholder"
      v-bind="$attrs" />
  </div>
  <div v-else class="relative m-0 p-0 border-0 flex">
    <SingleCheck v-if="hasCheckBox" :id="`${id}textbox`" label=""
      v-model:modelValue="checked"></SingleCheck>
     
    <input :id="`${id} ${label}`" :class="inputClass" v-model="model" ref="inputRef" :placeholder="placeholder"
      v-bind="$attrs" />
    <span class="absolute right-4 mt-2">
      <slot></slot>
    </span>
  </div>
  <div v-show="errMessage">
    <p class="text-sm ml-4 text-red">{{ errMessage }}</p>
  </div>
</template>

<script setup>
import InputLabel from './InputLabel.vue';
import { onMounted, ref, computed, watch, defineEmits, defineProps } from 'vue';
import SingleCheck from './SingleCheck.vue';

const props = defineProps({
  modelValue: String,
  label: String,
  errMessage: String,
  placeholder: String,
  id: {
    type: String,
    default: 'id',
  },
  isTextarea: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 3,
  },
  hasCheckBox: {
    type: Boolean,
    default: false,
  },
  errors: Object
});

watch(() => props.modelValue, (newValue) => {
  model.value = newValue;
});

const emits = defineEmits(['update:modelValue', 'update:checkValue']);

const inputClass = computed(() => ({
  'w-full rounded-lg border bg-transparent outline-none focus:border-primary focus-visible:shadow-none text-black dark:text-white': true,
  'border-stroke dark:border-form-strokedark dark:bg-form-input': !props.errMessage,
  'border-red': props.errMessage,
}));

const textareaClass = computed(() => ({
  'w-full rounded-lg border bg-transparent outline-none focus:border-primary focus-visible:shadow-none text-black dark:text-white': true,
  'border-stroke dark:border-form-strokedark dark:bg-form-input': !props.errMessage,
  'border-red': props.errMessage,
}));

const model = ref(props.modelValue); 

const inputRef = ref(null); // Changed from input to inputRef
const checked = ref(false);  

onMounted(() => {
  if (inputRef.value && inputRef.value.hasAttribute('autofocus')) {
    inputRef.value.focus();
  }
});

watch(model, (newValue) => {
  emits('update:modelValue', newValue);  
});

watch(checked, (newChecked) => {
  emits('update:checkValue', newChecked);
});

defineExpose({ focus: () => inputRef.value.focus() });
</script>
