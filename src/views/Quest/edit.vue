<template>
    <v-card flat>
        <v-card-text>
            <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
            <v-form v-model="valid" v-else>
                <template v-if="keys.length>=1">
                    <v-flex sm12 v-for="key in keys" :key="key">
                        <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''"
                             :label="settings[key].label" v-model="quest[key]"></div>
                    </v-flex>
                </template>
                <stage-component v-model="quest.Stage" :qid="$route.params.id"></stage-component>
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
    import {QValues, QFieldSettings} from "@/config/quests";
    import {VTextField, VTextarea, VSelect} from 'vuetify/lib'
    import StageComponent from '@/components/stages/index'
    import deepCopy from "../../util/deepCopy";
    // import abilityConditionsComponent from "@/components/AbilityConditionsComponent";
    // import crysmTypeComponent from '@/components/CrysmTypeComponent'
    // import optionsComponent from '@/components/OptionComponent'

    export default {
        name: 'QuestsEdit',
        metaInfo: {
            title: 'Редактирование  квеста',
        },
        components: {
            VTextField,
            VTextarea,
            VSelect,
            StageComponent,
            // optionsComponent,
            // crysmTypeComponent,
            // abilityConditionsComponent,
        },
        data() {
            return {
                loading: true,
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
        mounted() {
            this.getOne();
        },
        methods: {
            back() {
                this.$router.push({name: 'quests'});
            },
            getOne() {
                this.loading = true;
                api.quests.one(this.$route.params.id).then((res) => {
                    delete res.data.id;
                    this.quest = res.data;
                    this.loading = false;
                });
            },
            submit() {
                if (this.valid) {
                    api.quests.update(this.$route.params.id, this.quest).then(() => {
                        this.back();
                    })
                }
            }
        }
    }
</script>
