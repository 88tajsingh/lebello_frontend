<template>
  <PageHeader> Swatches</PageHeader>
  <div class="flex  content-between justify-between px-1 mb-2">
    <div class="flex">
      <Select v-if="permissions.write" cusClass="h-[38px] border-boxdark	  " :options="SwatchesBulkOption"
        showfield="text" valueField="value" label="Bulk Options" v-model="bulkActionSelected" />
      <Button v-if="permissions.write" class="px-2 py-2 m-auto" @click="()=>modalflag.multiDelete=true">Apply</Button>
      <div class="max-w-52 mr-2">
        <Select :options="getDomainsList" showfield="name" class="w-full" valueField="id" label="All Domain"
          v-model="paginationData.domain_id" />
      </div>
      <div class="max-w-52">
        <Select :options="statusData" showfield="name" class="w-full" valueField="value" label="All Records"
          v-model="paginationData.status" />
      </div>
    </div>
    <div class="flex">
      <TextInput type="text" class="block bg-white rounded-lg mr-2 h-[40px] w-full" placeholder="Search"
        v-model="search" />
      <Button v-if="permissions.write"
        @click="() => { router.push({ name: 'Swatches-form' }); store.dispatch('clearEditData'); }"
        class="px-2 py-2 m-auto whitespace-nowrap"> Add Swatches </Button>
    </div>
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
      :hasCheckbox="true" :cloneHeaderInFooter="true" :stickyHeader="false" :rows="rows" :columns="swatchCols"
      :loading="dataTableLoding" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search"
      @change="changePage">
      <template #name="data">
        <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
          {{ data.value.name }}
          <!-- <div v-if="isRowHovered(data.value)">overed</div> -->
        </div>
      </template>
      <template #src="data">
        <img :src="$filePath(data.value.featured_image_data?.file_url)" alt="Swatch"
     style="max-width: 50px; max-height: 50px" />
      </template>
      <template #status="data">
        <span v-if="data.value.status === 1">Draft</span>
        <span v-else-if="data.value.status === 2">Pending Review</span>
        <span v-else-if="data.value.status === 3">Publish</span>
        <span v-else>Status not selected</span>
      </template>
      <template v-if="permissions.write" #actions="data">
        <div class="flex gap-3">
          <div @click="()=>handelEditClick(data.value)"
            id="edit svg">
            <EditSvg />
          </div>
          <div id="delete svg" @click="() => { swatch_id = { id: data.value.id }; deleteModal(); }">
            <DeleteSvg />
          </div>
        </div>
      </template>
    </vue3-datatable>
  </div>

  <!-- popups modals -->
  <DeleteModal v-model:isOpen="modalflag.delete" :modalTitle="'Delete Swatches'" @delete="handleDeleteSwatches">
    Do you want to delete ?
  </DeleteModal>

  <!-- multiple popups modals -->
  <DeleteModal v-model:isOpen="modalflag.multiDelete" :modalTitle="'Multiple Delete Swatches'" @delete="handleBulkActions">
    Do you want to delete multiple swatches ?
  </DeleteModal>

  <Loader :isLoading="loading" :fullPage="true" />

</template>

<script setup>
import DeleteModal from '@/components/Admin-components/Modals/DeleteModal.vue';
import { SwatchesBulkOption, swatchCols, statusData } from '@/json/data.js'
import { getDomains } from '@/helper/Apis';
import { showToast } from '@/helper/functions'
import SwatchesServices from '@/services/SwatchesServices';
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import Button from "@/components/Admin-components/Buttons/Button.vue";
import Select from "@/components/Admin-components/form-components/Select.vue";
import TextInput from "@/components/Admin-components/form-components/TextInput.vue";
import { ref, onMounted, watch } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const getDomainsList = ref([]);
const dataTableLoding = ref(false);
const rows = ref([]);
const permissions = store.getters.user.permissions;
const paginationData = ref({ limit: 10, page: 1, domain_id: '', status: '' })
const loading = ref(false);
const datatable = ref('')
const bulkActionSelected = ref(null);
const search = ref('')
const totalRows = ref('')
const actionsFlag = ref(null)

const handleMouseEnter = (data) => {
  actionsFlag.value = data.value.name
}

const handleMouseLeave = () => {
  actionsFlag.value = null
}

const handelEditClick =(data)=>{
  store.dispatch('setEdit', data) 
  const id =data.domain_id
  store.dispatch('setDomain', {id:id});
  router.push({ name: 'Swatches-form' });
}

const changePage = (page) => {
  const { pagesize, current_page } = page;
  paginationData.value = { ...paginationData.value, limit: pagesize, page: current_page }
  handleGetSwatches(paginationData.value);

}
// modal 
const modalflag = ref({
  delete: false,
  multiDelete:false,
})
const deleteModal = () => {
  modalflag.value.delete = true;
}

//----------------------- api calls ----------------------------------------------------
// get Swatches function
const handleGetSwatches = async (payload) => {
  dataTableLoding.value = true;
  try {
    const res = await SwatchesServices.getSwatches(payload);
    if (res.status === 200 && res.data.success) {
      rows.value = res.data.data || [];
      totalRows.value = res.data.data ? res.data.total_records : 0;
    }
    else {
      rows.value = [];
      totalRows.value = 0;
    }
  } catch (error) {
    console.error('Error fetching swatches:', error);
  } finally {
    dataTableLoding.value = false;
  }
};

const swatch_id = ref('');
const handleDeleteSwatches = async () => {
  loading.value = true;
  try {
    const res = await SwatchesServices.deleteSwatches(swatch_id.value);
    if (res.status === 200 && res.data.success) {
      handleGetSwatches(paginationData.value);
      showToast('Swatch deleted successfully', 'success');
    } else if (res.status === 400) {
      showToast('Something went wrong', 'error');
    }
  } catch (error) {
    console.error('Error deleting swatch:', error);
  } finally {
    loading.value = false;
  }
};

const handleBulkActions = async () => {
  const selected = datatable.value.getSelectedRows();
  const ids = selected.map(item => item.id);
  if(ids.length === 0){
    return showToast('Please select atleast one swatch', 'error');
  }
  loading.value = true;
  if (bulkActionSelected.value === 'delete') {
    try {
      const res = await SwatchesServices.bulkDeleteSwatches({ id: ids });
      if (res.status === 200 && res.data.success) {
        rows.value = res.data.data || [];
        showToast('Swatches bulk deleted successfully', 'success');
        handleGetSwatches();
      } else if (res.status === 400) {
        showToast('Something went wrong', 'error');
      }
    } catch (error) {
      console.error('Error performing bulk action:', error);
    } finally {
      loading.value = false;
    }
  }
};


const getDomainList = async (payload) => {
  getDomainsList.value = await getDomains(payload)
  const defaultDomain = getDomainsList.value.filter(site => site.default === 1)[0];
  paginationData.value.domain_id = defaultDomain.id
}

onMounted(() => {
  getDomainList();
}
);

watch(
  () => paginationData.value.domain_id,
  () => {
    const defaultDomain = getDomainsList.value.filter(site => site.id == paginationData.value.domain_id);
    store.dispatch('setDomain', defaultDomain[0]);
    handleGetSwatches(paginationData.value);
  }
);
watch(
  () => paginationData.value.status,
  () => {
    handleGetSwatches(paginationData.value);
  }
);

</script>