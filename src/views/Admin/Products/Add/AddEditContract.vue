<template>
    <DefaultCard :cardTitle="form.id ? `Edit Product` : `Add New Product`">

        <!-- domain select delete master delete  -->
        <DomainComponent @customChange="(id) => form.domain_id = id" :deleteService="ProductServices.deleteProduct"
            masterKey="master_product_id" :masterDeleteService="ProductServices.mastetrDeleteProduct" routeTo="product">
        </DomainComponent>
        <!-- slug update  -->
        <template v-if="form.id" v-slot:header>
            <MasterSlugForm :form="form" @update-slug="fetchProductData"
                :SlugUpdateservices="ProductServices.masterSlugUpdateProduct" masteridKeyName="master_product_id" />
        </template>

        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">

                    <div>
                        <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title" placeholder="Add title"
                            v-model="form.title" :errMessage="errors.title" :errors="errors" :hasCheckBox="checkBoxFlag"
                            @update:checkValue="value => checkedFields.title = value" />
                        <div class="mt-3">
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug (Read Only)"
                                placeholder="Slug" disabled="true" v-model="form.slug" :errMessage="errors.slug" />
                        </div>
                        <div class="mt-3">
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Trade Mark Label"
                                placeholder="Trade Mark Label" v-model="form.trade_mark_label"
                                :hasCheckBox="checkBoxFlag"
                                @update:checkValue="value => checkedFields.trade_mark_label = value" />
                        </div>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Description">
                            <div class="px-5 pt-2">
                                <div class="px-2 flex w-full">
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.description">
                                    </SingleCheck>
                                    <TinyMCE v-model="form.description" />
                                </div>
                                <span class="text-sm pl-2">Put Material Description.</span>
                            </div>
                        </Accordion>
                    </div>
                    <!-- seo option -->
                    <div class="mt-5">
                        <Accordion :open="true" header="Seo Options">
                            <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                <TextInput id="TitleTag" type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.seo_title" placeholder="Title Tag" label="Title Tag"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.seo_title = value" />
                                <span>Custom title tag.</span>
                            </div>
                            <div class="px-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_description" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.meta_description"
                                    placeholder="Meta Description" label="Meta Description" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.meta_description = value" />
                                <span>Most search engines use a maximum of 160 chars for the description.
                                </span>
                            </div>
                            <div class="mx-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="MetaKeywords" :isTextarea="true" :='4' type="text"
                                    class="block w-[180px] mr-2 " v-model="form.meta_keywords"
                                    placeholder="Meta Keywords" label="Meta Keywords" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.meta_keywords = value" />
                                <span>Seperate each term with comma.</span>
                            </div>
                        </Accordion>
                    </div>

                    <div class="mt-5">
                        <Accordion :open="true" header="New Product Options">
                            <div class="my-3 mx-3">
                                <!-- <SingleCheck v-if="form.id" label="" v-model="checkedFields.new_product_slider">
                                </SingleCheck> -->
                                <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Product Title"
                                    placeholder="Product Title" v-model="form.new_product_title"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.new_product_title = value" />
                            </div>
                            <div class="flex col-span-2 px-4">
                                <div v-if="form.new_product_slider !== null"
                                    class="col-span-2 w-full border border-stroke rounded-lg">
                                    <div class="mt-2 mx-3  ">
                                        <input-label for="slides" value="Slider " />
                                        <div class="text-gray-4 text-[13px]">Minimum Size 1600 x 700px</div>
                                        <div class=" flex flex-wrap">
                                            <div class="relative p-1"
                                                v-for="(slide, index) in imageData.new_product_slider.images"
                                                :key="`slide-${index}`">

                                                <img class=" border border-gray-4 m-1 p-2 h-[168px] w-[156px]"
                                                    :src="$filePath(slide?.file_url)">
                                                <div @click="() => handleRemoveSliderImage(slide)"
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
                                        <button @click="() => imageData.new_product_slider.isOpen = true" type="button"
                                            class="flex px-3 py-1 col-span-2 mt-5  mb-4 ml-4  justify-center rounded bg-primary  font-medium text-gray hover:bg-opacity-90">
                                            Gallery
                                        </button>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                            <div class='mx-5 my-2'>
                                <TextInput id="TitleBackground" type="text" class="block w-full mr-2 mb-2 h-[33px]"
                                    v-model="form.new_product_additional_info" placeholder="" label="Additional Product Info	
                          " :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.new_product_additional_info = value" />
                                <div>
                                    <div class="flex flex-col w-full">
                                        <InputLabel for="SliderImage" :class="{ 'ml-8': form.id }"
                                            value="Additional Product BG Image" />
                                        <div class=" flex  w-full h-auto ">
                                            <SingleCheck v-if="form.id" label=""
                                                v-model="checkedFields.new_product_additional_bg_image">
                                            </SingleCheck>
                                            <div class="py-2 rounded-lg w-full mb-2 px-2 border border-stroke"
                                                @click="() => imageData.new_product_additional_bg_image.isOpen = true">
                                                {{
                                                    imageData.new_product_additional_bg_image.mediaName }}</div>
                                        </div>
                                    </div>
                                    <div class=" mt-3 flex overflow-x-auto">
                                        <img v-if="imageData.new_product_additional_bg_image.images[0]"
                                            v-for="file in imageData.new_product_additional_bg_image.images" :key="file"
                                            :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                                            :alt="file?.alternative_text || 'image'">
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <div class="flex flex-col w-full">
                                        <InputLabel for="SliderImage" :class="{ 'ml-8': form.id }"
                                            value="Right Box Image" />
                                        <div class=" flex  w-full h-auto ">
                                            <SingleCheck v-if="form.id" label=""
                                                v-model="checkedFields.new_product_additional_right_box_image">
                                            </SingleCheck>
                                            <div class="py-2 rounded-lg w-full mb-2 px-2 border border-stroke"
                                                @click="() => imageData.new_product_additional_right_box_image.isOpen = true">
                                                {{
                                                    imageData.new_product_additional_right_box_image.mediaName }}</div>
                                        </div>
                                    </div>
                                    <div class=" mt-3 flex overflow-x-auto">
                                        <img v-if="imageData.new_product_additional_right_box_image.images[0]"
                                            v-for="file in imageData.new_product_additional_right_box_image.images"
                                            :key="file" :src="$filePath(file?.file_url)"
                                            class="inline-block w-auto h-34 mr-4"
                                            :alt="file?.alternative_text || 'image'">
                                    </div>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion open="false" header="Product Options :Set as Featured ">
                            <div class="flex px-3 flex-col ">
                                <InputLabel for="statu1s" value=" set as featured product" />
                                <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                                    label="Select Status" v-model="form.featured_product" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.featured_product = value" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion open="false" header="Product Title ">
                            <div class="flex px-3 flex-col ">
                                <TextInput type="text" class="block mr-2 h-[40px] w-full" label=""
                                    placeholder="Product Title" v-model="form.new_product_title"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.new_product_title = value" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion open="false" header="Display Product under Archive ">
                            <div class="flex px-3 flex-col ">
                                <InputLabel for="statu1s" value="Display Product" />
                                <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                                    label="Select Status" v-model="form.display_archive_products"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.display_archive_products = value" />
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
                        <Accordion :open="true" header="Product Specs">
                            <div v-for="(item, index) in form.product_specs" :key="index">
                                <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                    <TextInput id="seo_title" type="text" class="block mr-2 h-[33px]"
                                        v-model="item.name" placeholder="" label="Specs Name" />
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
                                            @click="() => { productsSpecsIndex = index; imageData.image.isOpen = true; }">
                                            {{ imageData.image?.mediaName }}
                                        </div>
                                        <div class="mt-3 flex overflow-x-auto">
                                            <img v-if="imageData.image?.images[index]"
                                                :src="$filePath(imageData.image?.images[index]?.file_url)"
                                                class="inline-block w-auto h-34 mr-4"
                                                :alt="imageData.ima?.images[index]?.alternative_text || 'image'">
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
                        <Accordion :open="true" header="Materials">
                            <div class="mt-2 px-6 flex h-auto ">
                                <div class="w-full">
                                    <Checkbox :nexted=true :checkedData="form.materials" :dropdown="true"
                                        valueField="id" showField="name" :data="MaterialTreeListData"
                                        @checked-items="handleCheckedItems" />
                                    <!-- <div v-else>sdfsdf</div> -->
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3">
                        <Accordion :open="true" header="Products Slider Heading">
                            <div v-for="(item, index) in form.banner_slide" :key="index">
                                <div class="mt-3">
                                    <div class="px-6  h-auto ">
                                        <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                            @click="() => { productsSpecsIndex = index; imageData.video_source.isOpen = true; }">
                                            {{ imageData.video_source?.mediaName }}
                                        </div>
                                        <div class="mt-3 flex overflow-x-auto">
                                            <img v-if="imageData.video_source?.images[index]"
                                                :src="$filePath(imageData.video_source?.images[index]?.file_url)"
                                                class="inline-block w-auto h-34 mr-4"
                                                :alt="imageData.video_source?.images[index]?.alternative_text || 'image'">
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-2 px-6  h-auto">
                                    <ColorPicker label="Text Color"
                                        v-model="item.text_color" :hasCheckBox="checkBoxFlag"/>
                                </div>
                                <div class="mt-2 px-6  h-auto">
                                    <ColorPicker label="Background Color" v-model="item.bg_color" />
                                </div>
                                <div class="flex flex-col px-7 ">
                                    <InputLabel for="Memu Color" value="Memu Color" />
                                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                                        label="Select Status" v-model="item.menu_color"  />
                                </div>
                                <div class=" px-5 my-4 items-center text-gray-600 text-sm">
                                    <TextInput id="seo_title" type="text" class="block mr-2 h-[33px]"
                                        v-model="item.transparent" placeholder="" label="Transprent %" />
                                </div>   
                                <div class="px-6  h-auto ">
                                    <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                        @click="() => { productsSpecsIndex = index; imageData.slide.isOpen = true; }">
                                        {{ imageData.slide?.mediaName }}
                                    </div>
                                    <div class="mt-3 flex overflow-x-auto">
                                        <img v-if="imageData.slide?.images[index]"
                                            :src="$filePath(imageData.slide?.images[index]?.file_url)"
                                            class="inline-block w-auto h-34 mr-4"
                                            :alt="imageData.slide?.images[index]?.alternative_text || 'image'">
                                    </div>
                                </div>
                                <div class="ml-auto">
                                    <button @click="banner_slide_remove" type="button"
                                    class="flex px-3 py-1 col-span-2 mt-5  mb-4 ml-4  justify-center rounded bg-red  font-medium text-gray hover:bg-opacity-90">
                                    Remove 
                                </button>                      
                            </div>
                            </div>
                            <button @click="banner_slide" type="button"
                                class="flex px-3 py-1 col-span-2 mt-5  mb-4 ml-4  justify-center rounded bg-primary  font-medium text-gray hover:bg-opacity-90">
                                Add
                            </button>
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
                                                v-for="(file, index) in imageData?.downloadable_files?.images"
                                                :key="`file-${index}`">
                                                <img class="border border-gray-4 m-1 p-2 h-[168px] w-[156px]"
                                                    :src="$filePath(file.file_url)" />
                                                <div @click="() => handleRemoveDownloadable(file)"
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
                        <Accordion header="Headlight Title" open="false">
                            <div class="px-3 mt-3">
                                <TextInput id="Enter Highlight title" type="text" class="block mr-2 h-[33px]"
                                    v-model="form.highlight_title" placeholder="" label="Enter Highlight title"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.highlight_title = value" />
                                <p>Enter Highlight title.</p>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3">
                        <Accordion header="Product Option: Aside Content" open="false">
                            <div class="px-5 pt-2">
                                <div class="px-2 flex w-full">
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.content">
                                    </SingleCheck>
                                    <TinyMCE v-model="form.content" />
                                </div>
                            </div>
                        </Accordion>
                    </div>
                </div>
                <!-- right panel -->
                <div class="col-span-4">
                    <Accordion header="Publish" open="false">
                        <div class="px-1 py-3">
                            <div class="px-4">
                                <div class="flex flex-col ">
                                    <InputLabel for="statu1s" value="Status" />
                                    <Select :options="statusData" showfield="name" class="w-full" valueField="value"
                                        label="Select Status" v-model="form.status" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="value => checkedFields.status = value" />
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

                    <div class="mt-5">
                        <Accordion :open="true" header="Select Template">
                            <div class="mt-2 px-6  h-auto">
                                <Select :options="productTemplate" title="Select Template" showfield="name"
                                    class="w-full" :defaultZero='true' valueField="value" label="Select Template"
                                    v-model="form.product_template" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.product_template = value" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Product Series ">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :dropdown="true" valueField="id" showField="name"
                                    :checkedData='form.product_series' :data="productSeriesTree"
                                    @checked-items="(checked) => { form.product_series = checked }" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Contract ">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :checkedData='form.contracts' :dropdown="true" valueField="id"
                                    showField="name" :data="productContractTree"
                                    @checked-items="(checked) => form.contracts = checked" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Product  Type ">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :checkedData='form.product_types' :dropdown="true"
                                    valueField="id" showField="name" :data="productTypeTree"
                                    @checked-items="(checked) => form.product_types = checked" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Product Category Type ">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :checkedData='form.product_category_types' :dropdown="true"
                                    valueField="id" showField="name" :data="productCategoryTypeTree"
                                    @checked-items="(checked) => form.product_category_types = checked" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Product Label ">
                            <div class="px-3">
                                <TextInput id="Enter Highlight title" type="text" class="block mr-2 h-[33px]"
                                    v-model="form.product_label" placeholder="" label="Text Label"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.product_label = value" />
                                <p>Enter your product label here.</p>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-4 ">
                        <Accordion :open="true" header="Featured image">
                            <div class="px-6  h-auto ">
                                <!-- <InputLabel for="Featured_image" value="Featured_image" /> -->
                                <div class=" flex  w-full h-auto ">
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.featured_image">
                                    </SingleCheck>
                                    <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                        @click="() => imageData.featured_image.isOpen = true"> {{
                                            imageData.featured_image.mediaName }}</div>
                                </div>
                                <div class=" mt-3 flex overflow-x-auto">

                                    <img v-if="imageData.featured_image.images[0]"
                                        v-for="file in imageData.featured_image.images" :key="file"
                                        :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                                        :alt="file?.alternative_text || 'image'">
                                </div>
                                <InputError class="mt-2" :message="errors?.featured_image" />
                            </div>
                        </Accordion>
                        <div class="mt-4">
                            <Accordion :open="true" header="Gallery">
                                <div class="px-6  h-auto ">
                                    <!-- <InputLabel for="Featured_image" value="Featured_image" /> -->
                                    <div class=" flex  w-full h-auto ">
                                        <SingleCheck v-if="form.id" label="" v-model="checkedFields.gallery">
                                        </SingleCheck>
                                        <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                            @click="() => imageData.gallery.isOpen = true"> {{
                                                imageData.gallery.mediaName }}</div>
                                    </div>
                                    <div class=" mt-3 flex overflow-x-auto">
                                        <img v-for="file in imageData.gallery.images" :key="file"
                                            :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                                            :alt="file?.alternative_text || 'image'">
                                    </div>
                                    <InputError class="mt-2" :message="errors?.featured_image" />
                                </div>
                            </Accordion>
                        </div>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Simple Fields">
                            <div class="mt-2 px-6 flex h-auto">
                                <Select :options="SimpleFieldsProduct" showfield="name" class="w-full"
                                    :defaultZero='true' valueField="value" label="Select Parent Material"
                                    v-model="form.simple_field" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.simple_field = value" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Logo and right Nav Setting">
                            <div class="mt-2 px-6 w-full  h-auto">
                                <Select :options="rightNavSettings" title="Top Logo & Right Nav Icon" showfield="name"
                                    class="w-full" :defaultZero='true' valueField="value" label="Select "
                                    v-model="logo_right_nav"
                                    @update:checkValue="value => checkedFields.logo_right_nav = value" />
                            </div>
                            <div v-if="logo_right_nav === 'change'">
                                <div class="mt-2 px-6  h-auto">
                                    <Select :options="darkLight" title="Logo Color " showfield="name" class="w-full"
                                        :defaultZero='true' valueField="value" label="Select Parent Material"
                                        v-model="form.logo_right_nav_settings.logoColor" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="value => checkedFields.logo_right_nav_settings.logoColor = value" />
                                </div>
                                <div class="mt-2 px-6  h-auto">
                                    <TextInput id="Logo Transparent %" type="text" class="block mr-2 h-[33px]"
                                        v-model="form.logo_right_nav_settings.logoTrasparent" placeholder=""
                                        label="Logo Transparent %" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="value => checkedFields.logo_right_nav_settings.logoTrasparent = value" />
                                </div>
                                <div class="mt-2 px-6  h-auto">
                                    <ColorPicker label="Label Background Color"
                                        v-model="form.logo_right_nav_settings.RightNavColor" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.logo_right_nav_settings.RightNavColor = value }" />
                                </div>
                                <div class="mt-2 px-6  h-auto">
                                    <TextInput id="Right Nav Transparent %" type="text" class="block mr-2 h-[33px]"
                                        v-model="form.logo_right_nav_settings.rightNavTransparent" placeholder=""
                                        label="Right Nav Transparent %" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="value => checkedFields.logo_right_nav_settings.rightNavTransparent = value" />
                                </div>
                            </div>

                        </Accordion>
                    </div>
                </div>
            </div>

        </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.featured_image.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
            :closeModal="() => { imageData.featured_image.isOpen = false }" :selectedFiles="handleFeatureFiles" />
    </popupModal>

    <!-- Gallery Image Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.gallery.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.gallery.images" :singleFile="false"
            :closeModal="() => { imageData.gallery.isOpen = false }" :selectedFiles="handlegalleryFiles" />
    </popupModal>

    <!-- Contract Logo Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.contract_logo.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.contract_logo.images" :singleFile="true"
            :closeModal="() => { imageData.contract_logo.isOpen = false }" :selectedFiles="handleContractLogoFiles" />
    </popupModal>
    <!--  new_product_additional_bg_image Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.new_product_additional_bg_image.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.new_product_additional_bg_image.images"
            :singleFile="true" :closeModal="() => { imageData.new_product_additional_bg_image.isOpen = false }"
            :selectedFiles="handleAdditionalBgImageFiles" />
    </popupModal>
    <!--  handle Additional  Righ tBox Image Files Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.new_product_additional_right_box_image.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true"
            :selected="imageData.new_product_additional_right_box_image.images" :singleFile="true"
            :closeModal="() => { imageData.new_product_additional_right_box_image.isOpen = false }"
            :selectedFiles="handleAdditionalRightBoxImageFiles" />
    </popupModal>

    <!--  Download able  Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.downloadable_files.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.downloadable_files.images"
            :singleFile="false" :closeModal="() => { imageData.downloadable_files.isOpen = false }"
            :selectedFiles="handleDownloadablemageFiles" />
    </popupModal>

    <!--  handle Additional  Righ tBox Image Files Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="imageData.image.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.image.images" :singleFile="true"
            :closeModal="() => { imageData.image.isOpen = false }" :selectedFiles="handleImageFiles" />
    </popupModal>

    <!-- ProductSlider Image Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.new_product_slider.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.new_product_slider.images"
            :singleFile="false" :closeModal="() => { imageData.new_product_slider.isOpen = false }"
            :selectedFiles="handleProductSliderFiles" />
    </popupModal>
    <!-- Products Slider Heading Video Source  -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.video_source.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.video_source.images"
            :singleFile="true" :closeModal="() => { imageData.video_source.isOpen = false }"
            :selectedFiles="handleVideoSource" />
    </popupModal>

    <!-- Products Slider Heading Slider -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.new_product_slider.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.new_product_slider.images"
            :singleFile="true" :closeModal="() => { imageData.new_product_slider.isOpen = false }"
            :selectedFiles="handleProductSliderFiles" />
    </popupModal>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import _ from 'lodash';
