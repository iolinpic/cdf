<template>
    <v-layout wrap>
        <v-flex sm12>
            <v-select label="Тип цели" :items="types" v-model="value.GoalType" @input="onTypeChange"></v-select>
        </v-flex>
        <template v-if="keys.length>=1">
            <v-flex sm12 v-for="key in keys" :key="key">
                <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''"
                     :label="settings[key].label" v-model="value.GoalOptions[key]"></div>
            </v-flex>
        </template>
        <v-flex sm12>
            <v-btn color="red" @click="emitDel">Удалить цель</v-btn>
        </v-flex>
        <v-flex sm12><v-divider v-if="divider" color="blue" class="my-3"></v-divider></v-flex>
    </v-layout>
</template>
<script>
    import {QGoalTypes, QGOptions, QGOptionsFieldSettings} from "@/config/quests";
    import {VTextField, VTextarea, VSelect} from 'vuetify/lib'
    import npcSelect from "@/components/npcSelect";
    import OptionComponent from "@/components/OptionComponent";
    import itemSelectComponent from "@/components/itemSelectComponent";
    import CrysmSelectComponent from "@/components/crysmSelect";
    import CrysmTypeComponent from "@/components/CrysmTypeComponent";
    import ZoneSelectComponent from "@/components/zone/selectSingle"

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
            OptionComponent,
            itemSelectComponent,
            CrysmSelectComponent,
            CrysmTypeComponent,
            ZoneSelectComponent,
        },
        props: {
            value: Object,
            divider: Boolean,
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
            emitDel(){
                this.$emit('del');
            }
        },
    }
</script>
