<template>
    <PageHeader> Taxonomy Order </PageHeader>
    <Dreagable v-model:list="list" parentfield="name" childField="name" @update:list="handleListUpdate">
    </Dreagable>
    {{ sortedData }}
</template>
<script setup>
import { ref } from 'vue'
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Dreagable from '@/components/Admin-components/Dreag-able.vue'
const sortedData = ref([])

const list = ref([
    {
        id: 'item_1078',
        name: 'Pixie Weaving',
        children: [{ id: 'item_1075', name: 'Pixie O3' }]
    },
    { id: 'item_1108', name: 'Pixie X3' },
    {
        id: 'item_1116',
        name: 'Red',
        children: [
            { id: 'item_1073', name: 'Pixie R3' },
            { id: 'item_1104', name: 'Pixie R1' },
            { id: 'item_1105', name: 'Pixie R2' },
            { id: 'item_1106', name: 'Pixie R4' },
            { id: 'item_1107', name: 'Pixie R5' }
        ]
    },
    {
        id: 'item_1117',
        name: 'Yellow',
        children: [
            { id: 'item_1071', name: 'Pixie Y1' },
            { id: 'item_1109', name: 'Pixie Y2' },
            { id: 'item_1110', name: 'Pixie Y3' },
            { id: 'item_1111', name: 'Pixie Y4' },
            { id: 'item_1112', name: 'Pixie Y5' }
        ]
    },
    {
        id: 'item_1118',
        name: 'Blue',
        children: [
            { id: 'item_1072', name: 'Pixie B1' },
            { id: 'item_1076', name: 'Pixie B2' },
            { id: 'item_1079', name: 'Pixie B3' },
            { id: 'item_1080', name: 'Pixie B4' },
            { id: 'item_1081', name: 'Pixie B5' },
            { id: 'item_1082', name: 'Pixie B6' },
            { id: 'item_1083', name: 'Pixie B7' },
            { id: 'item_1084', name: 'Pixie B8' },
            { id: 'item_1085', name: 'Pixie B9' }
        ]
    },
    {
        id: 'item_1119',
        name: 'Grey',
        children: [
            { id: 'item_1101', name: 'Pixie GR1' },
            { id: 'item_1102', name: 'Pixie GR2' },
            { id: 'item_1103', name: 'Pixie GR3' }
        ]
    },
    {
        id: 'item_1120',
        name: 'Green',
        children: [
            { id: 'item_1074', name: 'Pixie G3' },
            { id: 'item_1093', name: 'Pixie G1' },
            { id: 'item_1094', name: 'Pixie G2' },
            { id: 'item_1095', name: 'Pixie G4' },
            { id: 'item_1096', name: 'Pixie G5' },
            { id: 'item_1097', name: 'Pixie G6' },
            { id: 'item_1098', name: 'Pixie G7' },
            { id: 'item_1099', name: 'Pixie G8' },
            { id: 'item_1100', name: 'Pixie G9' }
        ]
    },
    {
        id: 'item_1121',
        name: 'Bronze',
        children: [
            { id: 'item_1086', name: 'Pixie BR1' },
            { id: 'item_1087', name: 'Pixie BR2' },
            { id: 'item_1088', name: 'Pixie BR3' },
            { id: 'item_1089', name: 'Pixie BR4' },
            { id: 'item_1090', name: 'Pixie BR5' },
            { id: 'item_1091', name: 'Pixie BR6' },
            { id: 'item_1092', name: 'Pixie BR7' }
        ]
    },
    { id: 'item_1028', name: 'Base Fabrics' },
    {
        id: 'item_983',
        name: 'Aqua Weave Drops',
        children: [
            { id: 'item_984', name: 'Turquoise' },
            { id: 'item_985', name: 'Green' },
            { id: 'item_986', name: 'Lagoon' }
        ]
    },
    {
        id: 'item_987',
        name: 'Aqua Weave X2',
        children: [
            { id: 'item_1030', name: 'Onyx' },
            { id: 'item_1031', name: 'Umbra' },
            { id: 'item_1032', name: 'Lguana' },
            { id: 'item_1033', name: 'Blue Ivory' },
            { id: 'item_1034', name: 'Sepia' },
            { id: 'item_1035', name: 'Saddle' },
            { id: 'item_1036', name: 'Forest' },
            { id: 'item_988', name: 'Corn' },
            { id: 'item_989', name: 'Steel' },
            { id: 'item_990', name: 'Smoke' },
            { id: 'item_991', name: 'Rhino' },
            { id: 'item_992', name: 'Trout' },
            { id: 'item_993', name: 'Gunmetal' },
            { id: 'item_994', name: 'Canopy' },
            { id: 'item_995', name: 'Lime' },
            { id: 'item_996', name: 'Raven' },
            { id: 'item_997', name: 'Cast' },
            { id: 'item_998', name: 'Schimer' },
            { id: 'item_999', name: 'Golden' },
            { id: 'item_1000', name: 'Shrub' },
            { id: 'item_1001', name: 'Daisy' },
            { id: 'item_1002', name: 'Arctic' },
            { id: 'item_1003', name: 'Stark' },
            { id: 'item_1004', name: 'Sapphire' },
            { id: 'item_1005', name: 'Electric Lime' },
            { id: 'item_1006', name: 'Shadow' },
            { id: 'item_1007', name: 'Blue Lake' },
            { id: 'item_1008', name: 'Blue Chalk' },
            { id: 'item_1009', name: 'Squash' },
            { id: 'item_1010', name: 'Prussian' },
            { id: 'item_1011', name: 'Squirrel' },
            { id: 'item_1012', name: 'Cedar' },
            { id: 'item_1013', name: 'Silk Flos' }
        ]
    },
    {
        id: 'item_1014',
        name: 'Heritage',
        children: [
            { id: 'item_1015', name: 'Blue Garden' },
            { id: 'item_1016', name: 'Garden of Eden' },
            { id: 'item_1018', name: 'Marengo' },
            { id: 'item_1019', name: 'Solo Warm' },
            { id: 'item_1020', name: 'Solo' },
            { id: 'item_1023', name: 'Bali' },
            { id: 'item_1024', name: 'Manado Blue' },
            { id: 'item_1025', name: 'Manado' },
            { id: 'item_1026', name: 'Solo Blue' }
        ]
    },
    {
        id: 'item_922',
        name: 'Dura-Knittex® Weaves',
        children: [
            { id: 'item_931', name: 'Beige' },
            { id: 'item_926', name: 'Beige / Bronze' },
            { id: 'item_929', name: 'Beige / Platinum' },
            { id: 'item_927', name: 'Beige / Green' },
            { id: 'item_930', name: 'Beige / Palm' },
            { id: 'item_953', name: 'Beige / Orange' },
            { id: 'item_928', name: 'Beige / Peach' },
            { id: 'item_936', name: 'Bronze' },
            { id: 'item_933', name: 'Bronze / Tuscany' },
            { id: 'item_954', name: 'Bronze / Orange' },
            { id: 'item_935', name: 'Bronze / Palm' },
            { id: 'item_934', name: 'Bronze / Peach' }
        ]
    }
])
function handleListUpdate(updatedList) {
    console.log('Updated list in parent:', updatedList)
    sortedData.value = updatedList
}
</script>
