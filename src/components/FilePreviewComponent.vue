<template>
    <div class="file-container">
        <file :type="type"  v-if="path===''" @uploaded="updFiles"></file>
        <div v-else class="file-list-item">
            <img class="left-icon" :src="imgPath" width="70px" height="70px">
            <div class="type">{{type}}</div>
            <div class="d-inline">Путь: {{imgPath}}</div>
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
                return "http://localhost:3000/"+this.path;
            }
        },
        props:{
            type:String,
            path:String,
        },
        methods:{
          updFiles(val){
              this.path = val.path;
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
