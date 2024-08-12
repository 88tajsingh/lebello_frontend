<script setup>
import InputLabel from './InputLabel.vue';
import { onMounted, ref, computed,watch,defineEmits } from 'vue';
import { clearError } from '@/helper/functions';
import SingleCheck from './SingleCheck.vue';

const props = defineProps({
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
  errors: { Object }
});
// const handleInput = (event) => {
//   const input = event.target.name
//   console.log(" running " + JSON.stringify({...event.target}))
//   clearError(props.errors, event.target.name);
// };

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

const model = defineModel({
  type: String,
  default: '',
});

const emits = defineEmits(['update:checkValue'])

const input = ref(null);
const checked = ref(null);

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus();
  }
});

watch(checked, (newChecked) => {
  emits('update:checkValue', newChecked);
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
  <InputLabel :for="props.label"> {{ props.label }}</InputLabel>
  <div v-if="isTextarea" class="m-0 p-0 border-0 flex ">
    <SingleCheck v-if="hasCheckBox" :id="`${id}textbox`" label=""
    v-model:modelValue="checked"></SingleCheck>
    <textarea :id="`${id} ${label}`" :class="textareaClass" v-model="model" ref="input" :rows="rows" :placeholder="placeholder"
      v-bind="$attrs" />
  </div>
  <div v-else class="relative m-0 p-0 border-0 flex">
    <SingleCheck v-if="hasCheckBox" :id="`${id}textbox`" label=""
    v-model:modelValue="checked"></SingleCheck>
    <input :id="`${id} ${label}`" :class="inputClass" v-model="model" ref="input" @input="handleInput" :placeholder="placeholder"
      v-bind="$attrs" />
    <span class="absolute right-4 mt-2">
      <slot></slot>
    </span>
  </div>
  <div v-show="errMessage">
    <p class="text-sm ml-1 text-red">{{ errMessage }}</p>
  </div>
</template>
