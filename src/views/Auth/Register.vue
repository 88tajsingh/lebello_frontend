<script setup>
import { ref } from 'vue';
import { role } from '@/json/data';
import router from '@/router';
import Select from '@/components/Admin-components/form-components/Select.vue';
import TextInput from '@/components/Admin-components/form-components/TextInput.vue';
import LoginServices from '@/services/LoginServices';

const errors = ref({})
const processing = ref(false)
const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_id: '',
});

const validateForm = () => {
    let isValid = true;
    errors.value = {};
    if (!form.value.name) {
        errors.value.name = 'Name is required';
        isValid = false;
    }
    if (!form.value.email) {
        errors.value.email = 'Email is required';
        isValid = false;
    }
    if (!form.value.password) {
        errors.value.password = 'Password is required';
        isValid = false;
    }
    if (form.value.password.length < 6) {
        errors.value.password = 'Password must be longer than 6 characters';
        isValid = false;
    }

    if (!form.value.password_confirmation) {
        errors.value.password_confirmation = 'Confirm is required';
        isValid = false;
    }
    if (form.value.password !== form.value.password_confirmation) {
        errors.value.password_confirmation = 'passwords must be matched ';
        isValid = false;
    }

    return isValid;
};
const handleSubmit = async () => {
    try {
        if (validateForm()) {
            processing.value = true;
            const payload = { ...form.value };
            await LoginServices.register(payload)
                .then(res => {
                    console.log('res', res)
                    if (res.status === 200 && res?.data?.success === true) {
                        router.push('/login');
                        processing.value = false;
                    }

                })
        }
    } catch (e) {
        if (res.status === 400) {
            console.log(res.data.message)
            processing.value = false;
        }
        console.error('Error while register:', e);
        processing.value = false;
    } finally {
        processing.value = false;
    }
};
</script>

<template>

    <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center overflow-hidden">
        <div
            class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 overflow-hidden">
            <div class="lg:w-1/2 xl:w-5/12 p-2 sm:p-2">
                <!-- <div>
                <img src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                    class="w-32 mx-auto" />
            </div> -->
                <div class=" flex flex-col items-center">
                    <h1 class="text-2xl xl:text-3xl font-extrabold">
                        Sign up
                    </h1>
                    <div class="w-full flex-1 mt-8">
                        <!-- <div class="flex flex-col items-center">
                        <button
                            class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                            <div class="bg-white p-2 rounded-full">
                                <svg class="w-4" viewBox="0 0 533.5 544.3">
                                    <path
                                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                        fill="#4285f4" />
                                    <path
                                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                        fill="#34a853" />
                                    <path
                                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                        fill="#fbbc04" />
                                    <path
                                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                        fill="#ea4335" />
                                </svg>
                            </div>
                            <span class="ml-4">
                                Sign Up with Google
                            </span>
                        </button>

                        <button
                            class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                            <div class="bg-white p-1 rounded-full">
                                <svg class="w-6" viewBox="0 0 32 32">
                                    <path fill-rule="evenodd"
                                        d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z" />
                                </svg>
                            </div>
                            <span class="ml-4">
                                Sign Up with GitHub
                            </span>
                        </button>
                    </div> -->

                        <!-- <div class="my-12 border-b text-center">
                        <div
                            class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or sign up with e-mail
                        </div>
                    </div> -->
                        <form @submit.prevent="handleSubmit">
                            <div class="mx-auto max-w-xs">
                                <TextInput name="name" type="text" label=" Full Name" :errMessage="errors.name"
                                    v-model="form.name" placeholder="Full Name"
                                    :class="{ 'border-red-500': errors.name }"
                                    @update:model="$clearError(errors, 'name')">

                                </TextInput>
                                <TextInput name="email" type="email" label="Email" :errMessage="errors.email"
                                    v-model="form.email" placeholder="email" :class="{ 'border-red-500': errors.email }"
                                    @update:model="$clearError(errors, 'email')">
                                    <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.5">
                                            <path
                                                d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                                fill="" />
                                        </g>
                                    </svg>
                                </TextInput>

                                <TextInput name="password" type="password" label="Passowrd"
                                    :errMessage="errors.password" v-model="form.password"
                                    placeholder="6+ Characters, 1 Capital letter"
                                    :class="{ 'border-red-500': errors.password }"
                                    @update:model="$clearError(errors, 'password')">
                                    <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.5">
                                            <path
                                                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                                fill="" />
                                            <path
                                                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                                fill="" />
                                        </g>
                                    </svg>
                                </TextInput>
                                <TextInput name="password_confirmation" type="password" label="Confirm Password"
                                    :errMessage="errors.password_confirmation" v-model="form.password_confirmation"
                                    class="" placeholder="6+ Characters, 1 Capital letter"
                                    :class="{ 'border-red-500': errors.password_confirmation }"
                                    @update:model="$clearError(errors, 'password_confirmation')">
                                    <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.5">
                                            <path
                                                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                                fill="" />
                                            <path
                                                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                                fill="" />
                                        </g>
                                    </svg>
                                </TextInput>
                                <Select :options="role" showfield="role" class="w-full mt-2 bg-" valueField="id"
                                    label="Select Role" v-model="form.role_id" />
                                <button type="submit"
                                    class="mt-5 tracking-wide font-semibold bg-indigo-500 text-white w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span class="ml-3">
                                        Sign Up
                                    </span>
                                </button>
                                <p class="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by templatana's
                                    <a href="#" class="border-b border-gray-500 border-dotted">
                                        Terms of Service
                                    </a>
                                    and its
                                    <a href="#" class="border-b border-gray-500 border-dotted">
                                        Privacy Policy
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
                <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                    style="background-image: url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');">
                </div>
            </div>
        </div>
    </div>

</template>
