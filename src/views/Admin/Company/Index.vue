<template>
    <PageHeader> Company </PageHeader>
    <div class="flex content-between justify-between px-1 mb-2">
      <div class="flex">
        <Select v-if="permissions.write" cusClass="h-[38px] border-box" :options="bulkOption" showfield="text"
          valueField="value" label="Bulk Options" v-model="state.bulkActionSelected" />
        <Button v-if="permissions.write" class="px-2 py-2 m-auto" @click="openBulkPopup">Apply</Button>
        <div class="w-52">
          <Select :options="state.getDomainsList" showfield="name" class="w-full" valueField="id" label="All Domain"
            v-model="state.paginationData.domain_id" />
        </div>
        <div class="w-52">
          <Select :options="statusData" showfield="name" class="w-full" valueField="value" label="All Records"
            v-model="state.paginationData.status" />
        </div>
      </div>
      <div class="flex">
        <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full" placeholder="Search" v-model="state.search" />
        <Button v-if="permissions.write" @click="navigateToAddCompany" class="px-2 py-2">Add Company</Button>
      </div>
    </div>
    <div class="bg-white rounded-[20px]">
      <vue3-datatable class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover"
        :hasCheckbox="true" :rows="state.data" :columns="companyCols" :loading="state.dataTableLoading"
        :totalRows="state.totalRows" :isServerMode="true" :pageSize="10" :search="state.search" @change="changePages">
        <template #featured_image_url="data">
          <img :src="$filePath(data.value?.featured_image_data?.file_url)" alt="Material" style="max-width: 50px; max-height: 50px" />
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
  
    <DeleteModal v-model:isOpen="modals.deleteModalIsOpen" :modalTitle="'Delete Company'" @delete="handleDeleteCompany">
      Do you want to delete?
    </DeleteModal>
    <DeleteModal v-model:isOpen="modals.bulkPopup" :modalTitle="'Delete Multiple Companies'" @delete="handleBulkActions">
      Do you want to delete?
    </DeleteModal>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import '@bhplugin/vue3-datatable/dist/style.css'
  import Vue3Datatable from '@bhplugin/vue3-datatable';
  import CompanyServices from '@/services/CompanyServices';
  import { useRouter } from 'vue-router';
  import { showToast } from '@/helper/functions';
  import { getDomains } from '@/helper/Apis';
  import { companyCols, statusData } from '@/json/data';
  import { useStore } from 'vuex';
  
  const router = useRouter();
  const store = useStore();
  
  const state = ref({
    bulkActionSelected: null,
    search: '',
    paginationData: { limit: 10, page: 1, domain_id: '', status: '' },
    data: [],
    totalRows: 0,
    dataTableLoading: false,
    getDomainsList: [],
  });

  const datatable = ref(null);
  
  const modals = ref({
    deleteModalIsOpen: false,
    bulkPopup: false,
  });
  
  const permissions = store.getters.user.permissions;
  const bulkOption = [{ text: 'Delete', value: 'delete' }];
  
  const openBulkPopup = () => {
    if (state.value.bulkActionSelected) modals.value.bulkPopup = true;
  };
  
  const navigateToAddCompany = () => {
    store.dispatch('clearEditData');
    router.push({ name: 'company-form' });
  };
  
  const handleEditClick = (data) => {
    store.dispatch('setEdit', data);
    store.dispatch('setDomain', { id: data.domain_id });
    router.push({ name: 'company-form' });
  };
  
  const openDeleteModal = (data) => {
    state.value.company_id = data.id;
    modals.value.deleteModalIsOpen = true;
  };
  
  const changePages = (page) => {
    state.value.paginationData = { ...state.value.paginationData, limit: page.pagesize, page: page.current_page };
    fetchCompanies(state.value.paginationData);
  };
  
  const fetchCompanies = async (payload) => {
    state.value.dataTableLoading = true;
    try {
      const res = await CompanyServices.getCompany(payload);
      if (res.status === 200 && res.data.success) {
        state.value.data = res.data.data || [];
        state.value.totalRows = res.data.total_records || 0;
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
    } finally {
      state.value.dataTableLoading = false;
    }
  };
  
  const handleDeleteCompany = async () => {
    try {
      const res = await CompanyServices.deleteCompany({ id: state.value.company_id });
      if (res.status === 200) {
        showToast(res.data.message, 'success');
        await fetchCompanies(state.value.paginationData);
        modals.value.deleteModalIsOpen = false;
      } else {
        showToast(res.data.message, 'error');
      }
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };
  
  const handleBulkActions = async () => {
    const selected = datatable.value.getSelectedRows();
    const ids = selected.map(item => item.id);
    if (!ids.length) return showToast('Please select at least one company to delete', 'error');
  
    if (state.value.bulkActionSelected === 'delete') {
      try {
        const res = await CompanyServices.bulkDeleteCompany({ id: ids });
        if (res.status === 200 && res.data.success) {
          showToast(res.data.message, 'success');
          await fetchCompanies(state.value.paginationData);
        } else {
          showToast(res.data.message, 'error');
        }
      } catch (error) {
        console.error('Error while bulk deleting companies:', error);
      }
    }
  };
  
  const getDomainList = async () => {
    state.value.getDomainsList = await getDomains();
    const defaultDomain = state.value.getDomainsList.find(site => site.default === 1);
    if (defaultDomain) store.dispatch('setDomain', defaultDomain);
  };
  
  onMounted(() => {
    getDomainList();
    fetchCompanies(state.value.paginationData);
  });
  
  watch(
    () => state.value.paginationData.domain_id,
    () => {
      const selectedDomain = state.value.getDomainsList.find(site => site.id === state.value.paginationData.domain_id);
      if (selectedDomain) store.dispatch('setDomain', selectedDomain);
      fetchCompanies(state.value.paginationData);
    }
  );
  
  watch(
    () => state.value.paginationData.status,
    () => {
      fetchCompanies(state.value.paginationData);
    }
  );
  </script>
  