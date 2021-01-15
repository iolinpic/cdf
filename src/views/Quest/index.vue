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
        :items="quests"
        :search="search"
        :loading="loading"
        :items-per-page="40"
        :multi-sort="true"
        :sort-by="['QTechName','DisplayNameText']"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="$router.push({name:'quests.edit',params:{id:item.id}})"
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
                <tr v-for="(item,id) in quests" :key="item.id">
                    <td>{{ item.DisplayNameText }}</td>
                    <td>{{ item.DescriptionText }}</td>
                    <td><v-btn icon @click="$router.push({name:'quests.edit',params:{id:item.id}})"><v-icon>edit</v-icon></v-btn><v-btn icon><v-icon @click="deleteOne(id)">delete</v-icon></v-btn></td>
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
  name: 'QuestsPage',
  metaInfo: {
    title: 'Список квестов',
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text:'Техническое',
          align:'start',
          value:'QTechName'
        },
        {
          text:'Название',
          value:'DisplayNameText'
        },
        {
          text:'Тип',
          value:'Type'
        },
        {
          text:'Описание',
          value:'DescriptionText'
        },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      loading: true,
      quests: [],
      buttons: [
        {
          text: 'Создать',
          icon: 'add',
          click: () => {
            this.$router.push({name: 'quests.create'});
          }
        },
        {
          text: 'Сгенерировать',
          icon: 'add',
          click: () => {
            api.quests.generate().then((res) => {
              fileDownload(res.data, 'quests.zip');
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
      api.quests.all().then((res) => {
        this.quests = res.data;
        this.loading = false
      });
    },
    deleteOne(id) {
      let arrId = this.quests.findIndex((el)=>el.id===id);
      api.quests.delete(id).then(() => {
        this.quests.splice(arrId, 1);
      });
    }
  },
}
</script>
