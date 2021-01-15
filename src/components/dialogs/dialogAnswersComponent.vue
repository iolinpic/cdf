<template>
    <div>
        <v-layout row class="pt-10">
            <v-flex sm10> <div class="title">Ответы</div></v-flex>
            <v-flex sm2> <v-btn color="blue" @click="addValue">Добавить</v-btn></v-flex>
        </v-layout>

        <v-divider class="mb-3"></v-divider>
        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
        <template v-else>
            <v-expansion-panels>
                <v-expansion-panel
                        v-for="(item,index) in value"
                        :key="'dialog_'+index"
                >
                    <v-expansion-panel-header>
                        <span>{{`answer_${index}`}}</span>
                        <div>

                            <v-btn icon @click="removeValue(index)">
                                <v-icon color="red">delete</v-icon>
                            </v-btn>
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <dialog-answer-component
                                :value="item"
                        ></dialog-answer-component>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </div>
</template>
<script>
    import { DialogAnswerValues} from '@/config/dialogs'
    import dialogAnswerComponent from "./dialogAnswerComponent";
    import deepCopy from "../../util/deepCopy";
    //import api from "@/api";

    export default {
        name: 'dialogAnswersComponent',
        components: {dialogAnswerComponent},
        data() {
            return {
                loading: false,
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
                this.value.push(deepCopy(DialogAnswerValues));
            },
            removeValue(index) {
                this.value.splice(index, 1);
            },
        }
    }
</script>
