<template>
  <PageHeader> All Contract </PageHeader>
  <div class="flex content-between justify-between px-1 mb-2">
    <div class="flex">
      <Select v-if="permissions.write" cusClass="h-[38px] border-boxdark" :options="bulkOption" showfield="text"
        valueField="value" label="Bulk Options" v-model="actionSelected" />
      <Button v-if="permissions.write" class="px-2 py-2 m-auto" @click="() => { actionSelected ? bulkPopup = true : '' }">Apply</Button>
      <div class="max-w-52 mr-2">
        <Select :options="getDominsList" showfield="name" class="w-full" valueField="id" label="All Domain"
          v-model="pagiantionData.domain_id" />
      </div>
      <div class="max-w-52">
        <Select :options="statusData" showfield="name" class="w-full" valueField="value" label="All Records"
          v-model="pagiantionData.status" />
      </div>
    </div>
    <div class="flex">
      <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full" placeholder="Search" v-model="search" />
      <Button v-if="permissions.write"
        @click="() => { router.push({ name: 'Contract-form' }); store.dispatch('clearEditData'); }"
        class="px-2 py-2">Add
        Contract</Button>

    </div>
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
      :hasCheckbox="true" :cloneHeaderInFooter="true" :stickyHeader="false" :rows="rows" :columns="ContractCols"
      :loading="getLoading" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search"
      @change="changeServer">
      <template #name="data">
        <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
          {{ data.value.status ? 'Yes' : 'No' }}
        </div>
      </template>
      <template #image="data">
        <img :src="data.value.image" alt="Contract" style="max-width: 50px; max-height: 50px" />
      </template>
      <template #status="data">
        <span v-if="data.value.status === 1">Draft</span>
        <span v-else-if="data.value.status === 2">Pending Review</span>
        <span v-else-if="data.value.status === 3">Publish</span>
        <span v-else>Status not selected</span>
      </template>
      <template #actions="data">
        <div v-if="permissions.write" class="flex gap-3">
          <div @click="() => { router.push({ name: 'Contract-form' }); store.dispatch('setEdit', data.value); }"
            id="edit svg">
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
  <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Contract Design'" @delete="handleDeleteContract">
    Do you want to delete?
  </DeleteModal>

  <DeleteModal v-model:isOpen="bulkPopup" :modalTitle="'Multiple Delete Contract Design'" @delete="handleBulkActions">
    Do you want to delete multiple contracts ?
  </DeleteModal>
  <!-- <Loader :isLoading="loading" :fullPage="true" /> -->
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { getDomins } from '@/helper/Apis';
import { useRouter } from 'vue-router';
import { ContractCols, statusData } from '@/json/data';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import ContractServices from '@/services/ContractServices';
import { showToast } from '@/helper/functions';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const actionSelected = ref(null);
const loading = ref(false);
const search = ref('');
const permissions = store.getters.user.permissions;
const getDominsList = ref([])
const pagiantionData = ref({ limit: 10, page: 1, domain_id: '', status: '' })
const domain_id = ref('')
const bulkOption = [{ text: 'Delete', value: 'Delete' }];
const getLoading = ref(false);
const editData = ref({});
const rows = ref([]);
const datatable = ref(null);
const actionsFlag = ref(null);
const modalIsOpen = ref(false);
const bulkPopup = ref(false);
const deleteModalIsOpen = ref(false);
const totalRows = ref('')

const openDeleteModal = (data) => {
  deleteModalIsOpen.value = true;
  editData.value = data.id;
  console.log(data.id)
};

const openModal = () => {
  modalIsOpen.value = true;
};

const editModal = (data) => {
  console.log("data ", data)
  editData.value = { ...data.value };
  // router.push({ name: 'EditPages', params: { id: data.value.id } });
  editIsOpen.value = true;
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

const changeServer = (page) => {
  const { pagesize, current_page } = page;
  pagiantionData.value = { ...pagiantionData.value, limit: pagesize, page: current_page }
  handleGetContract(pagiantionData.value);
}

// api calls
const handleGetContract = async (payload) => {
  getLoading.value = true;
  try {
    const res = await ContractServices.getNewContract(payload);
    if (res.status === 200 && res.data.success) {
      rows.value = res.data.data;
      totalRows.value = res.data.total_records;
    } else {
      rows.value = [];
      totalRows.value = 0
    }
  } catch (error) {
    console.error('Error while fetching contracts:', error);
  } finally {
    getLoading.value = false;
  }
};

const handleDeleteContract = async () => {
  loading.value = true;
  try {
    const res = await ContractServices.deleteNewContract({ id: editData.value });
    if (res.status === 200 && res.data.success) {
      handleDeleteSuccess(res.data.message);
    }
  } catch (error) {
    console.error('Error while deleting contract:', error);
  } finally {
    loading.value = false;
  }
};
// Handle bulk actions
const handleBulkActions = async () => {
  if (actionSelected.value === 'Delete') {
    const selectedRows = datatable.value.getSelectedRows()
    const ids = selectedRows.map(item => item.id)
    if(ids.length === 0) return showToast('Please select atleast one contract to delete', 'error')
    getLoading.value = true
    try {
      const res = await ContractServices.BulkDeleteNewContract({ id: ids })
      if (res.status === 200 && res.data.success) {
        showToast(res.data.message, 'success')
        handleGetContract(pagiantionData.value)
      }
    } catch (error) {
      console.error('Error performing bulk delete:', error)
    } finally {
      getLoading.value = false
    }
  }
}
const handleDeleteSuccess = (message) => {
  showToast(message, 'success');
  rows.value = rows.value.filter(item => item.id !== editData.value);
  editData.value = null;
  deleteModalIsOpen.value = false;
};

const getDomainList = async (payload) => {
  getDominsList.value = await getDomins(payload)
  const defaultDomain = getDominsList.value.filter(site => site.default === 1)[0];
  pagiantionData.value.domain_id = defaultDomain.id
  // store.dispatch('setDomain', defaultDomain);
}

onMounted(() => {
  getDomainList();
}
);

watch(
  () => pagiantionData.value.domain_id,
  () => {
    const defaultDomain = getDominsList.value.filter(site => site.id == pagiantionData.value.domain_id);
    store.dispatch('setDomain', defaultDomain[0]);
    handleGetContract(pagiantionData.value);
  }
);
watch(
  () => pagiantionData.value.status,
  () => {
    handleGetContract(pagiantionData.value);
  }
);
</script>