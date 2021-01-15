<template>
    <div>
        <v-layout row class="pt-10">
            <v-flex sm10> <div class="title">Диалоги</div></v-flex>
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
                        <span>{{item.Name}} - приоритет: {{item.Priority}}</span>
                        <div>

                            <v-btn icon @click="removeValue(index)">
                                <v-icon color="red">delete</v-icon>
                            </v-btn>
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <actor-dialog-component
                                :value="item"

                        ></actor-dialog-component>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </div>
</template>
<script>
    import { DialogGreetingsValues} from '@/config/actors'
    import actorDialogComponent from "./actorDialogComponent";
    import deepCopy from "../../util/deepCopy";
    //import api from "@/api";

    export default {
        name: 'actorDialogsComponent',
        components: {actorDialogComponent},
        data() {
            return {
                loading: false,
                items: [],
                zones: [],
                quests: [],
                crysms: [],
            };
        },
        props: {
            value: Array,
        },
        computed: {
        },
        mounted() {
            //this.getResources();
        },

        methods: {
           /* getResources() {
                this.loading = true;
                let itemLoading = true;
                let zoneLoading = true;
                let questLoading = true;
                let crysmLoading = true;
                api.items.all().then((res) => {
                    this.items = res.data;
                    itemLoading = false;
                    if(!(itemLoading&&zoneLoading&&questLoading&&crysmLoading)){
                        this.loading=false;
                    }
                });
                api.zones.all().then((res)=>{
                    this.zones=res.data;
                    zoneLoading = false;
                    if(!(itemLoading&&zoneLoading&&questLoading&&crysmLoading)){
                        this.loading=false;
                    }
                })
                api.quests.all().then((res)=>{
                    this.quests = res.data;
                    questLoading = false;
                    if(!(itemLoading&&zoneLoading&&questLoading&&crysmLoading)){
                        this.loading=false;
                    }
                })
                api.crysms.all().then((res)=>{
                    this.crysms = res.data;
                    crysmLoading = false;
                    if(!(itemLoading&&zoneLoading&&questLoading&&crysmLoading)){
                        this.loading=false;
                    }
                })
            },*/
            addValue() {
                this.value.push(deepCopy(DialogGreetingsValues));
            },
            removeValue(index) {
                this.value.splice(index, 1);
            },
        }
    }
</script>
