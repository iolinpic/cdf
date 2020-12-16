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
            <tr v-for="(item,id) in filteredPacks" :key="item.id">
                <td>{{ item.Name }}</td>
                <td><v-btn icon @click="$router.push({name:'spack.edit',params:{id:item.id}})"><v-icon>edit</v-icon></v-btn><v-btn icon><v-icon @click="deleteOne(id)">delete</v-icon></v-btn></td>
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
        name:'StoragePackPage',
        metaInfo: {
            title: 'Сундуки',
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
                            this.$router.push({name:'spack.create'});
                        }
                    },
                    {
                        text:'Сгенерировать',
                        icon:'add',
                        click:()=>{
                            api.spack.generate().then((res)=>{
                                fileDownload(res.data,'spack.zip');
                            });
                        }
                    },
                ],
            }
        },
        computed:{
            filteredPacks(){
                let orderedPack = this.packs;
                //orderedPack.sort(this.sortMethod)
                return orderedPack;
            }
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
                api.spack.all().then((res)=>{
                    this.packs = res.data;
                    this.loading = false
                });
            },
            sortMethod(a,b){
                let tmpA = a.Name.split('_');
                let tmpB = b.Name.split('_');
                if(tmpA.length ===3 && tmpB.length ===3){
                    if(tmpA[0]>tmpB[0]){
                        return 1;
                    }else if(tmpA[0]<tmpB[0]){
                        return -1;
                    }else{
                        if(tmpA[2]>tmpB[2]){
                            return 1;
                        }else if(tmpA[2]<tmpB[2]){
                            return -1;
                        }else{
                            return 0;
                        }
                    }
                }else{
                    return 0;
                }
            },
            deleteOne(id){
                api.spack.delete(this.packs[id].id).then(()=>{
                    this.packs.splice(id,1);
                });
            }
        },
    }
</script>
