<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from 'src/components/Admin-components/InputError.vue';
import InputLabel from '@/Components/form-components/InputLabel.vue';
import PrimaryButton from 'src/components/Admin-components/PrimaryButton.vue';
import TextInput from 'src/components/Admin-components/TextInput.vue';
import { ref } from 'vue';

const form = ref({
    password: '',
    errors: {},
    processing: false,
    recentlySuccessful: false,
});

const submit = async () => {
    form.value.processing = true;
    form.value.errors = {}; // Reset errors

    try {
        const response = await fetch('/password/confirm', { // Update the route accordingly
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: form.value.password,
            }),
        });

        if (response.ok) {
            // Handle successful confirmation (e.g., redirect or show a success message)
            form.value.recentlySuccessful = true;
            form.value.password = ''; // Reset password input
        } else {
            const errorData = await response.json();
            form.value.errors = errorData.errors || {};
        }
    } catch (error) {
        console.error('Error confirming password:', error);
    } finally {
        form.value.processing = false; // Reset processing state
    }
};
</script>

<template>
    <GuestLayout>
        <div class="mb-4 text-sm text-gray-600">
            This is a secure area of the application. Please confirm your password before continuing.
        </div>

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="password" value="Password" />
                <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="current-password"
                    autofocus
                />
                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="flex justify-end mt-4">
                <PrimaryButton class="ms-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Confirm
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>
