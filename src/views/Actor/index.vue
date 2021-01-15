<template>
  <v-card>
    <v-card-title>
      <v-layout wrap>
        <v-flex sm10>
          <v-select label="Тип" :items="techOps" v-model="tech"></v-select>
        </v-flex>
        <v-flex sm2>
          <v-btn @click="clearBtn">Сбросить</v-btn>
        </v-flex>
      </v-layout>
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
        :items="filteredActors"
        :search="search"
        :loading="loading"
        :items-per-page="40"
        :sort-by="'DisplayNameText'"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="$router.push({name:'actors.edit',params:{id:item.id}})"
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
            <v-card-text v-else>
                <v-layout wrap>
                    <v-flex sm10><v-select label="Тип" :items="techOps" v-model="tech"></v-select></v-flex>
                    <v-flex sm2><v-btn @click="clearBtn">Сбросить</v-btn></v-flex>
                </v-layout>
                <v-simple-table >
                    <thead>
                    <tr>
                        <th class="text-left">Название</th>
                        <th class="text-left">Описание</th>
                        <th class="text-left">Тип</th>
                        <th class="text-left">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,id) in filteredActors" :key="item.id">
                        <td>{{ item.DisplayNameText }}</td>
                        <td>{{ item.DescriptionText }}</td>
                        <td>{{item.Tech}}</td>
                        <td><v-btn icon @click="$router.push({name:'actors.edit',params:{id:item.id}})"><v-icon>edit</v-icon></v-btn><v-btn icon><v-icon @click="deleteOne(id)">delete</v-icon></v-btn></td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </v-card-text>-->

  </v-card>
</template>
<script>
import {UI_TOOLBAR_BTNS, UI_TOOLBAR_BTNS_CLEAR} from "@/store/mutation-types";
import {TechOps} from "@/config/actors";
import api from '@/api';
import fileDownload from 'js-file-download'

export default {
  name: 'ActorsPage',
  metaInfo: {
    title: 'Список NPC',
  },
  data() {
    return {
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
          value:'Tech'
        },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      loading: true,
      techOps: [],
      tech: "",
      actors: [],
      buttons: [
        {
          text: 'Создать',
          icon: 'add',
          click: () => {
            this.$router.push({name: 'actors.create'});
          }
        },
        {
          text: 'Сгенерировать',
          icon: 'add',
          click: () => {
            api.actors.generate().then((res) => {
              fileDownload(res.data, 'actors.zip');
            });
          }
        },
      ],
    }
  },
  computed: {
    filteredActors() {
      if (this.tech !== "") {
        return this.actors.filter((el) => {
          return el.Tech === this.tech;
        })
      }
      return this.actors;
    }
  },
  mounted() {
    this.techOps = [...TechOps];
    this.getAll();
    this.$store.commit(UI_TOOLBAR_BTNS, this.buttons);
  },
  beforeDestroy() {
    this.$store.commit(UI_TOOLBAR_BTNS_CLEAR);
  },
  methods: {
    clearBtn() {
      this.tech = "";
    },
    getAll() {
      api.actors.all().then((res) => {
        this.actors = res.data;
        this.loading = false
      });
    },
    deleteOne(id) {
      let arrId = this.actors.findIndex((el)=>el.id===id);
      api.actors.delete(id).then(() => {
        this.actors.splice(arrId, 1);
      });
    }
  },
}
</script>
