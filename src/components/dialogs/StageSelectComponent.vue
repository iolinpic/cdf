<template>
  <v-select :items="stages" :value="value" @input="updValue"  item-text="name" item-value="id" :label="label"></v-select>
</template>
<script>
export default {
  name:"StageSelectComponent",
  props:{
    variable:Object,
    value: String,
    label: String,
  },
  computed:{
    stages(){
      const res = [];
      this.variable.Stages.forEach((el)=>{
        res.push({id:el.StageId.toString(),name:`${el.StageId}_${el.TextLine}`})
      });
      //res.push({id:'111',name:"title"})
      return res;
    }
  },
  methods:{
    updValue(tmp){
      this.$emit('input',tmp);
    }
  }
}
</script>
