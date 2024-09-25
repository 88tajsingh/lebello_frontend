<template>
    <DefaultCard :cardTitle="form.id ? `Edit Store Product` : `Add New Store Product`">
        <DomainComponent @customChange="(id) => form.domain_id = id" :deleteService="StoreServices.deleteStoreProduct"
            masterKey="master_store_product_id" :masterDeleteService="StoreServices.masterDeleteStoreProduct"
            routeTo="store-product" />
        <template v-if="form.id" v-slot:header>
            <MasterSlugForm :form="form" @update-slug="() => fetchStoreProductData()"
                :SlugUpdateservices='StoreServices.masterStoreProductSlugUpdate'
                masteridKeyName='master_store_product_id' />
        </template>
        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <Accordion :open="true" header="Title">
                        <div class="px-6">
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title *"
                                placeholder="Add title" v-model="form.title" :errMessage="errors.title" :errors="errors"
                                :hasCheckBox="checkBoxFlag"
                                @update:checkValue="(value) => { checkedFields.title = value }" />
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug "
                                placeholder="Add title" v-model="form.slug" :errMessage="errors.slug" disabled="true" />
                        </div>
                    </Accordion>
                    <div class="mt-3">
                        <Accordion :open="true" header="Description">
                            <div class="px-5 flex pt-2">
                                <SingleCheck v-if="form.id" label="" v-model="checkedFields.description"></SingleCheck>
                                <TinyMCE v-model="form.description" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="New Store Options">
                            <div class="px-3 flex">
                                <SingleCheck v-if="form.id" label="" v-model="checkedFields.slider"></SingleCheck>
                                <div class="col-span-2 w-full border  border-gray rounded-lg">
                                    <div class="mt-2 ml-3">
                                        <input-label for="slides" value="Slider" />
                                        <div class="text-gray-4 text-[13px]">Minimum Size 1600 x 700px</div>
                                        <div class="flex flex-wrap">

                                            <div class="relative p-1" v-for="(slide, index) in imageData.slider.images"
                                                :key="`slide-${index}`">
                                                <img class="border border-gray-4 m-1 p-2 h-[168px] w-[156px]"
                                                    :src="$filePath(slide?.file_url)" alt="slide" />
                                                <div @click="() => handleRemoveImage(slide)"
                                                    class="absolute top-2 right-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                        class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <button @click="() => imageData.slider.isOpen = true" type="button"
                                            class="flex px-3 py-1 col-span-2 mt-5 mb-4 ml-4 justify-center rounded bg-primary font-medium text-gray hover:bg-opacity-90">
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
                                        placeholder="" v-model="form.product_sub_title" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.product_sub_title = value }" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Description Title"
                                        placeholder="" v-model="form.product_description" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.product_description = value }" />
                                </div>
                                <div class="mt-5  ">
                                    <singleCheckBox id="FeaturedOption" label="Has Predefind Values"
                                        v-model:modelValue="form.product_predefined_values">
                                    </singleCheckBox>
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Quick Ship"
                                        placeholder="" v-model="form.product_quick_ship" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.product_quick_ship = value }" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full"
                                        label="Custom (Custom Order)" placeholder="" v-model="form.product_custom_order"
                                        :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.product_custom_order = value }" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Product Title"
                                        placeholder="" v-model="form.product_title" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.product_title = value }" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Sub Title"
                                        placeholder="" v-model="form.sub_title" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.sub_title = value }" />
                                </div>
                                <div class="mt-5  ">
                                    <singleCheckBox id="FeaturedOption" label="Featured"
                                        v-model:modelValue="form.featured">
                                    </singleCheckBox>
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Featured Title"
                                        placeholder="" v-model="form.featured_title" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.featured_title = value }" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Featured Sub Title"
                                        placeholder="" v-model="form.featured_sub_title" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.featured_sub_title = value }" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Product SKU
                                    " placeholder="" v-model="form.product_sku" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.product_sku = value }" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Advertise Price"
                                        placeholder="" v-model="form.advertise_price" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.advertise_price = value }" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Shipping Price
                                    " placeholder="" v-model="form.shipping_price" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.shipping_price = value }" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Shipping Title
                                    " placeholder="" v-model="form.shipping_title" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.shipping_title = value }" />
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 w-full" label="Shipping Description"
                                        :isTextarea="true" :rows="3" v-model="form.shipping_description"
                                        :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.shipping_description = value }" />
                                </div>
                                <div class="border border-stroke rounded-lg px-4 mt-4 mr-2">
                                    <div class="mt-4"> <span>Product Option </span> </div>
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.product_option">
                                    </SingleCheck>
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
                                                v-model="item.option_type" />
                                        </div>

                                        <div v-if="item.option_type == 'material'"
                                            class='mt-3 border border-stroke p-4 rounded-lg'>
                                            <InputLabel for=" Material_Option" value=" Material Option" />
                                            <Checkbox :nexted=true :checkedData='item.project_categories'
                                                :dropdown="true" valueField="id" showField="name"
                                                :data="MaterialTreeListData"
                                                @checked-items="(checked) => item.option_type_data = checked" />
                                        </div>
                                        <div v-else-if="item.option_type == 'custome'"
                                            class='mt-3 border border-stroke p-4 rounded-lg'>
                                            <TextInput type="text" class="block mr-2 w-full" label="New Custom"
                                                :isTextarea="true" :rows="3" v-model="item.option_type_data" />
                                        </div>
                                        <div v-else-if="item.option_type == 'custome with price'"
                                            class='mt-3 border border-stroke p-4 rounded-lg'>
                                            <TextInput type="text" class="block mr-2 w-full" label="Custome With Price"
                                                :isTextarea="true" :rows="3" v-model="item.option_type_data" />
                                        </div>
                                        <div v-else-if="item.option_type == 'cushion'"
                                            class='mt-3 border border-stroke p-4 rounded-lg'>
                                            <TextInput type="text" class="block mr-2 w-full" label="New Cushion"
                                                :isTextarea="true" :rows="3" v-model="item.option_type_data" />
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

                                        <!-- <hr v-if="index <div formItems.length - 1" class="my-4" /> -->

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
                                    label="Select an option" v-model="form.simple_field" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.simple_field = value }" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3">
                        <Accordion :open="true" header="Material Swatches">
                            <div class="bg-white border-2   px-4">
                                <div>
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.material_swatches">
                                    </SingleCheck>
                                </div>
                                <div>
                                    <div class="flex ">
                                        <div class="w-1/2 px-1">SWATCHES</div>
                                        <div class="w-1/2 px-1">MATERIALS</div>
                                    </div>
                                    <div class="flex h-[200px] overflow-y-auto">
                                        <!-- Left Panel -->
                                        <div class="w-1/2 border-r ">
                                            <ul>
                                                <li v-for="item in materialSwatchesList" :key="item.id"
                                                    class="flex text-[#2272B1] justify-between items-center p-2 cursor-pointer hover:bg-[#eaf2fa]"
                                                    :class="{ 'bg-gray opacity-80': isSelected(item) }"
                                                    @click="toggleSwatchSelection(item)">
                                                    <span class="text-[#2272B1]">{{ item.title }}</span>
                                                    <span class="text-[10px] text-Black666">SWATCHES <span></span>
                                                    </span>
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
                                                        <li v-for="material in item.materials_data" :key="material.id"
                                                            class="flex items-center mb-2">
                                                            <div class="flex w-full justify-between">
                                                                <span>
                                                                    <input type="checkbox"
                                                                        id="material-{{ material.id }}" class="mr-2"
                                                                        @change="handleCheckboxChange(material.id, $event)">
                                                                    <label :for="'material-' + material.id"
                                                                        class="text-[#2272B1]">{{ material.name
                                                                        }}</label>
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
                            </div>

                        </Accordion>
                    </div>
                    <div class="mt-3">
                        <Accordion :open="true" header="Product Label">
                            <div class="px-5     pt-2">
                                <TextInput type="text" class="block mr-2 w-full" label="Text Label"
                                    v-model="form.product_label" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.product_label = value }" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3">
                        <Accordion :open="true" header="Downloadable Files">
                            <div class="flex pl-2">
                                <SingleCheck v-if="form.id" label="" v-model="checkedFields.downloadable_files">
                                </SingleCheck>
                                <div class="col-span-2 w-full border border-gray rounded-lg">
                                    <div class="mt-2 ml-3">
                                        <div class="flex flex-wrap">
                                            <div class="relative p-1"
                                                v-for="(file, index) in imageData.downloadable_files.images"
                                                :key="`file-${index}`">
                                                <img class="border border-gray-4 m-1 p-2 h-[168px] w-[156px]"
                                                    :src="$filePath(file?.file_url)" alt="" />
                                                <div @click="() => handleRemoveDownloadable(file)"
                                                    class="absolute top-2 right-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                        class="size-6">
                                                        <path stroake-linecap="round" stroke-linejoin="round"
                                                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <button @click="() => imageData.downloadable_files.isOpen = true" type="button"
                                            class="flex px-3 py-1 col-span-2 mt-5 mb-4 ml-4 justify-center rounded bg-primary font-medium text-gray hover:bg-opacity-90">
                                            Gallery
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </Accordion>

                    </div>
                    <div class="mt-3">
                        <Accordion :open="true" header="Seo Options">

                            <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                <TextInput id="seo_title" type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.seo_title" placeholder="Title Tag" label="Title Tag"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.seo_title = value }" />
                                <span>Custom title tag.</span>
                            </div>
                            <div class="px-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_description" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.seo_description"
                                    placeholder="Meta Description" label="Meta Description" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.seo_description = value }" />
                                <span>Most search engines use a maximum of 160 chars for the description.
                                </span>
                            </div>
                            <div class="mx-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_keywords" :isTextarea="true" :='4' type="text"
                                    class="block w-[180px] mr-2 " v-model="form.seo_keywords"
                                    placeholder="Meta Keywords" label="Meta Keywords" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.seo_keywords = value }" />
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
                                    <!-- :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => { checkedFields.seo_title = value }" -->
                                </div>
                                <div class="mt-3 px-7">
                                    <InputLabel for=" Specs_Description" value="Specs Description" />
                                    <div class="">
                                        <!-- <SingleCheck v-if="form.id" label="" v-model="checkedFields.description"></SingleCheck> -->
                                        <TinyMCE v-model="item.description" />
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <div class="px-6  h-auto ">
                                        <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                            @click="() => { productsSpecsIndex = index; imageData.product_specs.isOpen = true; }">
                                            {{ imageData.product_specs.mediaName }}
                                        </div>
                                        <div class="mt-3 flex overflow-x-auto">
                                            <img v-if="imageData.product_specs.images[index]"
                                                :src="$filePath(imageData.product_specs.images[index].file_url)"
                                                class="inline-block w-auto h-34 mr-4"
                                                :alt="imageData.product_specs.images[index].alternative_text || 'image'">
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
                        <Accordion :open="true" header="project category">
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
                            <div class="flex flex-col px-4">
                                <InputLabel for="status" value="Status" />
                                <Select :options="statusData" showfield="name" class="w-full" valueField="value"
                                    label="Select " v-model="form.status" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.status = value }" />
                            </div>
                        </div>
                        <div class="bg-[#f6f7f7] flex py-3">
                            <Button type="submit" bg_th_color="text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                                class=" text-sm ml-auto px-3 py-2">
                                {{ buttonText }}
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
                                <div class=" flex  w-full h-auto ">
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.media_id"></SingleCheck>
                                    <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                        @click="() => imageData.featured_image.isOpen = true">
                                        {{ imageData.featured_image.mediaName }}
                                    </div>
                                </div>
                                <div class="mt-3 flex overflow-x-auto">
                                    <img v-if="imageData.featured_image.images[0]"
                                        v-for="file in imageData.featured_image.images" :key="file?.file_url"
                                        :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                                        :alt="file?.alternative_text || ''">
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-4 ">
                        <Accordion :open="true" header="Gallery">
                            <div class="px-6 h-auto">
                                <div class=" flex  w-full h-auto ">
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.media_id"></SingleCheck>
                                    <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                        @click="() => imageData.gallery.isOpen = true">
                                        {{ imageData.gallery.mediaName }}
                                    </div>
                                </div>
                                <div class="mt-3 flex overflow-x-auto">
                                    <img v-if="imageData.gallery.images > 0" v-for="file in imageData?.gallery?.images"
                                        :key="file" :src="$filePath(file?.file_url)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file?.alternative_text || ''">
                                </div>
                            </div>
                        </Accordion>
                    </div>
                </div>
            </div>

        </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.slider.isOpen">
        <GetLibrary btnName="Select files" :getFlag="true" :selected="imageData.slider.images" :singleFile="false"
            :closeModal="() => { imageData.slider.isOpen = false }" :selectedFiles="handleSlider" />
    </popupModal>

    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.downloadable_files.isOpen">
        <GetLibrary btnName="Select files" :getFlag="true" :selected="imageData.downloadable_files.images"
            :singleFile="false" :closeModal="() => { imageData.downloadable_files.isOpen = false }"
            :selectedFiles="handleDownloadable" />
    </popupModal>

    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.product_specs.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="imageData.product_specs.images" :singleFile="true"
            :closeModal="() => { imageData.product_specs.isOpen = false }" :selectedFiles="handleSpecs_Img" />
    </popupModal>

    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.featured_image.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
            :closeModal="() => { imageData.featured_image.isOpen = false }" :selectedFiles="handleFeatureFiles" />
    </popupModal>

    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.gallery.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="imageData.gallery.images" :singleFile="true"
            :closeModal="() => { imageData.gallery.isOpen = false }" :selectedFiles="handleGalleryFiles" />
    </popupModal>

    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import Accordion from "@/components/Admin-components/Accordion.vue";
