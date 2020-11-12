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
    import { DialogGreetingsValues, DialogGreetingsSettings} from '@/config/actors'
    import {VTextField, VSwitch, VSelect} from 'vuetify/lib'
    import OptionComponent from "../OptionComponent";
    import actorDialogConditionsComponent from "./actorDialogConditionsComponent";

    export default {
        name: 'actorDialogComponent',
        data() {
            return {
                loading: false,
                valid:true,
            };
        },
        props: {
            value: Object,
            /*items: Array,
            quests: Array,
            zones: Array,*/
        },
        components:{
            OptionComponent,
            VTextField,
            VSwitch,
            VSelect,
            actorDialogConditionsComponent,
        },
        computed: {
            keys() {
                return Object.keys(DialogGreetingsValues);
            },
            settings() {
                return DialogGreetingsSettings;
            },
        },
        mounted() {

        },
        methods: {
            delLine(){
                this.$emit('del');
            }
        }
    }
</script>
