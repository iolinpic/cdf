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
        :items="abilities"
        :search="search"
        :loading="loading"
        :items-per-page="40"
        :sort-by="'DisplayNameText'"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="$router.push({name:'abilities.edit',params:{id:item.id}})"
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
            </v-simple-table>-->
  </v-card>
</template>
<script>
import {UI_TOOLBAR_BTNS, UI_TOOLBAR_BTNS_CLEAR} from "@/store/mutation-types";
import api from '@/api';
import fileDownload from 'js-file-download'

export default {
  name: 'AbilitiesPage',
  metaInfo: {
    title: 'Список способностей',
  },
  data() {
    return {
      loading: true,
      search: '',
      headers: [
        {
          text:'Название',
          align:'start',
          value:'DisplayNameText'
        },{
          text:'Описание',
          value:'DescriptionText'
        },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      abilities: [],
      buttons: [
        {
          text: 'Создать',
          icon: 'add',
          click: () => {
            this.$router.push({name: 'abilities.create'});
          }
        },
        {
          text: 'Сгенерировать',
          icon: 'add',
          click: () => {
            api.abilities.generate().then((res) => {
              fileDownload(res.data, 'abilities.zip');
            });
          }
        },
      ],
    }
  },
  computed: {},
  mounted() {
    this.getAll();
    this.$store.commit(UI_TOOLBAR_BTNS, this.buttons);
  },
  beforeDestroy() {
    this.$store.commit(UI_TOOLBAR_BTNS_CLEAR);
  },
  methods: {
    getAll() {
      api.abilities.all().then((res) => {
        this.abilities = res.data;
        this.loading = false
      });
    },
    deleteOne(id) {
      let arrId = this.abilities.findIndex((el)=>el.id===id);
      api.abilities.delete(id).then(() => {
        this.abilities.splice(arrId, 1);
      });
    }
  },
}
</script>
