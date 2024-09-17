<script>
import ApplicationLogo from '../ApplicationLogo.vue';

export default {
    data() {
        return {
            navData: [
                {
                    name: 'Dashboard',
                    link: '/dashboard'
                },
                {
                    name: 'Material Options',
                    link: '/swatches',
                    subMenu: [
                        { name: 'Swatches', link: '/swatches' },
                        { name: 'Material', link: '/materials' },
                        { name: 'Re-orders', link: '/ReOrder' },
                        { name: 'Navigation Order', link: '/NavigationOrder' },
                        { name: 'Taxonomy Order', link: '/TaxonomyOrder' }
                    ]
                }
            ],
            currentItem: ''
        };
    },
    methods: {
        setCurrentMenu(itemName) {
            this.currentItem = itemName;
        }
    }
};
</script>

<template>
    <aside class="absolute left-0 top-0 z-[999] flex h-screen w-44 flex-col overflow-y-hidden bg-bodydark1 duration-300 ease-linear lg:static lg:translate-x-0">
        <div class="flex items-center justify-between lg:justify-center gap-2 px-2 mt-2">
            <a href="/admin/dashboard">
                <ApplicationLogo />
            </a>
            <button class="block lg:hidden">
                <svg class="fill-current" width="20" height="18" viewBox="0 0 20 18">
                    <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" fill="#ffffff" />
                </svg>
            </button>
        </div>

        <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
            <nav class="mt-3">
                <ul class="mb-6 flex flex-col gap-1.5">
                    <li v-for="(navitem, index) in navData" :key="`item-${index}`">
                        <router-link 
                            :to="navitem.link"
                            class="group relative flex items-center gap-2.5 rounded-sm px-2 py-2 font-medium text-white duration-300 ease-in-out hover:bg-bodydark2 hover:text-textColor1"
                            @click="setCurrentMenu(navitem.name)">
                            <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18">
                                <path d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z" fill="" />
                            </svg>
                            <span class="text-sm">{{ navitem.name }}</span>
                        </router-link>
                        <div v-if="navitem.subMenu && navitem.subMenu.length" :class="{ 'block': currentItem === navitem.name, 'hidden': !(currentItem === navitem.name) }">
                            <ul class="bg-[#2c3338]">
                                <li v-for="(subItem, index) in navitem.subMenu" :key="`sub-item-${index}`">
                                    <router-link 
                                        :to="subItem.link"
                                        class="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                                        <span class="text-sm">{{ subItem.name }}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
</template>