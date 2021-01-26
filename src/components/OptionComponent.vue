<template>
  <v-text-field :value="value" @input="updData" :label="label"></v-text-field>
</template>
<script>
export default {
  name: 'OptionComponent',
  props: {
    value: Number,
    label: String,
  },
  methods: {
    updData(val) {

      let tmp = parseFloat(val);
      if (Number.isNaN(tmp)) {
        tmp = ''
      }
      this.$emit('input', tmp);
    },
  },
}
</script>
