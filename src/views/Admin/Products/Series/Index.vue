<template>
  <!-- <div class="ml-96"><Languages/></div> -->
  <PageHeader> Product Series</PageHeader>
  <div class="flex  content-between justify-between   mb-2">
    <div class="flex">
      <Select cusClass="h-[40px] border-box" :options="bulkOption" showfield="text" valueField="value"
        label="Bulk Options" v-model="bulkActionSelected" />
      <Button class="px-2 py-2 m-auto" @click="handleBulkActions()">Apply</Button>
      <div class="w-52">
        <Select :options="getDominsList" showfield="name" class="w-full" valueField="id" label="Select Domain" v-model="domain_id" />
      </div>
    </div>
    <div class="flex rounded-lg bg-transparent">
      <TextInput type="text" class="block bg-white  mr-2 rounded-lg h-[40px] w-full" placeholder="Search" v-model="search" />
      <Button @click="() => {router.push({ name: 'product-series-from'});store.dispatch('clearEditData'); }"class="px-2 py-2 m-auto whitespace-nowrap">Add Series</Button>
    </div>  
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable  class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
    :hasCheckbox="true":cloneHeaderInFooter="true"  :stickyHeader="false"
    :rows="data" :columns="productSeriesCols" :loading="dataTableLoding" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search" @change="changePage">
      <template #image="data">
        <img :src="$filePath(data.value.featured_image_data?.file_url)" alt="Product Series Image" style="max-width: 50px; max-height: 50px" />
      </template>
      <template #actions="data">
        <div class="flex gap-3">
          <div @click="() => { router.push({name: 'product-series-from'});store.dispatch('setEdit', data.value); }" id="edit svg">
            <EditSvg />
          </div>
          <div id="delete svg" @click="() => { material_id = data.value; openDeleteModal(); }">
            <DeleteSvg />
          </div>
        </div>
      </template>
x
    </vue3-datatable>
  </div>
  
  <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Product Series'" @delete="handleDeleteProductSeries">
    Do you want to delete ?
  </DeleteModal>
  <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import DeleteModal from '@/components/Admin-components/Modals/DeleteModal.vue'
import { ref, onMounted,watch } from 'vue'
import { showToast } from '@/helper/functions'
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import { getDomins } from '@/helper/Apis'
import { productSeriesCols } from '@/json/data'
import TextInput from '@/components/Admin-components/form-components/TextInput.vue'
import Select from '@/components/Admin-components/form-components/Select.vue'
import Button from '@/components/Admin-components/Buttons/Button.vue'
import ProductServices from '@/services/ProductServices'
import { useRouter } from 'vue-router';
import SingleCheckBox from '@/components/Admin-components/form-components/SingleCheck.vue'
import { useStore } from 'vuex';

const checked = ref(false);
const store = useStore();
const router = useRouter();
const bulkActionSelected = ref(null)
const search = ref('')
const show_in_menu = ref('')
const bulkOption = [{ text: 'Delete', value: 'delete' }]
const material_id = ref('')
const dataTableLoding = ref(false)
const loading = ref(false)
const editData = ref({})
const data = ref([])
const datatable = ref('')
const  totalRows = ref('')
const actionsFlag = ref(null)
const getDominsList = ref([])
const domain_id = ref('')

const handleMouseEnter = (data) => {
  actionsFlag.value = data.value.name
}

const handleMouseLeave = () => {
  actionsFlag.value = null
}

const isRowHovered = (value) => {
  return actionsFlag.value === value.name
}

const deleteModalIsOpen = ref(false);
const openDeleteModal = () => {
  deleteModalIsOpen.value = true;
};

const changePage =(page) => {
  const payload = {limit:page.pagesize,page:page.current_page}
  handleGetProductSeries(payload);
}

function handleCheckboxChange(event) {
  console.log('Checkbox state changed:', event.target.checked);
}

// get materials function
const handleGetProductSeries = async (payload) => {
  
  dataTableLoding.value = true;
  try {
    await ProductServices.getProductSeries(payload)
      .then(res => {
        if (res.status === 200 && res.data.success === true) {
          if (res.data.data && res.data.data.length > 0) {
            data.value = res.data.data
            totalRows.value= res.data.total_records
          }
          else{
            data.value = res.data.data
            totalRows.value= 0;
          }
          dataTableLoding.value = false;
        }
      }).catch((res) => {
        console.log("error", res)
      });
  } catch (e) {
    console.error('Error while log in:', e);
    dataTableLoding.value = false;
  } finally {
    dataTableLoding.value = false;
  }
}

const handleEditProductSeries = async (payload) => {
  loading.value = true;
  if (form.value.domain_id !== PreviousDomain.value) {
    delete form.value.id;
  }else{
      // clone existing  in other domain 
        form.value = { ...form.value, master_material_id: masterId.value };
  }
  delete form.value?.featured_image_url;
  try {
    const res = await ProductServices.editProductSeries({...form.value});
    if (res.status === 200) {
      showToast(res.data.message, 'success');
      router.push('/product-series');
    } else if (res.status === 400) {
      showToast(res.data.message, 'error');
    }
  } catch (error) {
    console.error('Error editing location:', error);
  } finally {
    loading.value = false;
  }
}

// Delete Product Series
const handleDeleteProductSeries = async () => {
  loading.value = true;
  try {
    const res = await ProductServices.deleteProductSeries({ id: material_id.value.id });
    if (res.status === 200) {
      showToast(res.data.message, 'success');
      data.value = data.value.filter(item => item.id !== material_id.value.id)
      deleteModalIsOpen.value = false;
    } else if (res.status === 400) {
      showToast(res.message, 'error');
    }
  } catch (e) {
    console.error('Error while deleting material:', e);
  } finally {
    loading.value = false;
  }
};

// Bulk Delete 
const handleBulkActions = async () => {
  const selected = datatable.value.getSelectedRows();
  const ids = selected.map(item => item.id);
  if (bulkActionSelected.value === 'delete') {
    loading.value = true;
    try {
      const res = await ProductServices.BulkDeleteProductSeries({ id: ids });
      if (res.status === 200 && res.data.success) {
        showToast(res.data.message, 'success');
        await handleGetProductSeries();
      }
    } catch (e) {
      console.error('Error while performing bulk delete:', e);
    } finally {
      loading.value = false;
    }
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
      handleGetProductSeries({limit:10,page:1,domain_id:domain_id.value});
    }
);
</script>

