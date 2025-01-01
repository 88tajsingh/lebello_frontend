<template>
    <div id="KeyShotXR" class='border border-red w-full z-[999] overflow-y-hidden bg-white'></div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  
  let keyshotXR;
    console.log('window.innerWidth', window.innerWidth);
  const initKeyShotXR = () => {
    if (typeof keyshotXR !== 'undefined' && keyshotXR) {
      const nameOfDiv = "KeyShotXR";
      const folderName = "src/assets/Stone Tables White Background.1";
      const viewPortWidth = window.innerWidth;
      const viewPortHeight =  window.innerHeight;
      const backgroundColor = "#ffffff";
      const uCount = 10;
      const vCount = 10;
      const uWrap = true;
      const vWrap = true;
      const uMouseSensitivity = -0.0277778;
      const vMouseSensitivity = 0.0277778;
      const uStartIndex = 5;
      const vStartIndex = 0;
      const minZoom = 1;
      const maxZoom = 2;
      const rotationDamping = 0.96;
      const downScaleToBrowser = true;
      const addDownScaleGUIButton = false;
      const downloadOnInteraction = false;
      const imageExtension = "png";
      const showLoading = true;
      const loadingIcon = "ks_logo.png"; 
      const allowFullscreen = true; 
      const uReverse = false;
      const vReverse = false;
      const hotspots = {};
      const isIBooksWidget = false;
  
      const keyshotXRInstance = new keyshotXR(nameOfDiv, folderName, viewPortWidth, viewPortHeight, backgroundColor, uCount, vCount, uWrap, vWrap, uMouseSensitivity, vMouseSensitivity, uStartIndex, vStartIndex, minZoom, maxZoom, rotationDamping, downScaleToBrowser, addDownScaleGUIButton, downloadOnInteraction, imageExtension, showLoading, loadingIcon, allowFullscreen, uReverse, vReverse, hotspots, isIBooksWidget);
    } else {
      console.error('keyshotXR is not available or not a constructor.');
    }
  };
  
  const loadKeyShotXRScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/src/assets/KeyShortXR.js'; 
      script.onload = () => {
        resolve();
      };
      script.onerror = (err) => {
        reject(new Error('Failed to load KeyShotXR.js'));
      };
      document.head.appendChild(script);
    });
  };
  
  onMounted(async () => {
    try {
      await loadKeyShotXRScript();
      let retries = 0;
      const interval = setInterval(() => {
        if (window.keyshotXR && retries < 10) {
          keyshotXR = window.keyshotXR; 
          initKeyShotXR(); 
          clearInterval(interval); 
        } else if (retries >= 10) {
          console.error('keyshotXR is still undefined after 10 retries');
          clearInterval(interval); 
        }
        retries++;
      }, 500); 
    } catch (error) {
      console.error('Error loading KeyShotXR:', error);
    }
  });
  </script>
  
  <style scoped>
  #KeyShotXR {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #ffffff;
  }
  </style>
  