import DefaultCard from '@/components/Admin-components/DefaultCard.vue';
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue';
import singleCheckBox from '@/components/Admin-components/form-components/SingleCheck.vue';
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";
import { MaterialTreeList, getStoreCategoryTree } from '@/helper/Apis';
import { getGlobalUpdateData, handleFileUpdate, showToast } from '@/helper/functions';
import { productOptionsType, statusData } from '@/json/data';
import CommonServices from '@/services/CommonServices';
import StoreServices from '@/services/StoreServices';
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue';
import _ from 'lodash';
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from 'vuex';

//Store and router
const store = useStore();
const router = useRouter();

// Reactive references
const errors = ref({});
const MaterialTreeListData = ref([]);
const storeCategoryTree = ref([]);
const productsSpecsIndex = ref(0);

const projectCategories = ref([]);
const loading = ref(false);
const TagsData = ref([]);
const materialSwatchesList = ref([]);
const form = ref(store.getters.editData ||
    { status: 1, featured: false, product_option: [], product_specs: [] });
const checkedFields = ref({})
const checkBoxFlag = ref(Boolean(form.value.id))

const formItems = ref(
    {
        sku_number: '',
        shipping_price: '',
        name: '',
        sub_title: '',
        price: '',
        option_type: 'material',
        material: '',
        project_categories: [],
        export_field: false
    }
);

