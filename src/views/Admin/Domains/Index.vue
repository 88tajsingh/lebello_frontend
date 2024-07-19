<template>
    <PageHeader>Domains</PageHeader>
    <div class="flex content-between justify-between px-1 mb-2">
      <!-- <div class="flex">
        <Select cusClass="h-[38px] border-boxdark" :options="bulkOption" showfield="text" valueField="value" label="Bulk Options" v-model="actionSelected" />
        <Button class="px-2 py-2 m-auto">Apply</Button>
      </div> -->
      <div class="flex ml-auto">
        <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full" placeholder="Search" v-model="search" />
        <Button @click="() =>openModal()" class="px-2 py-2">Add Domain</Button>
      </div>
    </div>
    <div class="bg-white rounded-[20px]">
      <vue3-datatable  class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
      :hasCheckbox="false":cloneHeaderInFooter="true"  :stickyHeader="false"
      :rows="rows" :columns="cols" :loading="dataTableLoding" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search" @change="changePages">
        <template #name="data">
          <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
            {{ data.value.name }}
            <!-- <div v-if="isRowHovered(data.value)">overed</div> -->
          </div>
        </template>
        <template #status="data">
            <span v-if="data.value.status"> Active</span>
            <span v-else> In Active</span>
        </template>
        <template #country="data">
            <span > {{ data.value.country.name }}</span>
        </template>
        <template #actions="data">
          <div class="flex gap-3">
            <!-- <div @click="() =>editModal()" id="edit svg">
              <EditSvg />
            </div> -->
            <div id="delete svg" @click="openDeleteModal(data.value)">
              <DeleteSvg />
            </div>
          </div>
        </template>
      </vue3-datatable>
    </div>
  
    <PopupModal modalTitle="Add Domain" custonClasses="w-[400px] h-[400px]" v-model:isOpen="modalIsOpen">
      <AddEditForm @handleApi="handleAddDomain"  :allCountries="allCountries"/>
    </PopupModal>
    <!-- <PopupModal modalTitle="Edit Pages" custonClasses="w-[1000px] h-[600px]" v-model:isOpen="editIsOpen">
      <AddEditForm :pagesData="editData" @handleApi="handleEditPages" />
    </PopupModal> -->
    <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Material'" @delete="handleDeleteDomain">
      Do you want to delete?
    </DeleteModal>
    <Loader :isLoading="loading" :fullPage="true" />
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { showToast ,} from '@/helper/functions'
  import { getAllCountries ,} from '@/helper/Apis'
  import AddEditForm from './AddEditForm.vue';
  import Vue3Datatable from '@bhplugin/vue3-datatable';
  import CommonServices from '@/services/CommonServices';
  import { useRouter } from 'vue-router';

  import store from '@/store';
  
  const router = useRouter();
  const actionSelected = ref(null);
  const loading = ref(false);
  const search = ref('');
  const bulkOption = [{ text: 'Delete', value: 'Delete' }];
  const cols = ref([
    { field: 'name', title: 'Domain Name', slot: true },
    { field: 'country', title: 'Country', filter: true },
    { field: 'status', title: 'Status' },
    { field: 'actions', title: 'Actions' }
  ]);
  const getLoading = ref(false);
  const editData = ref({});
  const rows = ref([]);
  const allCountries = ref([]);
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
  
  const changePages =(page) => {
    const payload = {limit:page.pagesize,page:page.current_page}
    handleGetDomains(payload);
  }
  
  // api calls
  const handleGetDomains = async (payload) => {
    try {
      getLoading.value = true;
      const res = await CommonServices.getDomains(payload);
      if (res.status === 200 && res.data.success === true) {
        rows.value = res.data.data;
        getLoading.value = false;
        totalRows.value= res.data.total_records
      }
    } catch (e) {
      console.error('Error while pages get:', e);
    }
  };
  
  const handleDeleteDomain = async () => {
    console.log(editData.value)
    try {
      loading.value = true;
      const res = await CommonServices.deleteDomains({ id: editData.value });
      if (res.status === 200 && res.data.success === true) {
        loading.value = false;
        deleteModalIsOpen.value = false;
        editData.value = null;
        showToast(res.data.message,'success')
        handleGetDomains();
      }
      if(res.status === 400){
        loading.value = false;
        showToast('Unable to delete','error')
      }
    } catch (e) {
      console.error('Error while deleting pages:', e);
    }
  };

  const handleAddDomain = async (payload) => {
    try {
      loading.value = true;
      const res = await CommonServices.addDomains(payload);
      if (res.status === 200 && res.data.success === true) {
        loading.value = false;
        showToast(res.data.message,'success')
        router.push('/domains')
      }
      if (res.status_code === 400) {
        loading.value = false;
        showToast('Somthing went wrong','error')
        console.error('Error while adding pages:', res.message);
      }
    } catch (e) {
      loading.value = false;
      console.error('Error while adding pages:', e);
    }
  };
//   const handleEditPages = async (payload) => {
//     try {
//       loading.value = true;
//       const res = await CommonServices.editPages(payload);
//       if (res.status === 200 && res.data.success === true) {
//         loading.value = false;
//         showToast(' Edit Page sucessfully','success')
//         router.push('/pages')
//       }
//       if (res.status_code === 400) {
//         loading.value = false;
//         showToast('Somthing went wrong','error')
  
//         console.error('Error while editing pages:', res.message);
//       }
//     } catch (e) {
//       loading.value = false;
//       console.error('Error while editing pages:', e);
//     }
//   };

const getCountries = async () => {
  allCountries.value = await getAllCountries()
}
  
  onMounted(() => {
    handleGetDomains({page:1});
    getCountries();
  });
  </script>
  

