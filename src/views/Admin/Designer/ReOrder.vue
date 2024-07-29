<template>
    <PageHeader>Designer - Re-Order</PageHeader>
    <div class="w-52 ml-auto">
            <Select :options="getDominsList" showfield="name" class="w-full" valueField="id" label="Select Domain" v-model="domain_id" />
    </div>
    <Dreagable v-model:list="list" @update:list="handleListUpdate" parentfield="title" Classes="mt-3 border-[#ccc]">
    </Dreagable>
    <p v-if="list.length === 0">No Data Found</p>
    <Button @click="handleSortSwatches" :disabled="sortedData.length===0" bg_th_color=" mt-5 text-white bg-[#2271B1] hover:bg-[#0a4b78]" class="text-sm ml-auto px-3 py-1">
        Save
    </Button>
    <Loader :isLoading="loading" :fullPage="true"/>

</template>
<script setup>
import { ref,onMounted,watch } from 'vue';
import { showToast } from '@/helper/functions'
import { getDomins } from '@/helper/Apis';
import DesignerServices from '@/services/DesignerServices';
import SwatchesServices from '@/services/SwatchesServices';
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Button from "@/components/Admin-components/Buttons/Button.vue";
import Dreagable from "@/components/Admin-components/Dreag-able.vue";
import store from '@/store';

const sortedData = ref([])
const list = ref([])
const getDominsList = ref([])
  const domain_id = ref('')
  const SelectedOption = ref(0)

function handleListUpdate(updatedList) {
    console.log('Updated list in parent:', updatedList);
    sortedData.value = updatedList;
    console.log("sortedData", sortedData.value)
};

const loading = ref(false);
// get  function

// get materials function
const handleGetDesigner = async (payload) => {

loading.value = true;
try {
    await DesignerServices.getDesigners(payload)
        .then(res => {
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
        }).catch((res) => {
            console.log("error", res)
        });
} catch (e) {
    console.error('Error while log in:', e);
    loading.value = false;
} finally {
    loading.value = false;
}
}

const handleGetSwatches = async (payload) => {
  list.value=[]
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

const getDomainList = async (payload) => {
  getDominsList.value = await getDomins(payload)
  const defaultDomain = getDominsList.value.filter(site => site.default === 1)[0];
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
      const defaultDomain = getDominsList.value.filter(site => site.id == domain_id.value );
      store.dispatch('setDomain', defaultDomain[0]);
      handleGetDesigner({domain_id:domain_id.value});
    }
);
</script>