import { ref, onMounted, watch, computed } from "vue";
import { showToast, getGlobalUpdateData, handleFileUpdate } from '@/helper/functions'
import ContractServices from '@/services/ContractServices';
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";
import Accordion from "@/components/Admin-components/Accordion.vue";
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import { MaterialTreeList, getProductSeriesTree, getProductContractTree, getProductCategoryTypeTree, getProductTypeTree } from '@/helper/Apis'
import {statusData, trueFalse, SimpleFieldsProduct, rightNavSettings, darkLight, productTemplate } from '@/json/data';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import CommonServices from '@/services/CommonServices';
import ProductServices from '@/services/ProductServices';

// store and router
const router = useRouter();
const store = useStore();

// Reactive state
const errors = ref({});
const loading = ref(false);
const form = ref(store.getters.editData || {simple_field:null,featured_product:false, status:null,description: '', product_specs: [],banner_slide:[], logo_right_nav_settings: {}, product_template: 'First Version (OLD)' });
const productContractTree = ref([]);
const productSeriesTree = ref([]);
const productTypeTree = ref([]);
const productCategoryTypeTree = ref([]);
const materialSwatchesList = ref([]);
const MaterialTreeListData = ref([]);
const checkedFields = ref({})
const productsSpecsIndex = ref()
const logo_right_nav = ref('default')
const iswithBg = ref()
const checkBoxFlag = ref(Boolean(form.value.id))


