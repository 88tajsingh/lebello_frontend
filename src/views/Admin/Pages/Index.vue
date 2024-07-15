<template>
  <PageHeader>Pages</PageHeader>
  <div class="flex content-between justify-between px-1 mb-2">
    <div class="flex">
      <Select cusClass="h-[38px] border-boxdark" :options="bulkOption" showfield="text" valueField="value" label="Bulk Options" v-model="actionSelected" />
      <Button class="px-2 py-2 m-auto">Apply</Button>
    </div>
    <div class="flex">
      <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full" placeholder="Search" v-model="search" />
      <Button @click="() => {router.push({ name:'pages-add'}) }" class="px-2 py-2">Add Pages</Button>
      
    </div>
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable  class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
    :hasCheckbox="true":cloneHeaderInFooter="true"  :stickyHeader="false"
    :rows="rows" :columns="cols" :loading="dataTableLoding" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search" @change="changeServer">
      <template #name="data">
        <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
          {{ data.value.name }}
          <div v-if="isRowHovered(data.value)">overed</div>
        </div>
      </template>
      <template #image="data">
        <img :src="data.value.image" alt="Material Image" style="max-width: 50px; max-height: 50px" />
      </template>
      <template #actions="data">
        <div class="flex gap-3">
          <div @click="() => {router.push({ name:'pages-edit',params: { id: data.value.id }}); store.dispatch('editData',data.value ); }" id="edit svg">
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
  <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Material'" @delete="handleDeletePages">
    Do you want to delete?
  </DeleteModal>
  <!-- <Loader :isLoading="loading" :fullPage="true" /> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AddEditForm from './AddEditForm.vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import PagesServices from '@/services/PagesServices';
import { useRouter } from 'vue-router';
import store from '@/store';

const router = useRouter();
const actionSelected = ref(null);
const loading = ref(false);
const search = ref('');
const bulkOption = [{ text: 'Delete', value: 'Delete' }];
const cols = ref([
  { field: 'page_title', title: 'Page Title', slot: true },
  { field: 'seo_title', title: 'Sco Title', filter: true },
  { field: 'status', title: 'status' },
  { field: 'actions', title: 'Actions' }
]);
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
};

const openModal = () => {
  modalIsOpen.value = true;
};

const editModal = (data) => {
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
  handleGetPages(payload);
}
const navigateToRoute = () => {
      router.push({ name: 'EditPages', params: { id: '1' } });
    };

// api calls
const handleGetPages = async (payload) => {
  try {
    getLoading.value = true;
    const res = await PagesServices.getPages(payload);
    if (res.status === 200 && res.data.success === true) {
      rows.value = res.data.data;
      getLoading.value = false;
      totalRows.value= res.data.total_records
    }
  } catch (e) {
    console.error('Error while pages get:', e);
  }
};

const handleAddPages = async (payload) => {
  try {
    loading.value = true;
    const res = await PagesServices.addPages(payload);
    if (res.status === 200 && res.data.success === true) {
      loading.value = false;
      handleGetPages();
      modalIsOpen.value = false;
    }
    if (res.status_code === 400) {
      loading.value = false;
      console.error('Error while adding pages:', res.message);
    }
  } catch (e) {
    loading.value = false;
    console.error('Error while adding pages:', e);
  }
};

const handleEditPages = async (payload) => {
  try {
    loading.value = true;
    const res = await PagesServices.editPages(payload);
    if (res.status === 200 && res.data.success === true) {
      editIsOpen.value = false;
      handleGetPages();
    }
    if (res.status_code === 400) {
      loading.value = false;
      console.error('Error while editing pages:', res.message);
    }
  } catch (e) {
    loading.value = false;
    console.error('Error while editing pages:', e);
  }
};

const handleDeletePages = async () => {
  try {
    loading.value = true;
    const res = await PagesServices.deletePages({ id: editData.value });
    if (res.status === 200 && res.data.success === true) {
      loading.value = false;
      deleteModalIsOpen.value = false;
      editData.value = null;
      handleGetPages();
    }
  } catch (e) {
    console.error('Error while deleting pages:', e);
  }
};

onMounted(() => {
  handleGetPages({limit:10, page:1});
  // navigateToRoute();
});
</script>
