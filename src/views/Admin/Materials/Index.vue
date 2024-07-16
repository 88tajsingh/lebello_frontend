<template>
  <PageHeader> Material</PageHeader>
  <div class="flex  content-between justify-between   mb-2">
    <div class="flex">
      <Select cusClass="h-[40px] border-box" :options="bulkOption" showfield="text" valueField="value"
        label="Bulk Options" v-model="bulkActionSelected" />
      <Button class="px-2 py-2 m-auto" @click="handleBulkActions()">Apply</Button>
    </div>
    <div class="flex rounded-lg bg-transparent">
      <TextInput type="text" class="block bg-white  mr-2 rounded-lg h-[40px] w-full" placeholder="Search" v-model="search" />
      <Button @click="() => {router.push({ name: 'materials-add'}) }"class="px-2 py-2 m-auto whitespace-nowrap">Add Materials</Button>
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
      <template #image="data">
        <img :src="$filePath(data.value.image)" alt="Material Image" style="max-width: 50px; max-height: 50px" />
      </template>
      <template #actions="data">
        <div class="flex gap-3">
          <div @click="() => {router.push({ name: 'materials-edit', params: { id: data.value.id } }) }" id="edit svg">
            <EditSvg />
          </div>
          <div id="delete svg" @click="() => { material_id = data.value; openDeleteModal(); }">
            <DeleteSvg />
          </div>
          <!-- <Button :onClick="editModal" bg_th_color="bg-[#2271b1] text-white px-3 py-2" class="m-0 py-1 px-2" @click="()=>{editData=data.value}">Edit</Button>
        <Button  class="m-0 px-2" :onClick="openDeleteModal" bg_th_color="bg-red border-red text-white" @click="()=>{material_id=data.value}">Delete</Button> -->

        </div>
      </template>
    </vue3-datatable>
  </div>
  <!-- <DataTable  :bulkOption='bulkOption' :isSearchAble='true' :loading='false' :hasCheckbox='true' :rows='rows' 
    :cols='cols' AddBtnName='Add Materials' material
  >
  <template #name="data">
      <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
        {{ data.value.name }}
        <div v-if="isRowHovered(data.value)">overed</div>
      </div>
    </template>
    <template v-slot:image="{ row }">
      <img :src="row.image" alt="Material Image" style="width: 50px; height: 50px;" />
    </template>
    <template #actions="data">
                <div class="flex">
                  <Button :onclick="openModal"bg_th_color="bg-[#2271b1] text-white px-3 py-2" class="m-0 py-1 px-2" @click="viewUser(data.value)">Edit</Button>
                    <Button Button :onclick="openModal" class="m-0  px-2" @click="deleteUser(data.value)"
                    bg_th_color="bg-red border-red text-white "
                    >Delete</Button>
                </div>
            </template>
            <template v-for="col in tableColumns" v-if="col.slot" v-slot:[col.field]="{ row }">
              <div v-if="col.field === 'image'">
          <img :src="row.image" alt="Material Image" style="max-width: 100px;">
        </div>
              </template>
</DataTable> -->
  <PopupModal modalTitle="Add Materials" v-model:isOpen="modalIsOpen">
    <!-- <PopupModal modalTitle="Add Materials" v-model:isOpen="modalIsOpen"> -->
    <AddAndEdit @handleApi='handleAddMaterials' formHeader="Add Material" :materialTree='MaterialTreeListData' />
  </PopupModal>
  <PopupModal modalTitle="Edit Materials" v-model:isOpen="editIsOpen">
    <AddAndEdit :material='editData' @handleApi="handleEditMaterials" />
  </PopupModal>

  <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Material'" @delete="handleDeleteMaterials">
    Do you want to delete ?
  </DeleteModal>


  <Loader :isLoading="loading" :fullPage="true" />

</template>

<script setup>
import DeleteModal from '@/components/Admin-components/Modals/DeleteModal.vue'
import { ref, onMounted } from 'vue'
import { showToast } from '@/helper/functions'
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import DataTable from '@/components/Admin-components/DataTable.vue'
import AddAndEdit from './AddAndEdit.vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import { MaterialTreeList } from '@/helper/Apis'
import TextInput from '@/components/Admin-components/form-components/TextInput.vue'
import Select from '@/components/Admin-components/form-components/Select.vue'
import Button from '@/components/Admin-components/Buttons/Button.vue'
import materialsServices from '@/services/MaterialsServices'
import { useRouter } from 'vue-router';