// Image data for various categories
const imageData = ref({
    featured_image: { isOpen: false, mediaName: 'Feature Image', images: [] },
    gallery: { isOpen: false, mediaName: 'Gallery Image', images: [] },
    new_product_slider: { isOpen: false, mediaName: 'Gallery Image', images: [] },
    new_product_additional_bg_image: { isOpen: false, mediaName: 'Gallery Image', images: [] },
    contract_logo: { isOpen: false, mediaName: 'Logo Image', images: [] },
    new_product_additional_right_box_image: { isOpen: false, mediaName: 'Main Slider Image', images: [] },
    downloadable_files: { isOpen: false, mediaName: 'Main Slider Image', images: [] },
    image: { isOpen: false, mediaName: 'Main Slider Image', images: [] },
    video_source: { isOpen: false, mediaName: 'Add Video Source', images: [] },
    slide : { isOpen: false, mediaName: 'Slider Image', images: [] },
});

// Handle file updates for different image types
const handleFeatureFiles = (data) => handleFileUpdate('featured_image', data, false, imageData, form);
const handlegalleryFiles = (data) => handleFileUpdate('gallery', data, true, imageData, form);
const handleProductSliderFiles = (data) => handleFileUpdate('new_product_slider', data, true, imageData, form);
const handleAdditionalBgImageFiles = (data) => handleFileUpdate('new_product_additional_bg_image', data, false, imageData, form);
const handleAdditionalRightBoxImageFiles = (data) => handleFileUpdate('new_product_additional_right_box_image', data, false, imageData, form);
const handleDownloadablemageFiles = (data) => handleFileUpdate('downloadable_files', data, true, imageData, form);
const handleImageFiles = (data) => handleFileUpdate('image', data, false, imageData, form);
const handleContractLogoFiles = (data) => handleFileUpdate('contract_logo', data, false, imageData, form);
const handleContractSliderImageFiles = (data) => handleFileUpdate('new_product_additional_right_box_image', data, false, imageData, form);


 const handleVideoSource = (data) => {
  const media_titles = data.map((item) => item.title);
  imageData.value.video_source.mediaName = media_titles.join(", ");
  imageData.value.video_source.images = data;
  imageData.value.video_source.isOpen=false;
  const media_ids = data.map((item) => item.id);
  form.value.banner_slide=media_ids;

};

