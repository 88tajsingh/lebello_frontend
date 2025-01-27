<template>
    <DefaultCard :cardTitle="form.id ? `Edit Product` : `Add New Product`">

        <!-- domain select delete master delete  -->
        <DomainComponent @customChange="(id) => form.domain_id = id" @domainArray="(array) => form.domain_all = array"
            :deleteService="form.is_store_product ? StoreProductServices.deleteStoreProduct : ProductServices.deleteProduct"
            masterKey='master_product_id'
            :masterDeleteService="form.is_store_product ? StoreProductServices.masterDeleteStoreProduct : ProductServices.mastetrDeleteProduct"
            routeTo="product">
        </DomainComponent>
        <!-- slug update  -->
        <template v-if="form.id" v-slot:header>
            <MasterSlugForm :form="form" @update-slug="fetchProductData"
                :SlugUpdateservices="form.is_store_product ? StoreProductServices.masterSlugStoreProduct : ProductServices.masterSlugUpdateProduct"
                masteridKeyName="master_product_id" />
        </template>

        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <Accordion :open="true" header="Title" containerClass="px-4">
                        <TextInput type="text" class="block mb-2 h-[40px] w-full" label="Title" placeholder="Add title"
                            v-model="form.title" :errMessage="errors.title" :errors="errors" :hasCheckBox="checkBoxFlag"
                            @update:checkValue="value => checkedFields.title = value" />

                        <TextInput type="text" class="block h-[40px] w-full" label="Trade Mark Label"
                            placeholder="Trade Mark Label" v-model="form.trade_mark_label" :hasCheckBox="checkBoxFlag"
                            @update:checkValue="value => checkedFields.trade_mark_label = value" />

                    </Accordion>
                    <div class="mt-5">
                        <Accordion :open="true" header="Description" containerClass="px-4">
                            <div class=" flex w-full">
                                <SingleCheck v-if="form.id" label="" v-model="checkedFields.description">
                                </SingleCheck>
                                <TinyMCE v-model="form.description" />
                            </div>
                            <span class="text-sm pl-2">Put Material Description.</span>
                        </Accordion>
                    </div>
                    <!-- seo option -->
                    <div class="mt-5">
                        <Accordion :open="true" header="Seo Options" containerClass="px-4">
                            <TextInput id="TitleTag" type="text" class="block w-[180px] h-[33px]"
                                v-model="form.seo_title" placeholder="Title Tag" label="Title Tag"
                                :hasCheckBox="checkBoxFlag"
                                @update:checkValue="value => checkedFields.seo_title = value" />
                            <span :class="[form.id ? 'pl-8' : '']">Custom title tag.</span>

                            <TextInput id="seo_meta_description" :isTextarea="true" :rows=4 type="text"
                                class="block w-[180px] " v-model="form.meta_description" placeholder="Meta Description"
                                label="Meta Description" :hasCheckBox="checkBoxFlag"
                                @update:checkValue="value => checkedFields.meta_description = value" />
                            <span :class="[form.id ? 'pl-8' : '']">Most search engines use a maximum of 160 chars for the
                                description.
                            </span>

                            <TextInput id="MetaKeywords" :isTextarea="true" :='4' type="text" class="block w-[180px] "
                                v-model="form.meta_keywords" placeholder="Meta Keywords" label="Meta Keywords"
                                :hasCheckBox="checkBoxFlag"
                                @update:checkValue="value => checkedFields.meta_keywords = value" />
                            <span :class="[form.id ? 'pl-8' : '']">Seperate each term with comma.</span>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="New Product Options" containerClass="px-4">
                            <TextInput type="text" class="block mb-2 h-[40px] w-full" label="Product Title"
                                placeholder="Product Title" v-model="form.new_product_title" :hasCheckBox="checkBoxFlag"
                                @update:checkValue="value => checkedFields.new_product_title = value" />

                            <div class="flex col-span-2 ">
                                <!-- <SingleCheck v-if="form.id" label=""
                                                v-model="checkedFields.new_product_additional_bg_image">
                                            </SingleCheck> -->
                                <div v-if="form.new_product_slider !== null"
                                    class="col-span-2 w-full border border-stroke rounded-lg">
                                    <div class="mt-2 mx-3">
                                        <input-label for="slides" value="Slider " />
                                        <div class="text-gray-4 text-[13px]">Minimum Size 1600 x 700px</div>
                                        <div class=" flex flex-wrap">
                                            <div class="relative p-1"
                                                v-for="(slide, index) in imageData.new_product_slider.images"
                                                :key="`slide-${index}`">

                                                <img class="border border-gray-4 m-1 p-2 h-[168px] w-[156px]"
                                                    :src="$filePath(slide?.file_url)" :alt="slide?.alternative_text">
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
                            <!-- <TextInput id="TitleBackground" type="text" class="block w-full  mb-2 h-[33px]"
                                v-model="form.new_product_additional_info" placeholder="" label="Additional Product Info	
                                    " :hasCheckBox="checkBoxFlag"
                                @update:checkValue="value => checkedFields.new_product_additional_info = value" />
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
                            </div> -->
                            <!-- <div class=" mt-3 flex overflow-x-auto">
                                <img v-if="imageData.new_product_additional_bg_image.images[0]"
                                    v-for="file in imageData.new_product_additional_bg_image.images" :key="file"
                                    :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                                    :alt="file?.alternative_text || 'img'">
                            </div> -->
                            <div class="mt-3">
                                <div class="flex flex-col w-full">
                                    <InputLabel for="" :class="{ 'ml-8': form.id }"
                                        value="Right Content Image" />
                                    <div class=" flex  w-full h-auto ">
                                        <SingleCheck v-if="form.id" label=""
                                            v-model="checkedFields.new_product_additional_right_box_image">
                                        </SingleCheck>
                                        <div :class="{ 'ml-8': form.id }" class="py-2 rounded-lg w-full mb-2 px-2 border border-stroke"
                                            @click="() => imageData.new_product_additional_right_box_image.isOpen = true">
                                            {{
                                                imageData.new_product_additional_right_box_image.mediaName }}</div>
                                    </div>
                                </div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-if="imageData.new_product_additional_right_box_image.images[0]"
                                        v-for="file in imageData.new_product_additional_right_box_image.images"
                                        :key="file" :src="$filePath(file?.file_url)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file?.alternative_text || 'img'">
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
                                <SwatchMaterial :materialSwatchesList="materialSwatchesList"
                                    @updateSelectedSwatchesData="updateSelectedSwatchesData" />
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
                                                :alt="imageData.ima?.images[index]?.alternative_text || ''">
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
                                                :alt="imageData.video_source?.images[index]?.alternative_text || ''">
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-2 px-6  h-auto">
                                    <ColorInput label="Text Color" v-model="item.text_color"
                                        :hasCheckBox="checkBoxFlag" />
                                </div>
                                <div class="mt-2 px-6  h-auto">
                                    <ColorInput label="Background Color" v-model="item.bg_color" />
                                </div>
                                <div class="flex flex-col px-7 ">
                                    <InputLabel for="Memu Color" value="Memu Color" />
                                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                                        label="Select Status" v-model="item.menu_color" />
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
                                                    :src="$filePath(file.file_url)" alt="img" />
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
                    <Select :options="trueFalse" title="Add in Store product" showfield="name" class="w-full"
                        valueField="value" label="Select " v-model="form.is_store_product" :hasCheckBox="checkBoxFlag"
                        @update:checkValue="value => checkedFields.is_store_product = value" />

                </div>
                <!-- right panel -->
                <div class="col-span-4">
                    <PublishAccordion
    header="Publish"
    :open="false"
    :options="statusData"
    :form="form"
    :hasCheckBox="checkBoxFlag"
    :onSubmitHandler="handleSubmit"
    :onCheckboxUpdate="handleCheckboxUpdate"
  />

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
                                        :alt="file?.alternative_text || ''">
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
                                            :alt="file?.alternative_text || ''">
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
                                    <ColorInput label="Label Background Color"
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
                    <div class="mt-5">
                        <Accordion :open="true" header="Product Slider Heading">
                            <div class="mt-2 px-6  h-auto">
                                <div>
                                    <div class="  mt-2 items-center text-gray-600 text-sm">
                                        <TextInput id="Product Title" type="text" class="block w-[180px] mr-2 h-[33px]"
                                            v-model="form.heading_title" placeholder="" label="Slider Heading"
                                            :hasCheckBox="checkBoxFlag"
                                            @update:checkValue="(value) => { checkedFields.heading_title = value }" />
                                    </div>
                                    <div class="py-4">
                                        <RadioButton v-for="option in withBgWithoutBg" :key="option.value"
                                            name="Visibility" :value="option.value" :label="option.label"
                                            :modelValue="iswithBg" @update:modelValue="iswithBg = $event" />
                                    </div>
                                    <div v-if="iswithBg" class="">
                                        <ColorInput label="Select BG Color" v-model="form.heading_background"
                                            :hasCheckBox="checkBoxFlag"
                                            @update:checkValue="(value) => { checkedFields.heading_background = value }" />
                                    </div>

                                </div>
                                <div class="">
                                    <ColorInput label="Text Color" v-model="form.heading_text_color"
                                        :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.heading_text_color = value }" />
                                </div>

                                <TextInput type="heading_font_size" class="block mr-2 mb-2 h-[40px] " placeholder=""
                                    label="Heading Font Size" v-model="form.heading_font_size"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.heading_font_size = value }" />

                                <div class="">
                                    <InputLabel for="HeadingCase" value="Heading Case" />
                                    <div class="flex">

                                        <SingleCheck v-if="form.id" label="" v-model="checkedFields.heading_case">
                                        </SingleCheck>
                                        <div>
                                            <RadioButton v-for="option in capsNOCaps" :key="option.value"
                                                name="Visibility" :value="option.value" :label="option.label"
                                                :modelValue="form.heading_case"
                                                @update:modelValue="form.heading_case = $event" />
                                        </div>
                                    </div>
                                </div>
                                <TextInput type="text" class="block  mb-2 h-[40px] " placeholder=""
                                    label="Transparent %" v-model="form.heading_transparent_percentage"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.heading_transparent_percentage = value }" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Product Slider Heading">
                            <div class="mt-2 px-6  h-auto">
                                <div class="flex flex-col w-full">
                                    <InputLabel for="SliderImage" :class="{ 'ml-8': form.id }"
                                        value="Right Box Image" />
                                    <div class=" flex  w-full h-auto ">
                                        <SingleCheck v-if="form.id" label="" v-model="checkedFields.product_image">
                                        </SingleCheck>
                                        <div class="py-2 rounded-lg w-full mb-2 px-2 border border-stroke"
                                            @click="() => imageData.product_image.isOpen = true">
                                            {{
                                                imageData.product_image.mediaName }}</div>
                                        <div class=" mt-3 flex overflow-x-auto">

                                        </div>
                                    </div>
                                    <img v-for="file in imageData.product_image.images" :key="file"
                                        :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                                        :alt="file?.alternative_text || ''">

                                    <div class="mt-2">
                                        <TextInput type="text" class="block mr-2 h-[40px] w-full" label="product 3D Url"
                                            placeholder="" v-model="form.product_url_for_three_d"
                                            :hasCheckBox="checkBoxFlag"
                                            @update:checkValue="(value) => { checkedFields.product_url_for_three_d = value }" />
                                    </div>
                                </div>


                            </div>
                        </Accordion>
                    </div>
                </div>
            </div>
            <div v-if='form.is_store_product'>
                <div class="grid grid-cols-12 gap-4 mt-5 ">
                    <div class="col-span-8">
                        <div class="mt-3 ">
                            <Accordion :open="true" header="Store Options">
                                <div class="px-6">
                                    <div class="mt-2">
                                        <TextInput type="text" class="block mr-2 h-[40px] w-full"
                                            label="Product Sub Title" placeholder="" v-model="form.product_sub_title"
                                            :hasCheckBox="checkBoxFlag"
                                            @update:checkValue="(value) => { checkedFields.product_sub_title = value }" />
                                    </div>
                                    <div class="mt-2">
                                        <TextInput type="text" class="block mr-2 h-[40px] w-full"
                                            label="Description Title" placeholder="" v-model="form.product_description"
                                            :hasCheckBox="checkBoxFlag"
                                            @update:checkValue="(value) => { checkedFields.product_description = value }" />
                                    </div>
                                    <div class="mt-5  ">
                                        <SingleCheck id="FeaturedOption" label="Has Predefind Values"
                                            v-model:modelValue="form.product_predefined_values">
                                        </SingleCheck>
                                    </div>
                                    <div class="mt-2">
                                        <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Quick Ship"
                                            placeholder="" v-model="form.product_quick_ship" :hasCheckBox="checkBoxFlag"
                                            @update:checkValue="(value) => { checkedFields.product_quick_ship = value }" />
                                    </div>
                                    <div class="mt-2">
                                        <TextInput type="text" class="block mr-2 h-[40px] w-full"
                                            label="Custom (Custom Order)" placeholder=""
                                            v-model="form.product_custom_order" :hasCheckBox="checkBoxFlag"
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
                                        <SingleCheck id="FeaturedOption" label="Featured"
                                            v-model:modelValue="form.featured">
                                        </SingleCheck>
                                    </div>
                                    <div class="mt-2">
                                        <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Featured Title"
                                            placeholder="" v-model="form.featured_title" :hasCheckBox="checkBoxFlag"
                                            @update:checkValue="(value) => { checkedFields.featured_title = value }" />
                                    </div>
                                    <div class="mt-2">
                                        <TextInput type="text" class="block mr-2 h-[40px] w-full"
                                            label="Featured Sub Title" placeholder="" v-model="form.featured_sub_title"
                                            :hasCheckBox="checkBoxFlag"
                                            @update:checkValue="(value) => { checkedFields.featured_sub_title = value }" />
                                    </div>
                                    <div class="mt-2">
                                        <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Product SKU
                                    " placeholder="" v-model="form.product_sku" :hasCheckBox="checkBoxFlag"
                                            @update:checkValue="(value) => { checkedFields.product_sku = value }" />
                                    </div>
                                    <div class="mt-2">
                                        <TextInput type="text" class="block mr-2 h-[40px] w-full"
                                            label="Advertise Price" placeholder="" v-model="form.advertise_price"
                                            :hasCheckBox="checkBoxFlag"
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
                                                <TextInput type="text" class="block mr-2 w-full"
                                                    label="Custome With Price" :isTextarea="true" :rows="3"
                                                    v-model="item.option_type_data" />
                                            </div>
                                            <div v-else-if="item.option_type == 'cushion'"
                                                class='mt-3 border border-stroke p-4 rounded-lg'>
                                                <TextInput type="text" class="block mr-2 w-full" label="New Cushion"
                                                    :isTextarea="true" :rows="3" v-model="item.option_type_data" />
                                            </div>
                                            <div class="mt-5  ">
                                                <SingleCheck id="checked"
                                                    label="If checked, this variation will be exported while exporting products."
                                                    v-model:modelValue="item.export_field"></SingleCheck>
                                            </div>
                                            <button @click="removeFormItem(index)" type="button"
                                                class="flex px-3 py-1 col-span-2 mt-5  mb-4 ml-4  justify-center rounded bg-danger  font-medium text-gray hover:bg-opacity-90">
                                                Remove
                                            </button>
                                        </div>
                                        <button @click="addFormItem" type="button"
                                            class="flex px-3 py-1 col-span-2 mt-5  mb-4 ml-4  justify-center rounded bg-primary  font-medium text-gray hover:bg-opacity-90">
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </Accordion>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="mt-3 ">
                            <Accordion :open="true" header="Tags">
                                <div class="mt-2 px-6 flex h-auto ">
                                    <Checkbox :nexted=true :checkedData='form.tags' :dropdown="true" valueField="id"
                                        showField="name" :data="tagsData"
                                        @checked-items="(checked) => form.tags = checked" />
                                </div>
                            </Accordion>
                        </div>
                        <div class="mt-3 ">
                            <Accordion :open="true" header="Store Categories">
                                <div class="mt-2 px-6 flex h-auto ">
                                    <Checkbox :nexted=true :checkedData='form.store_categories' :dropdown="true"
                                        valueField="id" showField="name" :data="storeCategoryTree"
                                        @checked-items="(checked) => form.store_categories = checked" />
                                </div>
                            </Accordion>
                        </div>
                        <div class="mt-5">
                            <Accordion :open="true" header="Product Slider Heading">
                                <div class="mt-2 px-6  h-auto">
                                    <div class="flex flex-col w-full">
                                        <InputLabel for="SliderImage" :class="{ 'ml-8': form.id }"
                                            value="Right Box Image" />
                                        <div class=" flex  w-full h-auto ">
                                            <SingleCheck v-if="form.id" label=""
                                                v-model="checkedFields.store_product_image">
                                            </SingleCheck>
                                            <div class="py-2 rounded-lg w-full mb-2 px-2 border border-stroke"
                                                @click="() => imageData.store_product_image.isOpen = true">
                                                {{
                                                    imageData.store_product_image.mediaName }}</div>
                                            <div class=" mt-3 flex overflow-x-auto">

                                            </div>
                                        </div>
                                        <img v-for="file in imageData.store_product_image.images" :key="file"
                                            :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                                            :alt="file?.alternative_text || ''">

                                        <div class="mt-2">
                                            <TextInput type="text" class="block mr-2 h-[40px] w-full"
                                                label="product 3D Url" placeholder=""
                                                v-model="form.store_product_url_for_three_d" :hasCheckBox="checkBoxFlag"
                                                @update:checkValue="(value) => { checkedFields.store_product_url_for_three_d = value }" />
                                        </div>
                                    </div>


                                </div>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </DefaultCard>
    <!-- gallery popup -->
    <div>
        <PopupModal v-for="(modal, key) in imageData" :key="key" :modalTitle="'Media Library'"
            customClasses="w-[1000px] h-[570px]" v-model:isOpen="modal.isOpen">
            <GetLibrary btnName="Select File" :getFlag="true" :selected="modal.images"
                :singleFile="modal.singleFile || false" :closeModal="() => { modal.isOpen = false }"
                :selectedFiles="modal.selectedFiles" />
        </PopupModal>
        <Loader :isLoading="loading" :fullPage="true" />
    </div>