// Function to add a new form item
function addFormItem() {
    form.value.product_option.push(formItems.value);
}

// Object for handling different types of images
const imageData = ref({
    product_specs: { isOpen: false, mediaName: 'Image', images: [] },
    featured_image: { isOpen: false, mediaName: 'Image', images: [] },
    gallery: { isOpen: false, mediaName: 'Image', images: [] },
    slider: { isOpen: false, mediaName: 'Slider', images: [] },
    downloadable_files: { isOpen: false, mediaName: 'Downloadable', images: [] }
});

// Common handler for image updates
const handleSpecs_Img = (data) => handleFileUpdate('product_specs', data, imageData, form, false);
const handleFeatureFiles = (data) => handleFileUpdate('featured_image', data, imageData, form, false);
const handleGalleryFiles = (data) => handleFileUpdate('gallery', data, imageData, form, true);
const handleSlider = (data) => handleFileUpdate('slider', data, imageData, form, true);
const handleDownloadable = (data) => handleFileUpdate('downloadable_files', data, imageData, form, true);

// Function to remove a specific image from the slider
const handleRemoveImage = (slide) => {
    const index = imageData.value.slider.images.findIndex(item => item.id === slide.id);
    if (index !== -1) {
        imageData.value.slider.images.splice(index, 1);
        form.value.slider = imageData.value.slider.images.map(item => item.id);
    }
};

