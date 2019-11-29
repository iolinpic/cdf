<template>
    <div>
        <h3>{{label}}</h3>
        <v-divider class="mb-3"></v-divider>
        <v-btn color="blue" @click="addValue">Добавить этап</v-btn>
        <single :value="item" v-for="(item,index) in value"
                :key="'cond_type_'+index"
                @del="removeValue(index)"></single>
    </div>
</template>
<script>
    import single from './single'
    // import {CMilestone} from "@/config/crysms";
    export default {
        name: 'ArrayMilestoneComponent',
        props: {
            value: Array,
            label: String,
        },
        components: {
            single,
        },
        methods: {
            addValue() {
                this.value.push({
                    "Level": 0,
                    "HP_progress": [11.0, 12.0, 13.0],
                    "Attack_progress": [0.6, 0.62, 0.65],
                    "Defence_progress": [0.8, 0.83, 0.85],
                    "Evasion_progress": [0.0, 0.0, 0.0],
                    "Reflection_progress": [0.0, 0.0, 0.0],
                    "AbilityPackID": "",});
            },
            removeValue(index) {
                this.value.splice(index, 1);
            },
        }
    }
</script>