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
                <crysm-type-component label="Имунные к состоянию" v-model="condition.Immunity"></crysm-type-component>
                <v-text-field :value="type.name" label="Тип состояния" readonly
                              disabled></v-text-field>
                <v-flex sm12 mb-3>{{type.description}}</v-flex>
                <v-select v-model="subtype" :items="type.subtype" label="Подтип состояния"
                          :readonly="type.subtype.length<=1" :disabled="type.subtype.length<=1"></v-select>
                <template v-if="Object.keys(condition.ConditionOptions).length>=1">
                    <h3>Детальные настройки</h3>
                    <v-divider class="mb-3"></v-divider>
                    <v-flex sm12 v-for="key in Object.keys(condition.ConditionOptions)" :key="key">
                        <template v-if="key !== 'ConditionsTypes'">
                            <options-component :label="conditionNames[key]"
                                               v-model="condition.ConditionOptions[key]"></options-component>
                        </template>
<!--                        <template v-else>-->
<!--                            <resistances-component :resistances="condition.ConditionOptions[key]"></resistances-component>-->
<!--                        </template>-->
                        <template v-else>
                            <conditions-type-component :value="condition.ConditionOptions[key]"></conditions-type-component>
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
    import {conditionTypes, conditionNamesTranslate} from '@/config/conditions'
    // import resistancesComponent from '@/components/ResistancesComponent'
    import conditionsTypeComponent from '@/components/condType/array'
    import crysmTypeComponent from '@/components/CrysmTypeComponent'
    import optionsComponent from '@/components/OptionComponent'

    export default {
        name: 'ConditionsEdit',
        metaInfo: {
            title: 'Редактирование состояния',
        },
        components: {
            // resistancesComponent,
            crysmTypeComponent,
            conditionsTypeComponent,
            optionsComponent,
        },
        data() {
            return {
                condition: {
                    DisplayNameText: '',
                    DescriptionText: '',
                    Type: 0,
                    Subtype: 0,
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
            conditionNames() {
                return conditionNamesTranslate;
            },
        },
        watch: {
            subtype(val) {
                this.condition.Subtype = this.type.subtype.findIndex((el) => el === val);
            },
        },
        mounted() {
            this.getCondition();
        },
        methods: {
            getCondition() {
                api.conditions.one(this.$route.params.id).then((res) => {
                    this.condition = res.data;
                    this.subtype = this.type.subtype[this.condition.Subtype];
                })
            },
            back() {
                this.$router.push({name: 'conditions'});
            },
            getIdFromString(str) {
                return this.conditionTypes.findIndex((el) => el.name === str)
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