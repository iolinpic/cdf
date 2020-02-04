<template>
    <v-select label="выбор NPC" :items="npclist" :value="value" item-text="DisplayNameText" item-value="id"
              @input="npcSelect" :loading="loading"></v-select>
</template>
<script>
    import api from '@/api'

    export default {
        name: 'NPCSelectComponent',
        data() {
            return {
                loading: true,
                npclist: [],
            }
        },
        props: {
            value: String,
        },
        mounted(){
            this.getAll();
        },
        methods: {
            npcSelect(val) {
                this.$emit('input', val);
            },
            getAll() {
                this.loading = true;
                api.actors.all().then((res) => {
                    this.npclist = res.data;
                    this.loading = false;
                })
            },
        },
    }
</script>
