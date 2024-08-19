<template>
  <div class="rounded-lg border border-stroke px-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div class=" flex justify-between border-b text-xl py-3 px-6.5 dark:border-strokedark" :class="{ 'border-stroke': props.cardTitle }">
      <h3 class="font-medium text-black dark:text-white">{{ props.cardTitle }}</h3>
      <!-- <div class="flex gap-3 my-auto">
        <TextInput
        type="text"
        class="block mr-2 h-[40px] w-full"
        placeholder=""
        v-model="form.slug"
        />
      </div> -->
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { onMounted, ref, watch } from 'vue'

const form = ref({})
const emit = defineEmits(['customChange'])

const props = defineProps({
  cardTitle: {
    type: String,
    default: ' ',
  },
});

</script>


