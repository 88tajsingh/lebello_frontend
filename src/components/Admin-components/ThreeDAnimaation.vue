<script setup lang="ts">
import { TresCanvas, UseLoader } from '@tresjs/core';
import { GLTFModel,FBXModel, OrbitControls } from '@tresjs/cientos'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';  
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'; 
import { useGLTF } from '@tresjs/cientos'

import { Object3D } from 'three';  
import { Suspense, ref, watchEffect } from 'vue';

type GLTFResult = import('three/examples/jsm/loaders/GLTFLoader').GLTF;
type OBJResult = Object3D;  
const defaultFilePath = 'src/assets/House_001_GLB.glb';  

const props = defineProps({
  file: {
    type: File,
    required: false,  
    default: () => defaultFilePath, 
  },
});

const loader = ref<any>(null); 
const objectUrl = ref<THREE.Object3D>('');  

watchEffect(() => {
  if (props.file) {
    const filePath = typeof props.file === 'string' ? props.file : '';
    objectUrl.value = filePath;

    const extension = filePath.split('.').pop()?.toLowerCase();
    if (extension === 'glb' || extension === 'gltf') {
      loader.value = GLTFLoader;  
    } else if (extension === 'obj') {
      loader.value = OBJLoader;  
    }
  }
});

</script>

<template>
  <TresCanvas class='w-full h-full ' clear-color="#ffffff">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Suspense>
      <!-- <UseLoader v-if="objectUrl" v-slot="{ data }" :loader="loader" :url="objectUrl"> -->
        <!-- <primitive
          v-if="loader === GLTFLoader"
          :object="(data as GLTFResult).scene"
          :position="[0, 0, 0]"
          :scale="[0.5, 0.5, 0.5]"
        />
        <primitive
          v-if="loader === OBJLoader"
          :object="data as OBJResult"  
          :position="[0, 0, 0]"
          :scale="[0.5, 0.5, 0.5]"
        /> -->

        
      <!-- </UseLoader> -->
      <!-- <GLTFModel  path="src/assets/House_001_GLB.glb" /> -->
      <FBXModel
        path="src/assets/uploads_files_3400441_Aster+Luxury+Armchair.fbx"
        :scale=".175"
      />
    </Suspense>
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="1.2"  />
  </TresCanvas>
</template>

<style>
/* html, */
/* body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
} */

/* #app {
  height: 100%;
  width: 100%;
  background-color: #000;
} */
</style>
