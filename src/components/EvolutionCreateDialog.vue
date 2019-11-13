<template>
    <v-dialog v-model="dialog" persistent>
        <v-card>
            <v-card-title>Создание эволюции</v-card-title>
            <v-card-text>
                <v-form v-model="valid">
                    <!--                    <template v-if="keys.length>=1">-->
                    <v-flex sm12>
                        <crysm-evolution-conditions label="Условия эволюционирования"
                                                    v-model="crysmEvolution.SelectedConditions"></crysm-evolution-conditions>

                        <!--                                <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''"-->
                        <!--                                     :label="settings[key].label" v-model="crysmEvolution[key]"></div>-->
                    </v-flex>
                    <v-flex sm12 v-if="showMap">
                        <v-select :items="maps" v-model="crysmEvolution.Map" label="Карта"></v-select>
                    </v-flex>
                    <v-flex sm12 v-if="showItem">
                        <v-select :items="items" v-model="crysmEvolution.Item" label="Предмет"></v-select>
                    </v-flex>
                    <!--                    </template>-->
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="green" @click="submit">Сохранить</v-btn>
                <v-btn color="red" @click="back">Отмена</v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>
<script>
    import crysmEvolutionConditions from "@/components/crysmEvolution/crysmEvolutionConditions";
    import {VSelect} from 'vuetify/lib'
    import {CEvolution, CEvolutionMaps, CEvolutionItems} from "@/config/crysms"
    // import api from "@/api"
    export default {
        name: 'EvolutionCreateDialog',
        data() {
            return {
                valid: true,
                crysmEvolution: CEvolution,
                showMap: false,
                showItem: false,
                // fields: {
                //     EvolutionLevel: -1,
                //     EvolutionConditions: [],
                // }
            }
        },
        computed: {
            // keys() {
            //     return Object.keys(this.crysmEvolution).filter((key) => this.settings.hasOwnProperty(key));
            // },
            maps() {
                return CEvolutionMaps;
            },
            items() {
                return CEvolutionItems;
            },
        },
        components: {
            crysmEvolutionConditions,
            VSelect,
        },
        props: {
            dialog: Boolean,
        },
        mounted() {
            this.checkFields();
        },
        watch: {
            'crysmEvolution.SelectedConditions'() {
                this.checkFields();
            }
        },
        methods: {
            back() {
                this.$emit('close');
            },
            checkFields() {
                this.showMap = this.showField("Map");
                this.showItem = this.showField("Item");
            },
            showField(name) {
                return this.crysmEvolution.SelectedConditions.findIndex((el) => el === name) > -1
            },
            submit() {
                if (this.valid) {
                    // api.crysms.store(this.crysm).then(() => {
                    //     this.back();
                    // })
                }
            }
        }

    }
</script>