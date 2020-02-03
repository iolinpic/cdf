<template>
    <v-card flat>
        <v-card-title class="px-0">Goals
            <v-spacer></v-spacer>
            <v-btn color="green" @click="addGoal">Добавить</v-btn>
        </v-card-title>
        <v-card-text class="px-0">
            <template v-for="(goal,index) in value">
                <single-goal-component :value="goal" :key="`goal_${index}`"></single-goal-component>
                <v-divider v-if="index>=0&&index<value.length-1" :key="`divider_${index}`" color="blue" class="mb-3"></v-divider>
            </template>
            <!--            <v-expansion-panels multiple>-->
            <!--                <v-expansion-panel v-for="(item,index) in value" :key="'stage_'+index">-->
            <!--                    <v-expansion-panel-header><span>Stage №{{index}}</span>-->
            <!--                        <div>-->
            <!--                            <v-btn icon v-if="index>0" @click.stop="moveUp(index)">-->
            <!--                                <v-icon>arrow_upward</v-icon>-->
            <!--                            </v-btn>-->
            <!--                            <v-btn icon v-if="index<value.length-1" @click.stop="moveDown(index)">-->
            <!--                                <v-icon>arrow_downward</v-icon>-->
            <!--                            </v-btn>-->
            <!--                            <v-btn icon @click="deleteOne(index)">-->
            <!--                                <v-icon color="red">delete</v-icon>-->
            <!--                            </v-btn>-->
            <!--                        </div>-->
            <!--                    </v-expansion-panel-header>-->

            <!--                    <v-expansion-panel-content>-->
            <!--                        <v-textarea v-model="item.StageDescriptionText" label="Описание стадии"></v-textarea>-->
            <!--                    </v-expansion-panel-content>-->
            <!--                </v-expansion-panel>-->
            <!--            </v-expansion-panels>-->
        </v-card-text>
    </v-card>
</template>
<script>
    // import api from '@/api'
    // import {QSValues} from "@/config/quests";
    import {QGoalTypes, QGValues} from "@/config/quests";
    import SingleGoalComponent from './single'

    export default {
        name: 'GoalList',
        data() {
            return {
                type: 'Talk',
                GoalOptions: {},
                // loading: false,
                // conditions: [],
                // condItems: [],
            };
        },
        computed: {
            types() {
                return QGoalTypes;
            }
        },
        components: {
            SingleGoalComponent,
            // stageCreateComponent,
        },
        props: {
            value: Array,
            // qid: String,
        },
        watch: {
            // value(val) {
            //     this.conditions = [];
            //     val.forEach((el) => {
            //         this.conditions.push(el);
            //     })
            // },
        },
        methods: {
            addGoal() {
                this.value.push(Object.assign({}, QGValues));
            },
            // addStage(description) {
            //     const data = Object.assign({}, QSValues);
            //     // const object_number = this.value.length;
            //     // data.StageDescription = 'stage_description_'+object_number+'_'+this.qid;
            //     data.StageDescriptionText = description;
            //     this.value.push(data);
            // },
            // deleteOne(id) {
            //     this.value.splice(id, 1);
            // },
            // moveUp(index) {
            //     if (index <= 0) return;
            //     let tmp = this.value[index - 1];
            //     this.value[index - 1] = this.value[index];
            //     this.value[index] = tmp;
            //     this.$forceUpdate();
            // },
            // moveDown(index) {
            //     if (index >= this.value.length - 1) return;
            //     let tmp = this.value[index + 1];
            //     this.value[index + 1] = this.value[index];
            //     this.value[index] = tmp;
            //     this.$forceUpdate();
            // }
            // updValue(val) {
            //     this.$emit('input', val);
            // },
        }
    }
</script>
