<template>
    <div class="bg-white relative pb-5 px-6">
        <div v-if="getFlag == false" class="pt-4">
            <PageHeader> Media Library </PageHeader>
        </div>
        <div class="bg-white flex py-2 justify-between mb-4">
            <div class="my-2 flex p-auto">
                <Breadcrumb :breadcrumbData="breadcrumbData" :handlePopFunction="handlePopFunction" />
            </div>
            <div v-if="getFlag == false" class='my-auto'>
                <Button class="px-2 m-0" bg_th_color="py-2 text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                    @click="openModal">
                    + Add Folder</Button>
                <Button class="px-2 py-2 m-auto" @click="MediaModal">+ Add File</Button>
            </div>
        </div>
        <div class="flex flex-wrap gap-3">
            <div v-for="folder in folders" :key="folder" class="border border-gray text-center w-[80px] px-2">
                <FolderIcon @click="() => {
                    handleGetChildFolders(folder)
                    handleFolderInfo(folder)
                }
                    " class="icon" style="color: #eabf62; height: 60px; width: 60px" />
                <span class="m-auto mt-0 break-all text-[13px] text-wrap w-[20px]">{{ folder?.folder_name }}</span>
                <div v-if="getFlag == false" class="flex gap-1 py-1 pb-2 justify-center">
                    <EditSvg @click="() => {
                        handleFolderInfo(folder)
                        editModal()
                    }
                        " size="18px" />
                    <DeleteSvg @click="() => {
                        handleFolderInfo(folder)
                        deleteModal()
                    }
                        " size="18px" />
                </div>
            </div>
            <div v-for="(media, index) in mediaData" :key="mediaData.id"
                class=" relative border  border-gray-4   text-center w-[120px] ">
                <div class=" p-2">
                <label class="" @click="() => getFlag == false ? mediaEdit(media) : ''">
                    <img v-if="isImage(media.file_url)" :src="filePath(media.file_url)" alt="abc" class="w-26 h-20" />
                    <img v-else-if="isPdf(media.file_url)" class="w-20 h-20" src="@/assets/Icons/pdf.svg"
                        alt="PDF Document" />
                    <img v-else-if="isWord(media.file_url)" class="w-20 h-20" src="@/assets/Icons/msWord.svg"
                        alt="Word Document" />
                    <!-- <img v-else-if="isExcel(media.file_url)" class="w-20 h-20" src="@/assets/Icons/msExcel.svg"
                        alt="Excel Document" /> -->
                    <img v-else-if="isVideo(media.file_url)" class="w-20 h-20" src="@/assets/Icons/video.svg"
                        alt="Video File" />
                    <span v-else>Unknown file format.</span>
                    <span class="m-auto break-all text-[13px] text-wrap w-[20px]">{{ media.title }} </span>
                    <div v-if="getFlag == false" class="m-auto absolute top-0 right-0 " @click.stop="() => {
                        mediaDeleteModal();
                        handleMediaData(media);
                    }">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2 .5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div v-if="getFlag == true" class="m-auto absolute top-0 right-0 ">
                        <input type="checkbox" :id="'media_' + media.id" :checked="isSelected(media)"
                            @change="toggleSelection(media)" />

                    </div>

                    <!-- <div class="flex gap-1 py-1 pb-2 justify-center">
                    <EditSvg @click="() => {
                        handleFolderInfo(folder)
                        editModal()
                        }
                        " size="18px" />
                    <DeleteSvg @click="() => {
                            handleFolderInfo(folder)
                            deleteModal()
                        }
                        " size="18px" />
                </div> -->
                </label>
            </div>
            </div>
        </div>
        <div v-if="btnName " class=" absolute bottom-0 right-4 border m-0  ">
            <Button class="px-2 py-1 mt-auto" bg_th_color=" mt-5 text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                @click="() => selectedFiles([...selectedMedia])">
                {{ btnName }}</Button>
            <Button class="px-2 py-1 mt-auto" @click="() => props.closeModal()">
                Cancel</Button>
        </div>
    </div>
    
    <Loader :isLoading="loading" :fullPage="true" />

    <!-- folders popups -->
    <PopupModal modalTitle="Add Folder" custonClasses="w-[400px] h-[200px] " v-model:isOpen="modalflag.open">
        <div class="mx-3 pt-4">
            <TextInput id="0" type="text" class="block w-[180px] mr-2 h-[33px]" v-model="newFolder"
                placeholder="Folder Name" label="Folder Name" :errMessage="errorMessage" />

            <div class="mt-3">
                <Button class="px-2 py-1 mt-auto" bg_th_color=" mt-5 text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                    @click="handleAddFolders">
                    Add Folder</Button>
                <Button class="px-2 py-1 mt-auto" @click="closeModal"> Cancel</Button>
            </div>
        </div>
    </PopupModal>
    <PopupModal modalTitle="Edit Folder" custonClasses="w-[400px] h-[200px] " v-model:isOpen="modalflag.edit">
        <div class="mx-3 pt-4">
            <TextInput id="0" type="text" class="block w-[180px] mr-2 h-[33px]" v-model="newFolder"
                placeholder="Folder Name" label="Folder Name" :errMessage="errorMessage" />
            <div class="mt-3">
                <Button class="px-2 py-1 mt-auto" bg_th_color=" mt-5 text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                    @click="handleEditFolders">
                    Save changes</Button>
                <Button class="px-2 py-1 mt-auto" @click="closeModal"> Cancel</Button>
            </div>
        </div>
    </PopupModal>
    <DeleteModal v-model:isOpen="modalflag.delete" :modalTitle="'Delete Swatches'" @delete="handleDeleteFolders">
        Do you want to delete ?
    </DeleteModal>

    <!-- media poups -->
    <PopupModal modalTitle="Add File" custonClasses="w-[500px] h-[200px] " v-model:isOpen="mediaModalflag.open">
        <div class="mx-3 pt-4">
            <div class="border border-black rounded-md">
                <ImageUpload @file-selected="handleFileUpload" />
            </div>
            <!-- <span v-if="mediaFIle"> Uploded File :- {{ mediaFIle.name }}</span> -->
            <div class="mt-3">
                <Button class="px-2 py-1 mt-auto" bg_th_color=" mt-5 px-5 text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                    @click="handleAddMedia">
                    Save </Button>
                <Button class="px-2 py-1 mt-auto" @click="closeMediaModal"> Cancel</Button>
            </div>
        </div>
    </PopupModal>
    <!-- Inside the Edit Media PopupModal -->
    <PopupModal modalTitle="Edit Media" customClasses="w-[1000px] h-[570px]" v-model:isOpen="mediaModalflag.edit">
        <div class="mx-3 pt-4">
            <div class="flex">
                <div class="w-4/6 px-5 h-[100%]">
                    <template v-if="isImage(editMediaData.file_url)">
                        <img class="w-full h-[470px]" :src="filePath(editMediaData.file_url)" alt="Image" />
                    </template>
                    <template
                        v-else-if="isPdf(editMediaData.file_url) || isWord(editMediaData.file_url) || isExcel(editMediaData.file_url)">
                        <iframe :src="getGoogleDocsViewerUrl(editMediaData.file_url)" width="100%"
                            height="600px"></iframe>
                    </template>
                    <template v-else-if="isVideo(editMediaData.file_url)">
                        <video controls>
                            <source :src="editMediaData.file_url" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </template>
                    <template v-else>
                        File type not supported for embedding.
                    </template>
                </div>
                <div class="w-2/6 border">
                    <TextInput id="editTitle" type="text" class="block w-[180px] mr-2 h-[33px]"
                        v-model="editMediaData.title" placeholder="Title" label="Title" :errMessage="errorMessage" />
                    <TextInput id="editCaption" type="text" class="block w-[180px] mr-2 h-[33px]"
                        v-model="editMediaData.caption" placeholder="Caption" label="Caption"
                        :errMessage="errorMessage" />
                    <TextInput id="editAltText" type="text" class="block w-[180px] mr-2 h-[33px]"
                        v-model="editMediaData.alternative_text" placeholder="Alternative Text" label="Alternative Text"
                        :errMessage="errorMessage" />
                    <TextInput id="editDescription" type="text" :isTextarea="true" rows="4"
                        class="block w-[180px] mr-2 h-[33px]" v-model="editMediaData.description"
                        placeholder="Description" label="Description" :errMessage="errorMessage" />
                    <Button class="px-6 m-0" bg_th_color="py-2 text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                        @click="handleEditMedia">
                        Save
                    </Button>
                    <Button class="px-4 py-2 m-auto" @click="closeMediaModal">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    </PopupModal>

    <DeleteModal v-model:isOpen="mediaModalflag.delete" :modalTitle="'Delete Media File'" @delete="handleDeleteMedia">
        Do you want to delete Media File ?
    </DeleteModal>

