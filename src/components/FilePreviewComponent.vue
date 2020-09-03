<template>
    <div class="file-container">
        <file :type="label"  v-if="value===''" :value="value" @input="updFiles"></file>
        <div v-else class="file-list-item">
            <img class="left-icon" :src="imgPath" width="70px" height="70px">
            <div class="type">{{label}}</div>
            <div class="d-inline">Путь: {{imgPath}}</div>
            <v-btn @click="change">Заменить</v-btn>
        </div>
    </div>
</template>
<script>
    import file from "./FileUploadComponent"
    export default {
        name:"FilePreviewComponent",
        components:{
            file,
        },
        computed:{
            imgPath(){
                return "http://localhost:3000/"+this.value;
            }
        },
        props:{
            label:String,
            value:String,
        },
        methods:{
          updFiles(val){
            this.$emit('input',val);
          },
          change(){
            this.updFiles("");
          }
        }
    }
</script>
<style lang="scss">
    .file-container{
        .file-list-item{
            position: relative;
            .left-icon{
                position: absolute;
                left: 5px;
                top:0;
            }
            cursor:pointer;
            padding: 5px 15px 5px 80px;
            &:hover{
                background-color: rgba(0,0,0,0.1);
            }
            .type{
                font-weight: bold;
                font-size: 1.2rem;
                border-bottom: 1px solid black;
                padding-bottom: 5px;
                margin-bottom: 5px;
            }
        }
    }
</style>
