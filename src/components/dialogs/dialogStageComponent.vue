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
    import { DialogStageValues, DialogStageSettings} from '@/config/dialogs'
    import {VTextField, VTextarea} from 'vuetify/lib'
    import dialogAnswersComponent from "./dialogAnswersComponent";
    //import actorDialogConditionsComponent from "./actorDialogConditionsComponent";

    export default {
        name: 'dialogStageComponent',
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
            VTextField,
            VTextarea,
            dialogAnswersComponent
            //actorDialogConditionsComponent,
        },
        computed: {
            keys() {
                return Object.keys(DialogStageValues);
            },
            settings() {
                return DialogStageSettings;
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
