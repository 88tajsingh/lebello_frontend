<template>{{form}}
    <DefaultCard  :cardTitle="form.id ? `Edit Contract Location` : `Add Contract Location`">
        <DomainComponent :domains="items" @customChange="(id)=>form.domain_id = id"></DomainComponent>
        <form @submit.prevent="handleSubmit">
        <div class="p-6.5 grid grid-cols-2 gap-6">
            <div class="flex flex-col ">
                <TextInput type="text" class=" " :class="{ 'border-red': errors.contract_location }"
                    placeholder="" v-model="form.contract_location" :errMessage="errors.contract_location"
                    @update:model="clearError('name')" label="Name" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The name is how it appears on your site.
                </p>
            </div>
            <div class="flex flex-col ">
                <TextInput type="text" class="block mr-2 h-[40px] w-full" 
                    placeholder="" v-model="form.slug" label="Slug" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only
                    letters, numbers, and hyphens.
                </p>
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Parent Material" value="Parent Contract Location" />
                <Select :options="contractLoction" :defaultZero='true' showfield="contract_location" class="w-full" valueField="id" label="Select Location"
                    v-model="form.parent_contract_location" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of Bebop
                    and Big Band.
                </p>
            </div>
       
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Description"
                     placeholder="" :isTextarea="true" rows="4"
                    v-model="form.description" 
                    />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The description is not prominent by default; however, some themes may show it.
                </p>
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
import { contractLoctionTreeList } from '@/helper/Apis'
import ContractServices from '@/services/ContractServices'
import { clearError,showToast } from '@/helper/functions'
import { onMounted, ref,watch } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

//store and router 
const store = useStore();
const router = useRouter();

// Reactive state
const errors = ref({}); 
const loading = ref(false);
const form = ref(store.getters.editData || { parent_contract_location: 0 });
const PreviousDomain = ref(null);
const contractLoction = ref([]);

// Validate form data
const validateForm = () => {
    errors.value = {};
    if (!form.value.contract_location) {
        errors.value.contract_location = 'Name is required';
        return false;
    }
    return true;
};

// Submit form data (add or edit contract location)
const handleSubmit = async () => {
    if (!validateForm()) return;

    loading.value = true;
    const { featured_image_url, ...payload } = form.value;
    if (payload.domain_id !== PreviousDomain.value) delete payload.id;

    try {
        const service = store.getters.editData ? ContractServices.editContractLocation : ContractServices.addContractLocation;
        const res = await service(payload);
        console.log(res)
        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            router.push('/contract-location');
        } else if (res.status === 400) {
            showToast(res.data.message, 'error');
        }
    } catch (error) {
        showToast('Something went wrong', 'error');
        console.error('Error:', error);
    } finally {
        loading.value = false;
    }
};

// Fetch contract location tree data
const contractLoctionTree = async (payload) => {
    contractLoction.value = await contractLoctionTreeList(payload);
};

// Initialize component
onMounted(() => {
    PreviousDomain.value = store.getters.getDomain.id;
    contractLoctionTree({ domain_id: store.getters.getDomain.id });
});

// Watch for changes in domain_id and refresh contract location tree
watch(
    () => form.value.domain_id,
    () => {
        contractLoctionTree({ domain_id: store.getters.getDomain.id });
    }
);
</script>