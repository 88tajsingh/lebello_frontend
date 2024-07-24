<template>
  <PageHeader> Swatches</PageHeader>
  <div class="flex  content-between justify-between px-1 mb-2">
    <div class="flex">
      <Select cusClass="h-[38px] border-boxdark	  " :options="SwatchesBulkOption" showfield="text" valueField="value"
        label="Bulk Options" v-model="bulkActionSelected" />
      <Button class="px-2 py-2 m-auto" @click="handleBulkActions()">Apply</Button>
      <div class="w-52">
        <Select :options="getDominsList" showfield="name" class="w-full" valueField="id" label="Select Domain" v-model="domain_id" />
      </div>
    </div>
    <div class="flex">
      <TextInput type="text" class="block bg-white rounded-lg mr-2 h-[40px] w-full" placeholder="Search" v-model="search" />
      <Button @click="() => {router.push({ name: 'swatches-add'}) }" class="px-2 py-2 m-auto whitespace-nowrap"> Add Swatches </Button>
    </div>
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable  class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
    :hasCheckbox="true":cloneHeaderInFooter="true"  :stickyHeader="false"
    :rows="rows" :columns="swatchCols" :loading="dataTableLoding" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search" @change="changePage">
    <template #name="data">
        <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
          {{ data.value.name }}
          <!-- <div v-if="isRowHovered(data.value)">overed</div> -->
        </div>
      </template>
      <template #src="data">
        <img :src="$filePath(data.value.featured_image_url)" alt="Swatches Image" style="max-width: 50px; max-height: 50px" />
      </template>
      <template #actions="data">
        <div class="flex gap-3">
          <div @click="() => {router.push({ name: 'swatches-edit', params: { id: data.value.id } }) }" id="edit svg">
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

  <Loader :isLoading="loading" :fullPage="true" />

</template>

<script setup>
import DeleteModal from '@/components/Admin-components/Modals/DeleteModal.vue';
import { SwatchesBulkOption,swatchCols } from '@/json/data.js'
import { getDomins } from '@/helper/Apis';
import { showToast } from '@/helper/functions'
import SwatchesServices from '@/services/SwatchesServices';
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import Button from "@/components/Admin-components/Buttons/Button.vue";
import Select from "@/components/Admin-components/form-components/Select.vue";
import TextInput from "@/components/Admin-components/form-components/TextInput.vue";
import { ref, onMounted,watch } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const domain_id=ref(null);
const getDominsList = ref([]);
const dataTableLoding = ref(false);
const rows = ref([]);
const loading = ref(false);
const datatable = ref('')
const bulkActionSelected = ref(null);
const search = ref('')
const  totalRows = ref('')
const imgKey=ref('')
const actionsFlag = ref(null)

const handleMouseEnter = (data) => {
  actionsFlag.value = data.value.name
}

const handleMouseLeave = () => {
  actionsFlag.value = null
}

const isRowHovered = (value) => {
  return actionsFlag.value === value.name
}
const changePage =(page) => {
  const payload = {limit:page.pagesize,page:page.current_page}
  handleGetSwatches(payload);
}
// modal 
const modalflag = ref({
  delete: false,
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
    else{
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
      rows.value = rows.value.filter(item => item.id !== swatch_id.value);
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
  loading.value = true;
  const selected = datatable.value.getSelectedRows();
  const ids = selected.map(item => item.id);

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
      console.log(defaultDomain , domain_id.value)
      handleGetSwatches({limit:10,page:1,domain_id:domain_id.value});
    }
);

</script>