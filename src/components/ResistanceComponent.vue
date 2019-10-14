<template>
    <v-layout wrap>
        <v-flex sm6>
            <v-select :items="crysmTypes" v-model="crysm" label="Тип кризма"></v-select>
        </v-flex>
        <v-flex sm5>
            <v-text-field :value="value.Value" @input="updData" label="Значение сопротивления"></v-text-field>
        </v-flex>
        <v-flex sm1>
            <v-btn icon @click="delLine"><v-icon>delete</v-icon></v-btn>
        </v-flex>
    </v-layout>
</template>
<script>
    import {crysmTypes} from "@/config/gameArrays";

    export default {
        name: 'ResistanceComponent',
        data() {
            return {
                crysm: crysmTypes[this.value.Type]
            }
        },
        computed: {
            crysmTypes() {
                return crysmTypes;
            }
        },
        watch:{
            value(){
                this.crysm = crysmTypes[this.value.Type]
            },
            crysm(val){
                this.value.Type = this.crysmTypes.findIndex((el)=>el===val);
            }
        },
        props: {
            value: Object,
        },
        methods:{
            updData(val){
                this.value.Value = parseFloat(val);
            },
            delLine(){
                this.$emit('del');
            }
        },

    }
</script>