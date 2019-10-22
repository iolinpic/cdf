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
    import {APFieldSettings,APValues} from "@/config/abilityPack";
    import AbilitiesComponent from "@/components/AbilitiesComponent";
    import BonusesComponent from "@/components/BonusesComponent";
    import {VTextField, VTextarea, VSelect} from 'vuetify/lib'

    export default {
        name: 'AbilityPackCreate',
        metaInfo: {
            title: 'Создание нового пула способностей',
        },
        components: {
            VTextField,
            VTextarea,
            VSelect,
            AbilitiesComponent,
            BonusesComponent,
        },
        data() {
            return {
                pack: APValues,
                valid: true,
            }
        },
        computed: {
            keys() {
                return Object.keys(this.pack);
            },
            settings(){
                return APFieldSettings;
            },
        },
        watch: {},
        methods: {
            back() {
                this.$router.push({name: 'pack'});
            },
            submit() {
                if (this.valid) {
                    api.aPack.store(this.pack).then(() => {
                        this.back();
                    })
                }
            }
        }
    }
</script>