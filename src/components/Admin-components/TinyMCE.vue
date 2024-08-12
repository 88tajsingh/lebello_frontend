<script setup>
import Editor from '@tinymce/tinymce-vue'
import { ref } from "vue";

const key = import.meta.env.VITE_APP_TINY_MCE
const model = defineModel({
    type: String,
});
const content = ref('')

</script>

<template>
  <main id="sample" class=" overflow-hidden ">
    <Editor
      :api-key='key'
      :init="{
        plugins: 'lists link image table code help wordcount'
      }"
      v-model="model"
    />
  </main>
  {{ content }}
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    /* place-items: center; */
    width: 100%;
  }
}
</style>