<template>
    <v-card>
        <v-card-text>
            <v-form v-model="valid">
                <template v-if="keys.length>=1">
                    <v-flex sm12 v-for="key in keys" :key="key">
                        <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''"
                             :label="settings[key].label" v-model="dialog[key]"></div>
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
    import {DialogValues,DialogFieldSettings} from "@/config/dialogs";
    import {VTextField,} from 'vuetify/lib'
    import dialogStagesComponent from "../../components/dialogs/dialogStagesComponent";

    export default {
        name: 'DialogEdit',
        metaInfo: {
            title: 'Редактирование  Диалога',
        },
        components: {
            VTextField,
            dialogStagesComponent,
        },
        data() {
            return {
                dialog: Object.assign({},DialogValues),
                valid: true,
            }
        },
        computed: {
            keys() {
                // return Object.keys(this.actor);
                return Object.keys(DialogFieldSettings);
            },
            settings() {
                return DialogFieldSettings;
            },
        },
        mounted() {
            this.getOne();
        },
        methods: {
            back() {
                this.$router.push({name: 'dialogs'});
            },
            getOne() {
                api.dialogs.one(this.$route.params.id).then((res) => {
                    delete res.data.id;
                    this.dialog = res.data;
                });
            },
            submit() {
                if (this.valid) {
                    api.dialogs.update(this.$route.params.id, this.dialog).then(() => {
                        this.back();
                    })
                }
            }
        }
    }
</script>
