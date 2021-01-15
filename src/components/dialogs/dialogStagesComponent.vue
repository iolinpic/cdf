<template>
    <div>
        <v-layout row class="pt-10">
            <v-flex sm10> <div class="title">Реплики</div></v-flex>
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
                        <span>{{item.StageId}}_{{item.TextLine}}</span>
                        <div>

                            <v-btn icon @click="removeValue(index)">
                                <v-icon color="red">delete</v-icon>
                            </v-btn>
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <dialog-stage-component
                                :value="item"
                        ></dialog-stage-component>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </div>
</template>
<script>
    import { DialogStageValues} from '@/config/dialogs'
    import dialogStageComponent from "./dialogStageComponent";
    import deepCopy from "../../util/deepCopy";
    //import api from "@/api";

    export default {
        name: 'dialogStagesComponent',
        components: {dialogStageComponent},
        data() {
            return {
                loading: false,
                //lastId:0,
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
            nextId(){
                let lastId = this.value.length;
                if(this.value.length>0){
                    if(this.value[this.value.length-1].StageId>lastId){
                        lastId = this.value[this.value.length-1].StageId+1;
                    }
                }
                return lastId;
            },
            addValue() {
                const data =deepCopy(DialogStageValues);

                data.StageId = this.nextId();
                //this.lastId ++;
                this.value.push(data);
            },
            removeValue(index) {
                this.value.splice(index, 1);
            },
        }
    }
</script>
