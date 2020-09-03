<template>
  <v-layout wrap>
    <v-flex sm6>
      <v-select v-model="value.ContentId" :items="filteredItems" item-value="id" item-text="DisplayNameText"
                :loading="loading" label="Тип"></v-select>
    </v-flex>
    <v-flex sm5>
      <OptionComponent label="Количество" v-model="value.Count"></OptionComponent>
    </v-flex>
    <v-flex sm1>
      <v-btn icon @click="delLine">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import { ActorConsumeItems} from '@/config/actors'
import OptionComponent from "@/components/OptionComponent";

export default {
  name: 'actorConsumableComponent',
  components: {OptionComponent},
  data() {
    return {
      loading: false,
      filter: ActorConsumeItems,
    };
  },
  props: {
    value: Object,
    items: Array,
  },
  computed: {
    filteredItems() {
      return this.items.filter((el) => el.Type === this.filter.Type);
    },
  },
  mounted() {
    this.item = this.setValue(this.value);
    this.getItems();
  },

  methods: {
    delLine(){
      this.$emit('del');
    }
  }
}
</script>
