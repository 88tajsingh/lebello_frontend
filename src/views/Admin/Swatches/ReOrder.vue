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
import { showToast } from '@/helper/functions'
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
    const res = await SwatchesServices.getSwatches();
    if (res.status === 200 && res.data.success) {
      if (res.data.data && res.data.data.length > 0) {
        list.value = res.data.data;
      } else {
        showToast('No swatches found', 'info');
      }
    } else if (res.status === 400) {
      showToast('Something went wrong', 'error');
      materialTree();
    }
  } catch (error) {
    console.error('Error fetching swatches:', error);
    showToast('Error fetching swatches', 'error');
  } finally {
    loading.value = false;
  }
}

const handleSortSwatches = async () => {
  const id = sortedData.value.map(item => item.id);
  loading.value = true;
  try {
    const res = await SwatchesServices.swatchesSorting({ key: 'swatches', data: id });
    if (res.status === 200 && res.data.success) {
      sortedData.value = [];
      showToast('Sorting data successfully', 'success');
    }
  } catch (error) {
    console.error('Error sorting swatches:', error);
    showToast('Error sorting swatches', 'error');
  } finally {
    loading.value = false;
  }
}


onMounted(() =>{ 
    handleGetSwatches();
}
);
</script>
