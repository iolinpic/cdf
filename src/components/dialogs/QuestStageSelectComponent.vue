<template>
    <v-select v-model="item" :items="items"
              :loading="loading" @input="updValue" :label="label"></v-select>
</template>
<script>
    import api from '@/api'
    // import {CItems} from "@/config/crysms";

    export default {
        name: 'QuestStageSelectComponent',
        data() {
            return {
                loading: false,
                item: -1,
                items: [{value:-1,text:"Любая"}],
                // filter: CItems,
            };
        },
        props: {
            value: Number,
            label: String,
            variable:Object,
        },
        // computed: {
        //     filteredItems() {
        //         return this.items.filter((el) => el.Type === this.filter.Type && el.Subtype === this.filter.Subtype);
        //     },
        // },
        mounted() {
          if(this.value !== -1){
            this.getItems(this.variable.QuestId);
          }
          this.item = this.value;
            //this.getItems();
        },
        watch: {
            'variable.QuestId'(val) {
                this.getItems(val);
                // val.forEach((el) => {
                //     this.item.push(el);
                // })
            },
          value(val){
              // if(val !== -1){
              //   this.getItems(this.variable.QuestId);
              // }
              this.item = val;

          }
        },
        methods: {
            getItems(val) {
                this.loading = true;
                this.items = [{value:-1,text:"Любая"}];
                this.item = -1;
                api.quests.one(val).then((res) => {
                  res.data.Stage.forEach((el,index)=>{
                    this.items.push({value: index,text:el.StageNameText});
                  })
                    this.loading = false;
                });
            },
            updValue(val) {
                this.$emit('input', val);
            },
        }
    }
</script>
