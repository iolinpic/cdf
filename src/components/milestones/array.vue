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
    import {CMilestone} from "@/config/crysms";
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
                this.value.push(CMilestone);
            },
            removeValue(index) {
                this.value.splice(index, 1);
            },
        }
    }
</script>