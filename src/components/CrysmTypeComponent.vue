<template>
    <v-select multiple :items="crysmTypes" :value="crysmType" @input="updValue" :label="label"></v-select>
</template>
<script>
    import {crysmTypes} from '@/config/crysms'
    export default {
        name:'CrysmTypeComponent',
        data(){
            return {
                //crysmType:[],
            }
        },
        props:{
            value:Array,
            label:String
        },
        computed: {
            crysmTypes() {
                return crysmTypes;
            },
            crysmType(){
                let tmp = []
                this.value.forEach((el)=>{
                    tmp.push(this.crysmTypes[el]);
                })
                return tmp;
            },
        },
        // watch: {
        //     value(val){
        //         this.crysmType = [];
        //         val.forEach((el)=>{
        //             this.crysmType.push(this.crysmTypes[el]);
        //         })
        //     },
        // },
        methods:{
            updValue(val){
                const tmp = val.map((el) => {
                    return this.crysmTypes.findIndex((cr) => cr === el)
                });
                this.$emit('input',tmp);
            },
        },
    };
</script>
