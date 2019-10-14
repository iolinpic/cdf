<template>
    <div>
        <h3>Сопротивления</h3>
        <v-divider class="mb-3"></v-divider>
        <v-btn color="blue" @click="addResistanceValue">Добавить сопротивление</v-btn>
        <resistance-component :value="res" v-for="(res,index) in resistances"
                              :key="'resistance_'+index"
                              @del="removeResistanceValue(index)"></resistance-component>
    </div>
</template>
<script>
    import resistanceComponent from '@/components/ResistanceComponent'
    export default {
        name: 'ResistancesComponent',
        props: {
            resistances: Array,
        },
        components: {
            resistanceComponent,
        },
        methods: {
            addResistanceValue() {
                this.resistances.push({
                    "Type": 0,
                    "Value": 0.5
                });
            },
            removeResistanceValue(index) {
                this.resistances.splice(index, 1);
            },

        }
    }
</script>