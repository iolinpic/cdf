<template>
    <div>
        <v-layout row class="pt-10">
            <v-flex sm8> <div class="title">Условия</div></v-flex>
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
                        <span>{{item.ConditionType}}</span>
                        <div>
                            <v-btn icon @click="removeValue(index)">
                                <v-icon color="red">delete</v-icon>
                            </v-btn>
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <actor-dialog-condition-component
                                :value="item.ConditionOptions"
                                :settings="settings[item.ConditionType]"
                        >
                        </actor-dialog-condition-component>
                        <!--<actor-dialog-component
                                :value="item"
                                :items="items"
                                :zones="zones"
                                :quests="quests"
                                :crysms="crysms"
                        ></actor-dialog-component>-->
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </div>
</template>
<script>
    import { DialogGreetingsConditionTypes,DialogGreetingsConditionOptions,DialogGreetingsConditionOptionsSettings } from '@/config/actors'
    import actorDialogConditionComponent from "./actorDialogConditionComponent";

    //import actorDialogComponent from "./actorDialogComponent";
    //import api from "@/api";

    export default {
        name: 'actorDialogConditionsComponent',
        components: {actorDialogConditionComponent},
        data() {
            return {
                loading: false,
                condTypes:DialogGreetingsConditionTypes,
                settings:DialogGreetingsConditionOptionsSettings,
                condition:"Quest",
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
            /*getResources() {
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
                this.value.push({
                    ConditionType:this.condition,
                    ConditionOptions:Object.assign({},DialogGreetingsConditionOptions[this.condition])});
            },
            removeValue(index) {
                this.value.splice(index, 1);
            },
        }
    }
</script>
