<template>
    <v-card>
        <v-card-title>Stages
            <v-spacer></v-spacer>
            <v-btn color="green" @click="addStage('')">Добавить</v-btn>
        </v-card-title>
        <v-card-text>
            <v-expansion-panels multiple>
                <v-expansion-panel v-for="(item,index) in value" :key="'stage_'+index">
                    <v-expansion-panel-header>Stage №{{index}}
                        <v-spacer></v-spacer>
                        <v-btn icon @click="deleteOne(index)">
                            <v-icon color="red">delete</v-icon>
                        </v-btn>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-textarea v-model="item.StageDescriptionText" label="Описание стадии"></v-textarea>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>
<script>
    // import api from '@/api'
    import {QSValues} from "@/config/quests";

    export default {
        name: 'StageList',
        data() {
            return {
                // loading: false,
                // conditions: [],
                // condItems: [],
            };
        },
        components: {
            // stageCreateComponent,
        },
        props: {
            value: Array,
            qid: String,
        },
        watch: {
            // value(val) {
            //     this.conditions = [];
            //     val.forEach((el) => {
            //         this.conditions.push(el);
            //     })
            // },
        },
        methods: {
            addStage(description) {
                const data = Object.assign({}, QSValues);
                // const object_number = this.value.length;
                // data.StageDescription = 'stage_description_'+object_number+'_'+this.qid;
                data.StageDescriptionText = description;
                this.value.push(data);
            },
            deleteOne(id) {
                this.value.splice(id, 1);
            },
            // updValue(val) {
            //     this.$emit('input', val);
            // },
        }
    }
</script>
