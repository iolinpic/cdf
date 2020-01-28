<template>
    <v-autocomplete :items="zones" v-model="obj.Map" item-value="DisplayNameText" item-text="DisplayNameText"
                    label="Карта" :loading="loading"></v-autocomplete>
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
            obj: Object,
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
        }
    }
</script>
