<template>
  <PageHeader> Taxonomy Order </PageHeader>
  <div class="w-52 ml-auto">
    <Select :options="getDominsList" showfield="name" class="w-full" valueField="id" label="All Domain"
      v-model="domain_id" />
  </div>
  <Dreagable v-model:list="MaterialTreeListData" parentfield="name" childField="name" @update:list="handleListUpdate">
  </Dreagable>
  <div v-if="MaterialTreeListData.length === 0"> No Data Found </div>
  <Button v-if="permissions.write" @click="handleSortMaterials" :disabled="sortedData.length === 0"
    bg_th_color=" mt-5 text-white bg-[#2271B1] hover:bg-[#0a4b78]" class="text-sm ml-auto px-3 py-1">
    Save
  </Button>
  <Loader :isLoading="loading" :fullPage="true" />
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { getDomins } from '@/helper/Apis'
import { showToast } from '@/helper/functions'
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Dreagable from '@/components/Admin-components/Dreag-able.vue'
import CommonServices from '@/services/CommonServices'
import { MaterialTreeList } from '@/helper/Apis'
import { useStore } from 'vuex';

const store = useStore();
const sortedData = ref([])
const MaterialTreeListData = ref([])
const getDominsList = ref([])
const domain_id = ref('')
const permissions = store.getters.user.permissions;

function handleListUpdate(updatedList) {
  sortedData.value = updatedList
  console.log('sorted data', sortedData.value)
}

// material sorting 
const materialTree = async (payload) => {
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
    const res = await CommonServices.taxonomySorting({ key: 'material', data: id, domain_id: domain_id.value });
    if (res.status === 200 && res.data.success) {
      showToast(res.data.message, 'success');
    } else if (res.status === 400) {
      showToast(res.data.message, 'error');
    }
  } catch (error) {
    console.error('Error sorting materials:', error);
    showToast('Error sorting materials', 'error');
  } finally {
    materialTree({ domain_id: store.getters.getDomain.id });
    loading.value = false;
  }
}

const getDomainList = async (payload) => {
  getDominsList.value = await getDomins(payload)
  const defaultDomain = getDominsList.value.filter(site => site.default === 1)[0];
  domain_id.value = defaultDomain.id
  store.dispatch('setDomain', defaultDomain);
}
onMounted(() => {
  // contractLoctionTree({domain_id:store.getters.getDomain});
  getDomainList();
  loading.value = true;
});

// watch(SelectedOption, handleChange);
watch(
  () => domain_id.value,
  () => {
    const defaultDomain = getDominsList.value.filter(site => site.id == domain_id.value);
    store.dispatch('setDomain', defaultDomain[0]);
    materialTree({ domain_id: domain_id.value });
  }
);
</script>
