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
    import {VTextField, VSwitch, VSelect} from 'vuetify/lib'
    import OptionComponent from "../OptionComponent";
    import itemSelectComponent from "../itemSelectComponent";
    import CrysmTypeComponent from "../CrysmTypeComponent";
    import CrysmSelectComponent from "../crysmSelect"
    import ZoneSelectComponent from "../zone/selectSingle";
    import QuestSelectComponent from "./QuestSelectComponent";

    export default {
        name: 'actorDialogConditionComponent',
        data() {
            return {
            };
        },
        props: {
            value: Object,
            items: Array,
            quests: Array,
            zones: Array,
            //keys:Array,
            settings:Object,
        },
        components:{
            OptionComponent,
            VTextField,
            VSwitch,
            VSelect,
            itemSelectComponent,
            CrysmTypeComponent,
            CrysmSelectComponent,
            ZoneSelectComponent,
            QuestSelectComponent,
        },
        computed: {
            keys() {
                return Object.keys(this.value);
            },
            /*settings() {
                return DialogGreetingsSettings;
            },*/
        },
        mounted() {

        },
        methods: {
        }
    }
</script>
