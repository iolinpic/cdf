<template>
    <v-layout wrap>
        <v-flex sm6>
            <v-autocomplete :items="abilities" v-model="obj.Name" item-value="id" item-text="DisplayNameText" label="Способность"></v-autocomplete>
        </v-flex>
        <v-flex sm6>
            <v-text-field label="Шанс появления" :value="obj.Chance" @input="updData"></v-text-field>
        </v-flex>
    </v-layout>
</template>
<script>
    // import api from '@/api'

    export default {
        name:'AbilityComponent',
        data(){
            return {

            }
        },
        props:{
          abilities:Array,
          obj:Object,
        },
        mounted(){
            if(this.obj.Name === ""){
                this.obj.Name = this.abilities[0].id;
            }
        },
        methods:{
            updData(val){
                this.obj.Chance = parseFloat(val);
            },
        }
    }
</script>