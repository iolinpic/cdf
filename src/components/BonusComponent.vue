<template>
    <v-layout wrap>
        <v-flex sm6>
<!--            <v-autocomplete :items="abilities" v-model="obj.Name" item-value="id" item-text="DisplayNameText" label="Способность"></v-autocomplete>-->
            <option-component :label="label" v-model="obj.Value"></option-component>
        </v-flex>
        <v-flex sm6>
            <v-text-field label="Шанс появления" :value="obj.Chance" @input="updData"></v-text-field>
        </v-flex>
    </v-layout>
</template>
<script>
    import optionComponent from './OptionComponent'

    export default {
        name:'AbilityComponent',
        components:{
            optionComponent,
        },
        props:{
          label:String,
          obj:Object,
        },
        methods:{
            updData(val){
                this.obj.Chance = parseFloat(val);
            },
        }
    }
</script>