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
        :items="filteredPacks"
        :search="search"
        :loading="loading"
        :items-per-page="40"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="$router.push({name:'pack.edit',params:{id:item.id}})"
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
                    <th class="text-left">Действия</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,id) in filteredPacks" :key="item.id">
                    <td>{{ item.Name }}</td>
                    <td><v-btn icon @click="$router.push({name:'pack.edit',params:{id:item.id}})"><v-icon>edit</v-icon></v-btn><v-btn icon><v-icon @click="deleteOne(id)">delete</v-icon></v-btn></td>
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
  name: 'AbilityPackPage',
  metaInfo: {
    title: 'Комплекты способностей',
  },
  data() {
    return {
      loading: true,
      search: '',
      headers: [
        {
          text:'Название',
          align:'start',
          value:'Name'
        },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      packs: [],
      buttons: [
        {
          text: 'Создать',
          icon: 'add',
          click: () => {
            this.$router.push({name: 'pack.create'});
          }
        },
        {
          text: 'Сгенерировать',
          icon: 'add',
          click: () => {
            api.aPack.generate().then((res) => {
              fileDownload(res.data, 'aPacks.zip');
            });
          }
        },
      ],
    }
  },
  computed: {
    filteredPacks() {
      let orderedPack = this.packs;
      orderedPack.sort(this.sortMethod)
      return orderedPack;
    }
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
      api.aPack.all().then((res) => {
        this.packs = res.data;
        this.loading = false
      });
    },
    sortMethod(a, b) {
      let tmpA = a.Name.split('_');
      let tmpB = b.Name.split('_');
      if (tmpA.length === 3 && tmpB.length === 3) {
        if (tmpA[0] > tmpB[0]) {
          return 1;
        } else if (tmpA[0] < tmpB[0]) {
          return -1;
        } else {
          if (tmpA[2] > tmpB[2]) {
            return 1;
          } else if (tmpA[2] < tmpB[2]) {
            return -1;
          } else {
            return 0;
          }
        }
      } else {
        return 0;
      }
    },
    deleteOne(id) {
      let arrId = this.packs.findIndex((el)=>el.id===id);
      api.aPack.delete(id).then(() => {
        this.packs.splice(arrId, 1);
      });
    }
  },
}
</script>