</template>

<script setup>
import { FolderIcon } from '@heroicons/vue/20/solid'
import { filePath } from '@/helper/functions'
import { showToast } from '@/helper/functions'
import Breadcrumb from '@/components/Admin-components/Breadcrumb.vue'
import FolderServices from '@/services/MediaAndFolderServices'
import ImageUpload from '@/components/Admin-components/form-components/ImageUpload.vue'
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
    getFlag: {
        type: Boolean,
        default: false,
    },
    singleFile: {
        type: Boolean,
        default: false,
    },
    btnName: {
        type: String,
    },
    closeModal: {
        type: Function,
    },
    selectedFiles: {
        type: Function,
    },
    selected: {
        type: Array,
    }
})

const loading = ref(false)
const folders = ref([])
const mediaData = ref([])
const SelectedFolder = ref({ id: 0 })
const newFolder = ref()
const mediaFIle = ref()
const errorMessage = ref()
const breadcrumbData = ref([])
const selectedMedia = ref(props.selected || [])
const breadcrumbFlag = ref(true)

const isSelected = (media) => {
    if (!Array.isArray(selectedMedia.value)) {
        return false; 
    }
    return selectedMedia.value.some(item => item?.id === media?.id);
};


const toggleSelection = (media) => {
    if (props.singleFile) {
        if (isSelected(media)) {
            selectedMedia.value = [];
        } else {
            selectedMedia.value = [media];
        }
    } else {
        const index = selectedMedia.value.findIndex(item => item.id === media.id);
        if (index !== -1) {
            selectedMedia.value.splice(index, 1);
        } else {
            selectedMedia.value.push(media);
        }
    }
};

