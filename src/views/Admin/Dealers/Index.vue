<template>
  <!-- <div class="ml-96"><Languages/></div> -->
  <PageHeader> Dealers</PageHeader>
  <div class="flex content-between justify-between mb-2">
    <div class="flex">
      <Select v-if="permissions.write" cusClass="h-[40px] border-box" :options="bulkOption" showfield="text"
        valueField="value" label="Bulk Options" v-model="bulkActionSelected" />
      <Button v-if="permissions.write" class="px-2 py-2 m-auto" @click="() => { multiDeleteModal = true }">Apply</Button>
      <div class="max-w-52 ml-2">
        <Select :options="getDomainsList" showfield="name" class="w-full" valueField="id" label="All Domain"
          v-model="paginationData.domain_id" />
      </div>
      <div class="max-w-52">
        <Select :options="statusData" showfield="name" class="w-full" valueField="value" label="All Records"
          v-model="paginationData.status" />
      </div>
    </div>
    <div class="flex rounded-lg bg-transparent">
      <TextInput type="text" class="block bg-white mr-2 rounded-lg h-[40px] w-full" placeholder="Search"
        v-model="search" />
      <Button v-if="permissions.write" @click="() => {
        router.push('/dealer-form')
        store.dispatch('clearEditData')
      }
        " class="px-2 py-2 m-auto whitespace-nowrap">Add Dealers</Button>
    </div>
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
      :hasCheckbox="true" :cloneHeaderInFooter="false" :stickyHeader="false" :rows="data" :columns="dealersCols"
      :loading="dataTableLoding" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search"
      @change="changePage">
      <template #featured_image_url="data">
        <img :src="$filePath(data.value.featured_image_url)" alt="Material" style="max-width: 50px; max-height: 50px" />
      </template>
      <template #status="data">
        <span v-if="data.value.status === 1">Draft</span>
        <span v-if="data.value.status === 2">Pending Review</span>
        <span v-if="data.value.status === 3">Published</span>
      </template>
      <template v-if="permissions.write" #actions="data">
        <div class="flex gap-3">
          <div @click="() => handelEditClick(data.value)" id="edit svg">
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

  <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Dealer'" @delete="handleDeleteProjects">
    Do you want to delete ?
  </DeleteModal>

  <DeleteModal v-model:isOpen="multiDeleteModal" :modalTitle="'Multiple Delete Dealer'" @delete="handleBulkActions">
    Do you want to delete multiple dealers ?
  </DeleteModal>
  <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import DeleteModal from '@/components/Admin-components/Modals/DeleteModal.vue'
import { ref, onMounted, watch } from 'vue'
import '@bhplugin/vue3-datatable/dist/style.css'
import { showToast } from '@/helper/functions'
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import { getDomains } from '@/helper/Apis'
import { dealersCols, statusData } from '@/json/data'
import TextInput from '@/components/Admin-components/form-components/TextInput.vue'
import Select from '@/components/Admin-components/form-components/Select.vue'
import Button from '@/components/Admin-components/Buttons/Button.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import DealersServices from '@/services/DealersServices'

const store = useStore()
const router = useRouter()
const bulkActionSelected = ref(null)
const search = ref('')
const permissions = store.getters.user.permissions
const paginationData = ref({ limit: 10, page: 1, domain_id: '', status: '' })
const bulkOption = [{ text: 'Delete', value: 'delete' }]
const project_id = ref('')
const dataTableLoding = ref(false)
const loading = ref(false)
const multiDeleteModal = ref(false)
const data = ref([])
const datatable = ref('')
const totalRows = ref('')
const actionsFlag = ref(null)
const getDomainsList = ref([])

const isRowHovered = (value) => {
  return actionsFlag.value === value.name
}

const handelEditClick = (data) => {
  store.dispatch('setEdit', data)
  const id = data.domain_id
  store.dispatch('setDomain', { id: id });
  router.push({ name: 'Dealer-form' })
}

const deleteModalIsOpen = ref(false)
const openDeleteModal = () => {
  deleteModalIsOpen.value = true
}

const changePage = (page) => {
  const { pagesize, current_page } = page
  paginationData.value = { ...paginationData.value, limit: pagesize, page: current_page }
  handleGetDealers(paginationData.value)
}

function handleCheckboxChange(event) {
  console.log('Checkbox state changed:', event.target.checked)
}

// get materials function
const handleGetDealers = async (payload) => {
  dataTableLoding.value = true
  try {
    await DealersServices.getDealer(payload)
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
const handleDeleteProjects = async () => {
  loading.value = true
  try {
    const res = await DealersServices.deleteDealer({ id: project_id.value.id })
    if (res.status === 200) {
      showToast(res.data.message, 'success')
      await handleGetDealers(paginationData.value)
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
  if (!ids.length) return showToast('Please select atleast one dealer to delete', 'error')
  if (bulkActionSelected.value === 'delete') {
    loading.value = true
    try {
      const res = await DealersServices.BulkDeleteDealer({ id: ids })
      if (res.status === 200 && res.data.success) {
        showToast(res.data.message, 'success')
        await handleGetDealers(paginationData.value)
      }
    } catch (e) {
      console.error('Error while performing bulk delete:', e)
    } finally {
      loading.value = false
    }
  }
}

const getDomainList = async (payload) => {
  getDomainsList.value = await getDomains(payload)
  const defaultDomain = getDomainsList.value.filter((site) => site.default === 1)[0]
  // paginationData.value.domain_id = defaultDomain.id
  store.dispatch('setDomain', defaultDomain)
}

onMounted(() => {
  getDomainList();
  handleGetDealers(paginationData.value)
})

watch(
  () => paginationData.value.domain_id,
  () => {
    const defaultDomain = getDomainsList.value.filter((site) => (site.id == paginationData.value.domain_id))
    store.dispatch('setDomain', defaultDomain[0])
    handleGetDealers(paginationData.value)
  }
)
watch(
  () => paginationData.value.status,
  () => {
    handleGetDealers(paginationData.value)
  }
)
</script>
