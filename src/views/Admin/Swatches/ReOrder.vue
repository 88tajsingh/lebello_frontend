<template>
  <PageHeader>Swatches - Re-Order</PageHeader>
  <div class="w-52 ml-auto">
    <Select :options="getDomainsList" showfield="name" class="w-full" valueField="id" label="All Domain"
      v-model="domain_id" />
  </div>
  <Dreagable v-model:list="list" @update:list="handleListUpdate" parentfield="title" Classes="mt-3 border-[#ccc]">
  </Dreagable>
  <p v-if="list.length === 0">No Data Found</p>
  <Button v-if="permissions.write" @click="handleSortSwatches" :disabled="sortedData.length === 0"
    bg_th_color=" mt-5 text-white bg-[#2271B1] hover:bg-[#0a4b78]" class="text-sm ml-auto px-3 py-1">
    Save
  </Button>
  <Loader :isLoading="loading" :fullPage="true" />

</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { showToast } from '@/helper/functions'
import { getDomains } from '@/helper/Apis';
import SwatchesServices from '@/services/SwatchesServices';
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Button from "@/components/Admin-components/Buttons/Button.vue";
import Dreagable from "@/components/Admin-components/Dreag-able.vue";
import store from '@/store';

const sortedData = ref([])
const list = ref([])
const getDomainsList = ref([])
const domain_id = ref('')
const permissions = store.getters.user.permissions;

function handleListUpdate(updatedList) {
  sortedData.value = updatedList;
};

const loading = ref(false);
// get Swatches function
const handleGetSwatches = async (payload) => {
  list.value = []
  loading.value = true;
  try {
    const res = await SwatchesServices.getSwatches(payload);
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
    const res = await SwatchesServices.swatchesSorting({ key: 'swatches', data: id ,domain_id:domain_id.value });
    if (res.status === 200 && res.data.success) {
      sortedData.value = [];
      showToast(res.data.message, 'success');
    }
  } catch (error) {
    showToast(res.data.message, 'error');
  } finally {
    loading.value = false;
  }
}

const getDomainList = async (payload) => {
  getDomainsList.value = await getDomains(payload)
  const defaultDomain = getDomainsList.value.filter(site => site.default === 1)[0];
  domain_id.value = defaultDomain.id
  store.dispatch('setDomain', defaultDomain);
}
onMounted(() => {
  // contractLoctionTree({domain_id:store.getters.getDomain});
  getDomainList();
  // loading.value = true;
});

// watch(SelectedOption, handleChange);
watch(
  () => domain_id.value,
  () => {
    const defaultDomain = getDomainsList.value.filter(site => site.id == domain_id.value);
    store.dispatch('setDomain', defaultDomain[0]);
    handleGetSwatches({ domain_id: domain_id.value });
  }
);
</script>
