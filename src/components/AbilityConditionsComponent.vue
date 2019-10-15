<template>
    <div>
        <h3>{{label}}</h3>
        <v-btn @click="addNewCondition">Добавить новый статус</v-btn>
        <ability-condition-component :obj="val" :conditions="conditions"  v-for="(val,id) in value" :key="`${label}_${id}`" @del="removeCondition(id)"></ability-condition-component>
    </div>
</template>
<script>
    import api from '@/api'
    import abilityConditionComponent from './AbilityConditionComponent'

    export default {
        name: 'AbilityConditionsComponent',
        data() {
            return {
                conditions: [],
            }
        },
        props: {
            value: Array,
            label: String,
        },
        components: {
            abilityConditionComponent,
        },
        mounted(){
            this.getAllConditions();
        },
        methods: {
            getAllConditions() {
                api.conditions.all().then((res) => {
                    this.conditions = res.data;
                })
            },
            addNewCondition(){
                this.value.push({
                    "Name": '',
                    "Chance": 1.0
                });
            },
            removeCondition(id){
                this.value.splice(id,1)
            }
        }
    }
</script>