<template>
    <label class="filelabel" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
      <i :class="iconClass"></i>
      <span class="title">{{ fileName }}</span>
      <input class="FileUpload1" id="FileInput" name="booking_attachment" type="file" @change="handleFileChange"/>
    </label>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    acceptedFormats: {
      type: Array,
      default: () => ['jpg', 'jpeg', 'png']
    }
  });
  
  const emits = defineEmits(['file-selected']);
  
  const fileName = ref('Upload Image');
  const iconClass = ref('fa fa-paperclip');
  
  const handleFileChange = (e) => {
    const newFileName = e.target.value.split('\\').pop();
    const extension = newFileName.split('.').pop();
    if (!props.acceptedFormats.includes(extension)) return;
  
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
        iconClass.value = 'fa fa-file-image-o';
        break;
      case 'pdf':
        iconClass.value = 'fa fa-file-pdf-o';
        break;
      case 'doc':
      case 'docx':
        iconClass.value = 'fa fa-file-word-o';
        break;
      default:
        iconClass.value = 'fa fa-file-o';
        break;
    }
  
    fileName.value = newFileName ? (newFileName.length > 10 ? newFileName.slice(0, 4) + '...' + extension : newFileName) : 'Add File';
    emits('file-selected', e.target.files[0]);
  };
  
  const handleMouseOver = () => {
    // Change styles on hover
  };
  
  const handleMouseLeave = () => {
    // Reset styles on mouse leave
  };
  </script>
  
  <style scoped>
  .filelabel {
    width: 120px;
    border: 2px dashed grey;
    border-radius: 5px;
    display: block;
    padding: 5px;
    transition: border 300ms ease;
    cursor: pointer;
    text-align: center;
    margin: 0;
  }
  .filelabel i {
    display: block;
    font-size: 30px;
    padding-bottom: 5px;
  }
  .filelabel i,
  .filelabel .title {
    color: grey;
    transition: 200ms color;
  }
  .filelabel:hover {
    border: 2px solid #1665c4;
  }
  .filelabel:hover i,
  .filelabel:hover .title {
    color: #1665c4;
  }
  #FileInput {
    display: none;
  }
  </style>
  