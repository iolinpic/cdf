<template>
    <v-layout wrap>
        <v-flex sm3>{{label}}</v-flex>
        <v-flex sm3 v-for="(tier,index)  in value" :key="'tier_'+index">
            <options-component :label="`тир ${index}`" :value="tier" @input="value[index] = $event"></options-component>
        </v-flex>
    </v-layout>

</template>
<script>
    import optionsComponent from '@/components/OptionComponent';
    export default {
        name: 'tierOptionsComponent',
        components:{
            optionsComponent,
        },
        props: {
            value: Array,
            label: String,
        },
        methods:{
            updValue(index,val){
                this.value[index] = val;
            }
        },
    }
</script>