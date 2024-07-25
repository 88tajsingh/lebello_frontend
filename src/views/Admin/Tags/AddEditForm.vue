<template>
    <DefaultCard  :cardTitle="id ? `Edit Product Type ` : `Add Product Type`">
        <DomainComponent :domains="items" @customChange="(id)=>form.domain_id = id"></DomainComponent>
        <form @submit.prevent="handleSubmit">
        <div class="p-6.5 grid grid-cols-2 gap-6">
            <div class="flex flex-col ">
                <TextInput type="text" class=" " :class="{ 'border-red': errors.name }"
                    placeholder="" v-model="form.name" :errMessage="errors.name"
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
           {{ id ? `Update ` : `Submit` }}
        </button>
    </form>
</DefaultCard>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import { getProductTypeTree } from '@/helper/Apis'
import CommonServices from '@/services/CommonServices'
import { clearError,showToast } from '@/helper/functions'
import { onMounted, ref,watch } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const MaterialTreeListData = ref([])
const loading = ref(false)
const props = defineProps(['id'])
const id = ref(props.id || null)
const form = ref({})
const errors = ref({})
const PreviousDomain = ref(null)
const masterId = ref(null)

const validateForm = () => {
    let isValid = true
    errors.value = {}

    if (!form.value.name) {
        errors.value.name = 'Name is required'
        isValid = false
    }
    return isValid
}

const handleSubmit = async () => {
    try {
        if (validateForm()) {
            // emit('handleApi', { ...form.value });
            if(id.value !== null ) 
            handleEditTags( { ...form.value })
            else
            handleAddTags( { ...form.value })
        }
    } catch (e) {
        console.error('Error material add edit :', e)
    }
}

// get 
const handleTagsbyId = async (payload) => {
  loading.value = true;
  try {
    const res = await CommonServices.getTags(payload);
    if (res.status === 200 && res.data.success) {
      if (res.data.data?.length > 0) {
        form.value = res.data.data[0];
        PreviousDomain.value = form.value.domain_id;
        masterId.value = form.value.master_material_id;     
      }
    }
  } catch (error) {
    console.error('Error fetching location:', error);
  } finally {
    loading.value = false;
  }
}

const handleAddTags = async (payload) => {
  loading.value = true;
  try {
    const res = await CommonServices.addTags(payload);
    if (res.status === 200 && res.data.success) {
      showToast(res.data.message, 'success');
      router.push('/tags');
    } else if (res.status === 400) {
      showToast(res.data.message, 'error');
    }
  } catch (error) {
    showToast('Something went wrong', 'error');
    console.error('Error adding location:', error);
  } finally {
    loading.value = false;
  }
}

const handleEditTags = async () => {
  loading.value = true;
  if (form.value.domain_id !== PreviousDomain.value) {
    delete form.value.id;
  }else{
      // clone existing  in other domain 
        form.value = { ...form.value, master_material_id: masterId.value };
  }
  try {
    const res = await CommonServices.editTags({...form.value});
    if (res.status === 200) {
      showToast(res.data.message, 'success');
      router.push('/tags');
    } else if (res.status === 400) {
      showToast(res.data.message, 'error');
    }
  } catch (error) {
    console.error('Error editing location:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(()=>{
    if(props.id !== undefined && props.id !== null && props.id !== ' ' ) {
        handleTagsbyId({id:props.id,domain_id:store.getters.getDomain.id});
        form.value.domain_id = store.getters.getDomain.id
    }
})

</script>