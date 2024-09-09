<template>
    <PageHeader> Product Taxonomy Order </PageHeader>
    <div class="flex items-center justify-end gap-2">
        
        <div class="w-52">
            <Label class="ml-1">Select Domain</Label>
            <Select :options="getDominsList" showfield="name" class="w-full" valueField="id" label="All Domain"
                v-model="domain_id" />
        </div>
    </div>
    <Dreagable v-model:list="treeData" parentfield="name"
        childField="name" @update:list="handleListUpdate">
    </Dreagable>
    <div v-if="treeData.length === 0"> No data here </div>
    <Button @click="handleSorting" :disabled="sortedData.length === 0"
        bg_th_color=" mt-5 text-white bg-[#2271B1] hover:bg-[#0a4b78]" class="text-sm ml-auto px-3 py-1">
        Save
    </Button>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { showToast } from '@/helper/functions'
import {getDomins,getProjectCategoryTree} from '@/helper/Apis'
import CommonServices from '@/services/CommonServices'
import { productTaxonomy } from '@/json/data'
import Dreagable from '@/components/Admin-components/Dreag-able.vue'
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import store from '@/store'

const sortedData = ref([])
const getDominsList = ref([])
const domain_id = ref('')
const treeData = ref([])
const key = ref('project_categories')
const loading = ref(false)

function handleListUpdate(updatedList) {
    sortedData.value = updatedList
}

const getProjectContractTreeList = async (payload) => {
    loading.value = true
    treeData.value = await getProjectCategoryTree(payload)
    loading.value = false
}
// material sorting api call
const getIdMapping = (data) => {
    return data.map((item) => ({
        id: item.id,
        children: item.children
            ? item.children.map((child) => ({ id: child.id }))
            : [],
    }));
};

const handleSorting = async () => {
    const id = getIdMapping(sortedData.value);

    try {
        loading.value = true;

        const res = await CommonServices.taxonomySorting({
            key: key.value,
            data: id,
            domain_id: domain_id.value,
        });

        if (res.status === 200 && res.data.success) {
            showToast('Sorting data successfully', 'success');
        } else if (res.status === 400) {
            showToast('Something went wrong', 'error');
        }

    } catch (e) {
        console.error('Error while sorting:', e);
        showToast('An error occurred', 'error');
    } finally {
        loading.value = false;
    }
};


const getDomainList = async (payload) => {
    getDominsList.value = await getDomins(payload)
    const defaultDomain = getDominsList.value.filter((site) => site.default === 1)[0]
    domain_id.value = defaultDomain.id
    store.dispatch('setDomain', defaultDomain)
}

onMounted(() => {
    getDomainList()
})

watch(domain_id, () => {
    const defaultDomain = getDominsList.value.filter(
        (site) => site.id == domain_id.value
    )
    store.dispatch('setDomain', defaultDomain[0])
    getProjectContractTreeList({ domain_id: domain_id.value })
})
</script>