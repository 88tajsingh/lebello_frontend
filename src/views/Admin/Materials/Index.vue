<template>
  <!-- Page Header -->
  <PageHeader> Material</PageHeader>

  <!-- Actions and Filters -->
  <div class="flex content-between justify-between mb-2">
    <div class="flex">
      <Select v-if="permissions.write" cusClass="h-[40px] border-box" :options="bulkOptions" showfield="text"
        valueField="value" label="Bulk Options" v-model="bulkActionSelected" />
      <Button v-if="permissions.write" class="px-2 py-2 m-auto" @click="() => multiDeleteModalOpen = true">
        Apply
      </Button>
      <div class="w-52">
        <Select :options="domainList" showfield="name" class="w-full" valueField="id" label="All Domain"
          v-model="pagiantionData.domain_id" />
      </div>
    </div>
    <div class="flex rounded-lg bg-transparent">
      <TextInput type="text" class="block bg-white mr-2 rounded-lg h-[40px] w-full" placeholder="Search"
        v-model="searchQuery" />
      <Button v-if="permissions.write" @click="navigateToAddMaterial" class="px-2 py-2 m-auto whitespace-nowrap">
        Add Materials
      </Button>
    </div>
  </div>

  <!-- Data Table -->
  <div class="bg-white rounded-[20px]">
    <vue3-datatable class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover"
      :hasCheckbox="true" :cloneHeaderInFooter="true" :stickyHeader="false" :rows="materials" :columns="materialCols"
      :loading="isDataLoading" :totalRows="totalRecords" :isServerMode="true" :pageSize="10" :search="searchQuery"
      @change="onPageChange">

      <template #image="data">
        <img :src="$filePath(data.value?.media_data?.file_url)" alt="Material"
          style="max-width: 50px; max-height: 50px" />

      </template>
      <template v-if="permissions.write" #actions="data">
        <div class="flex gap-3">
          <div @click="editMaterial(data.value)" id="edit svg">
            <EditSvg />
          </div>
          <div @click="confirmDelete(data.value)" id="delete svg">
            <DeleteSvg />
          </div>
        </div>
      </template>
    </vue3-datatable>
  </div>

  <!-- Delete Modal -->
  <DeleteModal v-model:isOpen="isDeleteModalOpen" :modalTitle="'Delete Material'" @delete="deleteMaterial">
    Do you want to delete?
  </DeleteModal>

  <!--Multi Delete Modal -->
  <DeleteModal v-model:isOpen="multiDeleteModalOpen" :modalTitle="'Multiple Delete Material'" @delete="applyBulkActions">
    Do you want to delete selected materials?
  </DeleteModal>

  <!-- Loader -->
  <Loader :isLoading="isLoading" :fullPage="true" />
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getDomains } from '@/helper/Apis'
import { materialCols } from '@/json/data'
import { ref, onMounted, watch } from 'vue'
import { showToast } from '@/helper/functions'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import materialsServices from '@/services/MaterialsServices'
import Button from '@/components/Admin-components/Buttons/Button.vue'
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Select from '@/components/Admin-components/form-components/Select.vue'
import DeleteModal from '@/components/Admin-components/Modals/DeleteModal.vue'
import TextInput from '@/components/Admin-components/form-components/TextInput.vue'

const store = useStore()
const router = useRouter()

// State variables
const bulkActionSelected = ref(null)
const searchQuery = ref('')
const pagiantionData = ref({ limit: 10, page: 1, domain_id: '', status: '' })
const permissions = store.getters.user.permissions;
const bulkOptions = [{ text: 'Delete', value: 'delete' }]
const selectedMaterialId = ref(null)
const isDataLoading = ref(false)
const multiDeleteModalOpen = ref(false)
const datatable = ref(null)
const isLoading = ref(false)
const materials = ref([])
const totalRecords = ref(0)
const domainList = ref([])
const selectedDomainId = ref('')
const isDeleteModalOpen = ref(false)

// Fetch domains and materials
// const fetchDomains = async () => {
//   const response = await getDomains()
//   domainList.value = response
//   selectedDomainId.value = domainList.value.find(d => d.default)?.id || ''
//   store.dispatch('setDomain', domainList.value.find(d => d.default))
// }
const fetchDomains = async (payload) => {
  domainList.value = await getDomains(payload)
  const defaultDomain = domainList.value.filter(site => site.default === 1)[0];
  pagiantionData.value.domain_id = defaultDomain.id
  store.dispatch('setDomain', defaultDomain);
}

const fetchMaterials = async (payload) => {
  isDataLoading.value = true
  try {
    const res = await materialsServices.getMaterials(payload)
    if (res.status === 200 && res.data.success) {
      materials.value = res.data.data || []
      totalRecords.value = res.data.total_records || 0
    }
  } catch (error) {
    console.error('Error fetching materials:', error)
  } finally {
    isDataLoading.value = false
  }
}

// Handle page change
const onPageChange = (page) => {
  const { pagesize, current_page } = page;
  pagiantionData.value = { ...pagiantionData.value, limit: pagesize, page: current_page }
  fetchMaterials(pagiantionData.value)
}

// Handle material deletion
const deleteMaterial = async () => {
  isLoading.value = true
  try {
    const res = await materialsServices.deleteMaterial({ id: selectedMaterialId.value.id })
    if (res.status === 200) {
      showToast(res.data.message, 'success')
     await fetchMaterials(pagiantionData.value);
      isDeleteModalOpen.value = false
    } else {
      showToast(res.message, 'error')
    }
  } catch (error) {
    console.error('Error deleting material:', error)
  } finally {
    isLoading.value = false
  }
}

// Handle bulk actions
const applyBulkActions = async () => {
  if (bulkActionSelected.value === 'delete') {
    const selectedRows = datatable.value.getSelectedRows()
    const ids = selectedRows.map(item => item.id)
    if(ids.length === 0) return showToast('Please select atleast one material to delete', 'error')
    try {
      const res = await materialsServices.BulkDeleteMaterial({ id: ids })
      if (res.status === 200 && res.data.success) {
        showToast(res.data.message, 'success')
        fetchMaterials(pagiantionData.value)
      }
    } catch (error) {
      console.error('Error performing bulk delete:', error)
    } 
  }
}



// Component methods
const navigateToAddMaterial = () => {
  router.push({ name: 'materials-form' })
  store.dispatch('clearEditData')
}

const editMaterial = (material) => {
  router.push({ name: 'materials-form' })
  store.dispatch('setEdit', material)
}

const confirmDelete = (material) => {
  selectedMaterialId.value = material
  isDeleteModalOpen.value = true
}

// Initialize
onMounted(() => {
  fetchDomains()
})

// Handle domain change
watch(
  () => pagiantionData.value.domain_id,
  () => {
    const defaultDomain = domainList.value.find(site => site.id == pagiantionData.value.domain_id);
    store.dispatch('setDomain', defaultDomain);
    fetchMaterials(pagiantionData.value);
  }
);
</script>
