<template>
  <PageHeader> Material - Re-Order</PageHeader>
      <Dreagable v-model:list="MaterialTreeListData " @update:list="handleListUpdate" parentfield="name" Classes=" border-l-4 border-[#ccd0d4]">
      </Dreagable>
      <Button @click="handleSortMaterials" :disabled='sortedData.length === 0' type="" bg_th_color=" mt-5 text-white bg-[#2271B1] hover:bg-[#0a4b78]" class=" text-sm ml-auto px-3 py-1">
        Update
      </Button>
      <Loader :isLoading="loading" :fullPage="true"/>

</template>
<script setup>
import { ref,onMounted } from "vue";
import PageHeader  from '@/components/Admin-components/PageHeader.vue'
import Button from "@/components/Admin-components/Buttons/Button.vue";
import Dreagable from "@/components/Admin-components/Dreag-able.vue";
import { MaterialTreeList } from '@/helper/Apis'
import materialsServices from "@/services/MaterialsServices";

const MaterialTreeListData = ref([])
const props = defineProps({
  materials: {
    type: Object,
    default: () => {},
  },
});
const sortedData = ref([]);

// update order
function handleListUpdate(updatedList) {
  sortedData.value = updatedList;
}
// material sorting 
const materialTree = async ()=>{
  MaterialTreeListData.value= await MaterialTreeList()
}
const loading = ref(false);
// material sorting api call 
const handleSortMaterials = async () => {
    let id = sortedData.value.map(item => item.id)
  try {
        loading.value = true;
    await  materialsServices.materialSorting({key:'material',data:id})
        .then(res => {
          if (res.status === 200 && res.data.success === true) {
            console.log('sprting responce: ' + res.data)
            materialTree();
              loading.value = false;
         }
        })  
    } catch (e) {
      console.error('Error while log in:', e);
    } 
}

onMounted(() =>{ 
  materialTree();
}
);
</script>
