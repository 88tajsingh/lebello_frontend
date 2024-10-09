<template>
    <PageHeader> Product </PageHeader>
    <div class="flex content-between justify-between px-1 mb-2">
      <div class="flex">
        <Select v-if="permissions.write" cusClass="h-[38px] border-boxdark" :options="bulkOption" showfield="text" valueField="value" label="Bulk Options" v-model="bulkActionSelected" />
        <Button v-if="permissions.write" class="px-2 py-2 m-auto" @click="()=>{bulkActionSelected?bulkPopup=true:''}">Apply</Button>
        <div class="max-w-52 mr-2">
          <Select :options="getDomainsList" showfield="name" class="w-full" valueField="id" label="All Domain" v-model="paginationData.domain_id" />
        </div>
        <div class="max-w-52">
          <Select :options="statusData" showfield="name" class="w-full" valueField="value" label="All Records"
              v-model="paginationData.status" />
      </div>
      </div>    
      <div class="flex">
        <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full" placeholder="Search" v-model="search" />
        <Button v-if="permissions.write" @click="() => {router.push({name: 'Product-from'}); store.dispatch('clearEditData'); }" class="px-2 py-2">Add Product </Button>  
      </div>
    </div>
    <div class="bg-white rounded-[20px]">
      <vue3-datatable  class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
      :hasCheckbox="true":cloneHeaderInFooter="true"  :stickyHeader="false"
      :rows="rows" :columns="product" :loading="getLoading" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search" @change="changePages">
        <template #name="data">
          <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
            {{ data.value.name }}
            <!-- <div v-if="isRowHovered(data.value)">overed</div> -->
          </div>
        </template>
        <template #featured_image_url="data">
          <img :src="$filePath(data.value?.featured_image_url?.file_url)" alt="Contract Image" style="max-width: 50px; max-height: 50px" />
        </template>
        <template #status="data">
          <span v-if="data.value.status===1">Draft</span>
          <span v-else-if="data.value.status===2">Pending Review</span>
          <span v-else-if="data.value.status===3">Publish</span>
          <span v-else>Status not selected</span>
        </template>
        <template v-if="permissions.write" #actions="data">
          <div class="flex gap-3">
            <div @click="() => handelEditClick(data.value)" id="edit svg">
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
    <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Product '" @delete="handleDeleteProduct">
      Do you want to delete?
    </DeleteModal>

    <DeleteModal v-model:isOpen="bulkPopup" :modalTitle="'Delete Multiple Product '" @delete="handleBulkActions()">
    Do you want to delete ?
  </DeleteModal>
    <!-- <Loader :isLoading="loading" :fullPage="true" /> -->
  </template>
  
  <script setup>
  import { ref, onMounted,watch } from 'vue';
  import Vue3Datatable from '@bhplugin/vue3-datatable';
  import ProductServices from '@/services/ProductServices';
  import { useRouter } from 'vue-router';
  import { showToast  } from '@/helper/functions';
  import { getDomains } from '@/helper/Apis';
  import { product,statusData } from '@/json/data';
  import store from '@/store';

  
  const router = useRouter();
  const bulkActionSelected = ref(null)
  const loading = ref(false);
  const search = ref('');
  const datatable = ref(null);
  const permissions =  store.getters.user.permissions;
  const paginationData= ref({limit: 10, page: 1, domain_id:'' ,status:''})
  const bulkOption = [{ text: 'Delete', value: 'Delete' }];
  const getDomainsList = ref([])
  const domain_id = ref('')
  const getLoading = ref(false);
  const editData = ref({});
  const rows = ref([]);
  const actionsFlag = ref(null);
  const bulkPopup = ref(null);
  const modalIsOpen = ref(false);
  const editIsOpen = ref(false);
  const deleteModalIsOpen = ref(false);
  const  totalRows = ref('')

  const handelEditClick =(data)=>{
  store.dispatch('setEdit', data) 
  const id =data.domain_id
  store.dispatch('setDomain', {id:id});
  router.push({name: 'Product-from'});
}
  
  const openDeleteModal = (data) => {
    deleteModalIsOpen.value = true;
    editData.value = data.id;
    console.log(data.id)
  };
  
  const handleMouseEnter = (data) => {
    actionsFlag.value = data.value.name;
  };
  
  const handleMouseLeave = () => {
    actionsFlag.value = null;
  };
  

  const changePages =(page) => {
    const {pagesize,current_page} =page;
    paginationData.value={...paginationData.value,limit:pagesize,page:current_page}
    handleGetProduct(paginationData.value);
  }
  // api calls
  const handleGetProduct = async (payload) => {
  getLoading.value = true;
  try {
    const res = await ProductServices.getProduct(payload);
    if (res.status === 200 && res.data.success) {
      rows.value = res.data.data;
      totalRows.value = res.data.total_records;
    }
  } catch (e) {
    console.error('Error while getting contract locations:', e);
  } finally {
    getLoading.value = false;
  }
};

const handleDeleteProduct = async () => {
  loading.value = true;
  try {
    const res = await ProductServices.deleteProduct({ id: editData.value });
    if (res.status === 200 && res.data.success) {
      rows.value = rows.value.filter(item => item.id !== editData.value)
      showToast(res.data.message, 'success');
      deleteModalIsOpen.value = false;
      editData.value = null;
    }
    else if (res.status === 400){
        showToast(res.data.message, 'error');
      }
  } catch (e) {
    console.error('Error while deleting contract location:', e);
  } finally {
    loading.value = false;
  }
};

// Bulk delete
const handleBulkActions = async () => {
  const selected = datatable.value.getSelectedRows();
  const ids = selected.map(item => item.id);
  if (!ids.length) return showToast('Please select atleast one product to delete', 'error');
  if (bulkActionSelected.value === 'Delete') {
    loading.value = true;
    try {
      const res = await ProductServices.BulkDeleteProduct({ id: ids });
      if (res.status === 200 && res.data.success) {
        showToast(res.data.message, 'success');
        await handleGetProduct();
      }
      else if (res.status === 400){
        showToast(res.data.message, 'error');
      }
    } catch (e) {
      console.error('Error while bulk deleting contract locations:', e);
    } finally {
      loading.value = false;
    }
  }
};

  const getDomainList = async (payload) => {
  getDomainsList.value = await getDomains(payload)
  const defaultDomain = getDomainsList.value.filter(site => site.default === 1)[0];
  // paginationData.value.domain_id = defaultDomain.id
  store.dispatch('setDomain', defaultDomain);
}

onMounted(() => {
  getDomainList();
  handleGetProduct(paginationData.value);
}
);

watch(
    () => paginationData.value.domain_id,
    () => {
      const defaultDomain = getDomainsList.value.filter(site => site.id == paginationData.value.domain_id );
      store.dispatch('setDomain', defaultDomain[0]);
      handleGetProduct(paginationData.value);
    }
);

watch(
    () => paginationData.value.status,
    () => {
      handleGetProduct(paginationData.value);
    }
);
  </script>
  