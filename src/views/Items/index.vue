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
            <tr v-for="(item,id) in items" :key="item.id">
                <td>{{ item.DisplayNameText }}</td>
                <td>{{ item.DescriptionText }}</td>
                <td>{{ item.Type+' - '+item.Subtype }}</td>
                <td><v-btn icon @click="$router.push({name:'item.edit',params:{id:item.id}})"><v-icon>edit</v-icon></v-btn><v-btn icon><v-icon @click="deleteOne(id)">delete</v-icon></v-btn></td>
            </tr>
            </tbody>
        </v-simple-table>
    </v-card>
</template>
<script>
    import {UI_TOOLBAR_BTNS,UI_TOOLBAR_BTNS_CLEAR} from "@/store/mutation-types";
    import api from '@/api';
    import {ITypes} from '@/config/items'
    import fileDownload from 'js-file-download'
    export default {
        name:'ItemsPage',
        metaInfo: {
            title: 'Список предметов',
        },
        data(){
            return {
                loading:true,
                items:[],
                buttons:[
                    {
                        text:'Создать',
                        icon:'add',
                        click:()=>{
                            this.$router.push({name:'item.create'});
                        }
                    },
                    {
                        text:'Сгенерировать',
                        icon:'add',
                        click:()=>{
                            api.items.generate().then((res)=>{
                                fileDownload(res.data,'items.zip');
                            });
                        }
                    },
                ],
            }
        },
        computed:{
            types(){
                return ITypes;
            },
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
                api.items.all().then((res)=>{
                    this.items = res.data;
                    this.loading = false
                });
            },
            deleteOne(id){
                api.items.delete(this.items[id].id).then(()=>{
                    this.items.splice(id,1);
                });
            }
        },
    }
</script>