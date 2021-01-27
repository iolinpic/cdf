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
      <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
      >
        <v-card>
          <v-card-title>Выберите файл</v-card-title>
          <v-card-text>
            <v-file-input v-model="file" accept=".json" label="json articy export"></v-file-input>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text :disabled="this.file===undefined" @click="importFile">Импорт</v-btn>
            <v-btn @click="dialog = false" text>Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
</template>
<script>
    import {UI_TOOLBAR_BTNS,UI_TOOLBAR_BTNS_CLEAR} from "@/store/mutation-types";
    import api from '@/api';
    import Importer from '@/util/importer'
    import fileDownload from 'js-file-download'
    export default {
        name:'DialogsPage',
        metaInfo: {
            title: 'Список Диалогов',
        },
        data(){
            return {
              dialog: false,
              file: undefined,
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
                    text: 'Импортировать',
                    icon: 'add',
                    click: () => {
                      this.dialog = true;
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
          importFile() {
            Importer.importDialogsFromJson(this.file,()=>{
              this.file = undefined;
              this.dialog = false;
              this.getAll();
            })
          },
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
