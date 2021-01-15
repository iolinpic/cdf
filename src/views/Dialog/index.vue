<template>
    <v-card>
<!--        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>-->
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="dialogs"
          :search="search"
          :loading="loading"
          :items-per-page="40"
          :sort-by="'Name'"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="$router.push({name:'dialogs.edit',params:{id:item.id}})"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              small
              @click="deleteOne(item.id)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
<!--        <v-simple-table v-else>
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
        </v-simple-table>-->
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
              search:'',
              headers:[
                {
                  text:'Название',
                  align:'start',
                  value:'Name'
                },
                { text: 'Действия', value: 'actions', sortable: false },
              ],
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
                let arrId = this.dialogs.findIndex((el)=>el.id===id);
                api.dialogs.delete(id).then(()=>{
                    this.dialogs.splice(arrId,1);
                });
            }
        },
    }
</script>
