<template>
    <v-autocomplete :items="zones" :value="value" item-value="DisplayNameText" item-text="DisplayNameText"
                    label="Карта" :loading="loading" @input="inputSelect"></v-autocomplete>
</template>
<script>
    import api from '@/api'

    export default {
        name: 'ZoneSelectSingleComponent',
        data() {
            return {
                loading: true,
                zones: [],
            }
        },
        props: {
            // obj: Object,
            value:String,
            label:String,
        },
        mounted() {
            this.getAll();
        },
        methods: {
            getAll() {
                this.loading = true;
                api.zones.all().then((res) => {
                    this.zones = res.data;
                    this.loading = false;
                })
            },
            inputSelect(val){
                this.$emit('input',val);
            },
        }
    }
</script>
