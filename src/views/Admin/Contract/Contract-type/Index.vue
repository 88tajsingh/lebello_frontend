<template>
  <PageHeader>Contract Type </PageHeader>

  <div class="flex content-between justify-between px-1 mb-2">
    <div class="flex">
      <Select cusClass="h-[38px] border-boxdark" :options="bulkOption" showfield="text" valueField="value" label="Bulk Options" v-model="bulkActionSelected" />
      <Button class="px-2 py-2 m-auto"@click="()=>{bulkActionSelected?bulkPopup=true:''}">Apply</Button>
      <div class="w-52">
        <Select :options="getDominsList" showfield="name" class="w-full" valueField="id" label="Select Domain" v-model="domain_id" />
      </div>
    </div>
    <div class="flex">
      <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full" placeholder="Search" v-model="search" />
      <Button @click="() => {router.push({ name: 'Contract-type-form'});store.dispatch('clearEditData'); }" class="px-2 py-2">Add Contract Type</Button>
      
    </div>
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable  class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
    :hasCheckbox="true":cloneHeaderInFooter="true"  :stickyHeader="false"
    :rows="rows" :columns="contractTypeCols" :loading="getLoading" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search" @change="changeServer">
     
      <template #actions="data">
        <div class="flex gap-3">
          <div @click="() =>{router.push({ name:'Contract-type-form'}); store.dispatch('setEdit', data.value); }" id="edit svg">
            <!-- router.push({ name:'Contract-edit',params: { id: data.value.id }})  -->
            <EditSvg />
          </div>
          <div id="delete svg" @click="openDeleteModal(data.value)">
            <DeleteSvg />
          </div>
        </div>
      </template>
    </vue3-datatable>
  </div>

  <PopupModal modalTitle="Add Pages" custonClasses="w-[1000px] h-[600px]" v-model:isOpen="modalIsOpen">
    <AddEditForm @handleApi="handleAddPages" />
  </PopupModal>
  <PopupModal modalTitle="Edit Pages" custonClasses="w-[1000px] h-[600px]" v-model:isOpen="editIsOpen">
    <AddEditForm :pagesData="editData" @handleApi="handleEditPages" />
  </PopupModal>
  <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Contract Type'" @delete="handleDeleteContractType">
    Do you want to delete?
  </DeleteModal>

  <DeleteModal v-model:isOpen="bulkPopup" :modalTitle="'Delete Material'" @delete="handleBulkActions()">
    Do you want to delete ?
  </DeleteModal>
  <!-- <Loader :isLoading="loading" :fullPage="true" /> -->
</template>

<script setup>
import { ref, onMounted,watch } from 'vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import ContractServices from '@/services/ContractServices';
import { useRouter } from 'vue-router';
import { contractTypeCols } from '@/json/data';
import { showToast } from '@/helper/functions';
import { getDomins } from '@/helper/Apis';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const bulkActionSelected = ref(null)
const loading = ref(false);
const datatable = ref('')
const bulkPopup = ref(false);
const search = ref('');
const bulkOption = [{ text: 'Delete', value: 'Delete' }];
const getDominsList = ref([])
const domain_id = ref('')
const getLoading = ref(false);
const editData = ref({});
const rows = ref([]);
const actionsFlag = ref(null);
const modalIsOpen = ref(false);
const editIsOpen = ref(false);
const deleteModalIsOpen = ref(false);
const  totalRows = ref('')

const openDeleteModal = (data) => {
  deleteModalIsOpen.value = true;
  editData.value = data.id;
  console.log(data.id)
};

const openModal = () => {
  modalIsOpen.value = true;
};

const editModal = (data) => {
  console.log("data " ,data)
  editData.value = { ...data.value };
  // router.push({ name: 'EditPages', params: { id: data.value.id } });
  editIsOpen.value=true;
};

const handleMouseEnter = (data) => {
  actionsFlag.value = data.value.name;
};

const handleMouseLeave = () => {
  actionsFlag.value = null;
};

const isRowHovered = (value) => {
  return actionsFlag.value === value.name;
};

const changeServer =(page) => {
  console.log("page changed", page)
  const payload = {limit:page.pagesize,page:page.current_page}
  handleGetContractType(payload);
}
const navigateToRoute = () => {
      router.push({ name: 'EditPages', params: { id: '1' } });
    };

// api calls
const handleGetContractType = async (payload) => {
  getLoading.value = true;
  try {
    const res = await ContractServices.getContractType(payload);
    if (res.status === 200 && res.data.success) {
      rows.value = res.data.data;
      totalRows.value = res.data.total_records;
    }
  } catch (e) {
    console.error('Error while getting contract types:', e);
  } finally {
    getLoading.value = false;
  }
};

const handleDeleteContractType = async () => {
  loading.value = true;
  try {
    const res = await ContractServices.deleteContractType({ id: editData.value });
    if (res.status === 200 && res.data.success) {
      showToast(res.data.message, 'success');
      rows.value = rows.value.filter(item => item.id !== editData.value);
      deleteModalIsOpen.value = false;
      editData.value = null;
    }
  } catch (e) {
    console.error('Error while deleting contract type:', e);
  } finally {
    loading.value = false;
  }
};

const handleBulkActions = async () => {
  if (bulkActionSelected.value !== 'Delete') return;
  
  const selected = datatable.value.getSelectedRows();
  const ids = selected.map(item => item.id);
  
  loading.value = true;
  try {
    const res = await ContractServices.BulkDeleteContractType({ id: ids });
    if (res.status === 200 && res.data.success) {
      rows.value = res.data.data;
      showToast('Bulk delete successfully', 'success');
      await handleGetContractType();
    }
  } catch (e) {
    console.error('Error during bulk delete:', e);
  } finally {
    loading.value = false;
  }
};



const getDomainList = async (payload) => {
  getDominsList.value = await getDomins(payload)
  const defaultDomain = getDominsList.value.filter(site => site.default === 1)[0];
  domain_id.value = defaultDomain.id
  store.dispatch('setDomain', defaultDomain);
}

onMounted(() => {
  getDomainList();
}
);

watch(
    () => domain_id.value,
    () => {
      const defaultDomain = getDominsList.value.filter(site => site.id == domain_id.value );
      store.dispatch('setDomain', defaultDomain[0]);
      handleGetContractType({limit:10,page:1,domain_id:domain_id.value});
    }
);
</script>
