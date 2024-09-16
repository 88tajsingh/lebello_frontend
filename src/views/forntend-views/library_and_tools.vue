<template>
    <NavBar :absolute="false"></NavBar>
    <div class="mt-5 flex px-10 ">
        <div class="">
            <div v-for="(company, index) in data.companies" :key="index" class="company m-10 p-4 bg-paritGreen  mr-5">
                <div class="mb-10">
                    <p><span class="bg-white p-2 font-graphik text-[24px] mb-2">{{ company.title }}</span></p>
                    <p class="mt-3"><span class="bg-white p-2  font-graphik text-[24px] ">{{ company.subtitle }}</span>
                    </p>
                </div>
                <div class="flex justify-between pt-10">
                    <p class="bg-white pl-4 pr-10  py-5">{{ company.description }}</p>
                    <img class="ml-10" :src="company.imageUrl" :alt="company.title" width="138" height="93">
                </div>
            </div>
        </div>
        <div class="mr-10 p-3 pl-5 ">
            <ul>
                <p class="  pb-6 pt-10 text-blue hover:text-paritGreen uppercase text-[14px] font-graphikMedium">company
                </p>
                <li v-for="(item, ubIndex) in data.list" :key="ubIndex"
                    class="text-[13px] w-[150px] border-b hover:text-green text-blue cursor-pointer border-[rgba(122,120,120,0.37)]">
                    <a :href="item.link">{{ item.name }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from '@/components/frontend-components/Nav-bar.vue';

const data = ref({
    companies:
        [
            {
                title: 'Library & Tools',
                subtitle: 'Product Registration',
                description: 'Available soon for product released after 02/09. Serial numbers are at the bottom of the legs or base.',
                imageUrl: 'https://lebello.com/wp-content/uploads/2013/12/Serial.jpg'
            },
            {
                title: 'Library & Tools',
                subtitle: 'Assembly Instructions',
                description: 'Please select from the list below to download the instructions. Adobe Acrobat is required to open the file.',
                imageUrl: 'https://lebello.com/wp-content/uploads/2013/12/Asembly.jpg'
            },
            {
                title: 'Library & Tools',
                subtitle: 'Maintenance & Care',
                description: 'For cleaning and maintenance instructions including...',
                imageUrl: 'https://lebello.com/wp-content/uploads/2013/12/Maintenance3.jpg'
            },
            {
                title: 'Library & Tools',
                subtitle: 'Image Library',
                description: 'High resolutions outdoor and indoor product images available in 300 dpi for print and media publications.',
                imageUrl: 'https://lebello.com/wp-content/uploads/2013/11/Image-Library.jpg'
            },
            {
                title: 'Library & Tools',
                subtitle: 'Lebello Cut Sheet',
                description: 'Download individual product cut sheet that provide detailed product dimensions, material options and specifications.',
                imageUrl: 'https://lebello.com/wp-content/uploads/2013/11/Lebello-Cut-Sheet.jpg'
            },
            {
                title: 'Library & Tools',
                subtitle: 'Product Catalogs',
                description: 'Download a PDF version of our current or past catalog. For the most current up to date information visit...',
                imageUrl: 'https://lebello.com/wp-content/uploads/2013/11/Binder.jpg'
            }
        ],
    list: [
        { name: "Australia, Brisbane", link: "https://lebello.com/dealer/brisbane/" },
        { name: "Australia, Melbourne", link: "https://lebello.com/dealer/melbourne/" },
        { name: "Australia, Sydney", link: "https://lebello.com/dealer/sydney/" },
        { name: "Bahrain", link: "https://lebello.com/dealer/bahrain/" },
        { name: "Boston", link: "https://lebello.com/dealer/boston/" },
        { name: "Botswana", link: "https://lebello.com/dealer/botswana/" },
        { name: "Canada", link: "https://lebello.com/dealer/canada/" },
        { name: "Hong Kong", link: "https://lebello.com/dealer/hong-kong/" },
        { name: "Italy", link: "https://lebello.com/dealer/italy/" },
        { name: "Los Angeles", link: "https://lebello.com/dealer/los-angeles/" },
        { name: "Mexico", link: "https://lebello.com/dealer/mexico/" },
        { name: "Namibia", link: "https://lebello.com/dealer/namibia/" },
        { name: "New Zealand", link: "https://lebello.com/dealer/new-zealand/" },
        { name: "Singapore", link: "https://lebello.com/dealer/singapore/" },
        { name: "South Africa", link: "https://lebello.com/dealer/south-africa/" },
        { name: "United Arab Emirates", link: "https://lebello.com/dealer/united-arab-emirates/" },
        { name: "United States", link: "https://lebello.com/dealer/united-states/" }
    ]
});
</script>

<style>
/* Add your styles here */
</style>
