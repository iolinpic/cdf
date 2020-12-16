<template>
    <v-card>
        <v-card-text>
            <v-form v-model="valid">
                <template v-if="keys.length>=1">
                    <v-flex sm12 v-for="key in keys" :key="key">
                        <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''" :label="settings[key].label" v-model="pack[key]"></div>
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
    import { SPValues,SPFieldSettings} from '@/config/spack';
    import {VTextField} from 'vuetify/lib'
    import itemsComponent from "../../components/spack/itemsComponent";

    export default {
        name: 'StoragePackCreate',
        metaInfo: {
            title: 'Создание нового сундука',
        },
        components: {
            VTextField,
            itemsComponent
            //VTextarea,
            //VSelect,
            //optionsComponent,
            //crysmTypeComponent,
            //abilityConditionsComponent,
            //fileUpload
        },
        data() {
            return {
                pack: Object.assign({},SPValues),
                valid: true,
            }
        },
        computed: {
            keys() {
                return Object.keys(SPFieldSettings);
            },
            settings(){
                return SPFieldSettings;
            },
        },
        watch: {},
        methods: {
            back() {
                this.$router.push({name: 'spack'});
            },
            submit() {
                if (this.valid) {
                    api.spack.store(this.pack).then(() => {
                        this.back();
                    })
                }
            }
        }
    }
</script>
