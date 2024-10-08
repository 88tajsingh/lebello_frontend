<template>
  <PageHeader> Product Series</PageHeader>
  <div class="flex content-between justify-between mb-2">
    <div class="flex">
      <Select v-if="permissions.write" cusClass="h-[40px] border-box" :options="bulkOption" showfield="text"
        valueField="value" label="Bulk Options" v-model="state.bulkActionSelected" />
      <Button v-if="permissions.write" class="px-2 py-2 m-auto" @click="openBulkPopup">Apply</Button>
      <div class="w-52">
        <Select :options="getDomainsList" showfield="name" class="w-full" valueField="id" label="All Domain"
          v-model="state.paginationData.domain_id" />
      </div>
    </div>
    <div class="flex rounded-lg bg-transparent">
      <TextInput type="text" class="block bg-white mr-2 rounded-lg h-[40px] w-full" placeholder="Search"
        v-model="state.search" />
      <Button v-if="permissions.write" @click="navigateToAddSeries" class="px-2 py-2 m-auto whitespace-nowrap">Add
        Series</Button>
    </div>
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover"
      :hasCheckbox="true" :cloneHeaderInFooter="true" :stickyHeader="false" :rows="state.data"
      :columns="productSeriesCols" :loading="state.dataTableLoading" :totalRows="state.totalRows" :isServerMode="true"
      :pageSize="10" :search="state.search" @change="changePage">
      <template #image="data">
        <img :src="$filePath(data.value.featured_image_data?.file_url)" alt="Product Series Image"
          style="max-width: 50px; max-height: 50px" />
      </template>
      <template v-if="permissions.write" #actions="data">
        <div class="flex gap-3">
          <div @click="handleEditClick(data.value)" id="edit svg">
            <EditSvg />
          </div>
          <div id="delete svg" @click="openDeleteModal(data.value)">
            <DeleteSvg />
          </div>
        </div>
      </template>
    </vue3-datatable>
  </div>

  <DeleteModal v-model:isOpen="modals.deleteModalIsOpen" :modalTitle="'Delete Product Series'"
    @delete="handleDeleteProductSeries">
    Do you want to delete?
  </DeleteModal>

  <DeleteModal v-model:isOpen="modals.bulkPopup" :modalTitle="'Multiple Delete Product Series'"
    @delete="handleBulkActions">
    Do you want to delete multiple product series?
  </DeleteModal>
  <Loader :isLoading="state.loading" :fullPage="true" />
</template>

<script setup>
import DeleteModal from '@/components/Admin-components/Modals/DeleteModal.vue';
import { ref, onMounted, watch } from 'vue';
import { showToast } from '@/helper/functions';
import PageHeader from '@/components/Admin-components/PageHeader.vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { getDomains } from '@/helper/Apis';
import { productSeriesCols } from '@/json/data';
import TextInput from '@/components/Admin-components/form-components/TextInput.vue';
import Select from '@/components/Admin-components/form-components/Select.vue';
import Button from '@/components/Admin-components/Buttons/Button.vue';
import ProductServices from '@/services/ProductServices';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

// Consolidated state
const state = ref({
  bulkActionSelected: null,
  search: '',
  paginationData: { limit: 10, page: 1, domain_id: '' },
  data: [],
  totalRows: '',
  loading: false,
  dataTableLoading: false,
});

const datatable = ref(null);

const modals = ref({
  deleteModalIsOpen: false,
  bulkPopup: false,
});

const permissions = store.getters.user.permissions;
const bulkOption = [{ text: 'Delete', value: 'delete' }];
const getDomainsList = ref([]);

// Open bulk popup
const openBulkPopup = () => {
  if (state.value.bulkActionSelected) modals.value.bulkPopup = true;
};

// Navigate to Add Series
const navigateToAddSeries = () => {
  router.push({ name: 'product-series-from' });
  store.dispatch('clearEditData');
};

// Handle Edit Click
const handleEditClick = (data) => {
  store.dispatch('setEdit', data);
  store.dispatch('setDomain', { id: data.domain_id });
  router.push({ name: 'product-series-from' });
};

// Change Page
const changePage = (page) => {
  const { pagesize, current_page } = page;
  state.value.paginationData = { ...state.value.paginationData, limit: pagesize, page: current_page };
  fetchProductSeries(state.value.paginationData);
};

// Fetch Product Series
const fetchProductSeries = async (payload) => {
  state.value.dataTableLoading = true;
  try {
    const res = await ProductServices.getProductSeries(payload);
    if (res.status === 200 && res.data.success) {
      state.value.data = res.data.data || [];
      state.value.totalRows = res.data.total_records || 0;
    }
  } catch (error) {
    console.error('Error fetching product series:', error);
  } finally {
    state.value.dataTableLoading = false;
  }
};

// Open Delete Modal
const openDeleteModal = (data) => {
  modals.value.deleteModalIsOpen = true;
  state.value.material_id = data; // Assuming material_id is needed here
};

// Handle Delete Product Series
const handleDeleteProductSeries = async () => {
  state.value.loading = true;
  try {
    const res = await ProductServices.deleteProductSeries({ id: state.value.material_id.id });
    if (res.status === 200) {
      showToast(res.data.message, 'success');
      await fetchProductSeries(state.value.paginationData);
      modals.value.deleteModalIsOpen = false;
    } else {
      showToast(res.message, 'error');
    }
  } catch (error) {
    console.error('Error deleting product series:', error);
  } finally {
    state.value.loading = false;
  }
};

// Bulk Delete
const handleBulkActions = async () => {
  const selected = datatable.value.getSelectedRows();
  const ids = selected.map(item => item.id);
  if (!ids.length) return showToast('Please select at least one product series to delete', 'error');

  try {
    const res = await ProductServices.BulkDeleteProductSeries({ id: ids });
    if (res.status === 200 && res.data.success) {
      showToast(res.data.message, 'success');
      await fetchProductSeries(state.value.paginationData);
    }
  } catch (error) {
    console.error('Error during bulk delete:', error);
  }
};

// Fetch Domains
const fetchDomainList = async () => {
  getDomainsList.value = await getDomains();
  const defaultDomain = getDomainsList.value.find(site => site.default === 1);
  if (defaultDomain) {
    state.value.paginationData.domain_id = defaultDomain.id;
    store.dispatch('setDomain', defaultDomain);
  }
};

onMounted(() => { fetchDomainList(); fetchProductSeries(); });
console.log("getDomainsList.value", state.value.paginationData.domain_id);
watch(
  () => state.value.paginationData.domain_id,
  () => {
    const selectedDomain = getDomainsList.value.find(site => site.id == state.value.paginationData.domain_id);
    store.dispatch('setDomain', selectedDomain);
    fetchProductSeries(state.value.paginationData);
  }
);
</script>
