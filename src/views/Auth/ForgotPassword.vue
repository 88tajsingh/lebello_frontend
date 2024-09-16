<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import Button from '@/components/Admin-components/Buttons/Button.vue';
import LoginService from '@/services/LoginServices';
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue';
import TextInput from '@/components/Admin-components/form-components/TextInput.vue';

const processing = ref(false);
const errors = ref({});
const router = useRouter();

defineProps({
    status: {
        type: String,
    },
});

const form = ref({
    email: '',
});

const validateForm = () => {
    let isValid = true;
    console.log("object")
    errors.value = {};
    if (!form.value.email) {
        errors.value.email = 'field is required';
        isValid = false;
    }
    return isValid;
};

const handleForgetPassword = () => {
    try {
        if (validateForm()) {
            console.log(form.value)
            // processing.value = true;
            // const user = { ...form.value };
            // const token = "token"
            // store.dispatch('login', { token, user });
            // router.push('/admin');
            // LoginService.forgetpassword(user)
            // .then(res => {
            //   console.log('Login Response:', res.data);
            //   store.dispatch('login', { token, payload });
            //   router.push('/admin');
            //   if (res.status === 200 && res?.data?.success === true) {
            //   store.dispatch('login', { token, user });
            //   processing.value = false;        }
            // if (res.status === 401) {
            //   processing.value = false;
            // }
            // })
        }
    } catch (e) {
        console.error('Error while log in:', e);
    } finally {
        processing.value = false;
    }


};
</script>

<template>
    <GuestLayout>
        <div class="mb-4 text-sm text-gray-600 border-l-4 pl-3 border-[#72aee6]">
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset
            link that will allow you to choose a new one.
        </div>
        <!-- <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div> -->
        <form @submit.prevent="handleForgetPassword">
            <div>
                <!-- <InputLabel for="email" value="Username or Email Address" /> -->
                <TextInput name="email" type="text" label="Username or Email Address" :errMessage="errors.email"
                    v-model="form.email" placeholder="Email" :class="{ 'border-red-500': errors.email }"
                    @update:model="$clearError(errors, 'email')" />
            </div>
            <div class="flex items-center justify-between mt-4">
                <router-link to="/login"
                    class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Login
                </router-link>
                <Button type="submit" class="ms-4" :class="{ 'opacity-25': processing }" :disabled="processing"
                    bg_th_color="bg-[#2271b1] text-white px-3 py-2">
                    Get New Password
                </Button>

            </div>
        </form>
    </GuestLayout>
</template>
