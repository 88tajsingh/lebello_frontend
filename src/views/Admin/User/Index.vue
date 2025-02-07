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
            <!-- <template #image="data">
                <img :src="data.value.image" alt="Contract Image" style="max-width: 50px; max-height: 50px" />
            </template> -->

            <template #active="data">
                <span id="delete svg" class=" flex flex-col justify-center align-center" @click="openDeleteModal(data.value)">
                    <i v-if="!data.value.active" class='fas fa-toggle-off ' style='font-size:24px'></i>
                    <i v-if="data.value.active" class='fas fa-toggle-on' style='font-size:24px'></i>
                    <span v-if="data.value.active === 0">In Active</span>
                    <span v-else-if="data.value.active === 1">Active</span>
                </span>
                
            </template>

            <template #actions="data">
                <div class="flex gap-3">
                    <div @click="() => { router.push({ name: 'user-form' }); store.dispatch('setEdit', data.value); }"
                        id="edit svg">
                        <EditSvg />
                    </div>
                </div>
            </template>
        </vue3-datatable>
    </div>

    <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Change Status '" @delete="handleStatusUser()" btnName="Change Status">
       {{`Do you want to ${active.active === 0 ? 'Activate' : 'Deactivate'} ${active.name}?`}}
    </DeleteModal>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import '@bhplugin/vue3-datatable/dist/style.css'
import UserServices from '@/services/UserServices';
import { useRouter } from 'vue-router';
import { showToast } from '@/helper/functions';
// import { getDomains } from '@/helper/Apis';
import { usersCols } from '@/json/data';
import store from '@/store';


const router = useRouter();
const loading = ref(false);
const search = ref('');
const datatable = ref(null);
const paginationData = ref({ limit: 10, page: 1, domain_id: '', })
// const getDomainsList = ref([])
const getLoading = ref(false);
const editData = ref({});
const rows = ref([]);
const actionsFlag = ref(null);
const modalIsOpen = ref(false);
const editIsOpen = ref(false);
const deleteModalIsOpen = ref(false);
const totalRows = ref('')
const active = ref('')


const openDeleteModal = (data) => {
    deleteModalIsOpen.value = true;
    editData.value = data.id;
    active.value=data;
};




const changePages = (page) => {
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

onMounted(() => {
    handleGetUserList();
}
);


</script>