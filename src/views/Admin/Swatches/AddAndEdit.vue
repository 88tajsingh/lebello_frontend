<template>
        <PageHeader >Add Swatches</PageHeader>
            <DefaultCard >
        <form @submit.prevent="" class="mb-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <div>
                        <TextInput id="title" type="text" class="block w-full text-lg  py-5 mr-2 h-[33px]"
                            v-model="form.title" placeholder="Add Title" label="" :message="errors?.title" />
                    </div>
                    <div class="mt-5">
                        <Accordion open="false" header="Description">
                            <InputLabel >Description</InputLabel>                               
                                    <div class="mb-2">
                                        <Button @click="handleSubmit" type="">
                                            <span class="flex">
                                                <svg class="text-black hover:text-white" fill="text-textColor2"
                                                    width="20px" height="20px" viewBox="0 0 1920 1920"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                        stroke-linejoin="round"></g>
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
                                        <Button @click="handleSubmit" type="" class="ml-0">
                                            <span class="flex">
                                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="#0a4b78"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                        stroke-linejoin="round"></g>
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
                        </Accordion>
                    </div>
                    <div class="mt-5 px-6">
                        <TextInput id="title" type="text" class="block w-full mr-2 h-[33px]"
                            v-model="form.trade_mark_label" placeholder="" label="Trade Mark Label
                 " :message="errors?.trade_mark_label" />
                    </div>
                    <div class="mt-5">
                        <Accordion open="false" header="Material Options">
                            <div class="my-5 px-6 flex h-auto items-center">    
                                    <div class=" items-center text-gray-600 text-sm">
                                        <TextInput  type="number" class="block w-[180px] mr-2 h-[33px]"
                                            v-model="form.term_key" placeholder="Term key" label="Term key"
                                            :message="errors.term_key" />
                                        <span>The material term id. This is generated from material taxonomy.
                                            Please do not make any changes here.
                                        </span>
                                </div>
                            </div>      
                                    <div class="px-6 items-center text-gray-600 text-sm">
                                        <TextInput id="" type="number" class="block w-[180px] mr-2 h-[33px]"
                                            v-model="form.material_item" placeholder="Material item" label="Material item"
                                            :message="errors.material_item" />

                                        <span>Put material taxonomy term id. Seperate with commas.</span>
                                    </div>     
                                    <div class="px-6 mt-2 items-center text-gray-600 text-sm">
                                        <TextInput id=" " type="text" class="block w-[180px] mr-2 h-[33px]"
                                            v-model="abc" placeholder="Group Name" label="Group Name" />
                                    </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion open="false" header="Seo Options">
                           
                                    <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                        <TextInput id=" " type="text" class="block w-[180px] mr-2 h-[33px]"
                                            v-model="form.seo_title" placeholder="Title Tag" label="Title Tag"
                                            :message="errors.seo_title" />
                                        <span>Custom title tag.</span>
                                 </div> 
                                    <div class="px-6 mt-3 items-center text-gray-600 text-sm">
                                        <TextInput id=" " isTextarea="true" rows='4' type="text"
                                            class="block w-[180px] mr-2 h-[33px]" v-model="form.seo_description"
                                            placeholder="Meta Description" label="Meta Description" :message="errors.seo_description" />
                                        <span>Most search engines use a maximum of 160 chars for the description.
                                        </span>
                                    </div>
                                    <div class="mx-6 mt-3 items-center text-gray-600 text-sm">
                                        <TextInput id=" " isTextarea="true" rows='4' type="text"
                                            class="block w-[180px] mr-2 h-[33px]" v-model="form.meta_keywords"
                                            placeholder="Meta Keywords" label="Meta Keywords" :message="errors.meta_keywords" />
                                        <span>Seperate each term with comma.</span>
                                    </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion open="false" header="Image Overlay">
                            <div class="flex ">
                                <div class="w-1/6 py-auto ml-3 mt-3  ">
                                    Image Upload
                                </div>
                                <div class="w-5/6 mx-2 my-2">
                                    <ImageUpload2 @file-selected="handleImage_Overlay"
                                        :accepted-formats="['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx']" />
                                    <InputError class="mt-2" :message="errors.featured_image" />

                                </div>
                            </div>
                        </Accordion>
                    </div>
                </div>

                <div class="col-span-4">
                    <Accordion header="Publish" open="false">
                        <div class="px-1 py-3">
                            <div class="flex justify-between mb-2">
                                <LinkBtn click="route('add.swatches')" :buttonText="'Preview'" />
                                <Button @click="handleSubmit" type="submit">
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
                            </div>

                            <div id="wraper Publish ">
                                <div>
                                    <span class="text-sm flex items-center m-auto">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                stroke-linejoin="round">
                                            </g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                                                    stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                                            </g>
                                        </svg> <span class="ml-1">
                                            Publish :
                                            <strong class="text-gray-600"> immediately</strong>
                                        </span>
                                        <Button v-if="!showHidePublish.Publish" type=""
                                            @click="showHidePublish.Publish = !showHidePublish.Publish"
                                            class="ml-2 text-sm border-none underline">
                                            Edit</Button>
                                    </span>
                                </div>
                                <div v-if="showHidePublish.Publish">
                                    <Dropdown :options="menuItems" @optionSelected="handleOptionSelected" />
                                    <LinkBtn click="route('add.swatches')" class=" " :buttonText="'ok'" />
                                    <Button type="" @click="showHidePublish.Publish = !showHidePublish.Publish"
                                        class="ml-2 text-sm border-none underline">Cancel</Button>
                                </div>
                            </div>
                        </div>
                        <div class="bg-[#f6f7f7] flex py-3">
                            <Button type="" bg_th_color="text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                                class=" text-sm ml-auto px-3 py-2">
                                Publish
                            </Button>
                        </div>
                    </Accordion>
                    <div class="mt-3 ">
                        <Accordion open="false" header="Materials Template">
                            <div class="mt-2 px-6 flex h-auto ">
                                <div class="w-2/6 px-2 my-3">Use New Material Template</div>
                                <div class="w-4/6 m-auto ">
                                    <CheckBox :checked="isChecked" @update:checked="updateChecked" label=""
                                        v-model="isChecked" class="" />
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion open="false" header="Materials">
                            <div class="mt-2 px-6 flex h-auto ">
                                <div class="w-full">
                                    <Tabs id="tab1" :initialTabs="tabs" />
                                </div>
                            </div>
                        </Accordion>
                    </div>

                    <div class="mt-3 ">
                        <Accordion open="false" header="Tab Posiotion Options">
                            <div class="mt-2 px-6 flex h-auto ">
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion open="false" header="Swatches Options Material">
                            <div class="my-5 px-6  h-auto ">
                                <TextInput id="title" type="text" class="block w-full mr-2 h-[33px]"
                                    v-model="form.material_teaser_text" placeholder="" label="Material text overlay"
                                    :message="errors.material_teaser_text" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion open="false" header="Featured image">
                            <div class="my-5 px-6  h-auto ">
                                <!-- <LinkBtn :click="route('add.swatches')" class="text-sm border-none underline "
                                :buttonText="'set Featured image'" /> -->
                                <InputLabel for="Featured_image" value="Featured_image" />


                                <ImageUpload2 @file-selected="handleFeaturedImg"
                                    :accepted-formats="['jpg', 'jpeg', 'png']" />

                                <!-- <input
                    id="featured_image"
                    type="file"
                    @input="form.featured_image = $event.target.files[0]"
                /> -->
                                <InputError class="mt-2" :message="errors?.featured_image" />
                            </div>
                        </Accordion>
                    </div>
                    <!-- Teaser -->
                    <div class="mt-5">
                        <Accordion open="false" header="Description">
                            <div class="mt-2 px-6 flex h-auto">
                                <div class="w-2/6">Material teaser text</div>
                                <div class="w-4/6">
                                    <Button @click="handleSubmit" type="">
                                        <span class="flex">
                                            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                    stroke-linejoin="round"></g>
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
                                    <Button @click="handleSubmit" type="">
                                        <span class="flex">
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                    stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path
                                                        d="M16.2857 20C19.4416 20 22 17.4717 22 14.3529C22 11.8811 20.393 9.78024 18.1551 9.01498C17.8371 6.19371 15.4159 4 12.4762 4C9.32028 4 6.7619 6.52827 6.7619 9.64706C6.7619 10.3369 6.88706 10.9978 7.11616 11.6089C6.8475 11.5567 6.56983 11.5294 6.28571 11.5294C3.91878 11.5294 2 13.4256 2 15.7647C2 18.1038 3.91878 20 6.28571 20H16.2857Z"
                                                        fill="#1C274C"></path>
                                                </g>
                                            </svg> <span class="ml-1">
                                                Add Weather
                                            </span>
                                        </span>
                                    </Button>
                                    <!-- <TinyMCE v-model="form.description" /> -->
                                    <p class="text-sm text-gray-600 my-2"> The material term id. This is generated from
                                        material
                                        taxonomy. Please do not make any changes here. </p>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                </div>
            </div>
        </form>
    </DefaultCard>
