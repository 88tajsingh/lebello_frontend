<template>   
<div class="flex ml-auto mt-2 gap-2 justify-end">
  <!-- <div class="  w-52  ">
    <Select :options="DropData" showfield="name" class="w-full" valueField="id" label="Select Domain" v-model="domain_id" />
  </div> -->
  <div class="w-52">
    <Select :options="DropData" showfield="name" class="w-full" valueField="id" label="Select Domain" v-model="domain_id" />
  </div>
</div>
  <div class="flex flex-wrap mt-2">
    <div class="flex flex-wrap">
      <div v-for="(item, index) in domainsArray" @click="emitItemClick(item.id)" :key="index" class="badge py-1 border border-black relative bg-blue-500 px-2 rounded-lg flex items-center mb-2 mr-2 cursor-pointer" :class="{'border-primary bg-primary text-gray':selectedDomain == item.id}">
        {{ item.name }} ({{ item.country.code }})
        <button v-if="index!== 0" type="button" @click.stop="removeItem(index)" class="ml-4 hover:text-red-500 focus:outline-none">
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" :stroke="selectedDomain == item.id ? '#EFF4FB' : '#1C274C'" stroke-width="1.5"></circle>
            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" :stroke="selectedDomain == item.id ? '#EFF4FB' : '#1C274C'" stroke-width="1.5" stroke-linecap="round"></path>
          </svg>
        </button>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
import CommonServices from '@/services/CommonServices';

const emit = defineEmits(['customChange']);
const DropData = ref([]);
const domain_id = ref(null);
const domainsArray = ref([]);
const selectedDomain = ref(null);
const props = defineProps({
  cardTitle: {
    type: String,
    default: ' ',
  },
  domains: {
    type: Array,
    default: () => [],
  },
});
const handleAddTabs = () => {
  const selectedDomain = DropData.value.find(domain => domain.id == domain_id.value );
  if (selectedDomain && !domainsArray.value.some(domain => domain.id === selectedDomain.id)) {
    domainsArray.value.push(selectedDomain);
  }
  
};

const removeItem = (index) => {
  domainsArray.value.splice(index, 1);
  emit('customChange', domainsArray.value[0].id);
  selectedDomain.value = domainsArray.value[0].id
};

const emitItemClick = (item) => {
  emit('customChange', item);
  selectedDomain.value = item;
};

const handleGetDomains = async () => {
  try {
    const res = await CommonServices.getDomains();
    if (res.status === 200 && res.data.success === true) {
      domainsArray.value = [res.data.data[0]]
      emit('customChange', res.data.data[0].id);
      selectedDomain.value = res.data.data[0].id
      DropData.value = res.data.data;
    }
  } catch (e) {
    console.error('Error while fetching domains:', e);
  }
};

onMounted(() => {
  handleGetDomains();
});

watch(domain_id, () => {
  handleAddTabs();
});
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
