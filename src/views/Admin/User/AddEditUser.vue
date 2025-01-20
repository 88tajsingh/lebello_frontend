<template>
    <DefaultCard :cardTitle="form.id ? `Edit User` : `Add New User`">

        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="p-6.5 grid grid-cols-2 gap-6">
                <div class="flex flex-col">
                    <TextInput id="name" type="text" class="block w-full mr-2 h-[40px]" v-model="form.name"
                        placeholder="Name" label="Name" :errMessage="errors.name"
                        @update:modelValue="$clearError(errors, 'name')" />
                </div>

                <div class="flex flex-col">
                    <TextInput id="email" type="text" class="block w-full mr-2 h-[40px]" v-model="form.email"
                        placeholder="Email" label="Email
         " :errMessage="errors?.email" @update:modelValue="$clearError(errors, 'email')" />
                </div>
                <div class="flex flex-col">
                    <Select :options="roles" showfield="role" title="Select a Role" class="w-full" valueField="id"
                        label="Select a Role" v-model="form.role_id" :errorClass='errors.role_id'
                        :errMessage="errors.role_id" @update:modelValue="$clearError(errors, 'role_id')" />
                </div>
                <div class="flex flex-col">
                    <TextInput id="Password" type="Password" class="block w-full mr-2 h-[40px]" v-model="form.password"
                        placeholder="Password" label="Password
         " :errMessage="errors?.password" @update:modelValue="$clearError(errors, 'password')" />
                </div>

                <div class="flex flex-col w-full">
                    <TextInput id="comPassword" type="password" class="block w-full mr-2 h-[40px]"
                        v-model="form.password_confirmation" placeholder="Confirm Password" label="Confirm Password
             " :errMessage="errors?.password_confirmation"
                        @update:modelValue="$clearError(errors, 'password_confirmation')" />
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
import { ref, onMounted, computed } from 'vue'
import { showToast } from '@/helper/functions'
import UserServices from '@/services/UserServices';
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import { useStore } from 'vuex'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import CommonServices from '@/services/CommonServices'

// Store and Router
const store = useStore()
const router = useRouter()

// Reactive State
const errors = ref({})
const loading = ref(false)
const form = ref(store?.getters?.editData || { status: '', role_id: '' })

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
    if (!form.value.role_id) {
        errors.value.role_id = 'Role is required'
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
        const { status, data } = await (store.getters.editData
            ? UserServices.editUser
            : UserServices.addUser)({
                ...form.value,
                deleted_at: undefined,
                created_at: undefined,
                updated_at: undefined,
                role: undefined,
            })

        if (status === 200 && data.success) {
            $showToast(data.message, 'success');
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
})
// Computed Property
const buttonText = computed(() => {
    return form.value.id ? 'Update' : 'Submit'
})

onBeforeRouteLeave((to, from, next) => {
    store.dispatch('clearEditData');
    next();
});
</script>