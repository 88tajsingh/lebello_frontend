<template>
  <div class="flex ml-auto mt-2 gap-2 justify-end">
    <SingleCheck v-if="store.getters.editData?.id && selectedDomain?.default" label="Override All Domains" v-model="check" ></SingleCheck>
    <div class="w-52">
      <Select 
        :options="DropData" 
        showfield="name" 
        class="w-full" 
        valueField="id" 
        label="Domain List"
        v-model="domain_id" 
      />
    </div>
  </div>
  <div class="flex flex-wrap mt-2">
    <div class="flex flex-wrap">
      <div 
        v-for="(item, index) in domainsArray" 
        @click="emitItemClick(item)" 
        :key="item.id"
        class="badge py-1 border border-black relative bg-blue-500 px-2 rounded-lg flex items-center mb-2 mr-2 cursor-pointer"
        :class="{ 'border-primary bg-primary text-gray': item.id === selectedDomain?.id }"
      >
        {{ item.name }} ({{ item.country ? item.country.code : 'N/A' }}) 
        {{ isDefaultDomain(item.id) ? '*' : '' }}
        <button 
          type="button" 
          @click.stop="handleDeleteData(index)" 
          class="ml-2 hover:text-red-500 focus:outline-none"
        >
          <svg v-if="selectedDomain?.id === item.id" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" :stroke="getStrokeColor(item)" stroke-width="1.5"></circle>
            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" :stroke="getStrokeColor(item)" stroke-width="1.5" stroke-linecap="round"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <DeleteModal v-model:isOpen="deleteFlag" :modalTitle="'Delete '" @delete="handleDelete">
    Do you want to delete?
  </DeleteModal>
  <DeleteModal v-model:isOpen="deleteMasterFlag" :modalTitle="'Master Delete'" @delete="masterDelete">
    While Deleting this, the children and clones are also deleted?
  </DeleteModal>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import CommonServices from '@/services/CommonServices';
import { showToast } from '@/helper/functions';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

defineProps(['deleteService', 'masterKey', 'masterDeleteService', 'routeTo']);


const router = useRouter();
const store = useStore();
const emit = defineEmits(['customChange', 'domainArray']);
const DropData = ref([]);
const domain_id = ref(null);
const domainsArray = ref([]);
const selectedDomain = ref(null);
const deleteFlag = ref(false);
const deleteMasterFlag = ref(false);
const index = ref(null);
const check = ref(null);
const formData = ref(store.getters.editData);
const unCheckDomains = ref([]);
const isDefaultDomain = (id) => formData.value?.default_domain?.[0] === id;

const getStrokeColor = (item) => {
  return item && selectedDomain.value?.id && item.id === selectedDomain.value?.id ? '#ffffff' : '#1C274C';
};

const handleAddTabs = () => {
  const selected = DropData.value.find(domain => domain.id == domain_id.value);
  if (selected && !domainsArray.value.some(domain => domain.id === selected.id)) {
    domainsArray.value.push(selected);
  }
};

const handleDeleteData = (deleteIndex) => {
  if (formData.value?.domains_data?.includes(selectedDomain.value.id)) {
    index.value = deleteIndex;
    deleteMasterFlag.value = selectedDomain.value.id === formData.value.default_domain[0];
    deleteFlag.value = !deleteMasterFlag.value;
  } else {
    removeItem(deleteIndex);
  }
};

const handleDelete = async () => {
  const payload = { id: formData.value.id };
  try {
    const res = await props.deleteService(payload);
    handleResponse(res, () => removeItem(index.value));
  } catch (error) {
    handleError(error);
  }
};

const masterDelete = async () => {
  const payload = {
    id: formData.value.id,
    [props.masterKey]: formData.value[props.masterKey],
  };
  try {
    const res = await props.masterDeleteService(payload);
    handleResponse(res, () => router.push(`/${props.routeTo}`));
  } catch (error) {
    handleError(error);
  }
};

const handleResponse = (res, onSuccess) => {
  if (res.status === 200) {
    showToast(res.data.message, 'success');
    onSuccess();
  } else if (res.status === 400) {
    showToast(res.data.message, 'error');
  }
};

const handleError = (error) => {
  showToast('Something went wrong', 'error');
};

const removeItem = (indexValue) => {
  if (indexValue >= 0 && indexValue < domainsArray.value.length) {
    domainsArray.value.splice(indexValue, 1);
    selectedDomain.value = domainsArray.value.length > 0 ? domainsArray.value[0] : null;
    emit('customChange', selectedDomain.value?.id);
    emitArray();
  }
};

const emitItemClick = (item) => {
  console.log(item);
  if(item.default === 1) {
  const filteredIds = DropData.value.filter(domain => domain.id !== item.id).map(domain => domain.id);
  const resultArray = filteredIds.filter(id => !formData.value.domains_data.includes(id));
  unCheckDomains.value = resultArray;
  emit('customChange',resultArray )
  }
  else
  emit('customChange', item.id);
  selectedDomain.value = item;
};

const emitArray = () => {
  const ids = domainsArray.value.map(domain => domain.id);
  emit('domainArray', ids);
};

const mapIdsToDomains = () => {
  if (!DropData.value.length || !formData.value?.domains_data?.length) return;

  domainsArray.value = formData.value.domains_data
    .map(id => DropData.value.find(domain => domain.id === id))
    .filter(Boolean);
  
  emitArray();
};

const handleGetDomains = async () => {
  try {
    const res = await CommonServices.getDomains();
    if (res.status === 200 && res.data.success) {
      DropData.value = res.data.data;
      selectedDomain.value = store.getters.getDomain || DropData.value.find(site => site.default === 1) || null;
      domain_id.value = selectedDomain.value?.id || null;
      if(selectedDomain.value.default === 1) emit('customChange', DropData.value.filter(domain => domain.id !== selectedDomain.value.id).map(domain => domain.id))
      else emit('customChange', domain_id.value);
      mapIdsToDomains();
    }
  } catch (error) {
    console.error('Error while fetching domains:', error);
  }
};

watch(
  () => formData.value?.domains_data,
  mapIdsToDomains,
  { immediate: true }
);

watch(() => check.value, (check) => {
  if (check) {
    emit('customChange', DropData.value.filter(domain => domain.id !== selectedDomain.value.id).map(domain => domain.id));
  } else {
    emit('customChange', unCheckDomains.value);
  }
});

watch(domain_id, handleAddTabs);
// watch(domainsArray, emitArray, { immediate: true });
watch(() => store.getters?.editData?.id, (newValue) => {
  if (newValue) formData.value = store.getters.editData;
}, { immediate: true });

onMounted(handleGetDomains);
</script>