// Function to remove a specific downloadable file
const handleRemoveDownloadable = (slide) => {
    const index = imageData.value.downloadable_files.images.findIndex(item => item.id === slide.id);
    if (index !== -1) {
        imageData.value.downloadable_files.images.splice(index, 1);
        form.value.downloadable_files = imageData.value.downloadable_files.images.map(item => item.id);
    }
};

// Swatches and materials functions
const selectedSwatches = ref([]);
const selectedSwatchIds = ref([]);
const selectedMaterialIds = ref([]);

// Function to toggle swatch selection
const toggleSwatchSelection = (item) => {
    const isSelected = selectedSwatches.value.some(swatch => swatch.id === item.id);
    if (!isSelected) {
        selectedSwatches.value.push(item);
        selectedSwatchIds.value.push(item.master_swatch_id);
    }
};

// Function to check if a swatch is selected
const isSelected = (item) => selectedSwatches.value.some(swatch => swatch.id === item.id);

// Function to handle material checkbox changes
const handleCheckboxChange = (materialId, event) => {
    const { checked } = event.target;
    if (checked) {
        selectedMaterialIds.value.push(materialId);
    } else {
        selectedMaterialIds.value = selectedMaterialIds.value.filter(id => id !== materialId);
    }
    console.log('Selected Materials:', selectedMaterialIds.value);
};

