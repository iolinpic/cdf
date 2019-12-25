<template>
    <v-card>
        <v-card-text>
            <v-form v-model="valid">
                <template v-if="keys.length>=1">
                    <v-flex sm12 v-for="key in keys" :key="key">
                        <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''" :label="settings[key].label" v-model="ability[key]"></div>
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
    import {ActorValues, ActorFieldSettings} from "@/config/actors";
    import {VTextField,VTextarea} from 'vuetify/lib'
    // import abilityConditionsComponent from "@/components/AbilityConditionsComponent";
    // import crysmTypeComponent from '@/components/CrysmTypeComponent'
    // import optionsComponent from '@/components/OptionComponent'

    export default {
        name: 'ActorCreate',
        metaInfo: {
            title: 'Создание NPC',
        },
        components: {
            VTextField,
            VTextarea,
            // VSelect,
            // optionsComponent,
            // crysmTypeComponent,
            // abilityConditionsComponent,
        },
        data() {
            return {
                ability: ActorValues,
                valid: true,
            }
        },
        computed: {
            keys() {
                return Object.keys(this.ability);
            },
            settings(){
                return ActorFieldSettings;
            },
        },
        watch: {},
        methods: {
            back() {
                this.$router.push({name: 'actors'});
            },
            submit() {
                if (this.valid) {
                    api.actors.store(this.ability).then(() => {
                        this.back();
                    })
                }
            }
        }
    }
</script>