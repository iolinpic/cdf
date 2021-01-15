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
        :items="conditions"
        :search="search"
        :loading="loading"
        :multi-sort="true"
        :items-per-page="40"
        :sort-by="['Type','Subtype']"
    >
      <template v-slot:item.Type="{item}">
        {{getTypeString(item.Type)}}
      </template>
      <template v-slot:item.Subtype="{item}">
        {{getSubTypeString(item.Type,item.Subtype)}}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="$router.push({name:'conditions.edit',params:{id:item.id}})"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="deleteCondition(item.id)"
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
                <tr v-for="(item,id) in conditions" :key="item.id">
                    <td>{{ item.DisplayNameText }}</td>
                    <td>{{ item.DescriptionText }}</td>
                    <td>{{ getTypeString(item.Type,item.Subtype) }}</td>
                    <td><v-btn icon @click="$router.push({name:'conditions.edit',params:{id:item.id}})"><v-icon>edit</v-icon></v-btn><v-btn icon><v-icon @click="deleteCondition(id)">delete</v-icon></v-btn></td>
                </tr>
                </tbody>
            </v-simple-table>-->
  </v-card>
</template>
<script>
import {UI_TOOLBAR_BTNS, UI_TOOLBAR_BTNS_CLEAR} from "@/store/mutation-types";
import api from '@/api';
import {conditionTypes} from '@/config/conditions'
import fileDownload from 'js-file-download'

export default {
  name: 'ConditionsPage',
  metaInfo: {
    title: 'Список состояний',
  },
  data() {
    return {
      loading: true,
      search: '',
      headers:[
        {
          text:'Название',
          align:'start',
          value:'DisplayNameText'
        },{
          text:'Описание',
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
      conditions: [],
      buttons: [
        {
          text: 'Создать',
          icon: 'add',
          click: () => {
            this.$router.push({name: 'conditions.create'});
          }
        },
        {
          text: 'Сгенерировать',
          icon: 'add',
          click: () => {
            api.conditions.generate().then((res) => {
              fileDownload(res.data, 'conditions.zip');
            });
          }
        },
      ],
    }
  },
  computed: {
    types() {
      return conditionTypes;
    },
  },
  mounted() {
    this.getAllConditions();
    this.$store.commit(UI_TOOLBAR_BTNS, this.buttons);
  },
  beforeDestroy() {
    this.$store.commit(UI_TOOLBAR_BTNS_CLEAR);
  },
  methods: {
    getAllConditions() {
      api.conditions.all().then((res) => {
        this.conditions = res.data;
        this.loading = false
      });
    },
    getTypeString(type) {
      return `${this.types[type].name}`
    },
    getSubTypeString(type, subtype) {
      return `${this.types[type].subtype[subtype]}`
    },
    deleteCondition(id) {
      let arrId = this.conditions.findIndex((el)=>el.id===id);
      api.conditions.delete(id).then(() => {
        this.conditions.splice(arrId, 1);
      });
    }
  },
}
</script>
