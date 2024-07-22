<template>
      <form @submit.prevent="handleSubmit">
        <div class="p-6.5">
          <div class="flex flex-col">
            <input-label for="name " value="Domain Name *" />
            <TextInput type="text" class="block mr-2 h-[40px] w-full" v-model="form.name"
              :errMessage="errors.name" />
          </div>
          <div class="flex flex-col ">
                <InputLabel for="Country" value="Country" />
                <Select :options="props.allCountries" showfield="name" class="w-full" valueField="id" label="Select Country"
                    v-model="form.country_id" />
                <InputError class="mt-2" :message="errors.country_id" />
            </div>
          <div class="flex flex-col ">
                <InputLabel for="Status" value="Status" />
                <Select :options="domainStatus" showfield="name" class="w-full" valueField="value" label="Select Status"
                    v-model="form.status" />
                <InputError class="mt-2" :message="errors.status" />
            </div>
         
          <button type="submit"
            class="flex col-span-2 mt-7 w-full mb-10 m-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Submit
          </button>
        </div>
      </form>
  </template>
  <script setup>
  import { ref } from 'vue';
  import { defineEmits } from 'vue';
  import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue';
  import store from '@/store';

  const props = defineProps({
    id: {
      type: String,
      default: null,
    },
    allCountries: {
      type: String,
      default: [],
    },
  });
  const emit = defineEmits(['handleApi']);

  const form = ref({ status:null,country_id:null});
  const errors = ref({});
  const domainStatus =[{name:'Active',value:1},{name:'inactive',value:0}] 
 

  const validateForm = () => {
    let isValid = true;
    errors.value = {};
    if (!form.value.name) {
      errors.value.name = 'Domain Name is required';
      isValid = false;
    }
    return isValid;
  };
  
  const handleSubmit = async () => {
    if (validateForm()) {
        emit('handleApi', { ...form.value });  
    }
  };
  
  </script>