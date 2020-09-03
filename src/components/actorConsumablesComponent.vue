<template>
  <div>
    <h3>Предметы</h3>
    <v-divider class="mb-3"></v-divider>
    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <template v-else>
      <v-btn color="blue" @click="addValue">Добавить</v-btn>
      <actor-consumable-component :value="item"
                                  v-for="(item,index) in value"
                                  :key="'consumable_'+index"
                                  @del="removeValue(index)"
                                  :items="items"
      >

      </actor-consumable-component>
    </template>
  </div>
</template>
<script>
import actorConsumableComponent from "@/components/actorConsumableComponent";
import {ActorConsumableValue} from '@/config/actors'
import api from "@/api";
export default {
  name: 'ActorConsumablesComponent',
  data() {
    return {
      loading: false,
      items: [],
    };
  },
  props: {
    value: Array,
  },
  components: {
    actorConsumableComponent,
  },
  mounted() {
    this.getItems();
  },
  methods: {
    getItems() {
      this.loading = true;
      api.items.all().then((res) => {
        this.items = res.data;
        this.loading = false;
      });
    },
    addValue() {
      this.value.push(Object.assign({},ActorConsumableValue));
    },
    removeValue(index) {
      this.value.splice(index, 1);
    },

  }
}
</script>
