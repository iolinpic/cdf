<template>
    <v-layout wrap>
        <v-flex sm6>
            <v-select :items="conditionTypes" v-model="type" item-text="name"
                      :item-value="Object" label="Тип состояния"></v-select>
        </v-flex>
        <v-flex sm5>
            <v-select :items="subtypes" v-model="subtype"  label="Подтип состояния"></v-select>
        </v-flex>
        <v-flex sm1>
            <v-btn icon @click="delLine">
                <v-icon>delete</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
</template>
<script>
    // import {conditionT} from "@/config/crysms";
    import {conditionTypes} from "@/config/conditions";

    export default {
        name: 'ResistanceComponent',
        data() {
            return {
                // crysm: crysmTypes[this.value.Type]
                type: {Subtype: 0},
                subtype: {},
                subtypes:['-'],
            }
        },
        computed: {
            conditionTypes() {
                return conditionTypes.splice(19, 1);
            }
        },
        watch: {
            value(val) {
                this.type = this.conditionTypes[val.Type];
                this.subtype = val.Subtype;
            },
            type(val){
                this.value.Type = this.getIdFromString(val.name);
                this.subtypes = val.subtypes
            },
            subtype(val) {
                this.value.Subtype = this.type.subtype.findIndex((el) => el === val);
            },
        },
        props: {
            value: Object,
        },
        methods: {
            delLine() {
                this.$emit('del');
            },
            getIdFromString(str) {
                return this.conditionTypes.findIndex((el) => el.name === str)
            },
        },

    }
</script>