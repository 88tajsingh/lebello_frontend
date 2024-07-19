<template>
    <PageHeader> All Contract </PageHeader>
    <div class="flex content-between justify-between px-1 mb-2">
      <div class="flex">
        <Select cusClass="h-[38px] border-boxdark" :options="bulkOption" showfield="text" valueField="value" label="Bulk Options" v-model="actionSelected" />
        <Button class="px-2 py-2 m-auto">Apply</Button>
      </div>
      <div class="flex">
        <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full" placeholder="Search" v-model="search" />
        <Button @click="() => {router.push({ name:'Contract-add'}) }" class="px-2 py-2">Add Contract</Button>
        
      </div>
    </div>
    <div class="bg-white rounded-[20px]">
      <vue3-datatable  class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
      :hasCheckbox="true":cloneHeaderInFooter="true"  :stickyHeader="false"
      :rows="rows" :columns="cols" :loading="dataTableLoding" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search" @change="changeServer">
        <template #name="data">
          <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
            {{ data.value.name }}
            <!-- <div v-if="isRowHovered(data.value)">overed</div> -->
          </div>
        </template>
        <template #image="data">
          <img :src="data.value.image" alt="Contract Image" style="max-width: 50px; max-height: 50px" />
        </template>
        <template #actions="data">
          <div class="flex gap-3">
            <div @click="() =>router.push({ name:'Contract-edit',params: { id: data.value.id }}) " id="edit svg">
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
    <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Material'" @delete="handleDeleteContract">
      Do you want to delete?
    </DeleteModal>
    <!-- <Loader :isLoading="loading" :fullPage="true" /> -->
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import Vue3Datatable from '@bhplugin/vue3-datatable';
  import ContractServices from '@/services/ContractServices';
  import { showToast } from '@/helper/functions';

  
  const router = useRouter();
  const actionSelected = ref(null);
  const loading = ref(false);
  const search = ref('');
  const bulkOption = [{ text: 'Delete', value: 'Delete' }];
  const cols = ref([
    { field: 'title', title: 'Contract Title', slot: true },
    { field: 'slug', title: 'Slug', filter: true },
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
    handleGetContract(payload);
  }
  const navigateToRoute = () => {
        router.push({ name: 'EditPages', params: { id: '1' } });
      };
  
  // api calls
 const handleGetContract = async (payload) => {
  try {
    getLoading.value = true;
    const res = await ContractServices.getNewContract(payload);
    if (res.status === 200 && res.data.success) {
      rows.value = res.data.data;
      totalRows.value = res.data.total_records;
    }
  } catch (error) {
    console.error('Error while fetching contracts:', error);
  } finally {
    getLoading.value = false;
  }
};

const handleDeleteContract = async () => {
  try {
    loading.value = true;
    const res = await ContractServices.deleteNewContract({ id: editData.value });
    if (res.status === 200 && res.data.success) {
      showToast(res.data.message,'success')
      editData.value = null;
      deleteModalIsOpen.value = false;
      await handleGetContract(); 
    }
  } catch (error) {
    console.error('Error while deleting contract:', error);
  } finally {
    loading.value = false;
  }
};

  onMounted(() => {
    handleGetContract({limit:10, page:1});
    // navigateToRoute();
  });
  </script>
  