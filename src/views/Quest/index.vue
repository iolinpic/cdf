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
            <tr v-for="(item,id) in quests" :key="item.id">
                <td>{{ item.DisplayNameText }}</td>
                <td>{{ item.DescriptionText }}</td>
                <td><v-btn icon @click="$router.push({name:'quests.edit',params:{id:item.id}})"><v-icon>edit</v-icon></v-btn><v-btn icon><v-icon @click="deleteOne(id)">delete</v-icon></v-btn></td>
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
        name:'QuestsPage',
        metaInfo: {
            title: 'Список квестов',
        },
        data(){
            return {
                loading:true,
                quests:[],
                buttons:[
                    {
                        text:'Создать',
                        icon:'add',
                        click:()=>{
                            this.$router.push({name:'quests.create'});
                        }
                    },
                    {
                        text:'Сгенерировать',
                        icon:'add',
                        click:()=>{
                            api.quests.generate().then((res)=>{
                                fileDownload(res.data,'quests.zip');
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
                api.quests.all().then((res)=>{
                    this.quests = res.data;
                    this.loading = false
                });
            },
            deleteOne(id){
                api.quests.delete(this.quests[id].id).then(()=>{
                    this.quests.splice(id,1);
                });
            }
        },
    }
</script>