// remove image form gallery
const handleRemoveSliderImage = (slide) => {
    const index = imageData.value.new_product_slider.images.findIndex(item => item.id === slide.id);
    if (index !== -1) {
        imageData.value.new_product_slider.images.splice(index, 1);
        form.value.new_product_slider.splice(index, 1);
    }
}

const handleCheckedItems = (checkedItems) => {
    form.value = { ...form.value, materials: checkedItems }
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
    console.log('Selected Materials:', selectedMaterialIds.value,);
};

// Validate form fields
const validateForm = () => {
    errors.value = {};
    if (!form.value.title) {
        errors.value.title = 'Title is required';
        return false;
    }
    return true;
};

// Function to add a new product specification
function product_specs() {
    form.value.product_specs.push({
        seo_title: '',
        description: '',
        image: '',
    });
}
function banner_slide() {
    form.value.banner_slide.push({
        video_source: '',
        text_color: '',
        bg_color: '',
        menu_color: '',
        transparent: '',
        slide:'',
    });
}
function banner_slide_remove(index) {
    form.value.banner_slide.splice(index,1)
}

// Handle form submission (add or edit contract)
const handleSubmit = async () => {
    if (!validateForm()) return;
    const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)

    loading.value = true;
    const {status, featured_image_data,featured_image_url,slug, domains_data, contract_logo_data, default_domain, gallery_urls, contract_location_data, contract_type_data, ...payload } = form.value;
    if (!form.value?.domains_data?.includes(form.value.domain_id)) delete payload.id;

    try {
        const service = store.getters.editData ? ProductServices.editProduct : ProductServices.addProduct;
        const res = await service(payload);

        if (res.status === 200 && res.data.success) {
            if(hasCheckedFields){
                handleGlobalUpdate();
            }
            else{
                showToast(res.data.message, 'success');
                router.push('/product');
            }
            
        }
    } catch (e) {
        console.error('Error:', e);
    } finally {
        loading.value = false;
    }
};