// modal handle
// modal
const mediaModalflag = ref({
    open: false,
    edit: false,
    delete: false,
    mediaUpload: false
})
const modalflag = ref({
    open: false,
    edit: false,
    delete: false,

})
const openModal = () => {
    newFolder.value = ''
    modalflag.value.open = true
}
const editModal = () => {
    modalflag.value.edit = true
}
const deleteModal = () => {
    modalflag.value.delete = true
}
const closeModal = () => {
    modalflag.value.open = false
    modalflag.value.edit = false
    modalflag.value.delete = false
    modalflag.value.mediaUpload = false
    errorMessage.value = false
}

// media modals
const closeMediaModal = () => {
    editMediaData.value = null
    mediaModalflag.value.open = false
    mediaModalflag.value.edit = false
    mediaModalflag.value.delete = false
    mediaModalflag.value.mediaUpload = false
}

const MediaModal = () => {
    mediaModalflag.value.open = true
}
const handleFileUpload = (file) => {
    mediaFIle.value = file
}
const editMediaData = ref(null)
const mediaEdit = (data) => {
    mediaModalflag.value.edit = true;
    editMediaData.value = data;
}
const deleteMediaData = ref(null)
const mediaDeleteModal = () => {
    mediaModalflag.value.delete = true;
}
const handleMediaData = (data) => {
    deleteMediaData.value = data.id
}

