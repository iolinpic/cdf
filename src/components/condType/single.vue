<template>
    <v-layout wrap>
        <v-flex sm6>
            <v-select :items="conditionTypes" v-model="type" item-text="name"
                      :item-value="Object" label="Тип состояния"></v-select>
        </v-flex>
        <v-flex sm5>
            <v-select :items="subtypes" v-model="subtype" label="Подтип состояния"
                      :readonly="type.subtype.length<=1"></v-select>
        </v-flex>
        <v-flex sm1>
            <v-btn icon @click="delLine">
                <v-icon>delete</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
</template>
<script>
    import {conditionTypes} from "@/config/conditions";

    export default {
        name: 'singleConditionComponent',
        data() {
            return {
                type: conditionTypes[this.value.Type],
                subtype: conditionTypes[this.value.Type].subtype[this.value.Subtype],
                subtypes: conditionTypes[this.value.Type].subtype,
            }
        },
        computed: {
            conditionTypes() {
                const tmp = conditionTypes.slice(0);
                tmp.splice(19, 1);
                return tmp;
            }
        },
        watch: {
            value() {
                this.type = this.conditionTypes[this.value.Type];
                this.subtypes = this.type.subtypes;
                this.subtype = this.type.subtype[this.value.Subtype];
                this.$forceUpdate();
            },
            type(val) {
                this.value.Type = this.getIdFromString(val.name);
                this.subtypes = val.subtype;
                this.subtype = val.subtype[0];
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