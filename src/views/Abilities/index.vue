<template>
    <v-card>
        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
        <v-simple-table v-else>
            <thead>
            <tr>
                <th class="text-left">Название</th>
                <th class="text-left">Описание</th>
                <th class="text-left">Действия</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,id) in abilities" :key="item.id">
                <td>{{ item.DisplayNameText }}</td>
                <td>{{ item.DescriptionText }}</td>
                <td><v-btn icon @click="$router.push({name:'abilities.edit',params:{id:item.id}})"><v-icon>edit</v-icon></v-btn><v-btn icon><v-icon @click="deleteOne(id)">delete</v-icon></v-btn></td>
            </tr>
            </tbody>
        </v-simple-table>
    </v-card>
</template>
<script>
    import {UI_TOOLBAR_BTNS,UI_TOOLBAR_BTNS_CLEAR} from "@/store/mutation-types";
    import api from '@/api';
    import fileDownload from 'js-file-download'
    export default {
        name:'AbilitiesPage',
        metaInfo: {
            title: 'Список способностей',
        },
        data(){
            return {
                loading:true,
                abilities:[],
                buttons:[
                    {
                        text:'Создать',
                        icon:'add',
                        click:()=>{
                            this.$router.push({name:'abilities.create'});
                        }
                    },
                    {
                        text:'Сгенерировать',
                        icon:'add',
                        click:()=>{
                            api.abilities.generate().then((res)=>{
                                fileDownload(res.data,'abilities.zip');
                            });
                        }
                    },
                ],
            }
        },
        computed:{
        },
        mounted(){
            this.getAll();
            this.$store.commit(UI_TOOLBAR_BTNS,this.buttons);
        },
        beforeDestroy(){
            this.$store.commit(UI_TOOLBAR_BTNS_CLEAR);
        },
        methods:{
            getAll(){
                api.conditions.all().then((res)=>{
                    this.conditions = res.data;
                    this.loading = false
                });
            },
            deleteOne(id){
                api.abilities.delete(this.abilities[id].id).then(()=>{
                    this.abilities.splice(id,1);
                });
            }
        },
    }
</script>