<template>
  <PageHeader>Pages</PageHeader>
  <div class="flex content-between justify-between px-1 mb-2">
    <!-- <div class="flex">
      <Select cusClass="h-[38px] border-boxdark" :options="bulkOption" showfield="text" valueField="value" label="Bulk Options" v-model="actionSelected" />
      <Button class="px-2 py-2 m-auto">Apply</Button>
    </div> -->
    <div class="w-52">
        <Select :options="getDominsList" showfield="name" class="w-full" valueField="id" label="Select Domain" v-model="domain_id" />
      </div>
    <div class="flex ml-auto">
      <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full" placeholder="Search" v-model="search" />
      <Button @click="() => {router.push({ name:'pages-form'});store.dispatch('clearEditData'); }" class="px-2 py-2">Add Pages</Button>
      
    </div>
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable  class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
    :hasCheckbox="false":cloneHeaderInFooter="true"  :stickyHeader="false"
    :rows="rows" :columns="cols" :loading="getLoading" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search" @change="changePages">
      <template #name="data">
        <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
          {{ data.value.name }}
          <!-- <div v-if="isRowHovered(data.value)">overed</div> -->
        </div>
      </template>
      <template #image="data">
        <img :src="data.value.image" alt="Pages Image" style="max-width: 50px; max-height: 50px" />
      </template>
      <template #actions="data">
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
  <!-- <Loader :isLoading="loading" :fullPage="true" /> -->
</template>

<script setup>
import { ref, onMounted,watch } from 'vue';
import { showToast } from '@/helper/functions'
import { getDomins } from '@/helper/Apis';
import AddEditForm from './AddEditForm.vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import PagesServices from '@/services/PagesServices';
import { useRouter } from 'vue-router';
import store from '@/store';

const router = useRouter();
// const actionSelected = ref(null);
// const bulkOption = [{ text: 'Delete', value: 'Delete' }];

const getDominsList = ref([]);
const domain_id=ref(null);

const loading = ref(false);
const search = ref('');
const getLoading = ref(false);
const editData = ref({});
const rows = ref([]);
const actionsFlag = ref(null);
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
  const payload = {limit:page.pagesize,page:page.current_page}
  handleGetPages(payload);
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
      rows.value = rows.value.filter(item => item.id !== editData.value)
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
      handleGetPages({limit:10,page:1,domain_id:domain_id.value});
    }
);
</script>
