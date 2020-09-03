<template>
  <v-select v-model="item" multiple :items="filteredItems" item-value="id" item-text="DisplayNameText"
            :loading="loading" @input="updValue" :label="label"></v-select>
</template>
<script>
import api from '@/api'
import {ActorEquippedValue, ActorEquippedItems} from '@/config/actors'

export default {
  name: 'actorSelectEquippedComponent',
  data() {
    return {
      loading: false,
      item: [],
      items: [],
      filter: ActorEquippedItems,
    };
  },
  props: {
    value: Array,
    label: String,
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
  watch: {
    value(val) {
      //this.item = val;
      this.setValue(val)
      // val.forEach((el) => {
      //     this.item.push(el);
      // })
    },
  },
  methods: {
    getItems() {
      this.loading = true;
      api.items.all().then((res) => {
        this.items = res.data;
        this.loading = false;
      });
    },
    updValue(val) {
      let arr = [];
      val.forEach((el) => {
        let obj = Object.assign({}, ActorEquippedValue);
        obj.ContentId = el;
        arr.push(obj);
      })
      this.$emit('input', arr);
    },
    setValue(val) {
      this.item = [];
      if(val!==undefined){
        val.forEach((el) => {
          this.item.push(el.ContentId)
        })
      }

    },
  }
}
</script>
