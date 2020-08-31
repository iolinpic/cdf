<template>
    <v-card flat>
        <v-card-title class="px-0">Stages
            <v-spacer></v-spacer>
            <v-btn color="green" @click="addStage()">Добавить</v-btn>
        </v-card-title>
        <v-card-text class="px-0">
            <v-expansion-panels multiple>
                <v-expansion-panel v-for="(item,index) in value" :key="'stage_'+index">
                    <v-expansion-panel-header><span>Stage №{{index}}</span>
                        <div>
                            <v-btn icon v-if="index>0" @click.stop="moveUp(index)">
                                <v-icon>arrow_upward</v-icon>
                            </v-btn>
                            <v-btn icon v-if="index<value.length-1" @click.stop="moveDown(index)">
                                <v-icon>arrow_downward</v-icon>
                            </v-btn>
                            <v-btn icon @click="deleteOne(index)">
                                <v-icon color="red">delete</v-icon>
                            </v-btn>
                        </div>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
                        <v-textarea v-model="item.StageDescriptionText" label="Описание стадии"></v-textarea>
                        <goals-component v-model="item.Goals" :stage="index"></goals-component>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>
<script>
    // import api from '@/api'
    import {QSValues} from "@/config/quests";
    import GoalsComponent from "./goal/index"

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
            GoalsComponent,
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
            addStage() {
                const data = JSON.parse(JSON.stringify(QSValues));
                // let data = Object.assign({}, QSValues);
                // const object_number = this.value.length;

                // data.StageDescriptionText = description;
                this.value.push(data);
                // this.descriptionChange(this.value[this.value.length -1],this.value.length -1);
            },
            deleteOne(id) {
                this.value.splice(id, 1);
                for (let index=id;index<this.value.length;index++) {
                    this.descriptionChange(this.value[index],index);
                }
            },
            descriptionChange(data,index){
                data.StageDescription = `stage_description_${index}_${this.qid}`;
            },
            moveUp(index) {
                if (index <= 0) return;
                let tmp = this.value[index - 1];
                this.value[index - 1] = this.value[index];
                // this.descriptionChange(this.value[index-1],index-1);
                this.value[index] = tmp;
                // this.descriptionChange(this.value[index],index);
                this.$forceUpdate();
            },
            moveDown(index) {
                if (index >= this.value.length - 1) return;
                let tmp = this.value[index + 1];
                this.value[index + 1] = this.value[index];
                // this.descriptionChange(this.value[index+1],index+1);
                this.value[index] = tmp;
                // this.descriptionChange(this.value[index],index);
                this.$forceUpdate();
            }
            // updValue(val) {
            //     this.$emit('input', val);
            // },
        }
    }
</script>
