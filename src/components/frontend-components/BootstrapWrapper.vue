<template>
    <div class="bootstrap-wrapper">
      <!-- Slot allows content to be passed from the parent component -->
      <slot ></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BootstrapWrapper',
  };
  </script>
  
  <style scoped>
  .bootstrap-wrapper {
    /* Resets styles inside the wrapper to ensure isolation */
    all: unset;
  }
  
  .bootstrap-wrapper * {
    /* Reset all child elements inside the wrapper and ensure Bootstrap works */
    all: unset;
    display: revert;
  }
  
  .bootstrap-wrapper .b-alert,
  .bootstrap-wrapper .b-button {
    /* Example: Adding specific class styles that apply only to Bootstrap elements */
    display: block;
  }
  
  .bootstrap-wrapper .b-alert {
    margin-bottom: 15px;
  }
  </style>
  