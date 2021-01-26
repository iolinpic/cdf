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
          <v-btn text :disabled="this.file===undefined" @click="importFromJson">Импорт</v-btn>
          <v-btn @click="dialog = false" text>Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import {UI_TOOLBAR_BTNS, UI_TOOLBAR_BTNS_CLEAR} from "@/store/mutation-types";
import api from '@/api';
import {QValues, QTypes, QSValues} from "../../config/quests";
import fileDownload from 'js-file-download'
import deepCopy from "../../util/deepCopy";

export default {
  name: 'QuestsPage',
  metaInfo: {
    title: 'Список квестов',
  },
  data() {
    return {
      dialog: false,
      file: undefined,
      search: '',
      headers: [
        {
          text: 'Техническое',
          align: 'start',
          value: 'QTechName'
        },
        {
          text: 'Название',
          value: 'DisplayNameText'
        },
        {
          text: 'Тип',
          value: 'Type'
        },
        {
          text: 'Описание',
          value: 'DescriptionText'
        },
        {text: 'Действия', value: 'actions', sortable: false},
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
          text: 'Импортировать',
          icon: 'add',
          click: () => {
            this.dialog = true;
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
    importFromJson() {
      if (this.file !== undefined) {
        const reader = new FileReader();
        reader.readAsText(this.file);
        reader.onload = () => {
          let json = reader.result;
          json = JSON.parse(json);
          // eslint-disable-next-line
          //console.log(json);
          this.parseFile(json)
          this.file = undefined;
          this.dialog = false;
        }
      }
    },
    parseFile(json) {

      //use only first package
      const dataStorage = json.Packages[0].Models;
      //only one quest in export
      dataStorage.forEach((el)=>{
        if(el.Type ==="QuestFlow"){
          this.parseQuest(dataStorage,el);
        }
      })
      this.getAll();
      /*let currentNodeId = dataStorage.findIndex((el) => el.Type === "QuestFlow");
      if(currentNodeId!==-1){
        const questId = dataStorage[currentNodeId].Properties.Id;
        //quest params setup
        resData.DescriptionText = dataStorage[currentNodeId].Properties.Text;
        resData.DisplayNameText = dataStorage[currentNodeId].Properties.DisplayName;
        resData.QTechName = dataStorage[currentNodeId].Template.QuestTech.QTechName;
        resData.Type = QTypes[dataStorage[currentNodeId].Template.QuestTech.Type];
        //setup stages
        if (dataStorage[currentNodeId].Properties.InputPins.length > 0) {
          dataStorage[currentNodeId].Properties.InputPins[0].Connections.forEach((con) => {
            let currentNodeId = dataStorage.findIndex((el) => el.Properties.Id === con.Target && el.Type === "QuestStage");
            if (currentNodeId !== -1) {
              this.parseStage(dataStorage, currentNodeId, resData, questId);
            }
          })
        }*/
        /*api.quests.store(resData).then((res) => {
          // eslint-disable-next-line no-console
          // console.log(res.data.id);
          //this.back(res.data.id);
        })*/
      //}


      // eslint-disable-next-line
      //console.log(resData);
    },
    parseQuest(dataStorage,currentNode){
      const resData = deepCopy(QValues);
        const questId = currentNode.Properties.Id;
        //quest params setup
        resData.DescriptionText = currentNode.Properties.Text;
        resData.DisplayNameText = currentNode.Properties.DisplayName;
        resData.QTechName = currentNode.Template.QuestTech.QTechName;
        resData.Type = QTypes[currentNode.Template.QuestTech.Type];
        //setup stages
        if (currentNode.Properties.InputPins[0].Connections.length > 0) {
          currentNode.Properties.InputPins[0].Connections.forEach((con) => {
            let currentNodeId = dataStorage.findIndex((el) => el.Properties.Id === con.Target && el.Type === "QuestStage");
            if (currentNodeId !== -1) {
              this.parseStage(dataStorage, currentNodeId, resData, questId);
            }
          })
        }
        api.quests.store(resData).then(() => {
          // eslint-disable-next-line no-console
          // console.log(res.data.id);
          //this.back(res.data.id);
        })
    },
    parseStage(dataStorage, currentNodeId, resData, questId) {
      const currentNode = dataStorage[currentNodeId]
      const StageData = deepCopy(QSValues);
      StageData.StageDescriptionText = currentNode.Properties.Text;
      StageData.StageNameText = currentNode.Properties.DisplayName;
      resData.Stage.push(StageData);
      if (currentNode.Properties.OutputPins[0].Connections.length > 0) {
        let nextTarget = currentNode.Properties.OutputPins[0].Connections[0].Target;
        if (nextTarget !== questId) {
          let nextNode = dataStorage.findIndex((el) => el.Properties.Id === nextTarget);
          if (currentNodeId !== -1) {
            this.parseStage(dataStorage, nextNode, resData, questId);
          }
        }
      }
    },
    back(id) {
      this.$router.push({name: 'quests.edit',params:{id:id}});
    },
    getAll() {
      api.quests.all().then((res) => {
        this.quests = res.data;
        this.loading = false
      });
    },
    deleteOne(id) {
      let arrId = this.quests.findIndex((el) => el.id === id);
      api.quests.delete(id).then(() => {
        this.quests.splice(arrId, 1);
      });
    }
  },
}
</script>
