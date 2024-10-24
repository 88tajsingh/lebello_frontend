<template>{{ form }}
    <PopupModal modalTitle="Edit Profile" custonClasses="w-[400px] h-[500px]  z-99999 " v-model:isOpen="isopen">
        <div class="dark:bg-gray-700 bg-gray-200">
            <!-- {{ store.getters.user }} -->
            <div class="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                <div class="border-b">
                    <div class="text-center my-2">
                        <img class="h-25 w-25 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                            src="@/assets/profilepic.png" alt="" />
                    </div>
                    <div class="px-5">
                        <TextInput id="name" type="text" class="block w-full mr-2 h-[33px]" v-model="form.name"
                            placeholder="Name" label="Name" :errMessage="errors?.name"
                            @update:model="clearError(errors, 'name')" />
                        <TextInput id="email" type="text" class="block w-full mr-2 h-[33px]" v-model="form.email"
                            placeholder="Email" label="Email
         " :errMessage="errors?.email" @update:model="clearError(errors, 'email')" />
                        <TextInput id="Password" type="Password" class="block w-full mr-2 h-[33px]"
                            v-model="form.password" placeholder="Password" label="Password
         " :errMessage="errors?.password" @update:model="clearError(errors, 'password')" />
                        <TextInput id="comPassword" type="text" class="block w-full mr-2 h-[33px]"
                            v-model="form.password_confirmation" placeholder="Confirm Password" label="Confirm Password
         " :errMessage="errors?.password_confirmation" @update:model="clearError(errors, 'password_confirmation')" />
                        <div class="mt-4">
                            <Button class="px-6 m-0" bg_th_color="py-2 text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                                @click="handleProfileUpdate">
                                Save</Button>
                            <Button class="px-4 py-2 m-auto" @click="() => { router.push('/dashboard') }">Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PopupModal>
</template>
<script setup>
import { ref } from 'vue'
import store from '@/store'
import router from '@/router'
import { clearError, showToast } from '@/helper/functions'
import CommonServices from '@/services/CommonServices'
const errors = ref({})
const props = defineProps()
const isopen = ref(true)
const form = ref(store.getters.user)
const processing = ref(false)
console.log(errors.value)

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

    return isValid
}

const handleProfileUpdate = async () => {
    processing.value = true;
    try {
        if (validateForm()) {

            const res = await CommonServices.updateProfile(form.value);

            if (res.status === 200) {
                const { password, password_confirmation, ...data } = form.value
                store.dispatch('userUpdate', data);
                showToast(res.data.message, 'success');
                router.push('/dashboard');
                processing.value = false;
            } else if (res.status === 401) {
                showToast(res.data.message, 'error');
                console.error('Error while updating profile:', res.data.message);
            }
        }
    } catch (e) {
        console.error('Error while updating profile:', e);
    } finally {
        processing.value = false;
    }
};

</script>
