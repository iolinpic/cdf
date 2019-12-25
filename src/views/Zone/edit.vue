<template>
    <v-card>
        <v-card-text>
            <v-form v-model="valid">
                <template v-if="keys.length>=1">
                    <v-flex sm12 v-for="key in keys" :key="key">
                        <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''"
                             :label="settings[key].label" v-model="zone[key]"></div>
                    </v-flex>
                </template>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="green" @click="submit">Сохранить</v-btn>
            <v-btn color="red" @click="back">Отмена</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
    import api from "@/api"
    import {ZoneFieldSettings,ZoneValues} from "@/config/zone";
    import {VTextField,VTextarea} from 'vuetify/lib'

    export default {
        name: 'ZoneEdit',
        metaInfo: {
            title: 'Редактирование  карты',
        },
        components: {
            VTextField,
            VTextarea,
        },
        data() {
            return {
                zone: ZoneValues,
                valid: true,
            }
        },
        computed: {
            keys() {
                // return Object.keys(this.zone);
                return Object.keys(ZoneFieldSettings);
            },
            settings() {
                return ZoneFieldSettings;
            },
        },
        mounted() {
            this.getOne();
        },
        methods: {
            back() {
                this.$router.push({name: 'zones'});
            },
            getOne() {
                api.zones.one(this.$route.params.id).then((res) => {
                    delete res.data.id;
                    this.zone = res.data;
                });
            },
            submit() {
                if (this.valid) {
                    api.zones.update(this.$route.params.id, this.zone).then(() => {
                        this.back();
                    })
                }
            }
        }
    }
</script>