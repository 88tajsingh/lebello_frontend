<template>
    <div class=" border border-[#e6e3e3] rounded-md "
     
    >
        <div class="grid divide-y divide-neutral-100  " >
            <div class=" ">
                <details class="group " :open='toggle'>
                    <summary @click="toggleFAQ()"
                        class="flex justify-between py-1 px-4   items-center font-medium cursor-pointer list-none border"
                        :class="{'border-b-none  ': toggle}"
                        >
                        <span v-if="checkBox" >
                            <CheckBox :checked="isChecked" @update:checked="updateChecked"
                                  :label="header" v-model="isChecked" class="" /> 
                        </span>
                        <span v-else class=" font-normal text-gray-900">
                        
                            {{header}}
                        </span>
                        <span class="transition " :class="{ 'group-open:rotate-90': toggle, 'text-black': toggle }"
                            :style="{ transform: toggle ? 'rotate(180deg)' : 'rotate(0deg)' }">
                            <svg fill="#787c82" width="11px" height="11px" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z">
                                    </path>
                                </g>
                            </svg>
                            <path d="M6 9l6 6 6-6"></path>

                        </span>
                    </summary>
                    <div class="border mb-4 " :class="[containerClass]" >
                    <slot />
                    </div>
                </details>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CheckBox from './form-components/CheckBox.vue';

const props = defineProps({
  open: {
    type: Boolean,
    default: true
  },
  header: {
    type: String,
    required: true
  },
  checkBox: {
    type: Boolean,
    default: false
  },
  containerClass: {
    type: String,
    default: ''
  }
});

const toggle = ref(props.open);

const toggleFAQ = () => {
  toggle.value = !toggle.value;
};
</script>


<style scoped>

</style>