</template>

<script setup>
import _ from 'lodash';
import SwatchMaterial from '@/components/Admin-components/SwatchMaterial.vue';
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from 'vuex';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { showToast, getGlobalUpdateData, handleFileUpdate } from '@/helper/functions'
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";
import Accordion from "@/components/Admin-components/Accordion.vue";
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import StoreProductServices from '@/services/StoreProductServices';
import { MaterialTreeList, getStoreCategoryTree, getProductSeriesTree, getProductContractTree, getProductCategoryTypeTree, getProductTypeTree } from '@/helper/Apis'
import { statusData, trueFalse, productOptionsType, withBgWithoutBg, capsNOCaps, SimpleFieldsProduct, rightNavSettings, darkLight, productTemplate } from '@/json/data';
import CommonServices from '@/services/CommonServices';
import ProductServices from '@/services/ProductServices';
import PublishAccordion from '@/components/Admin-components/common/PublishAccordion.vue';
import { useGlobalUpdate } from '@/Hooks/useGlobalupdate';
// store and router
const router = useRouter();
const store = useStore();

// Reactive state
const errors = ref({});
const loading = ref(false);
const tagsData = ref([]);
const storeCategoryTree = ref([]);
const form = ref(store.getters.editData || { simple_field: 0, product_option: [], is_store_product: 0, featured_product: 0, status: 1, description: '', product_specs: [], banner_slide: [], logo_right_nav_settings: {}, product_template: 'First Version (OLD)' });
const GlobalUpdateService = form.value.is_store_product ? StoreProductServices.globalUpdateStoreProduct : ProductServices.globalUpdateProduct;
const productContractTree = ref([]);
const productSeriesTree = ref([]);
const productTypeTree = ref([]);
const productCategoryTypeTree = ref([]);
const materialSwatchesList = ref([]);
const MaterialTreeListData = ref([]);
const checkedFields = ref({})
const productsSpecsIndex = ref()
const logo_right_nav = ref('default')
const iswithBg = ref(0)
const iswithBgHeading = ref(0)
const checkBoxFlag = ref(Boolean(form.value.id))
const { handleGlobalUpdate  } = useGlobalUpdate(GlobalUpdateService,'master_product_id');

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

