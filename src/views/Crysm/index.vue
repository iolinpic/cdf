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
            <tr v-for="(item,id) in crysms" :key="item.id">
                <td>{{ item.DisplayNameText }}</td>
                <td>{{ item.DescriptionText }}</td>
                <td><v-btn icon @click="openDialog"><v-icon>add</v-icon></v-btn><v-btn icon @click="$router.push({name:'crysm.edit',params:{id:item.id}})"><v-icon>edit</v-icon></v-btn><v-btn icon><v-icon @click="deleteOne(id)">delete</v-icon></v-btn></td>
            </tr>
            </tbody>
        </v-simple-table>
        <evolution-create-dialog :dialog="dialog" @close="dialog=false"></evolution-create-dialog>
    </v-card>
</template>
<script>
    import {UI_TOOLBAR_BTNS,UI_TOOLBAR_BTNS_CLEAR} from "@/store/mutation-types";
    import api from '@/api';
    import fileDownload from 'js-file-download'
    import EvolutionCreateDialog from "@/components/EvolutionCreateDialog";
    export default {
        name:'CrysmsPage',
        metaInfo: {
            title: 'Список кризмов',
        },
        components:{
            EvolutionCreateDialog,
        },
        data(){
            return {
                loading:true,
                dialog:false,
                crysms:[],
                buttons:[
                    {
                        text:'Создать',
                        icon:'add',
                        click:()=>{
                            this.$router.push({name:'crysm.create'});
                        }
                    },
                    {
                        text:'Сгенерировать',
                        icon:'add',
                        click:()=>{
                            api.crysms.generate().then((res)=>{
                                fileDownload(res.data,'crysms.zip');
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
            openDialog(){
                this.dialog = true;
            },
            getAll(){
                api.crysms.all().then((res)=>{
                    this.crysms = res.data;
                    this.loading = false
                });
            },
            deleteOne(id){
                api.crysms.delete(this.abilities[id].id).then(()=>{
                    this.crysms.splice(id,1);
                });
            }
        },
    }
</script>