<template>
    <DefaultCard  :cardTitle="id ? `Edit Contract Location` : `Add Contract Location`">
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
                <Select :options="MaterialTreeListData" showfield="contract_location" class="w-full" valueField="id" label="Select Location"
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
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const MaterialTreeListData = ref([])
const loading = ref(false)
const props = defineProps({
    id:{
        type: String,
    }
})
const id = ref(props.id || null)
const form = ref({ parent_contract_location:0})
const errors = ref({})

const validateForm = () => {
    let isValid = true
    errors.value = {}

    if (!form.value.contract_location) {
        errors.value.contract_location = 'Name is required'
        isValid = false
    }
    return isValid
}

const handleSubmit = async () => {
    try {
        if (validateForm()) {
            // emit('handleApi', { ...form.value });
            if(id.value !== null ) 
            handleEditContractLocation( { ...form.value })
            else
            handleAddContractLocation( { ...form.value })
        }
    } catch (e) {
        console.error('Error material add edit :', e)
    }
}

// api for get patents child json parent material listing 
const materialTree = async () => {
  MaterialTreeListData.value = await contractLoctionTreeList()
}
// get material
const handleGetLocationById = async (payload) => {
    loading.value = true
  try {
    await ContractServices.getContractLocation(payload)
      .then(res => {
        if (res.status === 200 && res.data.success === true) {
          if (res.data.data && res.data.data.length > 0) {
            form.value = res.data.data[0]
            loading.value = false
          }
        }
      }).catch((res) => {
        console.log("error", res)
      });
  } catch (e) {
    console.error('Error while log in:', e);
  } 
}

const handleAddContractLocation = async (payload) => {
    loading.value = true
  try {
    loading.value = true;
    await ContractServices.addContractLocation(payload)
      .then(res => {
        if (res.status === 200 && res.data.success === true) {
            showToast('Add Contract Location sucessfully','success')
            router.push('/contract-location')
            loading.value = false;
          // handleGetMaterials();   
        }
        if (res && res.status === 400 ) {
            showToast('Somthing went wrong','error')
            loading.value = false
        }
      })
  } catch (e) {
    console.error('Error while log in:', e);
  } finally {
    loading.value = false;
  }
}
// edit material function
const handleEditContractLocation = async (payload) => {
  loading.value = true;
  try {
    await ContractServices.editContractLocation(payload)
      .then(res => {
        // editCloseModal();
        if (res && res.status === 200) {
            showToast('Edit Contract Location sucessfully' ,'success')
            loading.value = false
            router.push('/contract-location')

        }
        if (res && res.status === 400 ) {
            showToast('Somthing went wrong','error')
            loading.value = false
        }
      })
  } catch (e) {
    console.error('Error while log in:', e);
  } finally {
    loading.value = false;
    // editCloseModal();
  }
}

onMounted(()=>{
    if(props.id !== undefined && props.id !== null && props.id !== '' ) {
        handleGetLocationById({id:props.id});
    }
    materialTree();


})
</script>

<style>
.e-ddl.e-input-group.e-control-wrapper .e-input {
    font-size: 20px;
    font-family: emoji;
    color: #ab3243;
    background: #000505;
}

.e-ddl.e-input-group.e-control-wrapper .e-input {
    font-size: 20px;
    font-family: emoji;
    color: #ab3243;
    background: #32a5ab;
}

.custom-file-upload {
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    transition: background-color 0.3s ease;
}

.custom-file-upload:hover {
    background-color: #e2e2e2;
}

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
