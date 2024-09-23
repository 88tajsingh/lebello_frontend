<template>
  <PageHeader>Pages</PageHeader>
  <div class="flex content-between justify-between px-1 mb-2">
    <div class="flex">
      <Select cusClass="h-[38px] border-boxdark" :options="bulkOptions" showfield="text" valueField="value" label="Bulk Options" v-model="actionSelected" />
      <Button class="px-2 py-2 m-auto" @click="() => multiDeleteModalOpen = true">Apply</Button>
    </div>
    <div class="w-52">
        <Select :options="getDominsList" showfield="name" class="w-full" valueField="id" label="All Domain" v-model="pagiantionData.domain_id" />
      </div>
    <div class="flex ml-auto">
      <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full" placeholder="Search" v-model="search" />
      <Button v-if="permissions.write" @click="() => {router.push({ name:'pages-form'});store.dispatch('clearEditData'); }" class="px-2 py-2">Add Pages</Button>
      
    </div>
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable  class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
    :hasCheckbox="true":cloneHeaderInFooter="true"  :stickyHeader="false" 
    :rows="rows" :columns="cols"  :loading="getLoading" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search" @change="changePages">
      <template #name="data" >
        <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
          {{ data.value.name }}
          <!-- <div v-if="isRowHovered(data.value)">overed</div> -->
        </div>
      </template>
      <template #image="data">
        <img :src="data.value.image" alt="Page Thumbnail" style="max-width: 50px; max-height: 50px" />
      </template>
      <template v-if="permissions.write" #actions="data">
        <div class="flex gap-3">
          <div @click="() => { router.push({ name: 'pages-form' }); store.dispatch('setEdit', data.value); }" id="edit svg">
            <EditSvg />
          </div>
          <div id="delete svg" @click="openDeleteModal(data.value)">
            <DeleteSvg />
          </div>
        </div>
      </template>
    </vue3-datatable>
  </div>
  <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Pages'" @delete="handleDeletePages">
    Do you want to delete?
  </DeleteModal>

  <DeleteModal v-model:isOpen="multiDeleteModalOpen" :modalTitle="' Multiple Delete Pages'" @delete="applyBulkActions">
    Do you want to delete selected pages?
  </DeleteModal>
  <!-- <Loader :isLoading="loading" :fullPage="true" /> -->
</template>

<script setup>
import { ref, onMounted,watch } from 'vue';
import { showToast } from '@/helper/functions'
import { getDomins } from '@/helper/Apis';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import PagesServices from '@/services/PagesServices';
import { useRouter } from 'vue-router';
import store from '@/store';

const router = useRouter();
// const actionSelected = ref(null);
// const bulkOption = [{ text: 'Delete', value: 'Delete' }];

const actionSelected = ref(null);
const getDominsList = ref([]);
const domain_id=ref(null);
const bulkOptions = [{ text: 'Delete', value: 'delete' }]
const datatable  = ref(null);
const loading = ref(false);
const multiDeleteModalOpen = ref(false);
const search = ref('');
const getLoading = ref(false);
const editData = ref({});
const rows = ref([]);
const actionsFlag = ref(null);
const pagiantionData = ref({ limit: 10, page: 1, domain_id: '', status: '' })
const permissions =  store.getters.user.permissions;
const deleteModalIsOpen = ref(false);
const  totalRows = ref('')
const cols = ref([
  { field: 'page_title', title: 'Page Title', slot: true },
  { field: 'seo_title', title: 'Seo Title', filter: true },
  { field: 'status', title: 'Status' },
  { field: 'actions', title: 'Actions' }
]);

const openDeleteModal = (data) => {
  deleteModalIsOpen.value = true;
  editData.value = data.id;
};

const handleMouseEnter = (data) => {
  actionsFlag.value = data.value.name;
};

const handleMouseLeave = () => {
  actionsFlag.value = null;
};

const changePages =(page) => {
  const { pagesize, current_page } = page;
  pagiantionData.value = { ...pagiantionData.value, limit: pagesize, page: current_page }
  handleGetPages(pagiantionData.value);
}

// api calls
const handleGetPages = async (payload) => {
  try {
    getLoading.value = true;
    const { status, data } = await PagesServices.getPages(payload);
    if (status === 200 && data.success) {
      rows.value = data.data;
      totalRows.value = data.total_records;
    }
  } catch (error) {
    console.error('Error while getting pages:', error);
  } finally {
    getLoading.value = false;
  }
};
// Delete Pages
const handleDeletePages = async () => {
  try {
    loading.value = true;
    const res = await PagesServices.deletePages({ id: editData.value });
    if (res.status === 200 && res.data.success) {
      showToast(res.data.message, 'success');
       await handleGetPages(pagiantionData.value)
      deleteModalIsOpen.value = false;
      editData.value = null;
    } else if (res.status === 400) {
      showToast('Unable to delete', 'error');
    }
  } catch (error) {
    console.error('Error while deleting pages:', error);
  } finally {
    loading.value = false;
  }
};

// Handle bulk actions
const applyBulkActions = async () => {
  if (actionSelected.value === 'delete') {
    const selectedRows = datatable.value.getSelectedRows()
    const ids = selectedRows.map(item => item.id)
    if(ids.length === 0) return showToast('Please select atleast one page to delete', 'error')
    loading.value = true;
    try {
      const res = await PagesServices.bulkDeletePages({ id: ids })
      if (res.status === 200 && res.data.success) {
        showToast(res.data.message, 'success')
        handleGetPages(pagiantionData.value)
      }
    } catch (error) {
      console.error('Error performing bulk delete:', error)
    } finally {
      loading.value = false
    }
  }
}

const getDomainList = async (payload) => {
  getDominsList.value = await getDomins(payload)
  const defaultDomain = getDominsList.value.filter(site => site.default === 1)[0];
  pagiantionData.value.domain_id = defaultDomain.id
  store.dispatch('setDomain', defaultDomain);
}
onMounted(() => {
  getDomainList();
}
);

watch(
    () => pagiantionData.value.domain_id,
    () => {
      const defaultDomain = getDominsList.value.filter(site => site.id == pagiantionData.value.domain_id );
      store.dispatch('setDomain', defaultDomain[0]);
      handleGetPages(pagiantionData.value);
    }
);
</script>
