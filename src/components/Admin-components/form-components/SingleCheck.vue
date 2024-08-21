<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      :id="props.id"
      class="form-checkbox h-5 w-5 text-blue-600"
      v-model="booleanModelValue"
      @change="onChange"
    >
    <label :for="id" class="ml-2 text-gray-700">{{ label }}</label>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, computed } from 'vue';

const props = defineProps({
  id: { type: [String,Number,Boolean], required: false },
  label: { type: String, default: '' },
  modelValue: { type: [Boolean, String, Number], default: false }
});

const emit = defineEmits(['update:modelValue']);

// Use computed to manage v-model for the checkbox
const booleanModelValue = computed({
  get() {
    return Boolean(props.modelValue);
  },
  set(value) {
    emit('update:modelValue', Boolean(value));
  }
});

// Watch for changes in modelValue prop and update local state
watch(() => props.modelValue, (newValue) => {
  booleanModelValue.value = Boolean(newValue);
});

// Emit the updated value when checkbox state changes
const onChange = () => {
  emit('update:modelValue', booleanModelValue.value);
};
</script>
