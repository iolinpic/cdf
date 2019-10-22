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
            <tr v-for="(item,id) in packs" :key="item.id">
                <td>{{ item.Name }}</td>
                <td><v-btn icon @click="$router.push({name:'pack.edit',params:{id:item.id}})"><v-icon>edit</v-icon></v-btn><v-btn icon><v-icon @click="deleteOne(id)">delete</v-icon></v-btn></td>
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
        name:'AbilityPackPage',
        metaInfo: {
            title: 'Комплекты способностей',
        },
        data(){
            return {
                loading:true,
                packs:[],
                buttons:[
                    {
                        text:'Создать',
                        icon:'add',
                        click:()=>{
                            this.$router.push({name:'pack.create'});
                        }
                    },
                    {
                        text:'Сгенерировать',
                        icon:'add',
                        click:()=>{
                            api.aPack.generate().then((res)=>{
                                fileDownload(res.data,'aPacks.zip');
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
                api.aPack.all().then((res)=>{
                    this.packs = res.data;
                    this.loading = false
                });
            },
            deleteOne(id){
                api.aPack.delete(this.packs[id].id).then(()=>{
                    this.packs.splice(id,1);
                });
            }
        },
    }
</script>