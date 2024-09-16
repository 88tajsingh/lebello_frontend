<template>
    <PageHeader> User List </PageHeader>
    <div class="flex content-between justify-between px-1 mb-2">

        <div class="flex ms-auto">
            <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full" placeholder="Search" v-model="search" />
            <Button @click="() => { router.push({ name: 'user-form' }); store.dispatch('clearEditData'); }"
                class="px-2 py-2">Add User</Button>
        </div>
    </div>
    <div class="bg-white rounded-[20px]">
        <vue3-datatable class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
            :cloneHeaderInFooter="true" :stickyHeader="false" :rows="rows" :columns="usersCols"
            :loading="getLoading" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search"
            @change="changePages">
            <template #image="data">
                <img :src="data.value.image" alt="Contract Image" style="max-width: 50px; max-height: 50px" />
            </template>

            <template #active="data">
                <span v-if="data.value.active === 0">In Active</span>
                <span v-else-if="data.value.active === 1">Active</span>
            </template>

            <template #actions="data">
                <div class="flex gap-3">
                    <div @click="() => { router.push({ name: 'user-form' }); store.dispatch('setEdit', data.value); }"
                        id="edit svg">
                        <!-- router.push({ name:'Contract-edit',params: { id: data.value.id }})  -->
                        <EditSvg />
                    </div>
                    <div id="delete svg" @click="openDeleteModal(data.value)">
                        <DeleteSvg />
                    </div>
                </div>
            </template>
        </vue3-datatable>
    </div>

    <PopupModal modalTitle="Add Pages" custonClasses="w-[1000px] h-[600px]" v-model:isOpen="modalIsOpen">
        <AddEditForm @handleApi="handleAddPages" />
    </PopupModal>
    <PopupModal modalTitle="Edit Pages" custonClasses="w-[1000px] h-[600px]" v-model:isOpen="editIsOpen">
        <AddEditForm :pagesData="editData" @handleApi="handleEditPages" />
    </PopupModal>
    <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Change Status '" @delete="handleStatusUser()">
        Do you want to change the status?
    </DeleteModal>
    <!-- <DeleteModal v-model:isOpen="bulkPopup" :modalTitle="'Change Status '" @delete="handleBulkActions()">
        Do you want to delete ?
    </DeleteModal> -->
    <!-- <Loader :isLoading="loading" :fullPage="true" /> -->
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import UserServices from '@/services/UserServices';
import { useRouter } from 'vue-router';
import { showToast } from '@/helper/functions';
// import { getDomins } from '@/helper/Apis';
import { usersCols } from '@/json/data';
import store from '@/store';


const router = useRouter();
const bulkActionSelected = ref(null)
const loading = ref(false);
const search = ref('');
const datatable = ref(null);
const pagiantionData = ref({ limit: 10, page: 1, domain_id: '', })
const bulkOption = [{ text: 'Delete', value: 'Delete' }];
// const getDominsList = ref([])
const domain_id = ref('')
const getLoading = ref(false);
const editData = ref({});
const rows = ref([]);
const actionsFlag = ref(null);
const bulkPopup = ref(null);
const modalIsOpen = ref(false);
const editIsOpen = ref(false);
const deleteModalIsOpen = ref(false);
const totalRows = ref('')

const openDeleteModal = (data) => {
    deleteModalIsOpen.value = true;
    editData.value = data.id;
    console.log(data.id)
};


const handleMouseEnter = (data) => {
    actionsFlag.value = data.value.name;
};

const handleMouseLeave = () => {
    actionsFlag.value = null;
};

const changePages = (page) => {
    console.log("page changed", page)
    const payload = { limit: page.pagesize, page: page.current_page }
    handleGetUserList(payload);
}
// api calls
const handleGetUserList = async (payload) => {
    getLoading.value = true;
    try {
        const res = await UserServices.getUser(payload);
        if (res.status === 200 && res.data.success) {
            rows.value = res.data.data;
            totalRows.value = res.data.total_records;
        }
    } catch (e) {
        console.error('Error while getting User List:', e);
    } finally {
        getLoading.value = false;
    }
};

const handleStatusUser = async () => {
    loading.value = true;
    try {

        // const id = editData.value;
        const res = await UserServices.statusUser({id:editData.value});
        if (res.status === 200 && res.data.success) {
            rows.value = rows.value.filter(item => item.id !== editData.value)
            showToast(res.data.message, 'success');
            deleteModalIsOpen.value = false;
            editData.value = null;
            handleGetUserList();
        }
        else if (res.status === 400) {
            showToast(res.data.message, 'error');
        }
    } catch (e) {
        console.error('Error while deleting contract location:', e);
    } finally {
        loading.value = false;
    }
};

// Bulk delete

// const getDomainList = async (payload) => {
//     getDominsList.value = await getDomins(payload)
//     const defaultDomain = getDominsList.value.filter(site => site.default === 1)[0];
//     pagiantionData.value.domain_id = defaultDomain.id
//     store.dispatch('setDomain', defaultDomain);
// }

onMounted(() => {
    // getDomainList();
    handleGetUserList();
}
);

watch(
    () => pagiantionData.value.domain_id,
    () => {
        // const defaultDomain = getDominsList.value.filter(site => site.id == domain_id.value);
        // store.dispatch('setDomain', defaultDomain[0]);
        // handleGetGlobalMetaTag(pagiantionData.value);
    }
);
watch(
    () => pagiantionData.value.status,
    () => {
        // handleGetGlobalMetaTag(pagiantionData.value);
    }
);
</script>