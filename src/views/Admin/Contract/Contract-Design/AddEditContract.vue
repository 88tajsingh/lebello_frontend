<template>
    {{ form }}
    <DefaultCard :cardTitle="id ? `Edit Contract` : `Add New Contract`">
        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <div>
                        <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title" placeholder="Add title"
                            v-model="form.title" :errMessage="errors.title" :errors="errors" />
                        <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug" placeholder="slug"
                            v-model="form.slug" :errMessage="errors.slug" />
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Description">
                            <div class="px-5     pt-2">
                                <div class="mb-2">
                                    <Button type="">
                                        <span class="flex">
                                            <svg class="text-black hover:text-white" fill="text-textColor2" width="20px"
                                                height="20px" viewBox="0 0 1920 1920"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                </g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path
                                                        d="M101.002 1230.637V377.955c557.71-147.638 1076.312-35.47 1214.45 0v395.924l101.053-30.316V302.165l-35.671-11.014c-26.274-8.287-651.588-197.154-1349.154 1.313L-.05 305.197v1001.23l35.671 10.913c17.28 5.457 295.781 89.533 682.206 89.533 122.173 0 255.866-10.004 394.712-31.933v-101.255c-476.362 77.811-890.476-12.025-1011.537-43.048M1919.91 789.31v693.524c-.101 103.074-82.257 186.846-183.31 186.846-91.856 0-167.343-69.524-180.58-159.46-1.415-9.095-2.729-18.19-2.729-27.689 0-103.074 82.156-187.048 183.31-187.048 16.673 0 32.539 2.93 47.899 7.275 12.025 3.234 23.545 7.882 34.357 13.541V924.62l-39.814 11.824-362.577 107.317-27.89 8.186v579.94c0 2.83-.708 5.458-.81 8.186-4.243 99.234-84.176 178.964-182.601 178.964-101.154 0-183.31-83.975-183.31-187.15 0-68.513 36.682-128.033 90.645-160.572 27.385-16.471 58.711-26.577 92.665-26.577 29.81 0 57.499 7.983 82.358 20.817V976.46l27.89-8.185 101.053-29.911 360.96-106.813 142.484-42.24ZM527.515 480.635l560.842 329.835-560.842 329.735v-659.57Zm101.053 176.64v306.29L888.98 810.47 628.568 657.275ZM1736.6 1568.628c-38.097 0-68.817-27.689-78.114-64.674-1.82-6.973-4.143-13.743-4.143-21.423 0-47.394 36.884-85.996 82.257-85.996 18.896 0 35.671 7.781 49.515 19.1 19.504 15.763 32.741 39.309 32.741 66.896 0 47.495-36.884 86.097-82.256 86.097Zm-531.436 149.356c-45.373 0-82.257-38.603-82.257-86.097 0-47.495 36.884-86.097 82.257-86.097 45.372 0 82.358 38.602 82.358 86.097 0 47.494-36.986 86.097-82.358 86.097Z"
                                                        fill-rule="evenodd"></path>
                                                </g>
                                            </svg>
                                            <span class="ml-1">
                                                Add Media
                                            </span>
                                        </span>
                                    </Button>
                                    <Button type="" class="ml-0">
                                        <span class="flex">
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="#0a4b78"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                </g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path
                                                        d="M16.2857 20C19.4416 20 22 17.4717 22 14.3529C22 11.8811 20.393 9.78024 18.1551 9.01498C17.8371 6.19371 15.4159 4 12.4762 4C9.32028 4 6.7619 6.52827 6.7619 9.64706C6.7619 10.3369 6.88706 10.9978 7.11616 11.6089C6.8475 11.5567 6.56983 11.5294 6.28571 11.5294C3.91878 11.5294 2 13.4256 2 15.7647C2 18.1038 3.91878 20 6.28571 20H16.2857Z"
                                                        fill="text-textColor2"></path>
                                                </g>
                                            </svg> <span class="ml-1">
                                                Add Weather
                                            </span>
                                        </span>
                                    </Button>
                                </div>
                                <div class="px-2">
                                    <TinyMCE v-model="form.description" />
                                </div>
                                <InputError class="mt-2" :message="errors?.description" />
                                <span class="text-sm pl-2">Put Material Description.</span>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Seo Options">
                            <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                <TextInput id=" " type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.seo_title_tag" placeholder="Title Tag" label="Title Tag" />
                                <span>Custom title tag.</span>
                            </div>
                            <div class="px-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_description" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.seo_meta_description"
                                    placeholder="Meta Description" label="Meta Description"
                                    :message="errors.seo_meta_description" />
                                <span>Most search engines use a maximum of 160 chars for the description.
                                </span>
                            </div>
                            <div class="mx-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id=" " :isTextarea="true" :='4' type="text" class="block w-[180px] mr-2 "
                                    v-model="form.seo_meta_keywords" placeholder="Meta Keywords"
                                    label="Meta Keywords" />
                                <span>Seperate each term with comma.</span>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Contract Slide">
                            <div class='mx-5 mb-2'>
                                <div class=' mb-2'>
                                    <InputLabel for="ContractLogo" value="Show on Contract HomePage Slide" />
                                    <span>
                                        <singleCheckBox id="checkbox1"
                                            label="Checked this option to show this contract on contract home slide section."
                                            v-model:modelValue="form.contract_home_page_slide"></singleCheckBox>
                                    </span>
                                </div>
                                <InputLabel for="ContractLogo" value="SliderImage" />
                                <div class="py-2 rounded-lg mb-2 px-2 border border-stroke"
                                    @click="() => IsOpen = true"> {{
                                        mediaName }}</div>

                                <TextInput id="TitleBackground" type="text" class="block w-full mr-2 mb-2 h-[33px]"
                                    v-model="form.contract_background_title" placeholder="" label="Title Background		
                          " />
                                <TextInput id="TitleColor" type="text" class="block w-full mr-2 mb-2 h-[33px]"
                                    v-model="form.contract_title_color" placeholder="" label="Title Color			
                          " />
                                <TextInput id="LocationBackground	" type="text" class="block w-full mb-2 mr-2 h-[33px]"
                                    v-model="form.contract_location_background" placeholder="" label="Location Background			
                          " />
                                <TextInput id="LocationColor" type="text" class="block w-full mr-2 mb-2 h-[33px]"
                                    v-model="form.contract_location_color" placeholder="" label="Location Color			
                          " />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion open="false" header="Contract Logo">
                            <div class=" px-6  h-auto ">
                                <div class="py-2 min-h-10 rounded-lg px-2 border border-stroke" @click="() => IsOpen = true"> {{
                                    contractLogoName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in selectedFiles" :key="file" :src="$filePath(file.file_url)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file.alternative_text || 'image'">
                                </div>
                                <InputError class="mt-2" :message="errors?.featured_image" />
                            </div>
                        </Accordion>
                    </div>

                </div>

                <div class="col-span-4">
                    <Accordion header="Publish" open="false">
                        <div class="px-1 py-3">
                            <!-- <div class="flex justify-between mb-2">
                                <LinkBtn :buttonText="'Preview'" />
                                <Button type="submit" class=" text-sm ml-auto px-2">
                                    Save Draft
                                </Button>
                            </div>
                            <div id="wraper status">
                                <div>
                                    <span class="text-sm flex items-center m-auto">
                                        <svg fill="#000000" height="15px" width="15px" version="1.1" id="Layer_1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
                                            xml:space="preserve">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                stroke-linejoin="round">
                                            </g>
                                            <g id="SVGRepo_iconCarrier">
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M256,0c-70.592,0-128,57.408-128,128c0,63.296,46.229,115.861,106.667,126.08v236.587 c0,11.776,9.536,21.333,21.333,21.333c11.797,0,21.333-9.557,21.333-21.333V254.08C337.771,243.861,384,191.296,384,128 C384,57.408,326.592,0,256,0z M234.667,128c-11.776,0-21.333-9.557-21.333-21.333s9.557-21.333,21.333-21.333 S256,94.891,256,106.667S246.443,128,234.667,128z">
                                                        </path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        <span class="ml-1">
                                            Status:
                                            <strong class="text-gray-600"> Draft</strong>
                                        </span>
                                        <Button v-if="!showHidePublish?.Status" type=""
                                            @click="showHidePublish.Status = !showHidePublish?.Status"
                                            class="ml-2 text-sm border-none underline">
                                            Edit
                                        </Button>
                                    </span>
                                </div>
                                <div v-if="showHidePublish.Status">
                                    <Dropdown :options="menuItems" @optionSelected="handleOptionSelected" />
                                    <LinkBtn click="route('add.swatches')" class=" " buttonText="ok" />
                                    <Button type="" @click="showHidePublish.Status = !showHidePublish.Status"
                                        class="ml-2 text-sm border-none underline">
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                            <div id="wraper Visibility">
                                <div>
                                    <span class="text-sm flex items-center m-auto">
                                        <svg width="15px" height="15px" viewBox="0 0 16 16" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" fill="text-gray-700">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                stroke-linejoin="round">
                                            </g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path fill="#444"
                                                    d="M8 3.9c-6.7 0-8 5.1-8 5.1s2.2 4.1 7.9 4.1 8.1-4 8.1-4-1.3-5.2-8-5.2zM5.3 5.4c0.5-0.3 1.3-0.3 1.3-0.3s-0.5 0.9-0.5 1.6c0 0.7 0.2 1.1 0.2 1.1l-1.1 0.2c0 0-0.3-0.5-0.3-1.2 0-0.8 0.4-1.4 0.4-1.4zM7.9 12.1c-4.1 0-6.2-2.3-6.8-3.2 0.3-0.7 1.1-2.2 3.1-3.2-0.1 0.4-0.2 0.8-0.2 1.3 0 2.2 1.8 4 4 4s4-1.8 4-4c0-0.5-0.1-0.9-0.2-1.3 2 0.9 2.8 2.5 3.1 3.2-0.7 0.9-2.8 3.2-7 3.2z">
                                                </path>
                                            </g>
                                        </svg>
                                        <span class="ml-1">
                                            Visibility:
                                            <strong class="text-gray-600"> Public</strong>
                                        </span>
                                        <Button v-if="!showHidePublish.Visibility" type=""
                                            @click="showHidePublish.Visibility = !showHidePublish.Visibility"
                                            class="ml-2 text-sm border-none underline">
                                            Edit
                                        </Button></span>
                                </div>
                                <div v-if="showHidePublish.Visibility">
                                    <RadioBtn :options="options" :onChange="handleOptionChange"
                                        class="flex flex-col mb-1" />
                                    <LinkBtn click="route('add.swatches')" class=" " :buttonText="'ok'" />
                                    <Button type="" @click="showHidePublish.Visibility = !showHidePublish.Visibility"
                                        class="ml-2 text-sm border-none underline">
                                        Cancel</Button>
                                </div>
                            </div> -->
                            <div class="flex flex-col ">
                                <InputLabel for="status" value="Status" />
                                <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                                    label="Select an option" v-model="form.status" />
                            </div>
                            <div class="col-span-1 w-full">
                                <input-label for="parentOrder" value="Visibility" />
                                <div class="flex items-center  gap-2">
                                    <RadioButton v-for="option in PublishOptions" :key="option.value" name="Visibility"
                                        :value="option.value" :label="option.label" :modelValue="form.visibility"
                                        @update:modelValue="form.visibility = $event" />
                                </div>
                                <div v-if="form.visibility === 'Password protected'" class="">
                                    <TextInput type="password" class="block mr-2 w-full" v-model="form.passowrd"
                                        placeholder="Password" />
                                </div>
                            </div>
                            <div class="col-span-1 w-full">
                                <DatePicker v-model="form.publish" label="Publish Date" format="yyyy-mm-dd hh:mm:ss"
                                    dayjsFormat='YYYY-MM-DD HH:mm:ss' :use12-hour="false" />
                            </div>

                        </div>
                        <div class="bg-[#f6f7f7] flex py-3">
                            <Button type="submit" bg_th_color="text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                                class=" text-sm ml-auto px-3 py-2">
                                Publish
                            </Button>
                        </div>
                    </Accordion>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Contract Information">
                            <div class="px-6 h-auto ">
                                <TextInput id="Location" type="text" class="block w-[180px] mr-2  h-[33px]"
                                    v-model="form.contract_info_location" placeholder="Location" label="Location" />
                                <p class="mb-1">Put the contract location.</p>
                                <TextInput id="Designer" type="text" class="block w-[180px] mr-2 mb-1 h-[33px]"
                                    v-model="form.contract_info_designer" placeholder="Designer" label="Designer" />
                                <p class="mb-1">Put the designer name here.</p>

                                <TextInput id="Client" type="text" class="block mb-1 w-[180px] mr-2 h-[33px]"
                                    v-model="form.contract_info_client" placeholder="Client" label="Client" />
                                <p class="mb-1">Put the client name here.</p>

                                <TextInput id="Project " type="text" class="block mb-1 w-[180px] mr-2 h-[33px]"
                                    v-model="form.contract_info_project_link" placeholder="Project Link"
                                    label="Project Link " />
                                <p class="mb-1">Put the project link URL here. Do not start with 'http://'. Example:
                                    projectlink.com</p>

                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Featured Option">
                            <div class="mt-2 px-6 flex h-auto ">
                                <singleCheckBox id="FeaturedOption" label="If set as featured, it will be displayed
                                    at the top of
                                    'Contract Design' page" v-model:modelValue="form.featured_option"></singleCheckBox>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Contract Type">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :data="MaterialTreeListData" @checked-items="handleContractType" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Contract Location">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :data="MaterialTreeListData" @checked-items="handleContractLocation" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Featured image">
                            <div class="px-6  h-auto ">
                                <!-- <InputLabel for="Featured_image" value="Featured_image" /> -->
                                <div class="py-2 rounded-lg px-2 border border-stroke" @click="() => IsOpen = true"> {{
                                    mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in selectedFiles" :key="file" :src="$filePath(file.file_url)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file.alternative_text || 'image'">
                                </div>
                                <InputError class="mt-2" :message="errors?.featured_image" />
                            </div>
                        </Accordion>
                        <Accordion :open="true" header="Gallery">
                            <div class="px-6  h-auto ">
                                <!-- <InputLabel for="Featured_image" value="Featured_image" /> -->
                                <div class="py-2 rounded-lg px-2 border border-stroke" @click="() => IsOpen = true"> {{
                                    mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in selectedFiles" :key="file" :src="$filePath(file.file_url)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file.alternative_text || 'image'">
                                </div>
                                <InputError class="mt-2" :message="errors?.featured_image" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Simple Fields">
                            <div class="mt-2 px-6 flex h-auto">
                                <Select :options="options" showfield="name" class="w-full" valueField="value"
                                    label="None " v-model="form.simple_fields" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Sub Heading Settings">
                            <div class="mt-2 px-6  h-auto">
                                <div>
                                    <div class="">
                                        <RadioButton v-for="option in withBgWithoutBg" :key="option.value"
                                            name="Visibility" :value="option.value" :label="option.label"
                                            :modelValue="iswithBg"
                                            @update:modelValue="iswithBg = $event" />
                                    </div>
                                    <div v-if="iswithBg" class="">
                                        <InputLabel for="Text Color" value="bg Color" />
                                        <TextInput type="color" class="block h-[40px] px-2 mb-2 rounded-lg"
                                            placeholder="" v-model="form.label_background_color"
                                            :errMessage="errors.label_background_color" />
                                        <InputLabel for="Text Color" value="Enter Color code " />
                                        <TextInput type="text" class="block mr-2 mb-2 h-[40px] " placeholder=""
                                            v-model="form.label_background_color" />
                                    </div>

                                </div>
                                <div class="">
                                    <InputLabel for="Text Color" value="Text Color" />
                                    <TextInput type="color" class="block h-[40px] px-2 mb-2 rounded-lg" placeholder=""
                                        v-model="form.label_background_color"
                                        :errMessage="errors.label_background_color" />
                                </div>

                                <TextInput type="text" class="block mr-2 mb-2 h-[40px] " placeholder=""
                                    label="Heading Font Size" v-model="form.heading_font_size" />

                                <div class="">
                                    <InputLabel for="-HeadingCase" value="Heading Case" />
                                    <RadioButton v-for="option in capsNOCaps" :key="option.value" name="Visibility"
                                        :value="option.value" :label="option.label" :modelValue="form.contract_design"
                                        @update:modelValue="form.contract_design = $event" />
                                </div>

                                <TextInput type="text" class="block mr-2 mb-2 h-[40px] " placeholder=""
                                    label="Transparent %" v-model="form.heading_transparent_percentagea" />

                            </div>
                        </Accordion>
                    </div>

                    <div class="mt-5">
                        <Accordion :open="true" header="Contract design">
                            <div class="mt-2 px-6 flex h-auto">
                                <div class="">
                                    <RadioButton v-for="option in oldNewContract" :key="option.value" name="Visibility"
                                        :value="option.value" :label="option.label" :modelValue="form.contract_design"
                                        @update:modelValue="form.contract_design = $event" />
                                </div>
                            </div>
                        </Accordion>
                    </div>
                </div>
            </div>

        </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="IsOpen">
        <GetLibrary :getFlag="true" :selected="selectedFiles" :singleFile="true" :closeModal="close"
            :selectedFiles="handleFiles" />
    </popupModal>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="IsOpen">
        <GetLibrary :getFlag="true" :selected="selectedFiles" :singleFile="true" :closeModal="close"
            :selectedFiles="handleFiles" />
    </popupModal>
    <Loader :isLoading="loading" :fullPage="true" />

</template>
<script setup>
import DatePicker from '@/components/Admin-components/form-components/DatePicker.vue'
import RadioButton from '@/components/Admin-components/form-components/RadioButton.vue';
import GetLibrary from '@/views/Admin/Media-section/Index.vue'
import singleCheckBox from '@/components/Admin-components/form-components/SingleCheck.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import Accordion from "@/components/Admin-components/Accordion.vue";
import { ref, onMounted } from "vue";
import ContractDesignServices from '@/services/ContractDesignServices';
import SwatchesServices from '@/services/SwatchesServices';
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";
import { defineEmits } from 'vue';
import { MaterialTreeList } from '@/helper/Apis';
import router from '@/router';
import { PublishOptions, trueFalse, withBgWithoutBg, oldNewContract, capsNOCaps } from '@/json/data';

const errors = ref({})
const mediaName = ref('select Feature Media')
const contractLogoName = ref('Select Logo')
const contractLogoids = ref([])
const selectedFiles = ref([])
const iswithBg = ref(false)
const contract_logo = ref([])
const MaterialTreeListData = ref([]);
const IsOpen = ref(false)
const loading = ref(false)
const form = ref({ status: '0', simple_fields: '0', contract_home_page_slide: false, });


const emit = defineEmits(['handleApi']);

const close = () => {
    IsOpen.value = false;
}
const handleFeatureFiles = (data) => {
  close();
   const object = handleFiles(data);
   console.log(object)
   featurImage.value.mediaName = object.mediaName;
   form.value.feature_image = object.media_ids
   console.log(object)
}

const handleFiles = (data) => {
    close();
    selectedFiles.value = data
    const media_titles = data.map(item => item.title);
    mediaName.value = media_titles.join(', ');
    const media_ids = data.map(item => item.id);
    form.value.featured_image = media_ids;
    console.log('in form ', selectedFiles.value)
}

const handleSubmit = () => {
    if (validateForm()) {
        if (props.id !== null)
            handleEditSwatches({ ...form.value })
        else
            handleAddSwatches({ ...form.value })
    }
}

const validateForm = () => {
    let isValid = true
    errors.value = {}
    if (!form.value.title) {
        errors.value.title = 'Title is required'
        isValid = false
    }
    return isValid
}
const props = defineProps({
    id: {
        type: String,
        default: null,
    }
});
const options = [{ name: 'Inherit from parent (No parent found)', value: 0 },
{ name: 'Contract Logo', value: 1 }]

const id = ref(props.id || null)

const handleContractType = (checkedItems) => {
    form.value = { ...form.value, contract_type: checkedItems }
};
const handleContractLocation = (checkedItems) => {
    form.value = { ...form.value, contract_location: checkedItems }
};

// api calls 
const handleGetSwatches = async (payload) => {
    console.log(payload);
    try {
        await SwatchesServices.getSwatches(payload)
            .then(res => {
                if (res.status === 200 && res.data.success === true) {
                    if (res.data.data && res.data.data.length > 0) {
                        form.value = res.data.data[0]
                    }
                }
            }).catch((res) => {
                console.log("error", res)
            });
    } catch (e) {
        console.error('Error while log in:', e);
    }
}
const handleAddSwatches = async (payload) => {
    // loading.value = true;
    try {
        await ContractDesignServices.addNewContract(payload)
            .then(res => {
                if (res && res.status === 200 && res.data.success === true) {
                    // router.push('/swatches')
                    loading.value = false;
                }
            })
    } catch (e) {
        loading.value = false;
        console.error('Error while log in:', e);
    }
}
const handleEditSwatches = async (payload) => {
    loading.value = true;
    try {
        await SwatchesServices.editSwatches(payload)
            .then(res => {
                if (res && res.status === 200 && res.data.success === true) {
                    loading.value = false;
                    router.push('/swatches')
                }
            })
    } catch (e) {
        loading.value = false;
        console.error('Error while log in:', e);
    }
}

const materialTree = async () => {
    MaterialTreeListData.value = await MaterialTreeList()
    console.log("object", MaterialTreeListData)
}
onMounted(() => {
    console.log("id vlaiue ", props.id)
    if (id.value !== undefined && id.value !== null && id.value !== '') {
        handleGetSwatches({ id: id.value });
    }
    materialTree();
}
);
</script>
<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>