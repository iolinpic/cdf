<template>
    <v-card flat>
        <v-card-title class="px-0">Goals
            <v-spacer></v-spacer>
            <v-btn color="green" @click="addGoal">Добавить</v-btn>
        </v-card-title>
        <v-card-text class="px-0">
            <template v-for="(goal,index) in value">
                <single-goal-component :value="goal" :divider="index>=0&&index<value.length-1" :key="`goal_${index}`" @del="deleteGoal(index)"></single-goal-component>
            </template>
        </v-card-text>
    </v-card>
</template>
<script>
    import {QGoalTypes, QGValues} from "@/config/quests";
    import SingleGoalComponent from './single'

    export default {
        name: 'GoalList',
        computed: {
            types() {
                return QGoalTypes;
            }
        },
        components: {
            SingleGoalComponent,
        },
        props: {
            value: Array,
        },
        methods: {
            addGoal() {
                this.value.push(Object.assign({}, QGValues));
            },
            deleteGoal(index){
                this.value.splice(index, 1);
            },
        }
    }
</script>
