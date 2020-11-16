<template>
    <v-card>
        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
        <v-simple-table v-else>
            <thead>
            <tr>
                <th class="text-left">Название</th>
                <th class="text-left">Действия</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,id) in dialogs" :key="item.id">
                <td>{{ item.Name }}</td>
                <td><v-btn icon @click="$router.push({name:'dialogs.edit',params:{id:item.id}})"><v-icon>edit</v-icon></v-btn><v-btn icon><v-icon @click="deleteOne(id)">delete</v-icon></v-btn></td>
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
        name:'DialogsPage',
        metaInfo: {
            title: 'Список Диалогов',
        },
        data(){
            return {
                loading:true,
                dialogs:[],
                buttons:[
                    {
                        text:'Создать',
                        icon:'add',
                        click:()=>{
                            this.$router.push({name:'dialogs.create'});
                        }
                    },
                    {
                        text:'Сгенерировать',
                        icon:'add',
                        click:()=>{
                            api.dialogs.generate().then((res)=>{
                                fileDownload(res.data,'dialogs.zip');
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
                api.dialogs.all().then((res)=>{
                    this.dialogs = res.data;
                    this.loading = false
                });
            },
            deleteOne(id){
                api.dialogs.delete(this.dialogs[id].id).then(()=>{
                    this.dialogs.splice(id,1);
                });
            }
        },
    }
</script>
