<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from 'src/components/Admin-components/InputError.vue';
import InputLabel from '@/Components/form-components/InputLabel.vue';
import PrimaryButton from 'src/components/Admin-components/PrimaryButton.vue';
import TextInput from 'src/components/Admin-components/TextInput.vue';
import { ref } from 'vue';

const props = defineProps({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
});

const form = ref({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
    errors: {},
    processing: false,
});

const submit = async () => {
    form.value.processing = true;
    form.value.errors = {}; // Reset errors

    try {
        const response = await fetch('/password/reset', { // Update the route accordingly
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: form.value.token,
                email: form.value.email,
                password: form.value.password,
                password_confirmation: form.value.password_confirmation,
            }),
        });

        if (response.ok) {
            // Handle successful password reset (e.g., redirect or show a success message)
            form.value.password = ''; // Reset password input
            form.value.password_confirmation = ''; // Reset confirmation input
        } else {
            const errorData = await response.json();
            form.value.errors = errorData.errors || {};
        }
    } catch (error) {
        console.error('Error resetting password:', error);
    } finally {
        form.value.processing = false; // Reset processing state
    }
};
</script>

<template>
    <GuestLayout>
        <form @submit.prevent="submit">
            <div>
                <InputLabel for="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autofocus
                    autocomplete="username"
                />
                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" value="Password" />
                <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="new-password"
                />
                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="mt-4">
                <InputLabel for="password_confirmation" value="Confirm Password" />
                <TextInput
                    id="password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password_confirmation"
                    required
                    autocomplete="new-password"
                />
                <InputError class="mt-2" :message="form.errors.password_confirmation" />
            </div>

            <div class="flex items-center justify-center mt-4">
                <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Reset Password
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>
