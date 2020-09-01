<template>
    <v-layout wrap>
        <v-flex md10 class="text-center">
            <v-text-field :label="type" @click='pickFile' v-model='fileName' prepend-icon='attach_file'
                          name="file"
                          v-validate="'required'"
                          :error-messages="errors.collect('file')"
            ></v-text-field>
            <input
                    type="file"
                    style="display: none"
                    ref="image"
                    @change="onFilePicked"
            >
        </v-flex>
        <v-flex md2>
            <v-btn class="ma-2" color="green" @click="upload" v-if="!loading">Загрузить</v-btn>
            <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
        </v-flex>
    </v-layout>
</template>
<script>
    import api from '@/api'
    import * as types from '@/store/mutation-types'

    export default {
        name: 'fileUploadForm',
        data() {
            return {
                loading: false,
                fileName: '',
                file: '',
            }
        },
        mounted() {
        },
        props: {
            type: String,
        },
        methods: {
            pickFile() {
                if(!this.readonly)this.$refs.image.click();
            },

            onFilePicked(e) {
                const files = e.target.files;
                if (files[0] !== undefined) {
                    this.fileName = files[0].name;
                    if (this.fileName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader();
                    fr.readAsDataURL(files[0]);
                    fr.addEventListener('load', () => {
                        this.file = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.fileName = '';
                    this.file = '';
                }
            },
            upload() {
                this.$validator.validate().then(valid => {
                    if (valid) {
                        if (this.file !== '') {
                            this.loading = true;
                            let data = new FormData();
                            data.append('file', this.file, this.fileName);
                            data.append('type', this.type);
                            api.file.upload(data).then((res) => {
                                this.$store.commit(types.UI_ALERT_SHOW,{type: 'success', message: 'Файл загружен!'});
                                this.$emit('uploaded',res.data);
                                this.clear();
                            });
                        }
                    }
                });

            },
            clear() {
                this.file = '';
                this.fileName = '';
                this.loading = false;
            },
        }
        ,
    }
</script>
