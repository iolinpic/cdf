<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
        <template v-if="keys.length>=1">
          <v-flex sm12 v-for="key in keys" :key="key">
            <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''"
                 :label="settings[key].label" v-model="dialog[key]" :variable="dialog"></div>
          </v-flex>
        </template>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="green" @click="submit">Сохранить</v-btn>
      <v-btn color="red" @click="back">Отмена</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import api from "@/api"
import {DialogValues, DialogFieldSettings} from "@/config/dialogs";
import {VTextField} from 'vuetify/lib'
import dialogStagesComponent from "../../components/dialogs/dialogStagesComponent";
import StageSelectComponent from "../../components/dialogs/StageSelectComponent";
import deepCopy from "../../util/deepCopy";
// import abilityConditionsComponent from "@/components/AbilityConditionsComponent";
// import crysmTypeComponent from '@/components/CrysmTypeComponent'
// import optionsComponent from '@/components/OptionComponent'

export default {
  name: 'DialogCreate',
  metaInfo: {
    title: 'Создание Диалога',
  },
  components: {
    VTextField,
    dialogStagesComponent,
    StageSelectComponent,
    // VSelect,
    // optionsComponent,
    // crysmTypeComponent,
    // abilityConditionsComponent,
  },
  data() {
    return {
      dialog: deepCopy(DialogValues),
      valid: true,
    }
  },
  computed: {
    keys() {
      return Object.keys(DialogFieldSettings);
    },
    settings() {
      return DialogFieldSettings;
    },
  },
  mounted() {
    this.dialog.Stages = [];
  },
  methods: {
    back() {
      this.$router.push({name: 'dialogs'});
    },
    submit() {
      if (this.valid) {
        api.dialogs.store(this.dialog).then(() => {
          this.back();
        })
      }
    }
  }
}
</script>
