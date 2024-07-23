<template>
    <div id="app">
      <div id="google_translate_element"></div>
      <!-- Your application content -->
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  
  onMounted(() => {
    const hostname = window.location.hostname;
  
    // Load Google Translate script dynamically
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
  
    // Initialize Googale Translate when the script loads
    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement({
        pageLanguage: 'fr', // Default language of your site
        includedLanguages: 'en,fr,de', // List of languages you want to support
      }, 'google_translate_element');
  
      // Detect domain and set the language
      const googleTranslateFrame = document.querySelector('.goog-te-banner-frame');
      if (googleTranslateFrame) {
        const lang = 'fr';
        const frame = document.querySelector('iframe');
        if (frame) {
          frame.contentWindow.postMessage({lang: lang}, '*');
        }
      }
    };
  });
  </script>
  
  <style scoped>
  /* Optional: Add any additional custom styles here */
  .goog-te-banner-frame{
    display: hidden;
  
  }
  .VIpgJd-ZVi9od-ORHb-OEVmcd{
    display: none
  }
  </style>
  