const handleImageFiles = (data) => {
    const media_titles = data.map((item) => item.title);
    imageData.value.image.mediaName = media_titles.join(", ");
    imageData.value.image.images = [...imageData.value.image.images, ...data];
    imageData.value.image.isOpen = false;
    const media_ids = data.map((item) => item.id);
    form.value.product_specs[productsSpecsIndex.value].image = media_ids;
    console.log(imageData.value.image.images);
}

const handleVideoSource = (data) => {
    const media_titles = data.map((item) => item.title);
    imageData.value.video_source.mediaName = media_titles.join(", ");
    imageData.value.video_source.images = data;
    imageData.value.video_source.isOpen = false;
    const media_ids = data.map((item) => item.id);
    form.value.banner_slide = media_ids;

};

// Handle file updates for different image types
const handleFeatureFiles = (data) => handleFileUpdate('featured_image', data, imageData, form, false);
const handlegalleryFiles = (data) => handleFileUpdate('gallery', data, imageData, form, true);
const handleProductSliderFiles = (data) => handleFileUpdate('new_product_slider', data, imageData, form, true);
const handleAdditionalBgImageFiles = (data) => handleFileUpdate('new_product_additional_bg_image', data, imageData, form, false);
const handleAdditionalRightBoxImageFiles = (data) => handleFileUpdate('new_product_additional_right_box_image', data, imageData, form, false);
const handleDownloadablemageFiles = (data) => handleFileUpdate('downloadable_files', data, imageData, form, true);
// const handleImageFiles = (data) => handleFileUpdate('image', data, imageData, form,false);
const handleProductImageFiles = (data) => handleFileUpdate('product_image', data, imageData, form, false);
const handleStoreImageFiles = (data) => handleFileUpdate('store_product_image', data, imageData, form, false);
const handleContractLogoFiles = (data) => handleFileUpdate('contract_logo', data, imageData, form, false);
const handleContractSliderImageFiles = (data) => handleFileUpdate('new_product_additional_right_box_image', data, imageData, form, false);

