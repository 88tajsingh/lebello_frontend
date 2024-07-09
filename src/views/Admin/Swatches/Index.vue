<template>
  <PageHeader> Swatches</PageHeader>
  <div class="flex  content-between justify-between px-1 mb-2">
    <div class="flex">
      <Select cusClass="h-[38px] border-boxdark	  " :options="SwatchesBulkOption" showfield="text" valueField="value"
        label="Bulk Options" v-model="bulkActionSelected" />
      <Button class="px-2 py-2 m-auto" @click="handleBulkActions()">Apply</Button>
    </div>
    <div class="flex">
      <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full" placeholder="Search" v-model="search" />
      <Button :onclick="openModal" class="px-2 py-2 "> Add Swatches </Button>
    </div>
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable ref="datatable" skin="bh-table-striped bh-table-hover " :hasCheckbox="true"
      :loading="dataTableLoding" :rows="rows" :columns="cols" paginationInfo="showing {0} to {1} of {2}"
      showNumbersCount="3" class="next-prev-pagination" :cloneHeaderInFooter="true" rowClass="" :search="search">
      <template #name="data">
        <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
          {{ data.value.name }}
          <div v-if="isRowHovered(data.value)">overed</div>
        </div>
      </template>
      <template #src="data">
        <img :src="data.value.src" alt="Material Image" style="max-width: 50px; max-height: 50px" />
      </template>
      <template #actions="data">
        <div class="flex gap-3">
          <div @click='() => { editData = data.value; editModal(); }' id="edit svg">
            <EditSvg />
          </div>
          <div id="delete svg" @click="() => { swatch_id = { id: data.value.id }; deleteModal(); }">
            <DeleteSvg />
          </div>
          <!-- <Button :onclick="editModal" bg_th_color="bg-[#2271b1] text-white px-3 py-2" class="m-0 py-1 px-2" >Edit</Button>
          <Button Button :onclick="openModal" class="m-0  px-2" 
          bg_th_color="bg-red border-red text-white "
          >Delete</Button> -->
        </div>
      </template>
    </vue3-datatable>
  </div>

  <!-- popups modals -->
  <PopupModal modalTitle="Add Swatches" v-model:isOpen="modalflag.open">
    <AddAndEdit @handleApi='handleAddSwatches' formHeader="Add Material" :materialTree='MaterialTreeListData' />
  </PopupModal>
  <PopupModal modalTitle="Edit Swatches" v-model:isOpen="modalflag.edit">
    <AddAndEdit :swatches='editData' @handleApi="handleEditSwatches" :materialTree='MaterialTreeListData' />
  </PopupModal>
  <DeleteModal v-model:isOpen="modalflag.delete" :modalTitle="'Delete Swatches'" @delete="handleDeleteSwatches">
    Do you want to delete ?
  </DeleteModal>

  <Loader :isLoading="loading" :fullPage="true" />

</template>

<script setup>
import DeleteModal from '@/components/Admin-components/Modals/DeleteModal.vue';
import { SwatchesBulkOption } from '@/json/data.js'
import { MaterialTreeList } from '@/helper/Apis';
import AddAndEdit from './AddAndEdit.vue'
import SwatchesServices from '@/services/SwatchesServices';
import PopupModal from '@/components/Admin-components/Modals/PopupModal.vue';
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import Button from "@/components/Admin-components/Buttons/Button.vue";
import Select from "@/components/Admin-components/form-components/Select.vue";
import TextInput from "@/components/Admin-components/form-components/TextInput.vue";
import { ref, computed, onMounted } from "vue";
const MaterialTreeListData = ref([]);
const dataTableLoding = ref(false);
const rows = ref([]);
const editData = ref({});
const loading = ref(false);
const datatable = ref('')
const bulkActionSelected = ref('')
const search = ref('')

const cols = ref([
  { field: 'src', title: 'Thumbs', slot: true },
  { field: 'title', title: 'Title', filter: true },
  { field: 'slug', title: 'Slug' },
  { field: 'actions', title: 'Actions' },
])


const actionsFlag = ref(null)
const modalIsOpen = ref(false)



const handleMouseEnter = (data) => {
  actionsFlag.value = data.value.name
}

const handleMouseLeave = () => {
  actionsFlag.value = null
}

const isRowHovered = (value) => {
  return actionsFlag.value === value.name
}

// modal 
const modalflag = ref({
  open: false,
  edit: false,
  delete: false,
})
const openModal = () => {
  modalflag.value.open = true;
}

const editModal = () => {
  modalflag.value.edit = true;
}
const deleteModal = () => {
  modalflag.value.delete = true;

}

//----------------------- api calls ----------------------------------------------------
// get Swatches function
const handleGetSwatches = async () => {
  dataTableLoding.value = true;
  try {
    await SwatchesServices.getSwatches()
      .then(res => {
        if (res.status === 200 && res.data.success === true) {
          if (res.data.data && res.data.data.length > 0) {
            rows.value = res.data.data
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


// add Swatches function
const handleAddSwatches = async (payload) => {
  loading.value = true;
  try {
    await SwatchesServices.addSwatches(payload)
      .then(res => {
        if (res.status === 200) {
          if (res && res.status === 200 && res.data.data.success === true) {
            rows.value = res?.data?.data
            handleGetSwatches();
            modalflag.value.open = false;
            loading.value = false;
          }

        }
      })
  } catch (e) {
    modalflag.value.open = false;
            loading.value = false;
    console.error('Error while log in:', e);
  }
}
// edit Swatches function
const handleEditSwatches = async (payload) => {
  loading.value = true;
  try {
    await SwatchesServices.editSwatches(payload)
      .then(res => {
        if (res && res.status === 200 && res.data.success === true) {
          rows.value = res.data.data
          handleGetSwatches();
          loading.value = false;
          modalflag.value.edit = false;
        }
      })
  } catch (e) {
    loading.value = false;
    modalflag.value.edit = false;
    console.error('Error while log in:', e);
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
          rows.value = res.data.data
          modalflag.value.delete = false;
          handleGetSwatches();
          loading.value = false;

        }
      })
  } catch (e) {
    loading.value = false;
    console.error('Error while log in:', e);
  }
}



const materialTree = async () => {
  MaterialTreeListData.value = await MaterialTreeList()
  console.log("object", MaterialTreeListData)
}

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
            handleGetSwatches();
            loading.value = false;
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
  handleGetSwatches();
  materialTree();
}
);

</script>
<style scoped>
.bh-pagination-info .bh-pagesize {
  width: 70px !important
}
</style>