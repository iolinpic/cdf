<template>
    <v-select :label="label" :items="list" :value="value" item-text="DisplayNameText" item-value="id"
              @input="inputSelect" :loading="loading"></v-select>
</template>
<script>
    import api from '@/api'

    export default {
        name: 'CrysmSelectComponent',
        data() {
            return {
                loading: true,
                list: [],
            }
        },
        props: {
            value: String,
            label: String,
        },
        mounted() {
            this.getAll();
        },
        methods: {
            inputSelect(val) {
                this.$emit('input', val);
            },
            getAll() {
                this.loading = true;
                api.crysms.all().then((res) => {
                    this.list = res.data;
                    this.loading = false;
                })
            },
        },
    }
</script>
