<template>
    <v-select multiple :items="crysmEvolutionTypes" :value="crysmEvolutionType" @input="updValue"  :label="label"></v-select>
</template>
<script>
    import {CEvolutionConditions} from '@/config/crysms'
    export default {
        name:'CrysmEvolutionConditionsComponent',
        data(){
            return {
                crysmEvolutionType:[],
            }
        },
        props:{
            value:Array,
            label:String
        },
        computed: {
            crysmEvolutionTypes() {
                return CEvolutionConditions;
            },
        },
        watch: {
            value(val){
                this.crysmEvolutionType = [];
                this.crysmEvolutionType = val;
                // val.forEach((el)=>{
                //     this.crysmEvolutionType.push(this.crysmEvolutionTypes[el]);
                // })
            },
        },
        methods:{
            updValue(val){
                // const tmp = val.map((el) => {
                //     return this.crysmEvolutionTypes.findIndex((cr) => cr === el)
                // });
                this.$emit('input',val);
            },
        },
    };
</script>