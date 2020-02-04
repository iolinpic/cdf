<template>
    <v-layout wrap>
        <v-flex sm12>
            <v-select label="Тип цели" :items="types" v-model="value.GoalType" @input="onTypeChange"></v-select>
            <template v-if="keys.length>=1">
                <v-flex sm12 v-for="key in keys" :key="key">
                    <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''"
                         :label="settings[key].label" v-model="value.GoalOptions[key]"></div>
                </v-flex>
            </template>
        </v-flex>
    </v-layout>
</template>
<script>
    import {QGoalTypes, QGOptions, QGOptionsFieldSettings} from "@/config/quests";
    import {VTextField, VTextarea, VSelect} from 'vuetify/lib'
    import npcSelect from "@/components/npcSelect";

    export default {
        name: "GoalSingleComponent",
        data() {
            return {
                // GoalOptions: {},
            };
        },
        components:{
            VTextField,
            VTextarea,
            VSelect,
            npcSelect,
        },
        props: {
            value: Object,
        },
        mounted(){

        },
        computed: {
            types() {
                return QGoalTypes;
            },
            OptionTemplate() {
                return QGOptions;
            },
            keys() {
                return Object.keys(this.value.GoalOptions).filter((key) => this.settings.hasOwnProperty(key));
            },
            settings() {
                return QGOptionsFieldSettings[this.value.GoalType];
            },
        },
        methods: {
            onTypeChange(val) {
                this.value.GoalOptions = Object.assign({}, this.OptionTemplate[val]);
            },
        },
    }
</script>
