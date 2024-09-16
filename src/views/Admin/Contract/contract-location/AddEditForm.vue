<template>
  <DefaultCard :cardTitle="form.id ? `Edit Contract Location` : `Add Contract Location`">
    <DomainComponent @customChange="(id) => form.domain_id = id" :deleteService="ContractServices.deleteContractLocation"
      masterKey="master_contract_location_id" :masterDeleteService="ContractServices.deleteMasterContractLocation"
      routeTo="contract-location"></DomainComponent>

    <template v-if="form.id" v-slot:header>
      <MasterSlugForm :form="form" @update-slug="fetchContractLocationData"
        :SlugUpdateservices="ContractServices.masterContractLocationSlugUpdate"
        masteridKeyName="master_contract_location_id" />
    </template>
    <form @submit.prevent="handleSubmit">
      <div class="p-6.5 grid grid-cols-2 gap-6">
        <div class="flex flex-col">
          <TextInput type="text" :class="{ 'border-red': errors.name }" v-model="form.contract_location"
            :errMessage="errors.contract_location" @update:modelValue="clearError('contract_location')" label="Name"
            :hasCheckBox="checkBoxFlag" @update:checkValue="value => checkedFields.contract_location = value" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The name is how it appears on your site.
          </p>
        </div>

        <div class="flex flex-col">
          <TextInput type="text" class="block mr-2 h-[40px] w-full" v-model="form.slug" label="Slug (Read Only)"
            disabled :hasCheckBox="checkBoxFlag" @update:checkValue="value => checkedFields.slug = value" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters,
            numbers, and hyphens.
          </p>
        </div>

        <div class="flex flex-col">
          <InputLabel for="Parent Material" value="Parent Contract Location" />
          <!-- <Select :options="productContractList" :defaultZero="true" label="Parent Product Contract" showfield="name" class="w-full" valueField="id"
            v-model="form.parent_contract_location" /> -->
          <Select :options="contractLoction" :defaultZero="true" label="Parent Contract Location"
            showfield="contract_location" class="w-full" valueField="id" :errorClass="selectError"
            @update:modelValue="clearError('parent_contract_location')" errMessage="Should not be own parent"
            v-model="form.parent_contract_location" />

          <p class="text-sm text-[#646970] text-[11.5px]">
            Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of Bebop and Big
            Band.
          </p>
        </div>

        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2 w-full" label="Description" placeholder="" :isTextarea="true"
            :rows="4" v-model="form.description" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.description = value" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The description is not prominent by default; however, some themes may show it.
          </p>
        </div>
      </div>

      <button type="submit"
        class="flex mt-5 px-10 mb-10 ml-10 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
        {{ buttonText }}
      </button>

    </form>
  </DefaultCard>
  <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import _ from 'lodash';
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import { contractLoctionTreeList } from '@/helper/Apis'
import ContractServices from '@/services/ContractServices'
import { showToast, getGlobalUpdateData } from '@/helper/functions'
import { onMounted, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

//store and router 
const store = useStore();
const router = useRouter();

// Reactive state
const errors = ref({});
const selectError = ref(false);
const loading = ref(false);
const form = ref(store.getters.editData || { parent_contract_location: 0 });
const contractLoction = ref([]);
const checkedFields = ref({});
const checkBoxFlag = ref(Boolean(form.value.id));

// Validate form data
const validateForm = () => {
  errors.value = {};
  if (!form.value.contract_location) {
    errors.value.contract_location = 'Name is required';
    return false;
  }
  if (selectError.value)
    return false;

  return true;
};

// Submit form data (add or edit contract location)
const handleSubmit = async () => {
  if (!validateForm()) return;
  const hasCheckedFields = Object.values(checkedFields.value).some(Boolean);

  loading.value = true;
  const { featured_image_url, slug, domains_data, default_domain, default_master, ...payload } = form.value;

  if (!form.value?.domains_data?.includes(form.value.domain_id)) delete payload.id;

  try {
    const service = store.getters.editData ? ContractServices.editContractLocation : ContractServices.addContractLocation;
    const res = await service(payload);
    if (res.status === 200 && res.data.success) {

      if (hasCheckedFields)
        handleGlobalUpdate();
      else {
        showToast(res.data.message, 'success');
        router.push('/contract-location');
      }

    } else if (res.status === 400) {
      showToast(res.data.message, 'error');
    }
  } catch (error) {
    showToast('Something went wrong', 'error');
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
};

const handleGlobalUpdate = async () => {
  const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value);
  if (_.isEmpty(globalUpdate)) return;

  const payload = {
    master_contract_location_id: form.value.master_contract_location_id,
    global_keys: globalUpdate
  };

  try {
    const { status, data } = await ContractServices.globalContractLocationUpdate(payload);
    status === 200 && data.success ? showToast(data.message, 'success') : showToast(data.message, 'error');
    if (status === 200 && data.success) router.push('/contract-location');
  } catch (error) {
    showToast('Something went wrong', 'error');
    console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error);
  } finally {
    loading.value = false;
  }
};

// fetch the data 
const fetchContractLocationData = async () => {
  loading.value = true;
  const payload = { master_contract_location_id: form.value.master_contract_location_id, domain_id: form.value.domain_id };
  try {
    const { status, data } = await ContractServices.getContractLocation(payload);
    if (status === 200 && data.success) {
      const dataValue = data.data[0];
      store.dispatch('setEdit', dataValue);
      Object.assign(form.value, dataValue);
    }
  } catch (error) {
    showToast('Something went wrong', 'error');
    console.error('Error while fetching data:', error);
  }
  finally {
    loading.value = false;
  }
};

// Fetch contract location tree data
const contractLoctionTree = async (payload) => {
  contractLoction.value = await contractLoctionTreeList(payload);
};

// clear error message
const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
};

// Initialize component
onMounted(() => {
  contractLoctionTree({ domain_id: store.getters.getDomain?.id });

});


// Watch for changes in domain_id and refresh contract location tree
watch(() => form.value.domain_id, (newDomainId) => {
  contractLoctionTree({ domain_id: newDomainId });
  form.value.parent_contract_location = 0;
  if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
    fetchContractLocationData();
  }
});

// Watchers
watch(() => form.value.parent_contract_location, (newValue) => {
  if (newValue == form.value.id)
    selectError.value = true;
  else
    selectError.value = false;
});

// Computed Properties
const buttonText = computed(() => {
  return (form.value.id ? 'Update' : 'Submit');
});

</script>