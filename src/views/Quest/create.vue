<template>
    <v-card>
        <v-card-text>
            <v-form v-model="valid">
                <template v-if="keys.length>=1">
                    <v-flex sm12 v-for="key in keys" :key="key">
                        <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''" :label="settings[key].label" v-model="quest[key]"></div>
                    </v-flex>
                </template>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="green" @click="submit">Продолжить создание</v-btn>
            <v-btn color="red" @click="backToIndex">Отмена</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
    import api from "@/api"
    import {QValues, QFieldSettings} from "@/config/quests";
    import {VTextField, VTextarea, VSelect} from 'vuetify/lib'
    import deepCopy from "../../util/deepCopy";
    // import questConditionsComponent from "@/components/AbilityConditionsComponent";
    // import crysmTypeComponent from '@/components/CrysmTypeComponent'
    // import optionsComponent from '@/components/OptionComponent'

    export default {
        name: 'QuestCreate',
        metaInfo: {
            title: 'Создание нового квеста',
        },
        components: {
            VTextField,
            VTextarea,
            VSelect,
            // optionsComponent,
            // crysmTypeComponent,
            // questConditionsComponent,
        },
        data() {
            return {
                quest: deepCopy(QValues),
                valid: true,
            }
        },
        computed: {
            keys() {
                // return Object.keys(this.quest);
                return Object.keys(QFieldSettings);
            },
            settings(){
                return QFieldSettings;
            },
        },
        watch: {},
        methods: {
            backToIndex(){
                this.$router.push({name: 'quests'});
            },
            back(id) {
                this.$router.push({name: 'quests.edit',params:{id:id}});
            },
            submit() {
                if (this.valid) {
                    api.quests.store(this.quest).then((res) => {
                        // eslint-disable-next-line no-console
                        // console.log(res.data.id);
                        this.back(res.data.id);
                    })
                }
            }
        }
    }
</script>
