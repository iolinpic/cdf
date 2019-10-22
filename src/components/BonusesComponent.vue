<template>
    <div class="mb-3">
        <h3 class="mb-3">{{label}}</h3>
        <bonus-component :obj="val" :abilities="abilities" :label="labels[id]"  v-for="(val,id) in value" :key="`${label}_${id}`"></bonus-component>
    </div>
</template>
<script>
    import bonusComponent from './BonusComponent'
    import {APBonusTitles} from "@/config/abilityPack";

    export default {
        name: 'BonusesComponent',
        data() {
            return {
                abilities: [],
            }
        },
        computed:{
            labels(){
                return APBonusTitles;
            },
        },
        props: {
            value: Array,
            label: String,
        },
        components: {
            bonusComponent,
        },
    }
</script>