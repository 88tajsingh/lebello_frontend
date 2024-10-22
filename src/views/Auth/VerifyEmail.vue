<script setup>
import { computed, ref } from 'vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import PrimaryButton from 'src/components/Admin-components/PrimaryButton.vue';

const props = defineProps({
    status: {
        type: String,
    },
});

// Reactive state for processing
const processing = ref(false);
const verificationLinkSent = computed(() => props.status === 'verification-link-sent');

// Function to resend verification email
const submit = async () => {
    processing.value = true;

    try {
        const response = await fetch('/verification/email', { // Update this route accordingly
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            // Handle error response
            const errorData = await response.json();
            console.error('Error resending verification email:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        processing.value = false;
    }
};
</script>

<template>
    <GuestLayout>
        <div class="mb-4 text-sm text-gray-600">
            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link
            we just emailed to you? If you didn't receive the email, we will gladly send you another.
        </div>

        <div class="mb-4 font-medium text-sm text-green-600" v-if="verificationLinkSent">
            A new verification link has been sent to the email address you provided during registration.
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex items-center justify-between">
                <PrimaryButton :class="{ 'opacity-25': processing }" :disabled="processing">
                    Resend Verification Email
                </PrimaryButton>

                <button
                    type="button"
                    @click="() => window.location.href = '/logout'" <!-- Update this URL accordingly -->
                    class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Log Out
                </button>
            </div>
        </form>
    </GuestLayout>
</template>
