<script setup>
import InputError from 'src/components/Admin-components/InputError.vue';
import InputLabel from '@/Components/form-components/InputLabel.vue';
import PrimaryButton from 'src/components/Admin-components/PrimaryButton.vue';
import TextInput from 'src/components/Admin-components/TextInput.vue';
import { ref } from 'vue';

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

// Replace this with actual user data passed as a prop or retrieved from a store
const user = {
    name: '', // Set initial name
    email: '', // Set initial email
};

// Manage the form state manually
const form = ref({
    name: user.name,
    email: user.email,
    errors: {},
    processing: false,
    recentlySuccessful: false,
});

const updateProfile = async () => {
    form.value.processing = true;
    form.value.errors = {}; // Reset errors

    try {
        const response = await fetch('/profile/update', { // Update the route accordingly
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: form.value.name,
                email: form.value.email,
            }),
        });

        if (response.ok) {
            form.value.recentlySuccessful = true;
            // Optionally, reset the form state or update the user data
        } else {
            const errorData = await response.json();
            form.value.errors = errorData.errors || {};
        }
    } catch (error) {
        console.error('Error updating profile:', error);
    } finally {
        form.value.processing = false; // Reset processing state
    }
};

const resendVerificationEmail = async () => {
    try {
        const response = await fetch('/verification/send', { // Update the route accordingly
            method: 'POST',
        });

        if (response.ok) {
            // Handle success message for email sent
            console.log('Verification email sent.');
        } else {
            // Handle error case
            console.error('Error sending verification email.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900">Profile Information</h2>
            <p class="mt-1 text-sm text-gray-600">
                Update your account's profile information and email address.
            </p>
        </header>

        <form @submit.prevent="updateProfile" class="mt-6 space-y-6">
            <div>
                <InputLabel for="name" value="Name" />
                <TextInput
                    id="name"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.name"
                    required
                    autofocus
                    autocomplete="name"
                />
                <InputError class="mt-2" :message="form.errors.name" />
            </div>

            <div>
                <InputLabel for="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autocomplete="username"
                />
                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div v-if="mustVerifyEmail && !user.email_verified_at">
                <p class="text-sm mt-2 text-gray-800">
                    Your email address is unverified.
                    <button
                        type="button"
                        @click="resendVerificationEmail"
                        class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Click here to re-send the verification email.
                    </button>
                </p>

                <div v-show="status === 'verification-link-sent'" class="mt-2 font-medium text-sm text-green-600">
                    A new verification link has been sent to your email address.
                </div>
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
