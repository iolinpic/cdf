<template>
    <v-select multiple v-model="conditions" :items="filteredItems" item-value="id" item-text="DisplayNameText" :loading="loading" @input="updValue" :label="label"></v-select>
</template>
<script>
    import api from '@/api'

    export default {
        name: 'ArrayCondition',
        data() {
            return {
                loading: false,
                conditions: [],
                condItems: [],
            };
        },
        props: {
            value: Array,
            label: String,
            type: String,
        },
        computed: {
            filteredItems() {
                // let baseType = 0;
                // if(this.type === "Heal"){
                //     baseType = 11;
                // }
                // return this.condItems.filter((el)=>el.Type === baseType);
                return this.condItems;
            },
        },
        mounted() {
            this.getConditions();
        },
        watch: {
            value(val) {
                this.conditions = [];
                val.forEach((el) => {
                    this.conditions.push(el);
                })
            },
        },
        methods: {
            getConditions() {
                this.loading = true;
                api.conditions.all().then((res) => {
                    this.condItems = res.data;
                    this.loading = false;
                });
            },
            updValue(val) {
                this.$emit('input', val);
            },
        }
    }
</script>