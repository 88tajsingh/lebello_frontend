<template>
  <!-- <div class="ml-96"><Languages/></div> -->
  <PageHeader> Designer </PageHeader>
  <div class="flex content-between justify-between mb-2">
    <div class="flex">
      <Select v-if="permissions.write" cusClass="h-[40px] border-box" :options="bulkOption" showfield="text"
        valueField="value" label="Bulk Options" v-model="bulkActionSelected" />
      <Button v-if="permissions.write" class="px-2 py-2 m-auto" @click="()=>bulkPopup=true">Apply</Button>
      <div class="max-w-52 ml-2">
        <Select :options="getDomainsList" showfield="name" class="w-full" valueField="id" label="All Domain"
          v-model="pagiantionData.domain_id" />
      </div>
      <div class="max-w-52">
        <Select :options="statusData" showfield="name" class="w-full" valueField="value" label="All Records"
          v-model="pagiantionData.status" />
      </div>
    </div>
    <div class="flex rounded-lg bg-transparent">
      <TextInput type="text" class="block bg-white mr-2 rounded-lg h-[40px] w-full" placeholder="Search"
        v-model="search" />
      <Button v-if="permissions.write" @click="() => {
          router.push({ name: 'Designer-form' })
          store.dispatch('clearEditData')
        }
        " class="px-2 py-2 m-auto whitespace-nowrap">Add Designer</Button>
    </div>
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
      :hasCheckbox="true" :cloneHeaderInFooter="false" :stickyHeader="false" :rows="data" :columns="designerCols"
      :loading="dataTableLoding" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search"
      @change="changePage">
      <template #status="data">
        <span v-if="data.value.status === 1">Draft</span>
        <span v-if="data.value.status === 2">Pending Review</span>
        <span v-if="data.value.status === 3">Published</span>
      </template>

      <template v-if="permissions.write" #actions="data">
        <div class="flex gap-3">
          <div @click="() => {
              router.push({ name: 'Designer-form' })
              store.dispatch('setEdit', data.value)
            }
            " id="edit svg">
            <EditSvg />
          </div>
          <div id="delete svg" @click="() => {
              project_id = data.value
              openDeleteModal()
            }
            ">
            <DeleteSvg />
          </div>
        </div>
      </template>
    </vue3-datatable>
  </div>

  <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Designer'" @delete="handleDeleteDesigner">
    Do you want to delete ?
  </DeleteModal>

  <DeleteModal v-model:isOpen="bulkPopup" :modalTitle="'Multiple Delete Designer Type'" @delete="handleBulkActions()">
    Do you want to delete multiple designer ?
  </DeleteModal>

  <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import DeleteModal from '@/components/Admin-components/Modals/DeleteModal.vue'
import { ref, onMounted, watch } from 'vue'
import { showToast } from '@/helper/functions'
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import { getDomains } from '@/helper/Apis'
import { designerCols, statusData } from '@/json/data'
import TextInput from '@/components/Admin-components/form-components/TextInput.vue'
import Select from '@/components/Admin-components/form-components/Select.vue'
import Button from '@/components/Admin-components/Buttons/Button.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import DesignerServices from '@/services/DesignerServices'

const store = useStore()
const router = useRouter()
const bulkActionSelected = ref(null)
const search = ref('')
const permissions = store.getters.user.permissions
const pagiantionData = ref({ limit: 10, page: 1, domain_id: '', status: '' })
const bulkOption = [{ text: 'Delete', value: 'delete' }]
const project_id = ref('')
const dataTableLoding = ref(false)
const loading = ref(false)
const data = ref([])
const datatable = ref('')
const totalRows = ref('')
const getDomainsList = ref([])

const deleteModalIsOpen = ref(false)
const bulkPopup = ref(false)
const openDeleteModal = () => {
  deleteModalIsOpen.value = true
}

const changePage = (page) => {
  const { pagesize, current_page } = page
  pagiantionData.value = { ...pagiantionData.value, limit: pagesize, page: current_page }
  handleGetDesigner(pagiantionData.value)
}

function handleCheckboxChange(event) {
  console.log('Checkbox state changed:', event.target.checked)
}

// get  function
const handleGetDesigner = async (payload) => {
  dataTableLoding.value = true
  try {
    await DesignerServices.getDesigners(payload)
      .then((res) => {
        if (res.status === 200 && res.data.success === true) {
          if (res.data.data && res.data.data.length > 0) {
            data.value = res.data.data
            totalRows.value = res.data.total_records
          } else {
            data.value = res.data.data
            totalRows.value = 0
          }
          dataTableLoding.value = false
        }
      })
      .catch((res) => {
        console.log('error', res)
      })
  } catch (e) {
    console.error('Error while log in:', e)
    dataTableLoding.value = false
  } finally {
    dataTableLoding.value = false
  }
}

// delete
const handleDeleteDesigner = async () => {
  loading.value = true
  try {
    const res = await DesignerServices.deleteDesigners({ id: project_id.value.id })
    if (res.status === 200) {
      showToast(res.data.message, 'success')
      await handleGetDesigner(pagiantionData.value)
      deleteModalIsOpen.value = false
    } else if (res.status === 400) {
      showToast(res.message, 'error')
    }
  } catch (e) {
    console.error('Error while deleting material:', e)
  } finally {
    loading.value = false
  }
}

// Bulk Delete
const handleBulkActions = async () => {
  const selected = datatable.value.getSelectedRows()
  const ids = selected.map((item) => item.id)
  if (bulkActionSelected.value === 'delete') {
 if(!ids.length) return showToast('Please select atleast one designer to delete', 'error')
    try {
      const res = await DesignerServices.bulkDeleteDesigners({ id: ids })
      if (res.status === 200 && res.data.success) {
        showToast(res.data.message, 'success')
        await handleGetDesigner(pagiantionData.value)
      }
    } catch (e) {
      console.error('Error while performing bulk delete:', e)
    } 
  }
}

const getDomainList = async (payload) => {
  getDomainsList.value = await getDomains(payload)
  const defaultDomain = getDomainsList.value.filter((site) => site.default === 1)[0]
  pagiantionData.value.domain_id = defaultDomain.id
  store.dispatch('setDomain', defaultDomain)
}

onMounted(() => {
  getDomainList()
})

watch(
  () => pagiantionData.value.domain_id,
  () => {
    const defaultDomain = getDomainsList.value.filter((site) => site.id == pagiantionData.value.domain_id)
    store.dispatch('setDomain', defaultDomain[0])
    handleGetDesigner(pagiantionData.value)
  }
)
watch(
  () => pagiantionData.value.status,
  () => {
    handleGetDesigner(pagiantionData.value)
  }
)
</script>
