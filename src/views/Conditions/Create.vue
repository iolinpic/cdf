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
                <v-select v-model="type" :items="conditionTypes" label="Тип состояния" item-text="name"
                          :item-value="Object"
                ></v-select>
                <v-flex sm12 mb-3>{{type.description}}</v-flex>
                <v-select v-model="subtype" :items="type.subtype" label="Подтип состояния"
                          :readonly="type.subtype.length<=1"></v-select>
                <template v-if="Object.keys(condition.ConditionOptions).length>=1">
                    <h3>Детальные настройки</h3>
                    <v-divider class="mb-3"></v-divider>
                    <v-flex sm12 v-for="key in Object.keys(condition.ConditionOptions)" :key="key">

                        <template v-if="key !== 'Resistances'">
                            <options-component :label="conditionNames[key]"
                                               v-model="condition.ConditionOptions[key]"></options-component>
                        </template>
                        <template v-else>
                            <resistances-component :resistances="condition.ConditionOptions[key]"></resistances-component>
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
    import resistancesComponent from '@/components/ResistancesComponent'
    import crysmTypeComponent from '@/components/CrysmTypeComponent'
    import optionsComponent from '@/components/OptionComponent'

    export default {
        name: 'ConditionsCreate',
        metaInfo: {
            title: 'Создание нового состояния',
        },
        components: {
            resistancesComponent,
            optionsComponent,
            crysmTypeComponent,
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
                type: conditionTypes[0],
                subtype: conditionTypes[0].subtype[0],
                valid: true,
            }
        },
        computed: {
            conditionTypes() {
                return conditionTypes;
            },
            conditionNames() {
                return conditionNamesTranslate;
            },
        },
        watch: {
            type(val) {
                this.condition.Type = this.getIdFromString(val.name);
                this.subtype = val.subtype[0];
                this.condition.ConditionOptions = val.ConditionOptions;
            },
            subtype(val) {
                this.condition.Subtype = this.type.subtype.findIndex((el) => el === val);
            },
        },
        methods: {
            back() {
                this.$router.push({name: 'conditions'});
            },
            getIdFromString(str) {
                return this.conditionTypes.findIndex((el) => el.name === str)
            },
            submit() {
                if (this.valid) {
                    api.conditions.store(this.condition).then(() => {
                        this.back();
                    })
                }
            }
        }
    }
</script>