<template>
  <PageHeader> Swatches</PageHeader>
  <div class="flex  content-between justify-between px-1 mb-2">
    <div class="flex">
      <Select cusClass="h-[38px] border-boxdark	  " :options="SwatchesBulkOption" showfield="text" valueField="value"
        label="Bulk Options" v-model="bulkActionSelected" />
      <Button class="px-2 py-2 m-auto" @click="handleBulkActions()">Apply</Button>
    </div>
    <div class="flex">
      <TextInput type="text" class="block bg-white rounded-lg mr-2 h-[40px] w-full" placeholder="Search" v-model="search" />
      <Button @click="() => {router.push({ name: 'swatches-add'}) }" class="px-2 py-2 m-auto whitespace-nowrap"> Add Swatches </Button>
    </div>
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable  class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
    :hasCheckbox="true":cloneHeaderInFooter="true"  :stickyHeader="false"
    :rows="rows" :columns="cols" :loading="dataTableLoding" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search" @change="changePage">
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
import { SwatchesBulkOption } from '@/json/data.js'
import { MaterialTreeList } from '@/helper/Apis';
import { showToast } from '@/helper/functions'
import SwatchesServices from '@/services/SwatchesServices';
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import Button from "@/components/Admin-components/Buttons/Button.vue";
import Select from "@/components/Admin-components/form-components/Select.vue";
import TextInput from "@/components/Admin-components/form-components/TextInput.vue";
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const MaterialTreeListData = ref([]);
const dataTableLoding = ref(false);
const rows = ref([]);
const loading = ref(false);
const datatable = ref('')
const bulkActionSelected = ref(null);
const search = ref('')
const  totalRows = ref('')
const imgKey=ref('')
const actionsFlag = ref(null)

const cols = ref([
  { field: 'src', title: 'Thumbs', slot: true },
  { field: 'title', title: 'Title', filter: true },
  { field: 'slug', title: 'Slug' },
  { field: 'actions', title: 'Actions' },
])

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
  // dataTableLoding.value = true;
  try {
    await SwatchesServices.getSwatches(payload)
      .then(res => {
        if (res.status === 200 && res.data.success === true) {
          if (res.data.data && res.data.data.length > 0) {
            rows.value = res.data.data
            totalRows.value= res.data.total_records
            // imgKey.value=Object.keys(cols.value)
          }
          // dataTableLoding.value = false;
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
// delete Swatches
const swatch_id = ref('')
const handleDeleteSwatches = async () => {
  loading.value = true;
  try {
    await SwatchesServices.deleteSwatches({ ...swatch_id.value })
      .then(res => {
        if (res && res.status === 200 && res.data.success === true) {
          modalflag.value.delete = false;
          showToast(' Swatches delete sucessfully','success')
          handleGetSwatches();
          loading.value = false;
        }
        if (res && res.status === 400) {
                    loading.value = false;
                    showToast(' Somthing went wrong','error')

                }
      })
  } catch (e) {
    loading.value = false;
    console.error('Error while log in:', e);
  }
}
// Bulk Delete 
const handleBulkActions = async () => {
  loading.value = true;
  const selected = datatable.value.getSelectedRows();
  let id = selected.map(item => item.id)
  if (bulkActionSelected.value === 'delete') {
    try {
      await SwatchesServices.bulkDeleteSwatches({ 'id': id })
        .then(res => {
          if (res && res.status === 200 && res.data.success === true) {
            rows.value = res.data.data
            modalflag.value.delete = false;
            showToast(' Swatches bulk delete sucessfully','success')
            handleGetSwatches();
            loading.value = false;
          }
          if (res && res.status === 400) {
                    loading.value = false;
                    showToast(' Somthing went wrong','error')

                }
        })
    } catch (e) {
      loading.value = false;
      modalflag.value.delete = false;
      console.error('Error while log in:', e);
    }
  }
};

onMounted(() => {
  handleGetSwatches({limit:10 , page:1});
}
);
</script>