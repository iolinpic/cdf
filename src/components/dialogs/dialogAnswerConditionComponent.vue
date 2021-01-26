<template>
    <v-layout wrap>
        <template v-if="keys.length>=1">
            <v-flex sm12 v-for="key in keys" :key="key">
                <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''"
                     :label="settings[key].label" v-model="value[key]" :variable="value"></div>
            </v-flex>
        </template>
    </v-layout>
</template>
<script>
    import {VTextField, VSelect} from 'vuetify/lib'
    import OptionComponent from "../OptionComponent";
    import itemSelectComponent from "../itemSelectComponent";
    import QuestSelectComponent from "./QuestSelectComponent";
    import QuestStageSelectComponent from "./QuestStageSelectComponent";
    import QuestGoalSelectComponent from "./QuestGoalSelectComponent";

    export default {
        name: 'dialogAnswerConditionComponent',
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
            VSelect,
            itemSelectComponent,
            QuestSelectComponent,
          QuestStageSelectComponent,
          QuestGoalSelectComponent,
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
