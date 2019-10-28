<template>
    <v-select :loading="loading" :items="aPacks" item-text="Name" item-value="id" :label="label" :value="value" @input="updateValue"></v-select>
</template>
<script>
    import api from "@/api"
    export default {
        name: 'abilityPackComponent',
        data(){
            return {
                loading:true,
                aPacks:[],
            }
        },
        props:{
            label:String,
            value:String,
        },
        mounted(){
            this.getAll();
        },
        methods:{
            getAll(){
                this.loading = true;
                api.aPack.all().then((res)=>{
                    this.aPacks = res.data;
                    this.loading = false;
                })
            },
            updateValue(val){
                this.$emit('input',val)
            },
        }
    }
</script>