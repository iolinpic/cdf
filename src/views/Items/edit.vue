<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field v-model="item.DisplayNameText" label="Отображаемое имя"
                      type="text"
                      name="name"
                      v-validate="'required'"
                      :error-messages="errors.collect('name')"
        ></v-text-field>
        <v-textarea name="description" v-validate="'required'" label="Описание"
                    :error-messages="errors.collect('description')" v-model="item.DescriptionText">
        </v-textarea>
        <file-upload label="Icon" v-model="item.Icon"></file-upload>
        <v-select v-model="item.Type" :items="types" label="Тип" item-text="name"
                  item-value="name"
        ></v-select>
        <v-select v-model="item.Subtype" :items="subtypes" label="Подтип" item-text="name"
                  item-value="name"
                  :readonly="subtypes.length<=1"></v-select>

        <template v-if="itemKeys.length>=1">
          <h3>Детальные настройки</h3>
          <v-divider class="mb-3"></v-divider>
          <v-flex sm12 v-for="key in itemKeys" :key="key">
            <div :is="settings[key].component" :items="settings[key].items?settings[key].items:''"
                 :label="settings[key].label" v-model="item.ItemOption[key]" :type="item.Subtype"></div>
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
import {ITypes, ITypesSettings} from '@/config/items'
import resistancesComponent from '@/components/ResistancesComponent'
import conditionsArray from "@/components/conditions/array";
// import itemsTypeComponent from '@/components/condType/array'
import optionsComponent from '@/components/OptionComponent'
import fileUpload from "@/components/FilePreviewComponent"

export default {
  name: 'ItemEdit',
  metaInfo: {
    title: 'Редактирование предмета',
  },
  components: {
    resistancesComponent,
    // itemsTypeComponent,
    optionsComponent,
    conditionsArray,
    fileUpload
  },
  data() {
    return {
      item: {
        DisplayNameText: '',
        DescriptionText: '',
        Type: ITypes[0].name,
        Subtype: ITypes[0].subtypes[0].name,
        ItemOption: ITypes[0].subtypes[0].ItemOption,
      },
      subtypes: ITypes[0].subtypes,
      // type: ITypes[0],
      // subtype: ITypes[0].subtype[0],
      valid: true,
    }
  },
  mounted() {
    this.getOne();
  },
  computed: {
    types() {
      return ITypes;
    },
    settings() {
      return ITypesSettings;
    },
    itemKeys() {
      return Object.keys(this.item.ItemOption)
    }
  },
  watch: {
    'item.Type'(val) {
      // this.item.Type = this.getIdFromString(val.name);
      const elemId = this.types.findIndex((el) => el.name === val);
      this.subtypes = this.types[elemId].subtypes;
      this.item.Subtype = this.types[elemId].subtypes[0].name;
    },
    'item.Subtype'(val) {
      const elemId = this.types.findIndex((el) => el.name === this.item.Type);
      const subId = this.types[elemId].subtypes.findIndex((el) => el.name === val);
      this.item.ItemOption = this.types[elemId].subtypes[subId].ItemOption;
    },
  },
  methods: {
    getOne() {
      api.items.one(this.$route.params.id).then((res) => {
        delete res.data.id;
        this.item = res.data;
      });
    },
    back() {
      this.$router.push({name: 'item'});
    },
    submit() {
      if (this.valid) {
        api.items.update(this.$route.params.id, this.item).then(() => {
          this.back();
        })
      }
    }
  }
}
</script>
