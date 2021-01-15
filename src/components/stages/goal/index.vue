<template>
    <v-card flat>
        <v-card-title class="px-0">Goals
            <v-spacer></v-spacer>
            <v-btn color="green" @click="addGoal">Добавить</v-btn>
        </v-card-title>
        <v-card-text class="px-0">
            <template v-for="(goal,indexGoal) in value">
                <single-goal-component :value="goal" :divider="indexGoal>=0&&indexGoal<value.length-1" :key="`goal_${indexGoal}_${stage}`" @del="deleteGoal(indexGoal)"></single-goal-component>
            </template>
        </v-card-text>
    </v-card>
</template>
<script>
    import {QGoalTypes, QGValues} from "@/config/quests";
    import SingleGoalComponent from './single'
    import deepCopy from "../../../util/deepCopy";

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
            stage: Number,
        },
        methods: {
            addGoal() {
                // const data = JSON.parse(JSON.stringify(object))
                const data = deepCopy(QGValues);
                this.value.push(data);
            },
            deleteGoal(index){
                this.value.splice(index, 1);
            },
        }
    }
</script>
