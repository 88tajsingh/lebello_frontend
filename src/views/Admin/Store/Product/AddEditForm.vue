<template>{{ form }}
    <DefaultCard :cardTitle="form.id ? `Edit Store Product` : `Add New Store Product`">
        <DomainComponent :domains="items" @customChange="(id) => form.domain_id = id"></DomainComponent>
        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <Accordion :open="true" header="Title">
                        <div class="px-6">
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title *"
                                placeholder="Add title" v-model="form.title" :errMessage="errors.title"
                                :errors="errors" />
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug "
                                placeholder="Add title" v-model="form.slug" :errMessage="errors.slug" />
                        </div>
                    </Accordion>
                    <div class="mt-3">
                        <Accordion :open="true" header="Description">
                            <div class="px-5     pt-2">
                                <TinyMCE v-model="form.description" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="New Store Options">
                            <div class="px-3">
                                <div class="col-span-2 w-full border  border-gray rounded-lg">
                                    <div class="mt-2 ml-3  ">
                                        <input-label for="slides" value="Slider " />
                                        <div class="text-gray-4 text-[13px]">Minimum Size 1600 x 700px</div>
                                        <div class=" flex flex-wrap">
                                            <div class="relative p-1" v-for="(slide, index) in slider.images"
                                                :key="`slide-${index}`">
                                                <img class=" border border-gray-4 m-1 p-2 h-[168px] w-[156px]"
                                                    :src="$filePath(slide.file_url)">
                                                <div @click="() => handleRemoveImage(slide)"
                                                    class=" absolute top-2 right-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                        class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <button @click="() => isOpenSlider = true" type="button"
                                            class="flex px-3 py-1 col-span-2 mt-5  mb-4 ml-4  justify-center rounded bg-primary  font-medium text-gray hover:bg-opacity-90">
                                            Gallery
                                        </button>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Store Options">
                            <div class="px-6">
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Product Sub Title"
                                        placeholder="" v-model="form.product_sub_title" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Description Title"
                                        placeholder="" v-model="form.product_description" />
                                </div>
                                <div class="mt-5  ">
                                    <singleCheckBox id="FeaturedOption" label="Has Predefind Values"
                                        v-model:modelValue="form.product_predefined_values">
                                    </singleCheckBox>
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Quick Ship"
                                        placeholder="" v-model="form.product_quick_ship" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full"
                                        label="Custom (Custom Order)" placeholder=""
                                        v-model="form.product_custom_order" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Product Title"
                                        placeholder="" v-model="form.product_title" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Sub Title"
                                        placeholder="" v-model="form.sub_title" />
                                </div>
                                <div class="mt-5  ">
                                    <singleCheckBox id="FeaturedOption" label="Featured"
                                        v-model:modelValue="form.featured">
                                    </singleCheckBox>
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Featured Title"
                                        placeholder="" v-model="form.featured_title" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Featured Sub Title"
                                        placeholder="" v-model="form.featured_sub_title" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Product SKU
                                    " placeholder="" v-model="form.product_sku" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Advertise Price"
                                        placeholder="" v-model="form.advertise_price" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Shipping Price
                                    " placeholder="" v-model="form.shipping_price" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Shipping Title
                                    " placeholder="" v-model="form.shipping_title" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 w-full" label="Shipping Description"
                                        :isTextarea="true" :rows="3" v-model="form.shipping_description" />
                                </div>
                                <div class="border border-stroke rounded-lg px-4 mt-4 mr-2">
                                    <div class="mt-4"> <span>Product Option </span> </div>
                                    <div v-for="(item, index) in form.product_option" :key="index">
                                        <hr class=" text-rose-400" />
                                        <div class="mt-2">
                                            <TextInput type="text" class="block mr-2 w-full" label="Sku Number"
                                                v-model="item.sku_number" />
                                        </div>

                                        <div class="mt-2">
                                            <TextInput type="text" class="block mr-2 w-full" label="Shipping Price"
                                                v-model="item.shipping_price" />
                                        </div>
                                        <div class="mt-2">
                                            <TextInput type="text" class="block mr-2 w-full" label="Name"
                                                v-model="item.name" />
                                        </div>
                                        <div class="mt-2">
                                            <TextInput type="text" class="block mr-2 w-full" label="Sub Title"
                                                v-model="item.sub_title" />
                                        </div>
                                        <div class="mt-2">
                                            <TextInput type="text" class="block mr-2 w-full" label="Price"
                                                v-model="item.price" />
                                        </div>
                                        <div>
                                            <InputLabel for=" Option_type" value=" Option type" />
                                            <Select :options="productOptionsType" showfield="name" class="w-full"
                                                valueField="value" label="Select an option"
                                                v-model="item.productSelectedOptions" />
                                        </div>

                                        <div v-if="item.productSelectedOptions == 'material'"
                                            class='mt-3 border border-stroke p-4 rounded-lg'>
                                            <InputLabel for=" Material_Option" value=" Material Option" />
                                            <Checkbox :nexted=true :checkedData='item.project_categories'
                                                :dropdown="true" valueField="id" showField="name"
                                                :data="MaterialTreeListData"
                                                @checked-items="(checked) => item.material = checked" />
                                        </div>
                                        <div v-else-if="item.productSelectedOptions == 'custome'"
                                            class='mt-3 border border-stroke p-4 rounded-lg'>
                                            <TextInput type="text" class="block mr-2 w-full" label="New Custom"
                                                :isTextarea="true" :rows="3" v-model="item.new_custom" />
                                        </div>
                                        <div v-else-if="item.productSelectedOptions == 'custome with price'"
                                            class='mt-3 border border-stroke p-4 rounded-lg'>
                                            <TextInput type="text" class="block mr-2 w-full" label="Custome With Price"
                                                :isTextarea="true" :rows="3" v-model="item.custome_with_price" />
                                        </div>
                                        <div v-else-if="item.productSelectedOptions == 'cushion'"
                                            class='mt-3 border border-stroke p-4 rounded-lg'>
                                            <TextInput type="text" class="block mr-2 w-full" label="New Cushion"
                                                :isTextarea="true" :rows="3" v-model="item.cushion" />
                                        </div>


                                        <div class="mt-5  ">
                                            <singleCheckBox id="checked"
                                                label="If checked, this variation will be exported while exporting products."
                                                v-model:modelValue="item.export_field"></singleCheckBox>
                                        </div>
                                        <button @click="removeFormItem(index)" type="button"
                                            class="flex px-3 py-1 col-span-2 mt-5  mb-4 ml-4  justify-center rounded bg-danger  font-medium text-gray hover:bg-opacity-90">
                                            Remove
                                        </button>

                                        <hr v-if="index < formItems.length - 1" class="my-4" />

                                    </div>
                                    <button @click="addFormItem" type="button"
                                        class="flex px-3 py-1 col-span-2 mt-5  mb-4 ml-4  justify-center rounded bg-primary  font-medium text-gray hover:bg-opacity-90">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3">
                        <Accordion :open="true" header="Simple Fields">
                            <div class="px-5     pt-2">
                                <Select :options="productOptionsType" showfield="name" class="w-full" valueField="value"
                                    label="Select an option" v-model="form.simple_field" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3">
                        <Accordion :open="true" header="Material Swatches">
                            <div class="bg-white px-4">
                                <div class="flex ">
                                    <div class="w-1/2 px-1">SWATCHES</div>
                                    <div class="w-1/2 px-1">MATERIALS</div>
                                </div>
      <div class="flex h-[200px] overflow-y-auto">
        <!-- Left Panel -->
        <div class="w-1/2 border-r ">
          <ul>
            <li v-for="item in materialSwatchesList" :key="item.id" class="flex text-[#2272B1] justify-between items-center p-2 cursor-pointer hover:bg-[#eaf2fa]"
              :class="{'bg-gray opacity-80': isSelected(item)}" @click="toggleSwatchSelection(item)">
              <span  class="text-[#2272B1]">{{ item.title }}</span>
              <span class="text-[10px] text-Black666">SWATCHES <span></span> </span>
            </li>
          </ul>
        </div>
        <!-- Right Panel -->
        <div class="w-1/2 pl-4">
          <div v-if="selectedSwatches.length">
            <div v-for="item in selectedSwatches" :key="item.id" class="mb-4">
                <div class="flex justify-between">
                    <h4 class="text-[#2272B1]">{{ item.title }}</h4>
                    <span class="text-[12px]"> SWATACHES</span>
                </div>
              <ul>
                <li v-for="material in item.materials_data" :key="material.id" class="flex items-center mb-2">
                  <div class="flex w-full justify-between">
                    <span>
                        <input 
                        type="checkbox" 
                        id="material-{{ material.id }}" 
                        class="mr-2"
                        @change="handleCheckboxChange(material.id, $event)">
                        <label :for="'material-'+ material.id" class="text-[#2272B1]">{{ material.name }}</label>
                    </span>
                    <span class="text-[10px]">MATERIAL</span>
                    </div>
                </li>
              </ul>
            </div>
          </div>
          <div v-else>
            <p class="text-gray-500">No swatches selected</p>
          </div>
        </div>
      </div>
    </div>

                        </Accordion>
                    </div>
                    <div class="mt-3">
                        <Accordion :open="true" header="Product Label">
                            <div class="px-5     pt-2">
                                <TextInput type="text" class="block mr-2 w-full" label="Text Label"
                                    v-model="form.product_label" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3">
                        <Accordion :open="true" header="Downloadable Files">
                            <div class="col-span-2  w-full border border-gray rounded-lg">
                                <div class="mt-2 ml-3  ">
                                    <div class=" flex flex-wrap">
                                        <div class="relative p-1" v-for="(slide, index) in Downloadable.images"
                                            :key="`slide-${index}`">
                                            <img class=" border border-gray-4 m-1 p-2 h-[168px] w-[156px]"
                                                :src="$filePath(slide.file_url)">
                                            <div @click="() => handleRemoveDownloadable(slide)"
                                                class=" absolute top-2 right-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <button @click="() => Downloadable.isOpen = true" type="button"
                                        class="flex px-3 py-1 col-span-2 mt-5  mb-4 ml-4  justify-center rounded bg-primary  font-medium text-gray hover:bg-opacity-90">
                                        Gallery
                                    </button>
                                </div>
                                <div>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3">
                        <Accordion :open="true" header="Seo Options">

                            <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                <TextInput id="seo_title" type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.seo_title" placeholder="Title Tag" label="Title Tag" />
                                <span>Custom title tag.</span>
                            </div>
                            <div class="px-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_description" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.seo_description"
                                    placeholder="Meta Description" label="Meta Description" />
                                <span>Most search engines use a maximum of 160 chars for the description.
                                </span>
                            </div>
                            <div class="mx-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_keywords" :isTextarea="true" :='4' type="text"
                                    class="block w-[180px] mr-2 " v-model="form.seo_keywords"
                                    placeholder="Meta Keywords" label="Meta Keywords" />
                                <span>Seperate each term with comma.</span>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3">
                        <Accordion :open="true" header="Product Specs">
                            <div v-for="(item, index) in form.product_specs" :key="index">
                                <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                    <TextInput id="seo_title" type="text" class="block mr-2 h-[33px]"
                                        v-model="item.seo_title" placeholder="" label="Specs Name" />
                                </div>
                                <div class="mt-3 px-7">
                                    <InputLabel for=" Specs_Description" value="Specs Description" />
                                    <TinyMCE v-model="item.description" />
                                </div>
                                <div class="mt-3">
                                    <div class="px-6  h-auto ">
                                        <div class="py-2 rounded-lg px-2 border border-stroke"
                                            @click="() => { productsSpecsIndex = index; Specs_Img.isOpen = true; }"> {{
                                                Specs_Img.mediaName }}</div>
                                        <div class=" mt-3 flex overflow-x-auto">
                                            <img :src="$filePath(Specs_Img.images[index]?.file_url)"
                                                class="inline-block w-auto h-34 mr-4" alt="image">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button @click="product_specs" type="button"
                                class="flex px-3 py-1 col-span-2 mt-5  mb-4 ml-4  justify-center rounded bg-primary  font-medium text-gray hover:bg-opacity-90">
                                Add
                            </button>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="category">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :checkedData='form.project_categories' :dropdown="true"
                                    valueField="id" showField="name" :data="projectCategories"
                                    @checked-items="(checked) => form.project_categories = checked" />
                            </div>
                        </Accordion>
                    </div>

                </div>
                <!-- right side  -->
                <div class="col-span-4">
                    <Accordion header="Publish" open="false">
                        <div class="px-1 py-3">
                            <div class="px-4">
                                <div class="flex flex-col ">
                                    <InputLabel for="status" value="Status" />
                                    <Select :options="productOptionsType" showfield="name" class="w-full"
                                        valueField="value" label="Select " v-model="form.status" />
                                </div>
                                <div class="col-span-1 w-full">
                                    <div class="flex flex-col ">
                                        <InputLabel for="Visibility" value="Visibility" />
                                        <Select :options="PublishOptions" showfield="label" class="w-full"
                                            valueField="value" label="Select " v-model="form.visibility" />
                                    </div>
                                    <div v-if="form.visibility === 'Password protected'" class="mt-2">
                                        <TextInput type="password" label="Password" class="block mr-2 w-full"
                                            v-model="form.password" placeholder="Password" />
                                    </div>
                                </div>
                                <div class="col-span-1 w-full">
                                    <DatePicker v-model="form.publish" label="Publish Date" format="yyyy-mm-dd hh:mm:ss"
                                        dayjsFormat='YYYY-MM-DD HH:mm:ss' :use12-hour="false" />
                                </div>
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
                        <Accordion :open="true" header="Tags">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :checkedData='form.tags' :dropdown="true" valueField="id"
                                    showField="name" :data="TagsData"
                                    @checked-items="(checked) => form.tags = checked" />
                            </div>
                        </Accordion>
                        <Accordion :open="true" header="Store Categories">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :checkedData='form.store_categories' :dropdown="true"
                                    valueField="id" showField="name" :data="storeCategoryTree"
                                    @checked-items="(checked) => form.store_categories = checked" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-4 ">
                        <Accordion :open="true" header="Featured image">
                            <div class="px-6  h-auto ">
                                <div class="py-2 rounded-lg px-2 border border-stroke"
                                    @click="() => featureData.isOpen = true"> {{
                                        featureData.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in featureData.images" :key="file" :src="$filePath(file)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file.alternative_text || 'image'">
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-4 ">
                        <Accordion :open="true" header="Gallery">
                            <div class="px-6  h-auto ">
                                <div class="py-2 rounded-lg px-2 border border-stroke"
                                    @click="() => galleryData.isOpen = true"> {{
                                        galleryData.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in galleryData.images" :key="file" :src="$filePath(file)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file.alternative_text || 'image'">
                                </div>
                            </div>
                        </Accordion>
                    </div>
                </div>
            </div>

        </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="isOpenSlider">
        <GetLibrary btnName="Select files" :getFlag="true" :selected="slider.images" :singleFile="false"
            :closeModal="isSliderClose" :selectedFiles="handleSlider" />
    </popupModal>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="Downloadable.isOpen">
        <GetLibrary btnName="Select files" :getFlag="true" :selected="Downloadable.images" :singleFile="false"
            :closeModal="isDownloadableClose" :selectedFiles="handleDownloadable" />
    </popupModal>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="Specs_Img.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="Specs_Img.images" :singleFile="true"
            :closeModal="() => { Specs_Img.isOpen = false }" :selectedFiles="handleSpecs_Img" />
    </popupModal>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="featureData.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="featureData.images" :singleFile="true"
            :closeModal="() => { featureData.isOpen = false }" :selectedFiles="handleFeatureFiles" />
    </popupModal>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="galleryData.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="galleryData.images" :singleFile="true"
            :closeModal="() => { galleryData.isOpen = false }" :selectedFiles="handleGalleryFiles" />
    </popupModal>


    <Loader :isLoading="loading" :fullPage="true" />
</template>
<script setup>
import router from '@/router';
import { defineEmits } from 'vue';
import { ref, onMounted, watch,computed } from "vue";
import { showToast, handleFiles } from '@/helper/functions'
import { MaterialTreeList, getStoreCategoryTree } from '@/helper/Apis';
import { PublishOptions, productOptionsType, swatches } from '@/json/data';
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";
import Accordion from "@/components/Admin-components/Accordion.vue";
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import DatePicker from '@/components/Admin-components/form-components/DatePicker.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue';
import singleCheckBox from '@/components/Admin-components/form-components/SingleCheck.vue'
import { useStore } from 'vuex';
import CommonServices from '@/services/CommonServices';
import StoreServices from '@/services/StoreServices';

const store = useStore();

const emit = defineEmits(['handleApi']);
const errors = ref({})
const MaterialTreeListData = ref([]);
const storeCategoryTree = ref([]);
const productsSpecsIndex = ref(0);

const projectCategories = ref([]);
const loading = ref(false)
const TagsData = ref([]);
const materialSwatchesList = ref([]);
const form = ref(store.getters.editData || { status: '', featured: false, product_option: [], product_specs: [] });
const SliderSelects = ref([]);
const isOpenSlider = ref(false);
const PreviousDomain = ref(null)

const formItems = ref([
    {
        sku_number: '',
        shipping_price: '',
        name: '',
        sub_title: '',
        price: '',
        productSelectedOptions: 'material',
        material: '',
        project_categories: [],
        export_field: false
    }
]);


// images variables 
const Specs_Img = ref({
    isOpen: false,
    mediaName: 'Image',
    images: []
})
const featureData = ref({
    isOpen: false,
    mediaName: 'Image',
    images: []
})
const galleryData = ref({
    isOpen: false,
    mediaName: 'Image',
    images: []
})

const slider = ref({
    isOpen: false,
    mediaName: 'Slider',
    images: []
})

const Downloadable = ref({
    isOpen: false,
    mediaName: 'Downloadable',
    images: []
})


// images functions 
const handleSpecs_Img = (data) => {
    const object = handleFiles(data);
    Specs_Img.value.isOpen = false
    Specs_Img.value.images = data;
    Specs_Img.value.mediaName = object.mediaName;
    console.log(productsSpecsIndex.value)
    form.value.product_specs[productsSpecsIndex.value].image = object.media_ids[0]
}
const handleFeatureFiles = (data) => {
    const object = handleFiles(data);
    featureData.value.isOpen = false
    featureData.value.images = data;
    featureData.value.mediaName = object.mediaName;
    console.log(productsSpecsIndex.value)
    form.value.featured_image = object.media_ids[0]
}
const handleGalleryFiles = (data) => {
    const object = handleFiles(data);
    galleryData.value.isOpen = false
    galleryData.value.images = data;
    galleryData.value.mediaName = object.mediaName;
    console.log(productsSpecsIndex.value)
    form.value.gallery = object.media_ids
}



// slider images 
const handleSlider = (data) => {
    const object = handleFiles(data);
    isSliderClose();
    slider.value.images = data;
    slider.value.mediaName = object.mediaName;
    form.value.slider = object.media_ids
}

// store  slider 
const isSliderClose = () => {
    isOpenSlider.value = false;
}
// remove slider 
const handleRemoveImage = (slide) => {
    const index = slider.value.images.findIndex(item => item.id === slide.id);
    if (index !== -1) {
        slider.value.images.splice(index, 1);
        form.value.slider = slider.value.images.map(item => item.id)
    }
}


// images  Downloadable
const handleDownloadable = (data) => {
    const object = handleFiles(data);
    isDownloadableClose();
    Downloadable.value.images = data;
    Downloadable.value.mediaName = object.mediaName;
    form.value.downloadable_files = object.media_ids
}

//   Downloadable close 
const isDownloadableClose = () => {
    Downloadable.value.isOpen = false;
}
// Downloadable REMOVE
const handleRemoveDownloadable = (slide) => {
    const index = Downloadable.value.images.findIndex(item => item.id === slide.id);
    if (index !== -1) {
        Downloadable.value.images.splice(index, 1);
        form.value.downloadable_files = Downloadable.value.images.map(item => item.id)
    }
}

// swathces materials list functions 
const selectedSwatches = ref([]);
const selectedSwatchIds = ref([]);
const selectedMaterialIds = ref([]);

const toggleSwatchSelection = (item) => {
  const index = selectedSwatches.value.findIndex(swatch => swatch.id === item.id);
  
  // If the swatch is not in the selection, add it
  if (index === -1) {
    selectedSwatches.value.push(item);
    selectedSwatchIds.value.push(item.master_swatch_id);
  }
//    else {
//     // Remove the swatch only if there is more than one swatch selected
//     if (selectedSwatches.value.length > 1) {
//       selectedSwatches.value.splice(index, 1);
//       const swatchIdIndex = selectedSwatchIds.value.indexOf(item.master_swatch_id);
//       if (swatchIdIndex !== -1) {
//         selectedSwatchIds.value.splice(swatchIdIndex, 1);
//       }
      
//       // Remove materials associated with this swatch
//       item.materials_data.forEach(material => {
//         const materialIndex = selectedMaterialIds.value.indexOf(material.id);
//         if (materialIndex !== -1) {
//           selectedMaterialIds.value.splice(materialIndex, 1);
//         }
//       });
//     }
//   }
  
  console.log('Selected Swatches:', selectedSwatches.value);
  console.log('Selected Swatch IDs:', selectedSwatchIds.value);
}

const isSelected = (item) => {
  return selectedSwatches.value.some(selected => selected.id === item.id);
};

const handleCheckboxChange = (materialId, event) => {
  if (event.target.checked) {
    selectedMaterialIds.value.push(materialId);
  } else {
    const index = selectedMaterialIds.value.indexOf(materialId);
    if (index !== -1) {
      selectedMaterialIds.value.splice(index, 1);
    }
  }
  console.log('Selected Materials:', selectedMaterialIds.value);
};
// end swatch material functions 




function addFormItem() {
    form.value.product_option.push({
        sku_number: '',
        shipping_price: '',
        name: '',
        sub_title: '',
        price: '',
        status: null,
        project_categories: [],
        export_field: false
    });
}

function removeFormItem(index) {
    form.value.product_option.splice(index, 1);
}
function product_specs() {
    form.value.product_specs.push({
        seo_title: '',
        description: '',
        image: '',
    });
}

function removeproduct_specs(index) {
    form.value.product_option.splice(index, 1);
}



const handleSubmit = () => {
    delete form.value?.domain;
    // material_swatches
    if (validateForm()) {
        if (store.getters.editData === null) {
            handleAddStoreProduct({ ...form.value,
                material_swatches:[{material:selectedMaterialIds.value},
                {swatches:selectedSwatchIds.value}
                ] })
        }   
        else {
            if (form.value.domain_id !== PreviousDomain.value) {
                delete form.value.id;
            }
            const { deleted_at, created_at, updated_at, ...refinedPayload } = form.value;
            handleEditStoreProduct({ ...refinedPayload })
        }
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

const handleGetTags = async (payload) => {
    //   getLoading.value = true;
    try {
        const res = await CommonServices.getTags(payload);
        if (res.status === 200 && res.data.success) {
            TagsData.value = res.data.data;
        }
    } catch (e) {
        console.error('Error while getTags:', e);
    } finally {
        // getLoading.value = false;
    }
};
const handleGetSwatchesMaterial = async (payload) => {
    //   getLoading.value = true;
    try {
        const res = await CommonServices.getSwatchesMaterialList(payload);
        if (res.status === 200 && res.data.success) {
            materialSwatchesList.value = res.data.data;
        }
    } catch (e) {
        console.error('Error while getTags:', e);
    } finally {
        // getLoading.value = false;
    }
};

const handleAddStoreProduct = async (payload) => {
    try {
        const res = await StoreServices.addStoreProduct(payload);
        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            router.push('/store-product');
        }
    } catch (e) {
        console.error('Error while adding store Product:', e);
    } finally {
        loading.value = false;
    }
}

const handleEditStoreProduct = async (payload) => {
    loading.value = true;
    try {
        const res = await StoreServices.editStoreProduct(payload);
        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            router.push('/store-product');
        }
    } catch (e) {
        console.error('Error while editing Store product:', e);
    } finally {
        loading.value = false;
    }
}

const materialTree = async (payload) => {
    MaterialTreeListData.value = await MaterialTreeList(payload)
}

const handleStoreCategoryTree = async (payload) => {
    storeCategoryTree.value = await getStoreCategoryTree(payload)
}
onMounted(() => {
    PreviousDomain.value = store.getters.getDomain.id;
    SliderSelects.value = store.getters.editData?.slider_urls
    handleGetTags({ domain_id: store.getters.getDomain.id })
    materialTree({ domain_id: store.getters.getDomain.id })
    handleStoreCategoryTree({ domain_id: store.getters.getDomain.id })
    handleGetSwatchesMaterial({ domain_id:store.getters.getDomain.id })
})



</script>
<style scoped>
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