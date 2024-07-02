<template>
  <label v-if="label" class="mb-1 block font-medium  dark:text-white">{{ label }}</label>
  <div v-if="isTextarea" class="mb-4">
    <textarea
      class="py-3 px-4 block w-full rounded-lg border border-stroke bg-transparent  pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
      :rows="rows" :placeholder="placeholder" v-model="inputValue" ref="inputRef"
      @input="updateValue($event.target.value)"></textarea>
  </div>

  <div v-else>
    <div class="relative">
      <input
        class="w-full rounded-lg border border-stroke bg-transparent  outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
        :placeholder="placeholder" v-model="inputValue" ref="inputRef" v-bind="$attrs"
        @input="updateValue($event.target.value)" />
      <span class="absolute right-4 top-4">
        <slot></slot>
      </span>
    </div>
  </div>
  <!-- <input
    v-else
    class="border-gray-300 w-full focus:border-none focus:ring-indigo-800 rounded-md shadow-sm"
    :placeholder="placeholder"
    v-model="inputValue"
    ref="inputRef"
    v-bind="$attrs"
    @input="updateValue($event.target.value)"
  /> -->
  <div v-show="errMessage">
    <p class="text-sm text-red ">
      {{ errMessage }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';

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

const emit = defineEmits(['update:model']);

const inputValue = ref(props.value);

const inputRef = ref(null);
onMounted(() => {
  if (inputRef.value && inputRef.value.hasAttribute('autofocus')) {
    inputRef.value.focus();
  }
});

defineExpose({ focus: () => inputRef.value.focus() });

const updateValue = (newValue) => {
  inputValue.value = newValue;
  emit('update:model', newValue);
};
</script>
