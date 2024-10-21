<script setup>
import DangerButton from 'src/components/Admin-components/DangerButton.vue';
import InputError from 'src/components/Admin-components/InputError.vue';
import InputLabel from '@/Components/form-components/InputLabel.vue';
import Modal from 'src/components/Admin-components/Modal.vue';
import SecondaryButton from 'src/components/Admin-components/SecondaryButton.vue';
import TextInput from 'src/components/Admin-components/TextInput.vue';
import { nextTick, ref } from 'vue';

const confirmingUserDeletion = ref(false);
const passwordInput = ref(null);

// Manage form state manually
const form = ref({
    password: '',
    errors: {},
    processing: false,
});

// Function to confirm user deletion
const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;
    nextTick(() => passwordInput.value.focus());
};

// Function to delete user
const deleteUser = async () => {
    form.value.processing = true;

    try {
        const response = await fetch('/profile/destroy', { // Adjust the route as needed
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Include any necessary authentication headers if needed
            },
            body: JSON.stringify({ password: form.value.password }),
        });

        if (response.ok) {
            // Handle successful deletion, e.g., redirect to another page or show a success message
            closeModal();
        } else {
            // Handle errors
            const errorData = await response.json();
            form.value.errors.password = errorData.errors.password || 'An error occurred.';
            passwordInput.value.focus();
        }
    } catch (error) {
        console.error('Error:', error);
        form.value.errors.password = 'An error occurred. Please try again.';
        passwordInput.value.focus();
    } finally {
        form.value.processing = false;
        form.value.password = ''; // Clear the password field
    }
};

// Function to close the modal
const closeModal = () => {
    confirmingUserDeletion.value = false;
    form.value.errors = {}; // Clear errors
    form.value.password = ''; // Reset password
};
</script>

<template>
    <section class="space-y-6">
        <header>
            <h2 class="text-lg font-medium text-gray-900">Delete Account</h2>
            <p class="mt-1 text-sm text-gray-600">
                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
                your account, please download any data or information that you wish to retain.
            </p>
        </header>

        <DangerButton @click="confirmUserDeletion">Delete Account</DangerButton>

        <Modal :show="confirmingUserDeletion" @close="closeModal">
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900">
                    Are you sure you want to delete your account?
                </h2>
                <p class="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Please
                    enter your password to confirm you would like to permanently delete your account.
                </p>

                <div class="mt-6">
                    <InputLabel for="password" value="Password" class="sr-only" />

                    <TextInput
                        id="password"
                        ref="passwordInput"
                        v-model="form.password"
                        type="password"
                        class="mt-1 block w-3/4"
                        placeholder="Password"
                        @keyup.enter="deleteUser"
                    />
                    
                    <InputError :message="form.errors.password" class="mt-2" />
                </div>

                <div class="mt-6 flex justify-end">
                    <SecondaryButton @click="closeModal">Cancel</SecondaryButton>
                    <DangerButton
                        class="ms-3"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="deleteUser"
                    >
                        Delete Account
                    </DangerButton>
                </div>
            </div>
        </Modal>
    </section>
</template>
