<template>
    <v-card>
        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
        <v-simple-table v-else>
            <thead>
            <tr>
                <th class="text-left">Название</th>
                <th class="text-left">Описание</th>
                <th class="text-left">Тип</th>
                <th class="text-left">Действия</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,id) in conditions" :key="item.id">
                <td>{{ item.DisplayNameText }}</td>
                <td>{{ item.DescriptionText }}</td>
                <td>{{ getTypeString(item.Type,item.SubType) }}</td>
                <td><v-btn icon @click="$router.push({name:'conditions.edit',params:{id:item.id}})"><v-icon>edit</v-icon></v-btn><v-btn icon><v-icon @click="deleteCondition(id)">delete</v-icon></v-btn></td>
            </tr>
            </tbody>
        </v-simple-table>
    </v-card>
</template>
<script>
    import {UI_TOOLBAR_BTNS,UI_TOOLBAR_BTNS_CLEAR} from "@/store/mutation-types";
    import api from '@/api';
    import {conditionTypes} from '@/config/gameArrays'
    export default {
        name:'ConditionsPage',
        metaInfo: {
            title: 'Список состояний',
        },
        data(){
            return {
                loading:true,
                conditions:[],
                buttons:[
                    {
                        text:'Создать',
                        icon:'add',
                        click:()=>{
                            this.$router.push({name:'conditions.create'});
                        }
                    },
                ],
            }
        },
        computed:{
            types(){
                return conditionTypes;
            },
        },
        mounted(){
            this.getAllConditions();
            this.$store.commit(UI_TOOLBAR_BTNS,this.buttons);
        },
        beforeDestroy(){
            this.$store.commit(UI_TOOLBAR_BTNS_CLEAR);
        },
        methods:{
            getAllConditions(){
                api.conditions.all().then((res)=>{
                    this.conditions = res.data;
                    this.loading = false
                });
            },
            getTypeString(type, subtype){
                return `${this.types[type].name} : ${this.types[type].subtype[subtype]}`
            },
            deleteCondition(id){
                api.conditions.delete(this.conditions[id].id).then(()=>{
                    this.conditions.splice(id,1);
                });
            }
        },
    }
</script>