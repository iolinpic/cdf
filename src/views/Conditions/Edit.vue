<template>
    <v-card>
        <v-card-text>
            <v-form v-model="valid">
                <v-text-field v-model="condition.DisplayNameText" label="Отображаемое имя"
                              type="text"
                              name="name"
                              v-validate="'required'"
                              :error-messages="errors.collect('name')"
                ></v-text-field>
                <v-textarea name="description" v-validate="'required'" label="Описание"
                            :error-messages="errors.collect('description')" v-model="condition.DescriptionText">
                </v-textarea>
                <v-select multiple :items="crysmTypes" v-model="immunity" label="Имунные к состоянию"></v-select>
                <v-text-field :value="type.name" label="Тип состояния" readonly
                              disabled></v-text-field>
                <v-flex sm12 mb-3>{{type.description}}</v-flex>
                <v-select v-model="subtype" :items="type.subtype" label="Подтип состояния"
                          :readonly="type.subtype.length<=1" :disabled="type.subtype.length<=1"></v-select>
                <template v-if="Object.keys(condition.ConditionOptions).length>=1">
                    <h3>Детальные настройки</h3>
                    <v-divider class="mb-3"></v-divider>
                    <v-flex sm12 v-for="key in Object.keys(condition.ConditionOptions)" :key="key">

                        <template v-if="key !== 'Resistances'">
                            <options-component :label="conditionNames[key]"
                                               v-model="condition.ConditionOptions[key]"></options-component>
                        </template>
                        <template v-else>
                            <v-layout wrap class="mb-3">
                                <v-flex sm6><h4>Сопротивления</h4></v-flex>
                                <v-flex sm6>
                                    <v-btn color="blue" @click="addResistanceValue">Добавить сопротивление</v-btn>
                                </v-flex>
                                <v-divider class="mb-3"></v-divider>
                            </v-layout>
                            <resistance-component :value="res" v-for="(res,index) in condition.ConditionOptions[key]"
                                                  :key="key+'_'+index"
                                                  @del="removeResistanceValue(index)"></resistance-component>
                        </template>


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
    import {conditionTypes, crysmTypes, conditionNamesTranslate} from '@/config/gameArrays'
    import resistanceComponent from '@/components/ResistanceComponent'
    import optionsComponent from '@/components/OptionComponent'

    export default {
        name: 'ConditionsEdit',
        metaInfo: {
            title: 'Редактирование состояния',
        },
        components: {
            resistanceComponent,
            optionsComponent,
        },
        data() {
            return {
                condition: {
                    DisplayNameText: '',
                    DescriptionText: '',
                    Type: 0,
                    SubType: 0,
                    Immunity: [],
                    ConditionOptions: conditionTypes[0].ConditionOptions,
                },
                subtype: conditionTypes[0].subtype[0],
                immunity: [],
                valid: true,
            }
        },
        computed: {
            type() {
                return this.conditionTypes[this.condition.Type];
            },
            conditionTypes() {
                return conditionTypes;
            },
            crysmTypes() {
                return crysmTypes;
            },
            conditionNames() {
                return conditionNamesTranslate;
            },
        },
        watch: {
            subtype(val) {
                this.condition.SubType = this.type.subtype.findIndex((el) => el === val);
            },
            immunity(val) {
                this.condition.Immunity = val.map((el) => {
                    return this.crysmTypes.findIndex((cr) => cr === el)
                })
            }
        },
        mounted() {
            this.getCondition();
        },
        methods: {
            getCondition() {
                api.conditions.one(this.$route.params.id).then((res) => {
                    this.condition = res.data;
                    this.subtype = this.type.subtype[this.condition.SubType];
                    const tmp = [];
                    this.condition.Immunity.forEach((el) => {
                        tmp.push(this.crysmTypes[el]);
                    });
                    this.immunity = tmp;
                })
            },
            back() {
                this.$router.push({name: 'conditions'});
            },
            getIdFromString(str) {
                return this.conditionTypes.findIndex((el) => el.name === str)
            },
            addResistanceValue() {
                this.condition.ConditionOptions['Resistances'].push({
                    "Type": 0,
                    "Value": 0.5
                });
            },
            removeResistanceValue(index) {
                this.condition.ConditionOptions['Resistances'].splice(index, 1);
            },
            submit() {
                if (this.valid) {
                    api.conditions.update(this.$route.params.id, this.condition).then(() => {
                        this.back();
                    })
                }
            }
        }
    }
</script>