<template>
    <v-card>
        <v-card-text>
            <v-form v-model="valid">
                <template v-if="keys.length>=1">
                    <v-flex sm12 v-for="key in keys" :key="key">
                        <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''"
                             :label="settings[key].label" v-model="crysm[key]"></div>
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
    import {CValues, CFieldSettings} from "@/config/crysms";
    import {VTextField, VTextarea, VSelect} from 'vuetify/lib'
    import crysmTypeComponent from '@/components/CrysmTypeComponent'
    import optionsComponent from '@/components/OptionComponent'
    import milestonesComponent from '@/components/milestones/array'


    export default {
        name: 'CrysmEdit',
        metaInfo: {
            title: 'Редактирование кризма',
        },
        components: {
            VTextField,
            VTextarea,
            VSelect,
            optionsComponent,
            crysmTypeComponent,
            milestonesComponent,
        },
        data() {
            return {
                crysm: CValues,
                valid: true,
            }
        },
        computed: {
            keys() {
                return Object.keys(this.crysm).filter((key) => this.settings.hasOwnProperty(key));
            },
            settings() {
                return CFieldSettings;
            },
        },
        mounted() {
            this.getOne();
        },
        methods: {
            getOne() {
                api.crysms.one(this.$route.params.id).then((res) => {
                    delete res.data.id;
                    this.crysm = res.data;
                    //added blueprint field fix (remove when all blueprints will be updated
                    if(!this.crysm.hasOwnProperty('Blueprint')){
                        this.crysm.Blueprint = "";
                    }
                });
            },
            back() {
                this.$router.push({name: 'crysm'});
            },
            submit() {
                if (this.valid) {
                    api.crysms.update(this.$route.params.id, this.crysm).then(() => {
                        this.back();
                    })
                }
            }
        }
    }
</script>
