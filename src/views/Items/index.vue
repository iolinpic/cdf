<template>
  <v-card>
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
        :items="items"
        :search="search"
        :loading="loading"
        :items-per-page="40"
        :multi-sort="true"
        :sort-by="['Type','Subtype','DisplayNameText']"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="$router.push({name:'item.edit',params:{id:item.id}})"
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
    <!--        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
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
            </v-simple-table>-->
  </v-card>
</template>
<script>
import {UI_TOOLBAR_BTNS, UI_TOOLBAR_BTNS_CLEAR} from "@/store/mutation-types";
import api from '@/api';
import {ITypes} from '@/config/items'
import fileDownload from 'js-file-download'

export default {
  name: 'ItemsPage',
  metaInfo: {
    title: 'Список предметов',
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text:'Название',
          align:'start',
          value:'DisplayNameText'
        },{
          text:'Описание',
          width:'60%',
          value:'DescriptionText'
        },
        {
          text:'Тип',
          value:'Type'
        },
        {
          text:'Подтип',
          value:'Subtype'
        },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      loading: true,
      items: [],
      buttons: [
        {
          text: 'Создать',
          icon: 'add',
          click: () => {
            this.$router.push({name: 'item.create'});
          }
        },
        {
          text: 'Сгенерировать',
          icon: 'add',
          click: () => {
            api.items.generate().then((res) => {
              fileDownload(res.data, 'items.zip');
            });
          }
        },
      ],
    }
  },
  computed: {
    types() {
      return ITypes;
    },
  },
  mounted() {
    this.getAll();
    this.$store.commit(UI_TOOLBAR_BTNS, this.buttons);
  },
  beforeDestroy() {
    this.$store.commit(UI_TOOLBAR_BTNS_CLEAR);
  },
  methods: {
    getAll() {
      api.items.all().then((res) => {
        this.items = res.data;
        this.loading = false
      });
    },
    deleteOne(id) {
      let arrId = this.items.findIndex((el)=>el.id===id);
      api.items.delete(id).then(() => {
        this.items.splice(arrId, 1);
      });
    }
  },
}
</script>