const router = useRouter();
const bulkActionSelected = ref(null)
const search = ref('')
const bulkOption = [{ text: 'Delete', value: 'delete' }]
const cols = ref([
  { field: 'image', title: 'Image', slot: true },
  { field: 'name', title: 'Name', filter: true },
  { field: 'description', title: 'Description' },
  { field: 'slug', title: 'Slug' },
  { field: 'count', title: 'Count' },
  { field: 'actions', title: 'Actions' },
])
const MaterialTreeListData = ref([])
const material_id = ref('')
const dataTableLoding = ref(false)
const loading = ref(false)
const editData = ref({})
const rows = ref([])
const datatable = ref('')
const  totalRows = ref('')
const actionsFlag = ref(null)

// const modalIsOpen = ref(false)
// const editIsOpen = ref(false)

// const openModal = () => {
//   modalIsOpen.value = true
// }
// const editModal = () => {
//   editIsOpen.value = true;
// }
// const editCloseModal = () => {
//   editIsOpen.value = false;
//   console.log('run close modal');
// }

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
  handleGetMaterials(payload);
}
// get materials function
const handleGetMaterials = async (payload) => {
  dataTableLoding.value = true;
  try {
    await materialsServices.getMaterials(payload)
      .then(res => {
        if (res.status === 200 && res.data.success === true) {
          if (res.data.data && res.data.data.length > 0) {
            rows.value = res.data.data
            totalRows.value= res.data.total_records
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
// delete material
const handleDeleteMaterials = async () => {
  try {
    loading.value = true;
    const payload = { "id": material_id.value.id }
    await materialsServices.deleteMaterial(payload)
      .then(res => {
        if (res.status === 200) {
          loading.value = false;
          showToast(' Material Deleted sucessfully','success')
          deleteModalIsOpen.value = false;
          handleGetMaterials();
        }
        if (res.status === 400) {
          loading.value = false;
          showToast(' Somthing went wrong','error')
        }
      })
  } catch (e) {
    console.error('Error while log in:', e);
  } finally {
    loading.value = false;
  }
}
// Bulk Delete 
const handleBulkActions = async () => {
  const selected = datatable.value.getSelectedRows();
  let id = selected.map(item => item.id)
  if (bulkActionSelected.value === 'delete') {
    loading.value = true;
    try {
      await materialsServices.BulkDeleteMaterial({ 'id': id })
        .then(res => {
          if (res && res.status === 200 && res.data.success === true) {
            rows.value = res.data.data
            console.log('enter 200 status: ' + res.status)
            handleGetMaterials();
            loading.value = false;
          }
        })
    } catch (e) {
      loading.value = false;
      console.error('Error while log in:', e);
    }
  }
};

// add material function
// const handleAddMaterials = async (payload) => {
//   try {
//     loading.value = true;
//     await materialsServices.addMaterial(payload)
//       .then(res => {
//         if (res.status === 200 && res.data.success === true) {
//           modalIsOpen.value = false;
//           handleGetMaterials();
//           loading.value = false;
//           // handleGetMaterials();   
//         }
//       })
//   } catch (e) {
//     console.error('Error while log in:', e);
//   } finally {
//     loading.value = false;
//   }
// }
// edit material function
// const handleEditMaterials = async (payload) => {
//   loading.value = true;
//   try {
//     await materialsServices.editMaterial(payload)
//       .then(res => {
//         console.log("res.status", res.status)
//         // editCloseModal();
//         if (res && res.status === 200) {
//           if (res.data.data && res.data.data.length > 0) {
//             rows.value = res.data.data
//             handleGetMaterials();
//           }
//           editCloseModal();

//           handleGetMaterials();
//           // rows.value = res.data.data
//           // loading.value = false;    
//           // console.log('editIsOpen.value',editIsOpen.value)
//           // handleGetMaterials(); 
//         }
//       })
//   } catch (e) {
//     console.error('Error while log in:', e);
//   } finally {
//     loading.value = false;
//     // editCloseModal();
//   }
// }
// const materialTree = async () => {
//   MaterialTreeListData.value = await MaterialTreeList()
// }

onMounted(() => {
  handleGetMaterials({limit:10,page:1});
}
);
</script>

<style scoped>
.bh-pagesize {
  width: 72px !important;
}
</style>
