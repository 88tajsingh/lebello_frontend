<template>
    <PageHeader> Taxonomy Order </PageHeader>
    <Dreagable v-model:list="MaterialTreeListData" parentfield="name" childField="name" @update:list="handleListUpdate">
    </Dreagable>
    <div v-if="!MaterialTreeListData"> No data here </div>
    <Button @click="handleSortMaterials" :disabled="sortedData.length===0" bg_th_color=" mt-5 text-white bg-[#2271B1] hover:bg-[#0a4b78]" class="text-sm ml-auto px-3 py-1">
        Save
    </Button>
    <Loader :isLoading="loading" :fullPage="true"/>
</template>
<script setup>
import { ref,onMounted } from 'vue'
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Dreagable from '@/components/Admin-components/Dreag-able.vue'
import { MaterialTreeList } from '@/helper/Apis'
import materialsServices from "@/services/MaterialsServices";

const sortedData = ref([])
const MaterialTreeListData = ref([])

function handleListUpdate(updatedList) {
    sortedData.value = updatedList
    console.log('sorted data',sortedData.value )
}

// material sorting 
const materialTree = async ()=>{
  MaterialTreeListData.value= await MaterialTreeList()
  loading.value = false;
}

const loading = ref(false);
// material sorting api call 
const handleSortMaterials = async () => {
  let id = sortedData.value.map(item => ({
    id: item.id,
    children: item.children ? item.children.map(child => ({ id: child.id })) : []
  }));
  try {
        loading.value = true;
    await  materialsServices.taxonomySorting({key:'contract_location',data:id})
        .then(res => {
          if (res.status === 200 && res.data.success === true) {
            console.log('sorting responce: ' + res.data)
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
  loading.value = true;
}
);
</script>