</template>
<script setup>
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import TextInput from '@/components/Admin-components/form-components/TextInput.vue'
import Checkbox from '@/components/Admin-components/form-components/CheckBox.vue';
import Accordion from "@/components/Admin-components/Accordion.vue";
import Button from "@/components/Admin-components/Buttons/Button.vue";
import Dropdown from "@/components/Admin-components/form-components/Select.vue";
import ImageUpload2 from "@/components/Admin-components/form-components/ImageUpload2.vue"
import { ref } from "vue";
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import LinkBtn from "@/components/Admin-components/Buttons/LinkBtn.vue";
import RadioBtn from "@/components/Admin-components/form-components/RadioBtn.vue";
import Tabs from '@/components/Admin-components/Tabs.vue';
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";

const errors = ref({})

const tabs = ref([
    {
        header: "All Material",
        content: [
            {
                id: 237, name: "Table Surfaces", subList: [
                    { id: 176, name: "PC Colors" },
                    { id: 197, name: "Peel Fibers" },
                    { id: 211, name: "Group 1 Fabrics" },
                ]
            },
            {
                id: 237, name: "Table Surfaces", subList: [
                    { id: 176, name: "PC Colors" },
                    { id: 197, name: "Peel Fibers" },
                    { id: 211, name: "Group 1 Fabrics" },
                ]
            },
            {
                id: 237, name: "Table Surfaces", subList: [
                    { id: 176, name: "PC Colors" },
                    { id: 197, name: "Peel Fibers" },
                    { id: 211, name: "Group 1 Fabrics" },
                ]
            },

        ],
    },
    {
        header: "Most Use",
        content: [
            { id: 237, name: "Table Surfaces" },
            { id: 176, name: "PC Colors" },
            { id: 197, name: "Peel Fibers" },
            { id: 211, name: "Group 1 Fabrics" },
            { id: 218, name: "Group 2 Fabrics" },
            { id: 444, name: "Sunbrella / Custom" },
            { id: 437, name: "Sunproof" },
            { id: 433, name: "Surface Tex" },
            { id: 374, name: "Teak Surfaces" },
            { id: 419, name: "Knittex" }
        ],
    },
]);
const submitData = (data) => {
    console.log("form data", data)
}
const props = defineProps({
    swatch: {
        type: Object,
        default: {},
    },
});
const showHidePublish = ref({
    Status: false,
    Visibility: false,
    Publish: false,
});

