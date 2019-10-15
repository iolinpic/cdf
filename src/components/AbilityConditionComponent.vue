<template>
    <v-layout wrap>
        <v-flex sm6>
            <v-select :items="conditions" v-model="obj.Name" item-value="id" item-text="DisplayNameText" label="Состояние"></v-select>
        </v-flex>
        <v-flex sm5>
            <v-text-field label="Шанс применения" :value="obj.Chance" @input="updData"></v-text-field>
        </v-flex>
        <v-flex sm1>
            <v-btn icon @click="delLine"><v-icon>delete</v-icon></v-btn>
        </v-flex>
    </v-layout>
</template>
<script>
    // import api from '@/api'
    export default {
        name:'AbilityConditionComponent',
        data(){
            return {

            }
        },
        props:{
          conditions:Array,
          obj:Object,
        },
        methods:{
            updData(val){
                this.obj.Chance = parseFloat(val);
            },
            delLine(){
                this.$emit('del');
            }
        }
    }
</script>