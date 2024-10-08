<template>
  <PageHeader> Product Type </PageHeader>
  <div class="flex content-between justify-between px-1 mb-2">
    <div class="flex">
      <Select v-if="permissions.write" cusClass="h-[38px] border-boxdark" :options="bulkOption" showfield="text"
        valueField="value" label="Bulk Options" v-model="state.bulkActionSelected" />
      <Button v-if="permissions.write" class="px-2 py-2 m-auto" @click="openBulkPopup">Apply</Button>
      <div class="w-52">
        <Select :options="getDomainsList" showfield="name" class="w-full" valueField="id" label="All Domain"
          v-model="state.paginationData.domain_id" />
      </div>
    </div>
    <div class="flex">
      <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full" placeholder="Search" v-model="state.search" />
      <Button v-if="permissions.write" @click="navigateToAddProductType" class="px-2 py-2">Add Product Type</Button>
    </div>
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover"
      :hasCheckbox="true" :cloneHeaderInFooter="true" :stickyHeader="false" :rows="state.rows" :columns="productTypeCols"
      :loading="state.getLoading" :totalRows="state.totalRows" :isServerMode="true" :pageSize="10" :search="state.search"
      @change="changePages">
      <template #name="{ value }">
        <div @mouseenter="handleMouseEnter(value)" @mouseleave="handleMouseLeave">
          {{ value.name }}
        </div>
      </template>
      <template #image="{ value }">
        <img :src="value.image" alt="Contract Image" style="max-width: 50px; max-height: 50px" />
      </template>
      <template v-if="permissions.write" #actions="{ value }">
        <div class="flex gap-3">
          <div @click="handleEditClick(value)" id="edit svg">
            <EditSvg />
          </div>
          <div id="delete svg" @click="openDeleteModal(value)">
            <DeleteSvg />
          </div>
        </div>
      </template>
    </vue3-datatable>
  </div>

  <DeleteModal v-model:isOpen="modals.deleteModalIsOpen" :modalTitle="'Delete Product Type'" @delete="handleDeleteProductType">
    Do you want to delete?
  </DeleteModal>
  <DeleteModal v-model:isOpen="modals.bulkPopup" :modalTitle="'Delete Product Type'" @delete="handleBulkActions">
    Do you want to delete ?
  </DeleteModal>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import ProductServices from '@/services/ProductServices';
import { useRouter } from 'vue-router';
import { showToast } from '@/helper/functions';
import { getDomains } from '@/helper/Apis';
import { productTypeCols } from '@/json/data';
import store from '@/store';

const router = useRouter();
const state = ref({
  bulkActionSelected: null,
  loading: false,
  search: '',
  paginationData: { limit: 10, page: 1, domain_id: '' },
  rows: [],
  totalRows: '',
  getLoading: false,
});
const datatable = ref(null);

const modals = ref({
  deleteModalIsOpen: false,
  bulkPopup: false,
});

const permissions = store.getters.user.permissions;
const bulkOption = [{ text: 'Delete', value: 'Delete' }];
const getDomainsList = ref([]);

const openBulkPopup = () => {
  if (state.value.bulkActionSelected) modals.value.bulkPopup = true;
};

const navigateToAddProductType = () => {
  router.push({ name: 'Product-type-from' });
  store.dispatch('clearEditData');
};

const handleEditClick = (data) => {
  store.dispatch('setEdit', data);
  store.dispatch('setDomain', { id: data.domain_id });
  router.push({ name: 'Product-type-from' });
};

const openDeleteModal = (data) => {
  modals.value.deleteModalIsOpen = true;
  state.value.editData = data.id;
};

const changePages = (page) => {
  state.value.paginationData = { ...state.value.paginationData, limit: page.pagesize, page: page.current_page };
  fetchProductTypes(state.value.paginationData);
};

const fetchProductTypes = async (payload) => {
  state.value.getLoading = true;
  try {
    const res = await ProductServices.getProductType(payload);
    if (res.status === 200 && res.data.success) {
      state.value.rows = res.data.data;
      state.value.totalRows = res.data.total_records;
    }
  } catch (error) {
    console.error('Error fetching product types:', error);
  } finally {
    state.value.getLoading = false;
  }
};

const handleDeleteProductType = async () => {
  state.value.loading = true;
  try {
    const res = await ProductServices.deleteProductType({ id: state.value.editData });
    if (res.status === 200 && res.data.success) {
      state.value.rows = state.value.rows.filter(item => item.id !== state.value.editData);
      showToast(res.data.message, 'success');
      modals.value.deleteModalIsOpen = false;
    } else {
      showToast(res.data.message, 'error');
    }
  } catch (error) {
    console.error('Error deleting product type:', error);
  } finally {
    state.value.loading = false;
  }
};

const handleBulkActions = async () => {
  const selected = datatable.value.getSelectedRows();
  const ids = selected.map(item => item.id);
  if (!ids.length) return showToast('Please select at least one product type to delete', 'error');
  
  if (state.value.bulkActionSelected === 'Delete') {
    state.value.loading = true;
    try {
      const res = await ProductServices.BulkDeleteProductType({ id: ids });
      if (res.status === 200 && res.data.success) {
        showToast(res.data.message, 'success');
        await fetchProductTypes(state.value.paginationData);
      } else {
        showToast(res.data.message, 'error');
      }
    } catch (error) {
      console.error('Error while bulk deleting product types:', error);
    } finally {
      state.value.loading = false;
    }
  }
};

const getDomainList = async () => {
  getDomainsList.value = await getDomains();
  const defaultDomain = getDomainsList.value.find(site => site.default === 1);
  if (defaultDomain) store.dispatch('setDomain', defaultDomain);
};

onMounted(()=>{getDomainList();fetchProductTypes(state.value.paginationData);});

watch(
  () => state.value.paginationData.domain_id,
  () => {
    const selectedDomain = getDomainsList.value.find(site => site.id === state.value.paginationData.domain_id);
    if (selectedDomain) store.dispatch('setDomain', selectedDomain);
    fetchProductTypes(state.value.paginationData);
  }
);
</script>