// Global Update Handler
const handleGlobalUpdate = async () => {
    const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value)
    if (_.isEmpty(globalUpdate)) return

    const payload = {
        master_product_id: form.value.master_product_id,
        global_keys: globalUpdate
    }

    try {
        const { status, data } = await ProductServices.globalUpdateProduct(payload)
        status === 200 && data.success ? showToast(data.message, 'success') : showToast(data.message, 'error')
        if (status === 200 && data.success) router.push('/product')
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error)
    } finally {
        loading.value = false
    }
}

// Fetch Perticular Domain Data
const fetchProductData = async () => {
    loading.value = true
    const payload = { master_product_id: form.value.master_product_id, domain_id: form.value.domain_id }
    try {
        const { status, data } = await ContractServices.getNewContract(payload)
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

// Fetch contract location and type data
const fetchNacessaryData = async (payload) => {
    productContractTree.value = await getProductContractTree(payload);
    productSeriesTree.value = await getProductSeriesTree(payload);
    productCategoryTypeTree.value = await getProductCategoryTypeTree(payload);
    productTypeTree.value = await getProductTypeTree(payload);
    CommonServices.getSwatchesMaterialList(payload).then(res => {
        if (res.status === 200 && res.data.success) {
            materialSwatchesList.value = res.data.data;
        }
    }).catch(e => console.error('Error while getSwatchesMaterialList:', e))
};
// Fetch Initial Data
const fetchMaterialTreeData = async () => {
    try {

        const domainId = store.getters.getDomain.id;
        MaterialTreeListData.value = await MaterialTreeList({ domain_id: domainId });
    } catch (e) {
        console.error('Error fetching material tree data:', e);
    }
};


// Initialize component state
onMounted(() => {
    // if (store.getters.editData) {
    //     const { featured_image_data, contract_logo_data, contract_slider_image_data, gallery_urls } = store.getters.editData;
    //     console.log(contract_slider_image_data)
    //     imageData.value.featured_image.images = [featured_image_data];
    //     imageData.value.featured_image.mediaName = featured_image_data?.file_url || 'featured images';
    //     imageData.value.contract_logo.images = [contract_logo_data];
    //     imageData.value.contract_logo.mediaName = contract_logo_data?.file_url || 'Contract logo image';
    //     imageData.value.contract_slider_image.images = [contract_slider_image_data];
    //     imageData.value.contract_slider_image.mediaName = contract_slider_image_data?.file_url || 'Slider image';;
    //     imageData.value.gallery.images = gallery_urls;
    //     imageData.value.gallery.mediaName = gallery_urls?.map(item => item.file_url).join(', ') || 'Gallery images';

    // }
    fetchMaterialTreeData();
});

// Watch for domain_id changes to update contract data
watch(() => form.value.domain_id, (newDomainId) => {
    // Fetch product type tree and reset parent product type
    fetchNacessaryData({ domain_id: form.value.domain_id });
    fetchMaterialTreeData();

    // Check if newDomainId is present in domains_data and fetch product type data if so
    if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
        fetchProductData();
    }
});
watch(() => logo_right_nav.value, (newValue) => {
    if (newValue === 'default') {
        form.value.logo_right_nav_settings = {};
    }
});
</script>