<template>
    <PageHeader> Material Slider</PageHeader>
    <div class="flex  content-between justify-between   mb-2">
        <div class="flex">
            <Select v-if="permissions.write" cusClass="h-[40px] border-box" :options="bulkOption" showfield="text"
                valueField="value" label="Bulk Options" v-model="bulkActionSelected" />
                <Button v-if="permissions.write" class="px-2 py-2 m-auto" @click="() => { bulkActionSelected ? bulkPopup = true : '' }">Apply</Button>
                <div class="max-w-52">
                <Select :options="getDominsList" showfield="name" class="w-full" valueField="id" label="All Domain"
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
                @click="() => { router.push({ name: 'material-slider-form' }); store.dispatch('clearEditData'); }"
                class="px-2 py-2 m-auto whitespace-nowrap">Add
                Material Slider</Button>
        </div>
    </div>
    <div class="bg-white rounded-[20px]">
        <vue3-datatable class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
            :hasCheckbox="true" :cloneHeaderInFooter="false" :stickyHeader="false" :rows="data"
            :columns="materialSlidersCols" :loading="dataTableLoding" :totalRows="totalRows" :isServerMode="true"
            :pageSize="10" :search="search" @change="changePage">
            <template #featured_image_url="data">
                <img :src="$filePath(data.value?.featured_image_url?.file_url)" alt=""
                    style="max-width: 50px; max-height: 50px" />
            </template>
            <template #status="data">
                <span v-if="data.value.status === 1">Draft</span>
                <span v-else-if="data.value.status === 2">Pending Review</span>
                <span v-else-if="data.value.status === 3">Publish</span>
                <span v-else>Status not selected</span>
            </template>
            <template v-if="permissions.write" #actions="data">
                <div class="flex gap-3">
                    <div @click="() => { router.push({ name: 'material-slider-form'}); store.dispatch('setEdit', data.value) }"
                        id="edit svg">
                        <EditSvg />
                    </div>
                    <div id="delete svg" @click="() => { company_id = data.value; openDeleteModal(); }">
                        <DeleteSvg />
                    </div>
                </div>
            </template>

        </vue3-datatable>
    </div>

    <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Material Slider'"
        @delete="handleDeleteMaterialSlider">
        Do you want to delete ?
    </DeleteModal>

    <DeleteModal v-model:isOpen="bulkPopup" :modalTitle="' Multiple Delete Material Slider'"
        @delete="handleBulkActions">
        Do you want to delete multiple Material Slider ?
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
import { materialSlidersCols, statusData } from '@/json/data'
import TextInput from '@/components/Admin-components/form-components/TextInput.vue'
import Select from '@/components/Admin-components/form-components/Select.vue'
import Button from '@/components/Admin-components/Buttons/Button.vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import MaterialSliderServices from '@/services/MaterialSliderServices.js'

const store = useStore();
const router = useRouter();

const search = ref('')
const loading = ref(false)
const company_id = ref('')
const dataTableLoding = ref(false)
const bulkActionSelected = ref(null)
const permissions = store.getters.user.permissions;
const bulkOption = [{ text: 'Delete', value: 'delete' }]
const pagiantionData = ref({ limit: 10, page: 1, domain_id: '', status: '' })
const data = ref([])
const datatable = ref('')
const totalRows = ref('')
const getDominsList = ref([])
const domain_id = ref('')
const bulkPopup = ref(false);
const deleteModalIsOpen = ref(false);
const openDeleteModal = () => {
    deleteModalIsOpen.value = true;
};
const changePage = (page) => {
    pagiantionData.value = {...pagiantionData.value, limit: page.pagesize, page: page.current_page }
    handleGetMaterialSlider(pagiantionData.value    );
}

// get materials function
const handleGetMaterialSlider = async (payload) => {

    dataTableLoding.value = true;
    try {
        await MaterialSliderServices.getMaterialSliders(payload)
            .then(res => {
                if (res.status === 200 && res.data.success === true) {
                    if (res.data.data && res.data.data.length > 0) {
                        data.value = res.data.data
                        totalRows.value = res.data.total_records
                    }
                    else {
                        data.value = res.data.data
                        totalRows.value = 0;
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

// delete company
const handleDeleteMaterialSlider = async () => {
    loading.value = true;
    try {
        const res = await MaterialSliderServices.deleteMaterialSlider({ id: company_id.value.id });
        if (res.status === 200) {
            showToast(res.data.message, 'success');
            await handleGetMaterialSlider(pagiantionData.value);
            deleteModalIsOpen.value = false;
        } else if (res.status === 400) {
            showToast(res.message, 'error');
        }
    } catch (e) {
        console.error('Error while deleting Comapnies:', e);
    } finally {
        loading.value = false;
    }
};

// Bulk Delete 
const handleBulkActions = async () => {
    const selected = datatable.value.getSelectedRows();
    const ids = selected.map(item => item.id);
    if (!ids.length) return showToast('Please select atleast one slider to delete', 'error');
    if (bulkActionSelected.value === 'delete') {
        loading.value = true;
        try {
            const res = await MaterialSliderServices.bulkDeleteMaterialSlider({ id: ids });
            if (res.status === 200 && res.data.success) {
                showToast(res.data.message, 'success');
                await handleGetMaterialSlider(pagiantionData.value);
            }
        } catch (e) {
            console.error('Error while performing bulk delete:', e);
        } finally {
            loading.value = false;
        }
    }
};

const getDomainList = async (payload) => {
    getDominsList.value = await getDomins(payload)
    const defaultDomain = getDominsList.value.filter(site => site.default === 1)[0];
    pagiantionData.value.domain_id = defaultDomain.id
    store.dispatch('setDomain', defaultDomain);
}

onMounted(() => {
    getDomainList();
}
);

watch(
    () => pagiantionData.value.domain_id,
    () => {
        const defaultDomain = getDominsList.value.filter(site => site.id == domain_id.value);
        store.dispatch('setDomain', defaultDomain[0]);
        handleGetMaterialSlider(pagiantionData.value);
    }
);

watch(
    () => pagiantionData.value.status,
    () => {
        handleGetMaterialSlider(pagiantionData.value);
    }
);
</script>