// Function to remove a form item at a specific index
function removeFormItem(index) {
    form.value.product_option.splice(index, 1);
}

// Function to add a new product specification
function product_specs() {
    form.value.product_specs.push({
        seo_title: '',
        description: '',
        image: '',
    });
}

// Function to remove a product specification at a specific index
function removeproduct_specs(index) {
    form.value.product_specs.splice(index, 1);
}

// Function to validate form data
const validateForm = () => {
    let isValid = true;
    errors.value = {};
    if (!form.value.title) {
        errors.value.title = 'Title is required';
        isValid = false;
    }
    return isValid;
};

// Function to handle form submission
const handleSubmit = async () => {
    if (!validateForm()) return
    const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)
    loading.value = true;
    try {
        // Prepare payload by excluding unwanted fields
        const { deleted_at, slug, domains_data, default_domain, created_at, featured_image_data, downlaodable_urls, gallery_data, slider_data, downloadable_urls, updated_at, ...payload } = form.value;
        if (!form.value?.domains_data?.includes(form.value.domain_id)) {
            delete payload.id;
        }

        payload.material_swatches = [
            { material: selectedMaterialIds.value },
            { swatches: selectedSwatchIds.value }
        ];

        const action = store.getters.editData ? StoreServices.editStoreProduct : StoreServices.addStoreProduct;
        const { status, data } = await action(payload);

        if (status === 200 && data.success) {
            if (hasCheckedFields) {
                handleGlobalUpdate();
            }
            else {
                showToast(data.message, 'success');
                store.dispatch('clearEditData');
                router.push('/store-product');
            }

        } else if (status === 400 || status === 403) {
            showToast(data.message, 'error');
        }
    } catch (error) {
        showToast('Something went wrong', 'error');
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} store product:`, error);
    } finally {
        loading.value = false;
    }

};

// Global Update Handler
const handleGlobalUpdate = async () => {
    const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value)
    if (_.isEmpty(globalUpdate)) return

    const payload = {
        master_store_product_id: form.value.master_store_product_id,
        global_keys: globalUpdate
    }

    try {
        const { status, data } = await StoreServices.globalStoreProductUpdate(payload)
        status === 200 && data.success ? showToast(data.message, 'success') : showToast(data.message, 'error')
        if (status === 200 && data.success) router.push('/store-product')
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error)
    } finally {
        loading.value = false
    }
}


// Fetch Perticular Domain Data
const fetchStoreProductData = async () => {
    loading.value = true
    const payload = { master_store_product_id: form.value.master_store_product_id, domain_id: form.value.domain_id }
    try {
        const { status, data } = await StoreServices.getStoreProduct(payload)
        if (status === 200 && data.success) {
            const dataValue = data.data[0]
            store.dispatch('setEdit', dataValue)
            Object.assign(form.value, dataValue)
        }
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error('Error while fetching data:', error)
    }
    finally {
        loading.value = false;
    }
}

// Function to fetch all necessary data
const handleFetchAllData = async (payload) => {
    try {
        await Promise.all([
            CommonServices.getTags(payload).then(res => {
                if (res.status === 200 && res.data.success) {
                    TagsData.value = res.data.data;
                }
            }).catch(e => console.error('Error while getTags:', e)),

            CommonServices.getSwatchesMaterialList(payload).then(res => {
                if (res.status === 200 && res.data.success) {
                    materialSwatchesList.value = res.data.data;
                }
            }).catch(e => console.error('Error while getSwatchesMaterialList:', e)),

            MaterialTreeList(payload).then(data => {
                MaterialTreeListData.value = data;
            }).catch(e => console.error('Error while getMaterialTree:', e)),

            getStoreCategoryTree(payload).then(data => {
                storeCategoryTree.value = data;
            }).catch(e => console.error('Error while getStoreCategoryTree:', e))
        ]);
    } catch (e) {
        console.error('Error in handleFetchAllData:', e);
    }
};

// Lifecycle hook to initialize data on component mount
onMounted(() => {
    // Initialize image on edit data
    if (store.getters.editData) {
        const domainId = store.getters.editData?.domain_id;
        handleFetchAllData({ domain_id: domainId });

        const { downlaodable_urls, slider_data, gallery_data, featured_image_data } = store.getters.editData;

        const setMediaData = (key, data, defaultMessage) => {
            imageData.value[key] = {
                images: Array.isArray(data) ? data : [data] || [defaultMessage],
                mediaName: Array.isArray(data)
                    ? data.map(item => item?.file_url).join(', ') || defaultMessage
                    : data?.file_url || defaultMessage
            };
        };

        setMediaData('gallery', gallery_data, 'gallery');
        setMediaData('slider', slider_data, 'slider images');
        setMediaData('downloadable_files', downlaodable_urls, 'Downloadable Images');
        setMediaData('featured_image', featured_image_data, 'Featured Image');

    }
    // Fetch all required data
});

watch(() => form.value.domain_id, (newDomainId) => {
    // Fetch tree data
    handleFetchAllData({ domain_id: newDomainId });

    // Check if newDomainId is present in domains_data and fetch 
    if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
        fetchStoreProductData();
    }
});

// Computed Property
const buttonText = computed(() => {
    return (form.value.id ? 'Update' : 'Submit')
})
</script>
