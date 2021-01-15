<template>
    <div>
        <v-layout row class="pt-10">
            <v-flex sm8> <div class="title">Действия</div></v-flex>
            <v-flex sm2><v-select :items="condTypes" v-model="condition" label="Тип"></v-select> </v-flex>
            <v-flex sm2><v-btn color="blue" @click="addValue">Добавить</v-btn></v-flex>
        </v-layout>

        <v-divider class="mb-3"></v-divider>
        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
        <template v-else>
            <v-expansion-panels>
                <v-expansion-panel
                        v-for="(item,index) in value"
                        :key="'dialog_condition'+index"
                >
                    <v-expansion-panel-header>
                        <span>{{item.Type}}</span>
                        <div>
                            <v-btn icon @click="removeValue(index)">
                                <v-icon color="red">delete</v-icon>
                            </v-btn>
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <dialog-answer-action-component
                                :value="item.Option"
                                :settings="settings[item.Type]"
                        >
                        </dialog-answer-action-component>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </div>
</template>
<script>
    import { DialogAnswerActionTypes,DialogAnswerActionValues,DialogAnswerActionSettings } from '@/config/dialogs'
    import dialogAnswerActionComponent from "./dialogAnswerActionComponent";
    import deepCopy from "../../util/deepCopy";


    export default {
        name: 'dialogAnswerActionsComponent',
        components: {dialogAnswerActionComponent},
        data() {
            return {
                loading: false,
                condTypes:DialogAnswerActionTypes,
                settings:DialogAnswerActionSettings,
                condition:"StartQuest",
            };
        },
        props: {
            value: Array,
        },
        computed: {
        },
        mounted() {
        },
        methods: {
            addValue() {
                this.value.push({
                    Type:this.condition,
                    Option:deepCopy(DialogAnswerActionValues[this.condition]),
                });
            },
            removeValue(index) {
                this.value.splice(index, 1);
            },
        }
    }
</script>
