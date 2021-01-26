<template>
  <v-layout wrap>
    <template v-if="keys.length>=1">
      <v-flex sm12 v-for="key in keys" :key="key">
        <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''"
             :label="settings[key].label" v-model="value[key]" :variable="variable"></div>
      </v-flex>
    </template>
  </v-layout>
</template>
<script>
import {DialogStageValues, DialogStageSettings} from '@/config/dialogs'
import {VTextField, VTextarea} from 'vuetify/lib'
//import dialogAnswersComponent from "./dialogAnswersComponent";
import dialogAnswerActionsComponent from "./dialogAnswerActionsComponent";
import dialogAnswerConditionsComponent from "./dialogAnswerConditionsComponent";
import StagesSelectComponent from "./StagesSelectComponent";
import npcSelect from "../npcSelect";
//import actorDialogConditionsComponent from "./actorDialogConditionsComponent";

export default {
  name: 'dialogStageComponent',
  data() {
    return {
      loading: false,
      valid: true,
    };
  },
  props: {
    value: Object,
    variable:Object,
    /*items: Array,
    quests: Array,
    zones: Array,*/
  },
  components: {
    VTextField,
    VTextarea,
    dialogAnswerActionsComponent,
    dialogAnswerConditionsComponent,
    npcSelect,
    StagesSelectComponent,
    //dialogAnswersComponent
    //actorDialogConditionsComponent,
  },
  computed: {
    keys() {
      return Object.keys(DialogStageValues);
    },
    settings() {
      return DialogStageSettings;
    },
  },
  mounted() {

  },
  methods: {
    delLine() {
      this.$emit('del');
    }
  }
}
</script>
