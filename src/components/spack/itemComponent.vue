<template>
    <v-layout wrap>
        <template v-if="keys.length>=1">
            <v-flex sm12 v-for="key in keys" :key="key">
                <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''"
                     :label="settings[key].label" v-model="value[key]"></div>
            </v-flex>
        </template>
    </v-layout>
</template>
<script>
    import { SPPFieldSettings } from '@/config/spack'
    //import {VTextField} from 'vuetify/lib'
    import OptionComponent from "../OptionComponent";
    import itemSelectComponent from "../itemSelectComponent";


    export default {
        name: 'spackItemComponent',
        data() {
            return {
            };
        },
        props: {
            value: Object,
        },
        components:{
            OptionComponent,
           // VTextField,
            itemSelectComponent
        },
        computed: {
            keys() {
                return Object.keys(SPPFieldSettings);
            },
            settings() {
                return SPPFieldSettings;
            },
        },
        mounted() {

        },
        methods: {
        }
    }
</script>