// Image data for various categories

const imageData = ref({
    featured_image: { isOpen: false, mediaName: 'Feature Image', images: [], selectedFiles: handleFeatureFiles, singleFile: true },
    gallery: { isOpen: false, mediaName: 'Gallery Image', images: [], selectedFiles: handlegalleryFiles, singleFile: false },
    new_product_slider: { isOpen: false, mediaName: 'Gallery Image', images: [], selectedFiles: handleProductSliderFiles, singleFile: false },
    new_product_additional_bg_image: { isOpen: false, mediaName: 'Gallery Image', images: [], selectedFiles: handleAdditionalBgImageFiles, singleFile: true },
    contract_logo: { isOpen: false, mediaName: 'Logo Image', images: [], selectedFiles: handleContractLogoFiles, singleFile: true },
    new_product_additional_right_box_image: { isOpen: false, mediaName: 'Main Slider Image', images: [], selectedFiles: handleAdditionalRightBoxImageFiles, singleFile: true },
    downloadable_files: { isOpen: false, mediaName: 'Main Slider Image', images: [], selectedFiles: handleDownloadablemageFiles, singleFile: false },
    image: { isOpen: false, mediaName: 'Main Slider Image', images: [], selectedFiles: handleImageFiles, singleFile: true },
    product_image: { isOpen: false, mediaName: 'Main Slider Image', images: [], selectedFiles: handleProductImageFiles, singleFile: true },
    store_product_image: { isOpen: false, mediaName: 'Main Slider Image', images: [], selectedFiles: handleStoreImageFiles, singleFile: true },
    video_source: { isOpen: false, mediaName: 'Add Video Source', images: [], selectedFiles: handleVideoSource, singleFile: true },
});

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
const selectedSwatchesData = ref([]);

