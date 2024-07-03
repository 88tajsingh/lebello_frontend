<template>
  <PageHeader> Material - Re-Order</PageHeader>
      <Dreagable v-model:list="list" @update:list="handleListUpdate" parentfield="name" Classes=" border-l-4 border-[#ccd0d4]">
      </Dreagable>
      <Button type="" bg_th_color=" mt-5 text-white bg-[#2271B1] hover:bg-[#0a4b78]" class=" text-sm ml-auto px-3 py-1">
        Update
      </Button>
      {{sortedData  }}
</template>
<script setup>
import { ref } from "vue";
import PageHeader  from '@/components/Admin-components/PageHeader.vue'
import Button from "@/components/Admin-components/Buttons/Button.vue";
import Dreagable from "@/components/Admin-components/Dreag-able.vue";

const props = defineProps({
  materials: {
    type: Object,
    default: () => {},
  },
});
// const list = ref(props.materials)
const sortedData = ref([]);

// console.log(props.materials);

const list = ref([
    {
        "id": "14339",
        "name": "Pixie Weaving"
    },
    {
        "id": "3261",
        "name": "RopeTek"
    },
    {
        "id": "2744",
        "name": "Lebello Fibers"
    },
    {
        "id": "3437",
        "name": "Knittex"
    },
    {
        "id": "3451",
        "name": "Surface Tex"
    },
    {
        "id": "2730",
        "name": "Performance Fabrics"
    },
    {
        "id": "3458",
        "name": "Base Fabrics"
    },
    {
        "id": "2596",
        "name": "Colored Surfaces"
    }
]);

  
function handleListUpdate(updatedList) {
  console.log("Updated list in parent:", updatedList);
  sortedData.value = updatedList;
  console.log("sortedData", sortedData.value);
}
</script>
