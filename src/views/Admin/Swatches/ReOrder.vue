<template>
    <PageHeader>Material - Re-Order</PageHeader>
    <Dreagable v-model:list="list" @update:list="handleListUpdate" parentfield="title" Classes="mt-3 border-[#ccc]">
    </Dreagable>
    <Button @click="handleSortSwatches" :disabled="sortedData.length===0" bg_th_color=" mt-5 text-white bg-[#2271B1] hover:bg-[#0a4b78]" class="text-sm ml-auto px-3 py-1">
        Save
    </Button>
    <Loader :isLoading="loading" :fullPage="true"/>

</template>
<script setup>
import { ref,onMounted } from 'vue';
import SwatchesServices from '@/services/SwatchesServices';
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Button from "@/components/Admin-components/Buttons/Button.vue";
import Dreagable from "@/components/Admin-components/Dreag-able.vue";
const sortedData = ref([])
const list = ref([])
function handleListUpdate(updatedList) {
    console.log('Updated list in parent:', updatedList);
    sortedData.value = updatedList;
    console.log("sortedData", sortedData.value)
};

const loading = ref(false);
// get Swatches function
const handleGetSwatches = async () => {
  loading.value = true;
  try {
    await SwatchesServices.getSwatches()
      .then(res => {
        if (res.status === 200 && res.data.success === true) {
          if (res.data.data && res.data.data.length > 0) {
            list.value = res.data.data

          }
          loading.value = false;
        }
      }).catch((res) => {
        console.log("error", res)
      });
  } catch (e) {
    console.error('Error while log in:', e);
    loading.value = false;
  }
}

// Swatches sorting api call 
const handleSortSwatches = async () => {
    let id = sortedData.value.map(item => item.id)
  try {
        loading.value = true;
    await  SwatchesServices.swatchesSorting({key:'swatches',data:id})
        .then(res => {
          if (res.status === 200 && res.data.success === true) {
              loading.value = false;
              sortedData.value = [];
         }
        })  
    } catch (e) {
      console.error('Error while log in:', e);
    } 
}

onMounted(() =>{ 
    handleGetSwatches();
}
);
</script>
