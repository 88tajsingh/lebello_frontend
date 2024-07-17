<template>
    <PageHeader> Taxonomy Order </PageHeader>
    <div class="flex gap-6">
        <RadioButton v-for="option in taxonomyBtn" :key="option.value" name="Visibility" :value="option.value"
            :label="option.label" :modelValue="SelectedOption" @update:modelValue="SelectedOption = $event" />
    </div>
    <Dreagable v-if="SelectedOption === 0" v-model:list="contractTreeData" parentfield="contract_location"
        childField="contract_location" @update:list="handleListUpdate">
    </Dreagable>
    <Dreagable v-else v-model:list="contractTreeData" parentfield="contract_name" childField="contract_name"
        @update:list="handleListUpdate">
    </Dreagable>
    <div v-if="!contractTreeData"> No data here </div>
    <Button @click="handleSortMaterials" :disabled="sortedData.length === 0"
        bg_th_color=" mt-5 text-white bg-[#2271B1] hover:bg-[#0a4b78]" class="text-sm ml-auto px-3 py-1">
        Save
    </Button>
    <Loader :isLoading="loading" :fullPage="true" />
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { showToast } from '@/helper/functions'
import { contractLoctionTreeList, contractTypeTreeList } from '@/helper/Apis'
import CommonServices from '@/services/CommonServices'
import Dreagable from '@/components/Admin-components/Dreag-able.vue'
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import RadioButton from '@/components/Admin-components/form-components/RadioButton.vue';

const sortedData = ref([])
const contractTreeData = ref([])
const SelectedOption = ref(0)
const taxonomyBtn = ref([
    { label: 'Contract Location ', value: 0 },
    { label: 'Contract Type', value: 1 }])

function handleListUpdate(updatedList) {
    sortedData.value = updatedList
    console.log('sorted data', sortedData.value)
}

const handleChange = () => {
    console.log('handle change ', SelectedOption.value)
    if (SelectedOption.value === 0) {
        contractLoctionTree();
    }
    else {
        contractTypeTree();
    }
}

// contractLoctionTree sorting 
const contractLoctionTree = async () => {
    loading.value = true;
    contractTreeData.value = await contractLoctionTreeList()
    loading.value = false;
}
// contractLoctionTree sorting 
const contractTypeTree = async () => {
    loading.value = true;
    contractTreeData.value = await contractTypeTreeList()
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
        const key = SelectedOption.value === 1 ? 'contract_type' : 'contract_location'
        loading.value = true;
        console.log(id, key)
        await CommonServices.taxonomySorting({ key: key, data: id })
            .then(res => {
                if (res.status === 200 && res.data.success === true) {
                    showToast(' Sorting data sucessfully', 'success')
                    handleChange();
                    loading.value = false;
                }
                if (res.status === 400) {
                    showToast(' Somthing went wrong', 'error')
                    handleChange();
                    loading.value = false;
                }
            })
    } catch (e) {
        console.error('Error while log in:', e);
    }
}

onMounted(() => {
    contractLoctionTree();
    loading.value = true;
});

watch(SelectedOption, handleChange);

</script>
