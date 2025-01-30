<template>
  <Loader :isLoading="loading" :fullPage="true" />
  <form class="flex my-auto" @submit.prevent="updateSlug">
    <TextInput
      type="text"
      class="block mr-2 h-[40px] w-full"
      placeholder="Master Slug"
      v-model="slugUpdateValue"
    />
    <button
      type="submit"
      :disabled="slugUpdateValue === form.slug || loading"
      class="flex px-5 items-center justify-center rounded bg-primary text-[15px] font-sm text-white hover:bg-opacity-90"
    >
      Update Slug
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { showToast } from '@/helper/functions';

// Props from parent component
const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  SlugUpdateservices:{
    type: Function,
    required: true,
  },
  masteridKeyName:{
    type: String,
    required: true,
  }
});

// Emits to parent component
const emit = defineEmits(['update-slug']);

// Local state
const slugUpdateValue = ref(props.form.slug || '');
const loading = ref(false);

// Watch for changes in the form prop
watch(() => props.form.slug, (newSlug) => {
  slugUpdateValue.value = newSlug;
});

const updateSlug = async () => {
  loading.value = true;
  try {
     const masterId = props.form[props.masteridKeyName];
    const payload = {
      [props.masteridKeyName]: masterId, 
      slug: slugUpdateValue.value,
    };
    
    const { status, data } = await props.SlugUpdateservices(payload);
    status === 200
      ? showToast(data.message, 'success')
      : showToast(data.message, 'error');
    if (status === 200) {
      emit('update-slug'); 
    }
  } catch (error) {
    showToast('Something went wrong', 'error');
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
};
</script>

