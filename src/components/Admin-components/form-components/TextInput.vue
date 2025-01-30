<template>
  <InputLabel :for="props.label" :class="{ 'ml-8': hasCheckBox, 'ml-1': !hasCheckBox }"> {{ props.label }}</InputLabel>
  <div v-if="isTextarea" class="m-0 p-0 border-0 flex">
    <SingleCheck v-if="hasCheckBox" :id="`${id}${label}`" label="" v-model:modelValue="checked"></SingleCheck>
    <textarea :id="`${id} ${label}`" :class="textareaClass" v-model="model" ref="inputRef" :rows="rows"
      :placeholder="placeholder" v-bind="$attrs" />
  </div>
  <div v-else class="relative m-0 p-0 border-0 flex">
    <SingleCheck v-if="hasCheckBox" :id="`${label} input`" label="" v-model:modelValue="checked"></SingleCheck>
    <input :id="`${id} ${label}`" :name="`${id} ${label}`" :class="inputClass" v-model="model" ref="inputRef"
      :placeholder="placeholder" v-bind="$attrs" />
    <span class="absolute right-4 mt-2">
      <slot></slot>
    </span>
  </div>
  <div v-show="errMessage">
    <p class="text-sm ml-1 text-red" :class="{ 'ml-8': hasCheckBox }">{{ errMessage }}</p>
  </div>
</template>

<script setup>
import InputLabel from './InputLabel.vue';
import { onMounted, ref, computed, watch } from 'vue';
import SingleCheck from './SingleCheck.vue';

const props = defineProps({
  modelValue: [String, Boolean, Number],
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

const emits = defineEmits(['update:modelValue', 'update:checkValue']);

const inputClass = computed(() => ({
  'py-3 px-4 block w-full border-stroke rounded-lg text-[14px] focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none': true,
  'border-red': props.errMessage,
}));

const textareaClass = computed(() => ({
  'py-3 px-4 block w-full border-stroke rounded-lg text-[14px] focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none': true,
  'border-red': props.errMessage, 
}));

const model = ref(props.modelValue);
const inputRef = ref(null);
const checked = ref(false);

onMounted(() => {
  // Focus if there's an error message initially
  if (props.errMessage) {
    inputRef.value?.focus();
  } else if (inputRef.value && inputRef.value.hasAttribute('autofocus')) {
    inputRef.value.focus();
  }
});

// Watch for changes in modelValue
watch(() => props.modelValue, (newValue) => {
  model.value = newValue;
});

// Watch for changes in errMessage
watch(() => props.errMessage, (newErrMessage) => {
  if (newErrMessage) {
    inputRef.value?.focus();
  }
});

// Watch for model changes
watch(model, (newValue) => {
  emits('update:modelValue', newValue);
});

// Watch for checked state changes
watch(checked, (newChecked) => {
  emits('update:checkValue', newChecked);
});

// Expose focus method
defineExpose({ focus: () => inputRef.value.focus() });
</script>