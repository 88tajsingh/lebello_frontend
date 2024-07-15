<script setup>
import { onMounted, ref } from 'vue';

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
});

const model = defineModel({
    type: String,
    required: true,
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
    <div v-if="isTextarea" class="m-0 p-0 border-0">
        <textarea 
        class="w-full rounded-lg border border-stroke bg-transparent outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white" v-model="model"
        ref="input" 
         :rows="rows"
        :placeholder="placeholder"
        v-bind="$attrs"
        />
    </div>
    <div v-else class="relative m-0 p-0 border-0">
        <input
        class="w-full rounded-lg border border-stroke bg-transparent outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white" v-model="model"
        ref="input"
        :placeholder="placeholder"
        v-bind="$attrs"
        />
        <span class="absolute right-4 mt-2">
        <slot></slot>
      </span>
    </div>
    </template>
