<script setup>
import InputError from 'src/components/Admin-components/InputError.vue';
import InputLabel from '@/Components/form-components/InputLabel.vue';
import PrimaryButton from 'src/components/Admin-components/PrimaryButton.vue';
import TextInput from 'src/components/Admin-components/TextInput.vue';
import { ref } from 'vue';

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

// Manage the form state manually
const form = ref({
    current_password: '',
    password: '',
    password_confirmation: '',
    errors: {},
    processing: false,
    recentlySuccessful: false,
});

const updatePassword = async () => {
    form.value.processing = true;

    try {
        const response = await fetch(route('password.update'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Include any necessary authentication headers
            },
            body: JSON.stringify({
                current_password: form.value.current_password,
                password: form.value.password,
                password_confirmation: form.value.password_confirmation,
            }),
        });

        if (response.ok) {
            form.value.recentlySuccessful = true;
            // Reset the form
            form.value.current_password = '';
            form.value.password = '';
            form.value.password_confirmation = '';
            form.value.errors = {};
        } else {
            const errorData = await response.json();
            form.value.errors = errorData.errors || {};
            // Focus on the appropriate input field
            if (form.value.errors.password) {
                passwordInput.value.focus();
            }
            if (form.value.errors.current_password) {
                currentPasswordInput.value.focus();
            }
        }
    } catch (error) {
        console.error('Error updating password:', error);
        // Handle unexpected errors
        form.value.errors.general = 'An unexpected error occurred.';
    } finally {
        form.value.processing = false; // Reset processing state
    }
};
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900">Update Password</h2>
            <p class="mt-1 text-sm text-gray-600">
                Ensure your account is using a long, random password to stay secure.
            </p>
        </header>

        <form @submit.prevent="updatePassword" class="mt-6 space-y-6">
            <div>
                <InputLabel for="current_password" value="Current Password" />

                <TextInput
                    id="current_password"
                    ref="currentPasswordInput"
                    v-model="form.current_password"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="current-password"
                />

                <InputError :message="form.errors.current_password" class="mt-2" />
            </div>

            <div>
                <InputLabel for="password" value="New Password" />

                <TextInput
                    id="password"
                    ref="passwordInput"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="new-password"
                />

                <InputError :message="form.errors.password" class="mt-2" />
            </div>

            <div>
                <InputLabel for="password_confirmation" value="Confirm Password" />

                <TextInput
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="new-password"
                />

                <InputError :message="form.errors.password_confirmation" class="mt-2" />
            </div>

            <div class="flex items-center gap-4">
                <PrimaryButton :disabled="form.processing">Save</PrimaryButton>

                <Transition
                    enter-active-class="transition ease-in-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out"
                    leave-to-class="opacity-0"
                >
                    <p v-if="form.recentlySuccessful" class="text-sm text-gray-600">Saved.</p>
                </Transition>
            </div>
        </form>
    </section>
</template>
