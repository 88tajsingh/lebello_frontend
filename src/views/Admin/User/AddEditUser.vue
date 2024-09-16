<template>
    <DefaultCard :cardTitle="form.id ? `Edit User` : `Add New User`">

        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="p-6.5 grid grid-cols-2 gap-6">
                <div class="flex flex-col">
                    <TextInput id="name" type="text" class="block w-full mr-2 h-[33px]" v-model="form.name"
                        placeholder="Name" label="Name" :errMessage="errors?.name"
                        @update:model="clearError(errors, 'name')" />
                </div>

                <div class="flex flex-col">
                    <TextInput id="email" type="text" class="block w-full mr-2 h-[33px]" v-model="form.email"
                        placeholder="Email" label="Email
         " :errMessage="errors?.email" @update:model="clearError(errors, 'email')" />
                </div>
                <div class="flex flex-col">
                    <InputLabel for="role" value="Role" />
                    <Select :options="roles" showfield="role" class="w-full" valueField="id" label="Select an option"
                        v-model="form.role_id" />
                </div>
                <div class="flex flex-col ">
                    <InputLabel for="Status" value="Status" />
                    <Select :options="domainStatus" showfield="name" class="w-full" valueField="value"
                        label="Select Status" v-model="form.active" />
                    <InputError class="mt-2" :message="errors.status" />
                </div>
                <div class="flex flex-col">
                    <TextInput id="Password" type="Password" class="block w-full mr-2 h-[33px]" v-model="form.password"
                        placeholder="Password" label="Password
         " :errMessage="errors?.password" @update:model="clearError(errors, 'password')" />
                </div>

                <div class="flex flex-col w-full">
                    <TextInput id="comPassword" type="text" class="block w-full mr-2 h-[33px]"
                        v-model="form.password_confirmation" placeholder="Confirm Password" label="Confirm Password
             " :errMessage="errors?.password_confirmation"
                        @update:model="clearError(errors, 'password_confirmation')" />
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
import _ from 'lodash'
import { ref, onMounted, watch, computed } from 'vue'
import { showToast, getGlobalUpdateData } from '@/helper/functions'
import UserServices from '@/services/UserServices';
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import CommonServices from '@/services/CommonServices'

// Store and Router
const store = useStore()
const router = useRouter()

// Reactive State
const errors = ref({})
const loading = ref(false)
const form = ref({
    ...store.getters.editData

} || { status: '', role_id: '' })

const roles = ref({});

const domainStatus = [{ name: 'Active', value: 1 }, { name: 'Inactive', value: 0 }];

// Form Validation

const validateForm = () => {
    let isValid = true
    errors.value = {}
    if (!form.value.name) {
        errors.value.name = 'Name is required'
        isValid = false
    }
    if (!form.value.email) {
        errors.value.email = 'Email is required'
        isValid = false
    }
    if (!store.getters.editData) {
        if (!form.value.password) {
            errors.value.password = 'Password is required'
            isValid = false
        }
        if (form.value.password.length < 6) {
            errors.value.password = 'Password must be longer than 6 characters'
            isValid = false
        }

        if (!form.value.password_confirmation) {
            errors.value.password_confirmation = 'Confirm is required'
            isValid = false
        }
        if (form.value.password !== form.value.password_confirmation) {
            errors.value.password_confirmation = 'passwords must be matched '
            isValid = false
        }
    }


    return isValid
}



// Submit Handler
const handleSubmit = async () => {
    if (!validateForm()) return
    loading.value = true
    try {
        const action = store.getters.editData
            ? UserServices.editUser
            : UserServices.addUser
        const {
            deleted_at,
            created_at,
            updated_at,
            role,
            ...payload
        } = form.value

        const { status, data } = await action(payload)
        if (status === 200 && data.success) {
            showToast(data.message, 'success');
            router.push('/users')
        } else if (status === 400) {
            showToast(data.message, 'error')
        }
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} global-seo:`, error)
    } finally {
        loading.value = false
    }
}

const fetchRoleList = async () => {
    const { status, data } = await CommonServices.getRoles();
    if (status === 200 && data.success) {
        roles.value = data.data

    }
}


onMounted(() => {
    fetchRoleList();
}),
    // Fetch Perticular Domain Data
    // const fetchMetaTagData = async () => {
    //     loading.value = true
    //     const payload = { key: form.value.key, domain_id: form.value.domain_id }
    //     try {
    //         const { status, data } = await UserServices.getUser(payload)
    //         if (status === 200 && data.success) {
    //             const dataValue = data.data[0]
    //             store.dispatch('setEdit', dataValue)
    //             Object.assign(form.value, dataValue)
    //         }
    //     } catch (error) {
    //         showToast('Something went wrong', 'error')
    //         console.error('Error while fetching data:', error)
    //     }
    //     finally {
    //         loading.value = false;
    //     }
    // }

    watch(
        // () => form.value.domain_id,

    )

// watch(() => form.value.domain_id, (newDomainId) => {
//     // Check if newDomainId is present in domains_data and fetch 
//     if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
//         fetchMetaTagData();
//     } else {
//         console.log('data not in array', form.value?.domains_data);
//     }
// });

// Computed Property
const buttonText = computed(() => {
    return form.value.id ? 'Update' : 'Submit'
})
</script>