const updateSelectedSwatchesData = (data) => {
    selectedSwatchesData.value = data;
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
        slide: '',
    });
}
function banner_slide_remove(index) {
    form.value.banner_slide.splice(index, 1)
}

function addFormItem() {
    form.value.product_option.push(formItems.value);
}
function removeFormItem(index) {
    form.value.product_option.splice(index, 1);
}


// Handle form submission (add or edit contract)
const handleSubmit = async () => {
    if (!validateForm()) return;
    const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)
    !form.value.domain_all && delete form.value.domain_all
    loading.value = true;
    form.value.material_swatches = selectedSwatchesData.value?.filter(swatch => swatch.materials.length > 0) || [];

    const { domain, featured_image_url, new_product_slider_url, new_product_additional_bg_image_url, new_product_additional_right_box_image_url,
        downloadable_files_url, product_series_data, contracts_data, product_types_data, product_category_types_data, slug, domains_data, contract_logo_data, default_domain, gallery_urls, contract_location_data, store_category_data, tags_data, contract_type_data, ...payload } = form.value;
    if (!form.value?.domains_data?.includes(form.value.domain_id)) delete payload.id;
    try {
        const service = store.getters.editData ? form.value.is_store_product ? StoreProductServices.editStoreProduct : ProductServices.editProduct : form.value.is_store_product ? StoreProductServices.addStoreProduct : ProductServices.addProduct;
        const res = await service(payload);

        if (res.status === 200 && res.data.success) {
            if (hasCheckedFields) {
                console.log('global update');
                handleGlobalUpdate(form, checkedFields, '/product');
            }
            else {
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

// Fetch Perticular Domain Data
const fetchProductData = async () => {
    loading.value = true
    const payload = { master_product_id: form.value.master_product_id, domain_id: form.value.domain_id }
    try {
        const { status, data } = await ProductServices.getProduct(payload)
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
const fetchAllData = async (payload) => {
    try {
        const [
            contractTree,
            seriesTree,
            categoryTypeTree,
            typeTree,
            swatchesRes,
            materialTreeListData,
            tagsRes,
            storeCategoryTreeRes
        ] = await Promise.all([
            getProductContractTree(payload),
            getProductSeriesTree(payload),
            getProductCategoryTypeTree(payload),
            getProductTypeTree(payload),
            CommonServices.getSwatchesMaterialList(payload),
            MaterialTreeList(payload),
            CommonServices.getTags(payload)
                .then(res => {
                    if (res.status === 200 && res.data.success) {
                        return res.data.data;
                    }
                    throw new Error('Failed to fetch Tags');
                }),
            getStoreCategoryTree(payload)
                .then(data => data)
        ]);

        // Assign the fetched data
        productContractTree.value = contractTree;
        productSeriesTree.value = seriesTree;
        productCategoryTypeTree.value = categoryTypeTree;
        productTypeTree.value = typeTree;

        if (swatchesRes.status === 200 && swatchesRes.data.success) {
            materialSwatchesList.value = swatchesRes.data.data;
        }
        MaterialTreeListData.value = materialTreeListData;
        tagsData.value = tagsRes;
        storeCategoryTree.value = storeCategoryTreeRes;

    } catch (e) {
        console.error('Error while fetching data:', e);
    }

};



// Initialize component state
onMounted(() => {
    if (store.getters.editData) {

        const { featured_image_url, contract_logo_data, new_product_slider_url, store_product_image_data, product_image_data,
            new_product_additional_bg_image_url, new_product_additional_right_box_image_url, downloadable_files_url, gallery_urls, material_swatches } = store.getters.editData;
        imageData.value.featured_image.images = [featured_image_url];
        imageData.value.featured_image.mediaName = featured_image_url?.file_url || 'featured images';
        imageData.value.new_product_additional_bg_image.images = [new_product_additional_bg_image_url];
        imageData.value.new_product_additional_bg_image.mediaName = new_product_additional_bg_image_url?.file_url || 'images';
        imageData.value.new_product_additional_right_box_image.images = [new_product_additional_right_box_image_url];
        imageData.value.new_product_additional_right_box_image.mediaName = new_product_additional_right_box_image_url?.file_url || 'images';
        imageData.value.downloadable_files.images = downloadable_files_url;
        imageData.value.downloadable_files.mediaName = downloadable_files_url?.map(item => item?.file_url).join(', ') || 'featured images';
        imageData.value.new_product_slider.images = new_product_slider_url;
        imageData.value.new_product_slider.mediaName = new_product_slider_url?.map(item => item?.file_url).join(', ') || 'featured images';
        imageData.value.store_product_image.images = [store_product_image_data];
        imageData.value.store_product_image.mediaName = store_product_image_data?.file_url || 'featured images';
        imageData.value.product_image.images = [product_image_data];
        imageData.value.product_image.mediaName = product_image_data?.file_url || 'featured images';
        imageData.value.contract_logo.images = [contract_logo_data];
        imageData.value.contract_logo.mediaName = contract_logo_data?.file_url || 'Contract logo image';
        // imageData.value.contract_slider_image.images = [contract_slider_image_data] ||[];
        // imageData.value.contract_slider_image.mediaName = contract_slider_image_data?.file_url || 'Slider image';;
        imageData.value.gallery.images = gallery_urls;
        imageData.value.gallery.mediaName = gallery_urls?.map(item => item.file_url).join(', ') || 'Gallery images';

        selectedSwatchesData.value = material_swatches;
        fetchAllData({ domain_id: form.value.domain_id });
    }
});

// Watch for domain_id changes to update contract data
watch(() => form.value.domain_id, (newDomainId) => {
    form.value.product_series = null;
    form.value.product_types = null;
    form.value.contracts = null;
    form.value.product_category_types = null;
    form.value.materials = null;
    // form.value.swatches = null;
    fetchAllData({ domain_id: newDomainId });
    if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
        fetchProductData();
    }
});
watch(() => logo_right_nav.value, (newValue) => {
    if (newValue === 'default') {
        form.value.logo_right_nav_settings = {};
    }
});
// Computed Property
const buttonText = computed(() => {
    return (form.value.id ? 'Update' : 'Submit')
})

onBeforeRouteLeave((to, from, next) => {
    store.dispatch('clearEditData');
    next();
});
</script>