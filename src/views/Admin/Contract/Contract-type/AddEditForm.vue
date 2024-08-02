<template>
    <DefaultCard :cardTitle="form.id ? `Edit Contract Type` : `Add Contract Type`">
        <DomainComponent :domains="items" @customChange="(id)=>form.domain_id = id"></DomainComponent>
        <form @submit.prevent="handleSubmit">
            <div class="p-6.5 grid grid-cols-2 gap-6">
                <div class="flex flex-col ">
                    <TextInput type="text" class=" " placeholder="" v-model="form.contract_name" label="Name" />
                    <p class="text-sm text-[#646970] text-[11.5px]">
                        The name is how it appears on your site.
                    </p>
                </div>
                <div class="flex flex-col ">
                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug" placeholder=""
                        v-model="form.slug" />
                    <p class="text-sm text-[#646970] text-[11.5px]">
                        The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains
                        only
                        letters, numbers, and hyphens.
                    </p>
                </div>
                <div class="flex flex-col ">
                    <InputLabel for="Parent Contract Type" value="Parent Contract Type" />
                    <Select :options="contractTypeTreeListData" :defaultZero='true' showfield="contract_name" class="w-full" valueField="id"
                        label="Select Contract Type" v-model="form.parent_contract_type" />
                    <p class="text-sm text-[#646970] text-[11.5px]">
                        Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of
                        Bebop
                        and Big Band.
                    </p>
                </div>
                <div class="flex flex-col w-full">
                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Contract Sub Page Meta Title"
                        placeholder="" v-model="form.sub_page_meta_title" />
                </div>
                <div class="flex flex-col ">
                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Contract Sub Page Meta Keywords"
                        placeholder="" v-model="form.sub_page_meta_keywords" />
                </div>
                <div class="flex flex-col ">
                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Contract Project Meta Title"
                        placeholder="" v-model="form.project_page_meta_title" />
                </div>
                <div class="flex flex-col ">
                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Contract Project Meta Keywords"
                        placeholder="" v-model="form.project_page_meta_keywords" />
                </div>
                <div class="flex flex-col w-full">
                    <TextInput type="text" class="block mr-2  w-full" label="Description" placeholder=""
                        :isTextarea="true" rows="4" v-model="form.description" />
                    <p class="text-sm text-[#646970] text-[11.5px]">
                        The description is not prominent by default; however, some themes may show it.
                    </p>
                </div>
                <div class="flex flex-col w-full">
                    <TextInput type="text" class="block mr-2  w-full" label="Contract Sub Page Meta Description"
                        placeholder="" :isTextarea="true" rows="4" v-model="form.sub_page_meta_description" />
                </div>
                <div class="flex flex-col w-full">
                    <TextInput type="text" class="block mr-2  w-full" label="Contract Project Meta Description"
                        placeholder="" :isTextarea="true" rows="4" v-model="form.project_page_meta_description" />
                    <p class="text-sm text-[#646970] text-[11.5px]">
                        The description is not prominent by default; however, some themes may show it.
                    </p>
                </div>
                <div class="flex flex-col w-full">
                    <div class=" mt-3 flex overflow-x-auto">
                        <img v-if="form.image" :src="$filePath(form.image)" class="inline-block w-auto h-34 mr-4"
                            :alt="file?.alternative_text || 'image'">
                    </div>
                </div>
            </div>
            <button type="submit"
                class="flex mt-5 px-10 mb-10 ml-10 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Submit
            </button>
        </form>
    </DefaultCard>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import { contractTypeTreeList } from '@/helper/Apis'
import ContractServices from '@/services/ContractServices'

import _ from 'lodash';
import { showToast } from '@/helper/functions'
import { onMounted, ref, watch, } from 'vue'
import { defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const errors = ref({})
const contractTypeTreeListData = ref([])
const loading = ref(false)
const PreviousDomain = ref(null)
const form = ref(store.getters.editData ||{ parent_contract_type:0})

const validateForm = () => {
    let isValid = true
    errors.value = {}

    if (!form.value.contract_name) {
        errors.value.contract_name = 'Name is required'
        isValid = false
    }
    return isValid
}

const handleSubmit = async () => {
    if (validateForm()) {
            if (store.getters.editData === null) {
                handleAddContractType({ ...form.value })
            }
            else {         
                if (form.value.domain_id !== PreviousDomain.value) {
                    delete form.value.id;
                }
                const { deleted_at, created_at, updated_at, featured_image_url, ...refinedPayload } = form.value;
                handleEditContractType({ ...refinedPayload })
            }
        }
}


// api for get patents child json parent contract listing 
const contractTreeList = async (payload) => {
    contractTypeTreeListData.value = await contractTypeTreeList(payload)
}

const handleAddContractType = async (payload) => {
    loading.value = true
    try {
        loading.value = true;
        await ContractServices.addContractType(payload)
            .then(res => {
                if (res.status === 200 && res.data.success === true) {
                    showToast('Add contract sucessfully', 'success')
                    router.push('/contract-type')
                    loading.value = false;
                    // handleGetMaterials();   
                }
                if (res && res.status === 400) {
                    showToast(res.data.data.error, 'error')
                    loading.value = false
                }
            })
    } catch (e) {
        console.error('Error while log in:', e);
    }
}
// edit material function
const handleEditContractType = async (payload) => {
    loading.value = true;

    try {
        await ContractServices.editContractType(payload)
            .then(res => {
                if (res && res.status === 200) {
                    showToast('Edit Contract Type sucessfully', 'success')
                    loading.value = false
                    router.push('/contract-type')
                }
                if (res && res.status === 400) {
                    showToast('Somthing went wrong', 'error')
                    loading.value = false
                }
            })
    } catch (e) {
        console.error('Error while log in:', e);
    }
}

onMounted(()=>{
    PreviousDomain.value = store.getters.getDomain.id;
    contractTreeList({domain_id:store.getters.getDomain.id});

})

watch(
    () => form.value.domain_id,
    () => {
        contractTreeList({domain_id:store.getters.getDomain.id});
    }
);

</script>

<style>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>
