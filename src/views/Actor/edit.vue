<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
        <template v-if="keys.length>=1">
          <v-flex sm12 v-for="key in keys" :key="key">
            <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''"
                 :label="settings[key].label" v-model="actor[key]"></div>
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
import {ActorFieldSettings, ActorValues} from "@/config/actors";
import fileUpload from "@/components/FilePreviewComponent"
import {VTextField, VTextarea} from 'vuetify/lib'
import actorSelectEquippedComponent from '@/components/actorSelectEquippedComponent'
import actorConsumablesComponent from "@/components/actorConsumablesComponent";

export default {
  name: 'ActorEdit',
  metaInfo: {
    title: 'Редактирование  NPC',
  },
  components: {
    VTextField,
    VTextarea,
    fileUpload,
    actorSelectEquippedComponent,
    actorConsumablesComponent
  },
  data() {
    return {
      actor: ActorValues,
      valid: true,
    }
  },
  computed: {
    keys() {
      // return Object.keys(this.actor);
      return Object.keys(ActorFieldSettings);
    },
    settings() {
      return ActorFieldSettings;
    },
  },
  mounted() {
    this.getOne();
  },
  methods: {
    back() {
      this.$router.push({name: 'actors'});
    },
    getOne() {
      api.actors.one(this.$route.params.id).then((res) => {
        delete res.data.id;
        this.actor = res.data;
      });
    },
    submit() {
      if (this.valid) {
        api.actors.update(this.$route.params.id, this.actor).then(() => {
          this.back();
        })
      }
    }
  }
}
</script>
