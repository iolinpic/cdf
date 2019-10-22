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
        name: 'AbilityPackEdit',
        metaInfo: {
            title: 'Редактирование нового пула способностей',
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
        mounted() {
            this.getPack();
        },
        methods: {
            back() {
                this.$router.push({name: 'pack'});
            },
            getPack() {
                api.aPack.one(this.$route.params.id).then((res) => {
                    delete res.data.id;
                    this.pack = res.data;
                })
            },
            submit() {
                if (this.valid) {
                    api.aPack.update(this.$route.params.id, this.pack).then(() => {
                        this.back();
                    })
                }
            }
        }
    }
</script>