<template>
    <v-select v-model="item" :items="filteredItems" item-value="id" item-text="DisplayNameText"
              :loading="loading" @input="updValue" :label="label"></v-select>
</template>
<script>
    import api from '@/api'
    import {CItems} from "@/config/crysms";

    export default {
        name: 'EvolutionItems',
        data() {
            return {
                loading: false,
                item: "",
                items: [],
                filter: CItems,
            };
        },
        props: {
            value: String,
            label: String,
        },
        computed: {
            filteredItems() {
                return this.items.filter((el) => el.Type === this.filter.Type && el.Subtype === this.filter.Subtype);
            },
        },
        mounted() {
            this.item = this.value;
            this.getItems();
        },
        watch: {
            value(val) {
                this.item = val;
                // val.forEach((el) => {
                //     this.item.push(el);
                // })
            },
        },
        methods: {
            getItems() {
                this.loading = true;
                api.items.all().then((res) => {
                    this.items = res.data;
                    this.loading = false;
                });
            },
            updValue(val) {
                this.$emit('input', val);
            },
        }
    }
</script>