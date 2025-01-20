<template>
    <Accordion :open="open" :header="header" :containerClass="containerClass">
      <div v-for="(field, index) in fields" :key="index">
        <TextInput
          :id="field.key"
          :type="field.type === 'textarea' ? 'text': field.type "
          :isTextarea="field.type === 'textarea' ? true : undefined"
          :rows="field.type === 'textarea' ? field.rows : undefined"
          class="block w-[180px]"
          v-model="form[field.key]"
          :placeholder="field.placeholder || `Enter ${field.key.replace('_', ' ')}`"
          :label="field.label || field.key.replace('_', ' ').toUpperCase()"
          :hasCheckBox="hasCheckBox"
          @update:checkValue="(value) => updateCheckedField(field.key, value)"
        />
        <p v-if="field.note" class="w-full" :class="[form.id ? 'pl-8 w-full' : '']">{{ field.note }}</p>
      </div>
    </Accordion>
  </template>
  
  <script setup>
  import { reactive } from "vue";
  import Accordion from '@/components/Admin-components/Accordion.vue'
  
  // Props for dynamic configuration
  const props = defineProps({
    open: {
      type: Boolean,
      default: true,
    },
    header: {
      type: String,
      default: "SEO Options",
    },
    containerClass: {
      type: String,
      default: "px-4",
    },
    form: {
      type: Object,
      required: true,
    },
    checkedFields: {
    type: Object,
    required: false, 
  },
    fields: {
      type: Array,
      required: true,
      default: () => [
      {
          key: "seo_title",
          type: "text",
          label: "Title Tag",
          placeholder: "Enter the title tag",
          note: "Custom title tag.",
        },
        {
          key: "meta_keywords",
          type: "textarea",
          rows: 4,
          label: "Meta Keywords",
          placeholder: "Enter keywords separated by commas",
          note: "Separate each term with a comma.",
        },
        {
          key: "meta_description",
          type: "textarea",
          rows: 4,
          label: "Meta Description",
          placeholder: "Enter a brief description",
          note: "Most search engines use a maximum of 160 characters for the description.",
        },
       
      ],
    },
    hasCheckBox: {
      type: Boolean,
      default: false,
    },
  });
  
  // Emits to handle checkbox updates
  defineEmits(["update:checkValue"]);
  
  const updateCheckedField = (key, value) => {
  props.checkedFields[key] = value;
};
  </script>
  