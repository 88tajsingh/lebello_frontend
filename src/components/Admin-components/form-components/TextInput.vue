<script setup>
import InputLabel from './InputLabel.vue';
import { onMounted, ref ,computed} from 'vue';
import { clearError } from '@/helper/functions';

const props = defineProps({
  label: String,
  errMessage: String,
  placeholder: String,
  isTextarea: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 3,
  },
  errors:{ Object}
});
// const handleInput = (event) => {
//   const input = event.target.name
//   console.log(" running " + input)
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
    default:'',
});

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
  <InputLabel> {{ props.label }}</InputLabel>
    <div v-if="isTextarea" class="m-0 p-0 border-0">
        <textarea 
        :class="textareaClass"
        v-model="model"
        ref="input" 
        :rows="rows"
        :placeholder="placeholder"
        v-bind="$attrs"
        />
    </div>
    <div v-else class="relative m-0 p-0 border-0">
        <input
        :class="inputClass"
         v-model="model"
        ref="input"
        @input="handleInput"
        :placeholder="placeholder"
        v-bind="$attrs"
        />
        <span class="absolute right-4 mt-2">
        <slot></slot>
      </span>
    </div>
    <div v-show="errMessage">
    <p class="text-sm ml-1 text-red">{{ errMessage }}</p>
  </div>
    </template>
