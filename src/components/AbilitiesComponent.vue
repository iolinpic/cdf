<template>
    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <div class="mb-3" v-else>
        <h3 class="mb-3">{{label}}</h3>
        <ability-component :obj="val" :abilities="abilities"  v-for="(val,id) in value" :key="`${label}_${id}`"></ability-component>
    </div>
</template>
<script>
    import api from '@/api'
    import abilityComponent from './AbilityComponent'

    export default {
        name: 'AbilitiesComponent',
        data() {
            return {
                abilities: [],
                loading:true,
            }
        },
        props: {
            value: Array,
            label: String,
        },
        components: {
            abilityComponent,
        },
        mounted(){
            this.getAllAbilities();
        },
        methods: {
            getAllAbilities() {
                this.loading = true;
                api.abilities.all().then((res) => {
                    this.abilities = res.data;
                    this.loading = false
                })
            },
        }
    }
</script>