<template>
    <v-dialog v-model="dialog" persistent>
        <v-card>
            <v-card-title>Редактирование эволюции</v-card-title>
            <v-card-text>
                <v-form v-model="valid">
                    <v-flex sm12>
                        <crysm-evolution-conditions label="Условия эволюционирования"
                                                    v-model="crysmEvolution.SelectedConditions"></crysm-evolution-conditions>
                    </v-flex>
                    <v-flex sm12 v-if="showMap">
                        <v-autocomplete :items="maps" v-model="crysmEvolution.Map" label="Карты" multiple></v-autocomplete>
                    </v-flex>
                    <v-flex sm12 v-if="showItem">
                        <v-select :items="items" v-model="crysmEvolution.Item" label="Предмет"></v-select>
                    </v-flex>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="green" @click="submit">Сохранить</v-btn>
                <v-btn color="red" @click="cancel">Отмена</v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>
<script>
    import crysmEvolutionConditions from "@/components/crysmEvolution/crysmEvolutionConditions";
    import {CEvolution, CEvolutionMaps, CEvolutionItems} from "@/config/crysms"
    import api from "@/api"

    export default {
        name: 'EvolutionEditDialog',
        data() {
            return {
                valid: true,
                crysmEvolution: Object.assign({}, CEvolution),
                showMap: false,
                showItem: false,
                updObj: {},
            }
        },
        computed: {
            maps() {
                return CEvolutionMaps;
            },
            items() {
                return CEvolutionItems;
            },
        },
        components: {
            crysmEvolutionConditions,
        },
        props: {
            dialog: Boolean,
            // current: String,
            crysm: Object,
            condition: String,
        },
        mounted() {
            this.updCrysm();
            this.checkFields();
        },
        watch: {
            'crysmEvolution.SelectedConditions'() {
                this.checkFields();
            },
            crysm() {
                this.updCrysm();
            },
            condition() {
                this.updCrysm();
            },
        },
        methods: {
            updCrysm() {
                this.updObj = Object.assign({}, this.crysm);
                delete this.updObj.id;
                const index = this.updObj.EvolutionConditions.findIndex((el) => el.NextConfig === this.condition);
                this.crysmEvolution =this.updObj.EvolutionConditions[index];
            },
            back() {
                this.showItem = false;
                this.showMap = false;
                this.crysmEvolution = Object.assign({}, CEvolution);
                this.$emit('close');
            },
            checkFields() {
                this.showMap = this.showField("Map");
                this.showItem = this.showField("Item");
            },
            showField(name) {
                return this.crysmEvolution.SelectedConditions.findIndex((el) => el === name) > -1
            },
            cancel() {
                this.back();
            },
            submit() {
                if (this.valid) {
                    // this.updObj.EvolutionConditions.push(this.crysmEvolution);
                    api.crysms.update(this.crysm.id, this.updObj).then(() => {
                        this.back();
                    })
                    // api.crysms.store(this.crysm).then(() => {
                    //     this.back();
                    // })
                }
            }
        }

    }
</script>