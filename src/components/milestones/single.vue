<template>
    <v-layout wrap>
        <template v-if="keys.length>=1">
            <v-flex sm12 v-for="key in keys" :key="key">
                <div :is="settings[key].component"
                     :label="settings[key].label" v-model="value[key]"></div>
            </v-flex>
        </template>
        <v-flex sm12>
            <v-btn @click="delLine">
                <v-icon>delete</v-icon> Удалить этап
            </v-btn>
        </v-flex>
    </v-layout>
</template>
<script>
    import {CMilestoneSettings} from "@/config/crysms";
    import optionsComponent from '@/components/OptionComponent';
    import abilityPack from "./abilityPack";
    import tierOptions from "./tierOptions";

    export default {
        name: 'singleMilestoneComponent',
        data() {
            return {}
        },
        components:{
            optionsComponent,
            abilityPack,
            tierOptions,
        },
        computed: {
            keys() {
                return Object.keys(this.value);
            },
            settings() {
                return CMilestoneSettings;
            },
        },
        props: {
            value: Object,
        },
        methods: {
            delLine() {
                this.$emit('del');
            },
        },
    }
</script>