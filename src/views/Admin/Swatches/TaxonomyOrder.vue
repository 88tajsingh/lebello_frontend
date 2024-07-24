<template>
  {{ store.getters.getDomain.id}}
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
import { showToast } from '@/helper/functions'
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Dreagable from '@/components/Admin-components/Dreag-able.vue'
import CommonServices from '@/services/CommonServices'
import { MaterialTreeList } from '@/helper/Apis'
import { useStore } from 'vuex';

const store = useStore();
const sortedData = ref([])
const MaterialTreeListData = ref([])

function handleListUpdate(updatedList) {
    sortedData.value = updatedList
    console.log('sorted data',sortedData.value )
}

// material sorting 
const materialTree = async (payload)=>{
  MaterialTreeListData.value = await MaterialTreeList(payload)
  loading.value = false;
}

const loading = ref(false);
// material sorting api call 
const handleSortMaterials = async () => {
  const id = sortedData.value.map(item => ({
    id: item.id,
    children: item.children ? item.children.map(child => ({ id: child.id })) : []
  }));
  loading.value = true;
  try { 
    const res = await CommonServices.taxonomySorting({ key: 'contract_location', data: id });

    if (res.status === 200 && res.data.success) {
      showToast('Sorting data successfully', 'success');
    } else if (res.status === 400) {
      showToast('Something went wrong', 'error');
    }
  } catch (error) {
    console.error('Error sorting materials:', error);
    showToast('Error sorting materials', 'error');
  } finally {
    materialTree({domain_id:store.getters.getDomain.id});
    loading.value = false;
  }
}


onMounted(() =>{ 
  materialTree({domain_id:store.getters.getDomain.id});
  loading.value = true;
}
);
</script>
