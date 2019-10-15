<template>
    <v-card>
        <v-card-text>
            <v-form v-model="valid">
                <template v-if="keys.length>=1">
                    <v-flex sm12 v-for="key in keys" :key="key">
                        <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''"
                             :label="settings[key].label" v-model="ability[key]"></div>
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
    import {AFieldSettings,AValues} from "@/config/abilities";
    import {VTextField, VTextarea, VSelect} from 'vuetify/lib'
    import abilityConditionsComponent from "@/components/AbilityConditionsComponent";
    import crysmTypeComponent from '@/components/CrysmTypeComponent'
    import optionsComponent from '@/components/OptionComponent'

    export default {
        name: 'AbilitiesEdit',
        metaInfo: {
            title: 'Редактирование  способности',
        },
        components: {
            VTextField,
            VTextarea,
            VSelect,
            optionsComponent,
            crysmTypeComponent,
            abilityConditionsComponent,
        },
        data() {
            return {
                ability: AValues,
                valid: true,
            }
        },
        computed: {
            keys() {
                return Object.keys(this.ability);
            },
            settings() {
                return AFieldSettings;
            },
        },
        mounted() {
            this.getOne();
        },
        methods: {
            back() {
                this.$router.push({name: 'abilities'});
            },
            getOne() {
                api.abilities.one(this.$route.params.id).then((res) => {
                    delete res.data.id;
                    this.ability = res.data;
                });
            },
            submit() {
                if (this.valid) {
                    api.abilities.update(this.$route.params.id, this.ability).then(() => {
                        this.back();
                    })
                }
            }
        }
    }
</script>