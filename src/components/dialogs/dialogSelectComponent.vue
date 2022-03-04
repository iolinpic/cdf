<template>
    <v-autocomplete v-model="item" :items="items" item-value="id" item-text="Name"
              :loading="loading" @input="updValue" :label="label"></v-autocomplete>
</template>
<script>
    import api from '@/api'
    // import {CItems} from "@/config/crysms";

    export default {
        name: 'DialogSelectComponent',
        data() {
            return {
                loading: false,
                item: "",
                items: [],
                // filter: CItems,
            };
        },
        props: {
            value: String,
            label: String,
        },
        // computed: {
        //     filteredItems() {
        //         return this.items.filter((el) => el.Type === this.filter.Type && el.Subtype === this.filter.Subtype);
        //     },
        // },
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
                api.dialogs.all().then((res) => {
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