const handleFolderInfo = (data) => {
    newFolder.value = data.folder_name
    SelectedFolder.value = {...data}
    const idExists =breadcrumbData.value.some(item => item.id === SelectedFolder.value.id);
    if(!idExists)
    breadcrumbData.value.push(data)
}
const handlePopFunction = (slice) => {

    if (breadcrumbData.value.length > 0) {
        breadcrumbData.value = breadcrumbData.value.slice(0, slice + 1);
    }
    let previousPage;
    if (Array.isArray(breadcrumbData.value) && breadcrumbData.value.length > 0) {
        previousPage = breadcrumbData.value[breadcrumbData.value.length - 1];

        if (previousPage && previousPage.id !== undefined) {
            handleGetChildFolders({ id: previousPage.id });
        } else {
            handleGetChildFolders({ id: 0 });
        }
    } else {
        handleGetChildFolders({ id: 0 });
    }
};

const getGoogleDocsViewerUrl = (url) => {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(`${filePath(url)}`)}&embedded=true`;
}

const handleGetChildFolders = async (folder) => {
    try {
        mediaData.value = [];
        SelectedFolder.value = folder;
        const payload = { id: folder.id };
        const res = await FolderServices.GetFolderChild(payload);
        if (res.status === 200 && res.data.success === true) {
            folders.value = res.data.data;
            handleGetMediaChild(payload);
            
        }
    } catch (e) {
        console.error('Error while getting child folders:', e);
    }
};

const handleAddFolders = async () => {
    try {
        loading.value = true;
        const payload = { parent: SelectedFolder.value.id, folder_name: newFolder.value };
        const res = await FolderServices.AddFolder(payload);
        if (res.status === 200 && res.data.success === true) {
            closeModal();
            showToast(' Create folder sucessfully','success')
            const parent_id = { id: res.data.data.parent };
            await handleGetChildFolders(parent_id);
        } else if (res.status === 400) {
            errorMessage.value = res.message;
            showToast('Somthing went wrong','error')
        }
    } catch (e) {
        console.error('Error while adding folder:', e);
    } finally {
        loading.value = false;
    }
};

const handleEditFolders = async () => {
    try {
        loading.value = true;
        const payload = {
            id: SelectedFolder.value.id,
            parent: SelectedFolder.value.parent,
            folder_name: newFolder.value
        };
        const res = await FolderServices.EditFolder(payload);
        if (res.status === 200 && res.data.success === true) {
            closeModal();
            showToast(' Edit folder sucessfully','success')
            const parent_id = { id: SelectedFolder.value.parent };
            if (SelectedFolder.value.parent > 0) {
                await handleGetChildFolders(parent_id);
            } else {
                await handleGetFolders();
            }
        } else if (res.status === 400) {
            errorMessage.value = res.message;
            showToast(' Somthing went wrong','success')
        }
    } catch (e) {
        console.error('Error while editing folder:', e);
    } finally {
        loading.value = false;
    }
};

const handleDeleteFolders = async () => {
    try {
        loading.value = true;
        const payload = { id: SelectedFolder.value.id };
        const parent_id = { id: SelectedFolder.value.parent };
        const res = await FolderServices.DeleteFolder(payload);
        if (res.status === 200 && res.data.success === true) {
            showToast(res.data.message,'success')
            await handleGetChildFolders(parent_id);
            closeModal();
        }
        if(res.status === 400){
            showToast('Somthing went wrong','error')
        }
    } catch (e) {
        console.error('Error while deleting folder:', e);
    } finally {
        loading.value = false;
    }
};


// madia apis
const handleGetMediaChild = async (payload) => {
    try {
        await FolderServices.GetMediaChild(payload)
            .then((res) => {
                if (res.status === 200 && res.data.success === true) {
                    mediaData.value = res.data.data
                }
            })
            .catch((e) => {
                console.error('Error while folder get:', e)
            })
    } catch (e) {
        console.error('Error while folder get:', e)
    }
}
// const handleGetMedia = async () => {
//     try {
//         loading.value = true
//         await FolderServices.GetMedia()
//             .then((res) => {
//                 if (res.status === 200 && res.data.success === true) {
//                     console.log('folders: ' + res.data)
//                     mediaData.value = res.data.data
//                     loading.value = false
//                 }
//             })
//             .catch((e) => {
//                 console.error('Error while folder get:', e)
//             })
//     } catch (e) {
//         console.error('Error while folder get:', e)
//     }
// }
const handleAddMedia = async () => {
    try {
        loading.value = true
        const payload = { image: mediaFIle.value, folder_id: SelectedFolder.value.id }
        const res = await FolderServices.AddMedia(payload)
        if (res.status === 200) {
            loading.value = false
            handleGetMediaChild({ id: SelectedFolder.value.id });
            closeMediaModal();
            showToast(' Add file sucessfully','success')
            // if (SelectedFolder.value.parent > 0) {
            //     handleGetChildFolders({ id: res.data.data.parent })
            // } else {
            //     handleGetFolders()
            // }
        }
        if (res.status_code === 400) {
            loading.value = false
            errorMessage.value = res.message
            showToast('Somthing went wrong','success')
        }
    } catch (e) {
        loading.value = false
        console.error('Error while add folder get:', e)
    }
}
const handleEditMedia = async () => {
    try {
        loading.value = true
        const payload = {

            ...editMediaData.value,
            // folder_id: SelectedFolder.value.id,
        }
        const parent_id = { id: SelectedFolder.value.parent }

        await FolderServices.EditMedia(payload)
            .then((res) => {
                if (res.status === 200) {
                    loading.value = false
                    closeMediaModal();
                    showToast(' Edit file sucessfully','success')
                    // if (SelectedFolder.value.parent > 0) {
                    //     handleGetChildFolders(parent_id)
                    // } else {
                    //     handleGetFolders()
                    // }
                }
                if (res.status_code === 400) {
                    loading.value = false
                    errorMessage.value = res.message
                    showToast('Somthing went wrong','success')
                }
            })
            .catch((e) => {
                console.error('Error  while Add folder :', e)
                closeModal()
                loading.value = false
            })
    } catch (e) {
        console.error('Error while add folder get:', e)
    }
}
const handleDeleteMedia = async () => {
    try {
        // loading.value = true
        const payload = { id: deleteMediaData.value }
        await FolderServices.DeleteMedia(payload)
            .then((res) => {
                if (res.status === 200) {
                    handleGetMediaChild({ id: SelectedFolder.value.id });
                    loading.value = false
                    showToast(' Delete file sucessfully','success')
                    // if (SelectedFolder.value.parent > 0) {
                    //     handleGetChildFolders(parent_id)
                    // } else {
                    //     handleGetFolders()
                    // }
                    // handleGetChildFolders({payload})
                    closeModal()
                }
                if(res.status ===400){
                    loading.value = false
                    showToast('Somthing went wrong','success')
                }
            })
            .catch((e) => {
                console.error('Error delet file :', e)
            })
    } catch (e) {
        console.error('Error while delete file :', e)
    }
}

onMounted(() => {
    handleGetChildFolders({ id: 0 })
    handleGetMediaChild({ id: 0 })
})

const isImage = (url) => /\.(jpg|jpeg|png|gif)$/i.test(url);
const isPdf = (url) => /\.pdf$/i.test(url);
const isWord = (url) => /\.(doc|docx)$/i.test(url);
const isExcel = (url) => /\.(xls|xlsx)$/i.test(url);
const isVideo = (url) => /\.(mp4|avi|mkv|mov)$/i.test(url);

</script>
