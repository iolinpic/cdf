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
    import { DialogAnswerValues, DialogAnswerSettings} from '@/config/dialogs'
    import {VTextField} from 'vuetify/lib'
    import dialogAnswerActionsComponent from "./dialogAnswerActionsComponent";
    import dialogAnswerConditionsComponent from "./dialogAnswerConditionsComponent";
    //import actorDialogConditionsComponent from "./actorDialogConditionsComponent";

    export default {
        name: 'dialogAnswerComponent',
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
            dialogAnswerActionsComponent,
            dialogAnswerConditionsComponent,
            //actorDialogConditionsComponent,
        },
        computed: {
            keys() {
                return Object.keys(DialogAnswerValues);
            },
            settings() {
                return DialogAnswerSettings;
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
