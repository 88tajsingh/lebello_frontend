<template>
    <!-- <div class="ml-96"><Languages/></div> -->
    <PageHeader> Company</PageHeader>
    <div class="flex  content-between justify-between mb-2">
        <div class="flex ">
            <Select v-if="permissions.write" cusClass="h-[40px] border-box" :options="bulkOption" showfield="text"
                valueField="value" label="Bulk Options" v-model="bulkActionSelected" />
            <Button v-if="permissions.write" class="px-2 py-2 m-auto"
                @click="() => deleteMulModalIsOpen = true">Apply</Button>

            <div class="max-w-52 mr-2">
                <Select :options="getDomainsList" showfield="name" class="w-full" valueField="id" label="All Domain"
                    v-model="pagiantionData.domain_id" />
            </div>
            <div class="max-w-52">
                <Select :options="statusData" showfield="name" class="w-full" valueField="value" label="All Records"
                    v-model="pagiantionData.status" />
            </div>
        </div>
        <div class="flex rounded-lg bg-transparent">
            <TextInput type="text" class="block bg-white  mr-2 rounded-lg h-[40px] w-full" placeholder="Search"
                v-model="search" />
            <Button v-if="permissions.write"
                @click="() => { router.push({ name: 'company-form' }); store.dispatch('clearEditData'); }"
                class="px-2 py-2 m-auto whitespace-nowrap">Add
                Company</Button>
        </div>
    </div>
    <div class="bg-white rounded-[20px]">
        <vue3-datatable class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
            :hasCheckbox="true" :cloneHeaderInFooter="false" :stickyHeader="false" :rows="data" :columns="companyCols"
            :loading="dataTableLoading" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search"
            @change="changeServer">
            <template #featured_image_url="data">
                {{ data.featured_image_data }}
                <img :src="$filePath(data.value?.featured_image_data?.file_url)" alt="Material"
                    style="max-width: 50px; max-height: 50px" />
            </template>
            <template v-if="permissions.write" #actions="data">
                <div class="flex gap-3">
                    <div @click="() => { router.push({ name: 'company-form' }); store.dispatch('setEdit', data.value) }"
                        id="edit svg">
                        <EditSvg />
                    </div>
                    <div id="delete svg" @click="() => { company_id = data.value; deleteModalIsOpen = true; }">
                        <DeleteSvg />
                    </div>
                </div>
            </template>

        </vue3-datatable>
    </div>

    <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Company'" @delete="handleDeleteCompany">
        Do you want to delete ?
    </DeleteModal>

    <DeleteModal v-model:isOpen="deleteMulModalIsOpen" :modalTitle="'Delete Multiple Company'"
        @delete="handleBulkActions">
        Do you want to delete ?
    </DeleteModal>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import DeleteModal from '@/components/Admin-components/Modals/DeleteModal.vue'
import { ref, onMounted, watch } from 'vue'
import { showToast } from '@/helper/functions'
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import { getDomins } from '@/helper/Apis'
import { companyCols, statusData } from '@/json/data'
import TextInput from '@/components/Admin-components/form-components/TextInput.vue'
import Select from '@/components/Admin-components/form-components/Select.vue'
import Button from '@/components/Admin-components/Buttons/Button.vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import CompanyServices from '@/services/CompanyServices'

// Store and Router
const store = useStore();
const router = useRouter();



// Reactive state
const permissions = store.getters.user.permissions;
const bulkActionSelected = ref(null);
const search = ref('');
const pagiantionData = ref({ limit: 10, page: 1, domain_id: '', status: '' })
const bulkOption = [{ text: 'Delete', value: 'delete' }];
const company_id = ref('');
const dataTableLoading = ref(false);
const loading = ref(false);
const data = ref([]);
const datatable = ref('');
const totalRows = ref('');
const getDomainsList = ref([]);
const deleteModalIsOpen = ref(false);
const deleteMulModalIsOpen = ref(false);


// Open Delete Modals
const openDeleteModal = () => deleteModalIsOpen.value = true;

const changeServer = (page) => {
    const { pagesize, current_page } = page;
    pagiantionData.value = { ...pagiantionData.value, limit: pagesize, page: current_page }
    handleGetCompany(pagiantionData.value);
}

// Fetch Companies Data
const handleGetCompany = async (payload) => {
    dataTableLoading.value = true;
    try {
        const res = await CompanyServices.getCompany(payload);
        if (res.status === 200 && res.data.success) {
            data.value = res.data.data || [];
            totalRows.value = res.data.total_records || 0;
        }
    } catch (e) {
        console.error('Error fetching company data:', e);
    } finally {
        dataTableLoading.value = false;
    }
};

// Delete Company
const handleDeleteCompany = async () => {
    loading.value = true;
    try {
        const res = await CompanyServices.deleteCompany({ id: company_id.value });
        if (res.status === 200) {
            showToast(res.data.message, 'success');
            await handleGetCompany(pagiantionData.value);
            deleteModalIsOpen.value = false;
        } else if (res.status === 400) {
            showToast(res.message, 'error');
        }
    } catch (e) {
        console.error('Error while deleting company:', e);
    } finally {
        loading.value = false;
    }
};

// Bulk Delete Companies
const handleBulkActions = async () => {
    const selected = datatable.value.getSelectedRows();
    const ids = selected.map(item => item.id);
    if (bulkActionSelected.value === 'delete') {
        loading.value = true;
        try {
            const res = await CompanyServices.bulkDeleteCompany({ id: ids });
            if (res.status === 200 && res.data.success) {
                showToast(res.data.message, 'success');
                await handleGetCompany(pagiantionData.value);
            }
        } catch (e) {
            console.error('Error performing bulk delete:', e);
        } finally {
            loading.value = false;
        }
    }
};

// Fetch Domains List
const getDomainList = async () => {
    try {
        getDomainsList.value = await getDomins();
        const defaultDomain = getDomainsList.value.find(site => site.default === 1);
        pagiantionData.value.domain_id = defaultDomain.id;
        store.dispatch('setDomain', defaultDomain);
    } catch (e) {
        console.error('Error fetching domain list:', e);
    }
};

// Initialize and Watchers
onMounted(() => getDomainList());

watch(
    () => pagiantionData.value.domain_id,
    () => {
        const selectedDomain = getDomainsList.value.find(site => site.id == pagiantionData.value.domain_id);
        store.dispatch('setDomain', selectedDomain);
        handleGetCompany(pagiantionData.value);
    }
);

watch(
    () => pagiantionData.value.status,
    () => {
        handleGetCompany(pagiantionData.value);
    }
);

</script>