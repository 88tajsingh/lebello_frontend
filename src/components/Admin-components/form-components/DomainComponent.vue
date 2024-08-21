<template>   
  <div class="flex ml-auto mt-2 gap-2 justify-end">
    <div class="w-52">
      <Select :options="DropData" showfield="name" class="w-full" valueField="id" label="Select Domain" v-model="domain_id" />
    </div>
  </div>
  <div class="flex flex-wrap mt-2">
    <div class="flex flex-wrap">
      <div v-for="(item, index) in domainsArray" 
           @click="emitItemClick(item)" 
           :key="item.id" 
           class="badge py-1 border border-black relative bg-blue-500 px-2 rounded-lg flex items-center mb-2 mr-2 cursor-pointer" 
           :class="{'border-primary bg-primary text-gray': item && selectedDomain && item.id === selectedDomain.id }">
        {{ item.name }} ({{ item.country ? item.country.code : 'N/A' }}) {{formData&& formData?.default_domain[0] === item.id ?'*':''}}
        <button
                type="button" 
                @click.stop="handleDeleteData(index)" 
                class="ml-2 hover:text-red-500 focus:outline-none">

          <svg v-if="selectedDomain.id === item.id" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" :stroke="item && selectedDomain && item.id === selectedDomain.id ? '#EFF4FB' : '#1C274C'" stroke-width="1.5"></circle>
            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" :stroke="item && selectedDomain && item.id === selectedDomain.id ? '#EFF4FB' : '#1C274C'" stroke-width="1.5" stroke-linecap="round"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
   <DeleteModal v-model:isOpen="deleteFlag" :modalTitle="'Delete '" @delete="handleDelte()">
    Do you want to delete ?
  </DeleteModal>
   <DeleteModal v-model:isOpen="deleteMasterFlag" :modalTitle="'Master Delete'" @delete="masterDelete()">
    While Deleting this the children and clones are also deleted   ?
  </DeleteModal>

</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
import CommonServices from '@/services/CommonServices';
import { showToast } from '@/helper/functions';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useStore();
const emit = defineEmits(['customChange', 'domainArray']);
const DropData = ref([]);
const domain_id = ref(null);
const domainsArray = ref([]);
const selectedDomain = ref(null);
const deleteFlag = ref(null);
const deleteMasterFlag = ref(null);
const index = ref();
const formData = ref(store.getters.editData);
const props = defineProps({
  cardTitle: {
    type: String,
    default: ' ',
  },
 
  deleteService: {
    type: Function,
  },
  masterKey: {type: String,},
  masterDeleteService: {type: Function,},
  routeTo: {type: String,},
});


const handleAddTabs = () => {
  const selectedDomain = DropData.value.find(domain => domain.id == domain_id.value);
  if (selectedDomain && !domainsArray.value.some(domain => domain.id === selectedDomain.id)) {
    domainsArray.value.push(selectedDomain);
  }
};

const handleDeleteData = (deleteIndex) => {
  console.log(selectedDomain.value.id , formData.value?.default_domain[0])
  if(formData.value.domains_data.includes(selectedDomain.value.id)){
    index.value = deleteIndex;
    if(selectedDomain.value.id === formData.value?.default_domain[0]){
      deleteMasterFlag.value = true;
    }
    else{
      deleteFlag.value = true;
    }
  }
  else{
    removeItem(deleteIndex)
  }
};

const handleDelte = async () => {
  const payload = { id: formData.value.id };
  try {
        const res = await props.deleteService(payload);
    
        if (res.status === 200) {
          showToast(res.data.message, 'success')
          // store.dispatch('setEdit', );
          removeItem(index.value)
        } else if (res.status === 400) {
          showToast(res.data.message, 'error')
        }
      } catch (error) {
        showToast('Something went wrong', 'error')
        console.error('Error:', error)
      } finally {
      //  if(loading) loading.value = false
      }
};
const masterDelete = async() => {
  const payload = {
  id: formData.value.id,
  [props.masterKey]: formData.value[props.masterKey]
};  try {
        const res = await props.masterDeleteService(payload);
        if (res.status === 200) {
          showToast(res.data.message, 'success')
            router.push(`/${props.routeTo}`)
        } else if (res.status === 400) {
          showToast(res.data.message, 'error')
        }
      } catch (error) {
        showToast('Something went wrong', 'error')
        console.error('Error:', error)
      } finally {
      }
}


const removeItem = (indexValue) => {
  console.log(indexValue);
  if (indexValue >= 0 && indexValue < domainsArray.value.length) {
    domainsArray.value.splice(indexValue, 1);
    if (domainsArray.value.length > 0) {
      emit('customChange', domainsArray.value[0].id);
      selectedDomain.value = domainsArray.value[0];
    
    } else {
      emit('customChange', null);
      selectedDomain.value = null;
    }
    emitArray();
  }
};

const emitItemClick = (item) => {
  emit('customChange', item.id);
  selectedDomain.value = item;
};

const emitArray = () => {
  const ids = domainsArray.value.map(domain => domain.id);
  emit('domainArray', ids);
};

const mapIdsToDomains = () => {
  // Ensure DropData and formData.value.domains_data are available
  if (DropData.value.length === 0 || !formData.value.domains_data || formData.value.domains_data.length === 0) return;

  // Map domain IDs to domain objects
  const domains = formData.value.domains_data
    .map(id => DropData.value.find(domain => domain.id === id))
    .filter(domain => domain !== undefined);

  // Update domainsArray with the mapped domains
  domainsArray.value = domains;
  emitArray();
};

const handleGetDomains = async () => {
  try {
    const res = await CommonServices.getDomains();
    if (res.status === 200 && res.data.success) {
      DropData.value = res.data.data;
      const defaultDomain = DropData.value.find(site => site.default === 1);
      selectedDomain.value = store.getters.getDomain || defaultDomain || null;
      domain_id.value = selectedDomain.value ? selectedDomain.value.id : null;
      emit('customChange', domain_id.value);

      mapIdsToDomains();
    }
  } catch (e) {
    console.error('Error while fetching domains:', e);
  }
};

// Watch for changes in domains prop and update domainsArray
watch(
  () => formData.value?.domains_data,
  () => {
    mapIdsToDomains();
  },
  { immediate: true }
);

// Watch for changes in domain_id
watch(
  domain_id,
  () => {
    handleAddTabs();
  }
);

// Watch for changes in domainsArray
watch(
  () => domainsArray.value,
  () => {
    emitArray();
  },
  { immediate: true }
);

onMounted(() => {
  handleGetDomains();
});
</script>


