<template>
    <div>
        <h3>Типы состояний для снятия</h3>
        <v-divider class="mb-3"></v-divider>
        <v-btn color="blue" @click="addResistanceValue">Добавить тип</v-btn>
        <single :value="item" v-for="(item,index) in value"
                              :key="'cond_type_'+index"
                              @del="removeResistanceValue(index)"></single>
    </div>
</template>
<script>
    import single from './single'
    export default {
        name: 'ArrayConditionComponent',
        props: {
            value: Array,
        },
        components: {
            single,
        },
        methods: {
            addResistanceValue() {
                this.value.push({
                    "Type": 0,
                    "Subtype": 0
                });
            },
            removeResistanceValue(index) {
                this.value.splice(index, 1);
            },
        }
    }
</script>