// checkbox
const isChecked = ref(false);
const updateChecked = (value) => {
    isChecked.value = value;
};

// radio button
const menuItems = [
    { text: "May 2023", value: "dashboard" },
    { text: "July 2016", value: "settings" },
    { text: "February 2016", value: "earnings" },
    { text: "March 2014", value: "signout" },
];

const editorValue = ref('')
function updateEditorValue(newValue) {
    form.description = newValue.value;
    console.log(newValue)
}

const options = ref([
    { title: "Option 1" },
    { title: "Option 2" },
    { title: "Option 3" },
]);


const selected = ref("");
const handleOptionSelected = (option) => {
    selected.value = option;
};

const selectedOption = ref(null);

const handleOptionChange = (option) => {
    console.log(option);
    selectedOption.value = option;
};
const handleFeaturedImg = (file) => {
    console.log('Selected file:', file);
    form.featured_image = file;
}
const handleImage_Overlay = (file) => {
    console.log('Selected file:', file);
    form.image_overlay = file;
}


const form = ref({
    id: props.swatch.id || '',
    title: props.swatch.title || '',
    featured_image: props.swatch.featured_image || '',
    trade_mark_label: props.swatch.trade_mark_label || '',
    material_teaser_text: props.swatch.material_teaser_text || '',
    description: props.swatch.description || '',
    material_item: props.swatch.material_item || '',
    term_key: props.swatch.term_key || '',
    seo_title: props.swatch.seo_title || '',
    seo_description: props.swatch.seo_description || '',
    meta_keywords: props.swatch.meta_keywords || '',
    image_overlay: props.swatch.image_overlay || '',
});

console.log('form ', form)

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