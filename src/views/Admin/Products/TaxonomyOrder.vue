<template>
    <PageHeader> Product Taxonomy Order </PageHeader>
    <div class="flex items-center justify-end gap-2">

        <div class="w-52">
            <Select :options="getDomainsList" title="Select Domain" showfield="name" class="w-full" valueField="id" label="All Domain"
                v-model="domain_id" />
        </div>
        <div class="w-52">
            <Select :options="productTaxonomy" title="Select Taxonomy" showfield="name" class="w-full" valueField="value"
                label="Select Taxonomy" v-model="key" />
        </div>
    </div>
    <Dreagable v-model:list="treeData" parentfield="name" childField="name" @update:list="handleListUpdate">
    </Dreagable>
    <div v-if="treeData.length === 0"> No data here </div>
    <Button v-if="permissions.write" @click="handleSorting" :disabled="sortedData.length === 0"
        bg_th_color=" mt-5 text-white bg-[#2271B1] hover:bg-[#0a4b78]" class="text-sm ml-auto px-3 py-1">
        Save
    </Button>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { showToast } from '@/helper/functions'
import { getDomains, getProductContractTree, getProductSeriesTree, getProductCategoryTypeTree, MaterialTreeList, getProductTypeTree } from '@/helper/Apis'
import CommonServices from '@/services/CommonServices'
import { productTaxonomy } from '@/json/data'
import Dreagable from '@/components/Admin-components/Dreag-able.vue'
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import store from '@/store'

const sortedData = ref([])
const getDomainsList = ref([])
const domain_id = ref('')
const treeData = ref([])
const key = ref('material')
const loading = ref(false)
const permissions = store.getters.user.permissions;

function handleListUpdate(updatedList) {
    sortedData.value = updatedList
}

const handleChange = () => {
    console.log('key', key.value)
    loading.value = true
    if (key.value === 'material') {
        materialTree({ domain_id: domain_id.value })
    } else if (key.value === 'contract') {
        ProductContractTree({ domain_id: domain_id.value })
    } else if (key.value === 'product_type') {
        handleProductTypeTree({ domain_id: domain_id.value })
    } else if (key.value === 'product_series') {
        handleProductSeriesTree({ domain_id: domain_id.value })
    } else if (key.value === 'product_category_type') {
        getProductCategoryTypeTreeList({ domain_id: domain_id.value })
    }
}

// material
const materialTree = async (payload) => {
    loading.value = true
    treeData.value = await MaterialTreeList(payload)
    loading.value = false
}

// ContractType
const getProductCategoryTypeTreeList = async (payload) => {
    loading.value = true
    treeData.value = await getProductCategoryTypeTree(payload)
    loading.value = false
}

// Contract
const ProductContractTree = async (payload) => {
    loading.value = true
    treeData.value = await getProductContractTree(payload)
    loading.value = false
}

// ProductSeries
const handleProductSeriesTree = async (payload) => {
    loading.value = true
    treeData.value = await getProductSeriesTree(payload)
    loading.value = false
}

// ProductType
const handleProductTypeTree = async (payload) => {
    loading.value = true
    treeData.value = await getProductTypeTree(payload)
    loading.value = false
}


// material sorting api call
const handleSorting = async () => {
    let id = sortedData.value.map((item) => ({
        id: item.id,
        children: item.children
            ? item.children.map((child) => ({ id: child.id }))
            : [],
    }))
    try {
        loading.value = true
        await CommonServices.taxonomySorting({
            key: key.value,
            data: id,
            domain_id: domain_id.value,
        }).then((res) => {
            if (res.status === 200 && res.data.success === true) {
                showToast(' Sorting data sucessfully', 'success')
                handleChange()
                loading.value = false
            }
            if (res.status === 400) {
                showToast(' Somthing went wrong', 'error')
                handleChange()
                loading.value = false
            }
        })
    } catch (e) {
        console.error('Error while log in:', e)
    }
}

const getDomainList = async (payload) => {
    getDomainsList.value = await getDomains(payload)
    const defaultDomain = getDomainsList.value.filter((site) => site.default === 1)[0]
    domain_id.value = defaultDomain.id
    store.dispatch('setDomain', defaultDomain)
}

onMounted(() => {
    getDomainList()
})

watch(key, handleChange)
watch(domain_id, () => {
    const defaultDomain = getDomainsList.value.filter(
        (site) => site.id == domain_id.value
    )
    store.dispatch('setDomain', defaultDomain[0])
    materialTree({ domain_id: domain_id.value })
})
</script>