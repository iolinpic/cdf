<template>
    <v-card>
        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
        <v-simple-table v-else>
            <thead>
            <tr>
                <th class="text-left">Название</th>
                <th class="text-left">Описание</th>
                <th class="text-left">Эволюция</th>
                <th class="text-left">Действия</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,id) in groupEvolutions" :key="item.id">
                <td>
                    <v-icon v-if="item.tier>=2">arrow_right_alt</v-icon>
                    <v-icon v-if="item.tier>=3">arrow_right_alt</v-icon>
                    {{ item.DisplayNameText }}
                </td>
                <td>{{ item.DescriptionText }}</td>
                <td>
                    <v-btn icon @click="openDialog(item)" v-if="item.tier<3">
                        <v-icon>add</v-icon>
                    </v-btn>
                    <v-btn icon @click="evolutionEdit(item)" v-if="item.tier>1">
                        <v-icon>edit</v-icon>
                    </v-btn>
                </td>
                <td>
                    <v-btn icon @click="$router.push({name:'crysm.edit',params:{id:item.id}})">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon @click="deleteOne(id)">delete</v-icon>
                    </v-btn>
                </td>
            </tr>
            </tbody>
        </v-simple-table>
        <evolution-create-dialog :dialog="dialog" @close="closeEvolutionDialog" v-if="dialog" :current="currentId"
                                 :crysm="currentCrysm"></evolution-create-dialog>
        <evolution-edit-dialog
                :dialog="editDialog"
                v-if="editDialog"
                :condition="currentId"
                :crysm="currentCrysm"
                @close="closeEvolutionEditDialog"
        ></evolution-edit-dialog>
    </v-card>
</template>
<script>
    import {UI_TOOLBAR_BTNS, UI_TOOLBAR_BTNS_CLEAR} from "@/store/mutation-types";
    import api from '@/api';
    import fileDownload from 'js-file-download'
    import EvolutionCreateDialog from "@/components/crysmEvolution/EvolutionCreateDialog";
    import EvolutionEditDialog from "@/components/crysmEvolution/EvolutionEditDialog";

    export default {
        name: 'CrysmsPage',
        metaInfo: {
            title: 'Список кризмов',
        },
        components: {
            EvolutionCreateDialog,
            EvolutionEditDialog,
        },
        data() {
            return {
                loading: true,
                dialog: false,
                editDialog: false,
                currentId: 0,
                currentCrysm: {},
                crysms: [],
                buttons: [
                    {
                        text: 'Создать',
                        icon: 'add',
                        click: () => {
                            this.$router.push({name: 'crysm.create'});
                        }
                    },
                    {
                        text: 'Сгенерировать',
                        icon: 'add',
                        click: () => {
                            api.crysms.generate().then((res) => {
                                fileDownload(res.data, 'crysms.zip');
                            });
                        }
                    },
                ],
            }
        },
        computed: {
            groupEvolutions() {
                const sorted = [];
                this.crysms.forEach((el) => {
                    if (el.PreviousConfig === "") {
                        el.tier = 1;
                        sorted.push(el);
                        this.findSibling(el, sorted, 2)
                    }
                });
                return sorted;
            }
        },
        mounted() {
            this.getAll();
            this.$store.commit(UI_TOOLBAR_BTNS, this.buttons);
        },
        beforeDestroy() {
            this.$store.commit(UI_TOOLBAR_BTNS_CLEAR);
        },
        methods: {
            findSibling(el, sorted, tier) {
                el.EvolutionConditions.forEach((sibling) => {
                    const searchIndex = this.crysms.findIndex((search) => search.id === sibling.NextConfig);
                    if (searchIndex !== -1) {
                        this.crysms[searchIndex].tier = tier;
                        sorted.push(this.crysms[searchIndex]);
                        this.findSibling(this.crysms[searchIndex], sorted, 3)
                    }
                });
            },
            openDialog(item) {
                const id = item.id;
                const evolutionOption = Object.assign({}, item);
                delete evolutionOption.DisplayName;
                evolutionOption.DisplayNameText += '_evolution';
                delete evolutionOption.Description;
                evolutionOption.DescriptionText += '_evolution';
                delete evolutionOption.__v;
                delete evolutionOption._id;
                delete evolutionOption.id;
                evolutionOption.EvolutionLevel = -1;
                evolutionOption.EvolutionConditions = [];
                evolutionOption.PreviousConfig = id;
                api.crysms.store(evolutionOption).then((res) => {
                    this.currentId = res.data.id;
                    this.currentCrysm = item;
                    this.dialog = true;
                });


            },
            getAll() {
                this.loading = true;
                api.crysms.all().then((res) => {
                    this.crysms = res.data;
                    this.loading = false
                });
            },
            deleteOne(id) {
                const updElem = this.crysms.findIndex((el) => el.id === this.groupEvolutions[id].id);
                this.deleteParentLink(this.crysms[updElem].PreviousConfig, this.crysms[updElem].id);
                api.crysms.delete(this.crysms[updElem].id).then(() => {
                    this.crysms.splice(updElem, 1);
                });
            },
            deleteParentLink(id, nextId) {
                const updElem = this.crysms.findIndex((el) => el.id === id);
                const delElem = this.crysms[updElem].EvolutionConditions.findIndex((evolution) => evolution.NextConfig === nextId);
                this.crysms[updElem].EvolutionConditions.splice(delElem, 1);
                const updServer = Object.assign({}, this.crysms[updElem]);
                delete updServer.id;
                api.crysms.update(id, updServer);
            },
            evolutionEdit(item) {
                const id = item.id;
                const prevId = item.PreviousConfig;
                const prev = this.crysms.findIndex((el) => el.id === prevId);
                this.currentId = id;
                this.currentCrysm = this.crysms[prev];
                this.editDialog = true;

            },
            closeEvolutionDialog() {
                this.currentId = 0;
                this.currentCrysm = {};
                this.getAll();
                this.dialog = false;
            },
            closeEvolutionEditDialog() {
                this.currentId = 0;
                this.currentCrysm = {};
                this.getAll();
                this.editDialog = false;
            },
        },
    }
</script>