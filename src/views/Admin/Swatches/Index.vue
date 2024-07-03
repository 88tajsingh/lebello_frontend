<template>
  <PageHeader> Swatches</PageHeader>
    <div class="flex  content-between justify-between px-1 mb-2">
    <div class="flex">
      <Select cusClass="h-[38px] border-boxdark" :options="SwatchesBulkOption" showfield="text" valueField="value" label="Bulk Options" v-model="actionSelected" />
      <Button class="px-2 py-2 m-auto">Apply</Button>
    </div>
    <div class="flex">
      <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full"  placeholder="Search" v-model="search"  />
      <Button :onclick="openModal" class="px-2 py-2 "> Add Swatches </Button>
    </div>
  </div>
  <div class="bg-white">
    <vue3-datatable skin="bh-table-striped bh-table-hover "  :hasCheckbox="true" :loading="dataTableLOding"
    :rows="rows" :columns="cols" paginationInfo="showing {0} to {1} of {2}" showNumbersCount="3"
    class="next-prev-pagination" :cloneHeaderInFooter="true"
    rowClass=""
    :search="search"
    >
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
      <div class="flex">
        <Button :onclick="editModal" bg_th_color="bg-[#2271b1] text-white px-3 py-2" class="m-0 py-1 px-2" >Edit</Button>
          <Button Button :onclick="openModal" class="m-0  px-2" 
          bg_th_color="bg-red border-red text-white "
          >Delete</Button>
      </div>
  </template>
  </vue3-datatable>
  </div>  

<!-- popups -->
  <PopupModal modalTitle="Add Swatches" v-model:isOpen="modalIsOpen">
    <AddAndEdit @handleApi='handleAddSwatches' formHeader="Add Material" :materialTree='MaterialTreeListData' />
  </PopupModal>
  <PopupModal modalTitle="Edit Swatches" v-model:isOpen="editIsOpen">
    <AddAndEdit :material='editData' @handleApi="handleEditSwatches"/>
  </PopupModal>

  <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Item'" @delete="handleDeleteMaterials" >
  Do you want to delete ?
  </DeleteModal>
</template>

<script setup>
import {swatches,SwatchesBulkOption} from '@/json/data.js'
import { MaterialTreeList } from '@/helper/Apis';
import AddAndEdit  from './AddAndEdit.vue'
import SwatchesServices from '@/services/SwatchesServices';
import PopupModal from '@/components/Admin-components/Modals/PopupModal.vue';
import PageHeader  from '@/components/Admin-components/PageHeader.vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import Button from "@/components/Admin-components/Buttons/Button.vue";
import Select from "@/components/Admin-components/form-components/Select.vue";
import TextInput from "@/components/Admin-components/form-components/TextInput.vue";
import { ref, computed,onMounted } from "vue";
const MaterialTreeListData = ref([]);
const dataTableLoding  = ref(false);
const rows  = ref([]);
const editData  = ref([]);
const editIsOpen  = ref(false);
const modalflag= ref({
  open : false,
  editIsOpen : false,
  delete : false,
})
const actionSelected = ref('')
const search = ref('')
 
const cols = ref([
  { field: 'src', title: 'Thumbs', slot: true },
  { field: 'title', title: 'Title', filter: true },
  { field: 'date', title: 'Date' },
  { field: 'actions', title: 'Actions' },
])

const tableHeaders = [
  { text: "Thumbs", },
  { text: "Title",   },
  { text: "Date",  },
  { text: "actions", },
];

const actionsFlag = ref(null)
const modalIsOpen = ref(false)

const openModal = () => {
  modalIsOpen.value = true
}

const handleMouseEnter = (data) => {
  actionsFlag.value = data.value.name
}

const handleMouseLeave = () => {
  actionsFlag.value = null
}

const isRowHovered = (value) => {
  return actionsFlag.value === value.name
}

//----------------------- api calls ----------------------------------------------------
// get Swatches function
const handleGetSwatches = async () => {
  dataTableLoding.value = true;
  try {
      await  SwatchesServices.getSwatches()
        .then(res => {
          if (res.status === 200 && res.data.success === true) {
            if(res.data.data && res.data.data.length > 0) {
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

const editModal = () => {
  editIsOpen.value = true;
}
// add Swatches function
const handleAddSwatches = async (payload) => {
  try {
    console.log("payload: " + payload)
        loading.value = true;
    await    SwatchesServices.addSwatches(payload)
        .then(res => {
          if (res.status === 200) {
            modalIsOpen.value = false; 
            if(res.data.data && res.data.data.length > 0) {
              rows.value = res?.data?.data
              handleGetSwatches();
            } 
            
            loading.value = false;  
            // handleGetSwatches();   
         }
        })  
    } catch (e) {
      console.error('Error while log in:', e);
    } finally {
      loading.value = false;
    }
}
// edit Swatches function
const handleEditSwatches =async (payload) => {
  loading.value = true;
  try {
  await  SwatchesServices.editSwatches(payload)
    .then(res => {
      console.log("res.status",res.status)
      // editCloseModal();
      if (res && res.status === 200) {
        if(res.data.data && res.data.data.length > 0) {
              rows.value = res.data.data
              handleGetSwatches();
            } 
            editCloseModal();
            // rows.value = res.data.data
            // loading.value = false;    
            // console.log('editIsOpen.value',editIsOpen.value)
            // handleGetSwatches(); 
         }
        })  
    } catch (e) {
      console.error('Error while log in:', e);
    } finally {
      loading.value = false;
      // editCloseModal();
    }
}
// delete Swatches
const handleDeleteSwatches = async  () => {
  try {
    loading.value = true;
    // const payload = {"id":material_id.value.id}
      await  SwatchesServices.  deleteSwatches(payload) 
        .then(res => {
          if (res.status === 200) {
            console.log(res.data.data)
            rows.value = res.data.data
            loading.value = false;  
            deleteModalIsOpen.value = false;    
            handleGetSwatches(); 
            
         }
        })  
    } catch (e) {
      console.error('Error while log in:', e);
    } finally {
      loading.value = false;
    }
}

const materialTree = async ()=>{
  MaterialTreeListData.value= await MaterialTreeList()
}


onMounted(() =>{ 
  handleGetSwatches();
  materialTree();
}
);

</script>
<style scoped >
.bh-pagination-info .bh-pagesize{
  width : 70px !important
}
</style>