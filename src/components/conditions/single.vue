<template>
  <v-select :value="value" :items="filteredItems" item-value="id" item-text="DisplayNameText" :loading="loading" @input="updValue" :label="label"></v-select>
</template>
<script>
import api from '@/api'

export default {
  name: 'ArrayCondition',
  data() {
    return {
      loading: false,
      //condition: 0,
      condItems: [],
    };
  },
  props: {
    value: String,
    label: String,
    type: String,
  },
  computed: {
    filteredItems() {
      // let baseType = 0;
      // if(this.type === "Heal"){
      //     baseType = 11;
      // }
      // return this.condItems.filter((el)=>el.Type === baseType);
      return this.condItems;
    },
  },
  mounted() {
    this.getConditions();
  },
  watch: {
    /*value(val) {
      /!*this.condItems.forEach((el)=>{
        if(el.id===val){
          this.condition = el;
        }
      })*!/
      this.condition = val;
    },*/
  },
  methods: {
    getConditions() {
      this.loading = true;
      api.conditions.all().then((res) => {
        this.condItems = res.data;
        this.loading = false;
      });
    },
    updValue(val) {
      this.$emit('input', val);
    },
  }
}
</script>
