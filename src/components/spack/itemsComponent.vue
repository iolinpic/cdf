<template>
    <v-layout column>
        <v-layout row class="pt-10">
            <v-flex sm10> <div class="title pl-10" >{{label}}</div></v-flex>
            <v-btn color="blue" @click="addValue">Добавить</v-btn>
        </v-layout>
        <v-divider class="mb-3"></v-divider>
        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
        <template v-else>
            <v-layout v-for="(item,index) in value"
                      :key="'spack_'+index">
                <v-flex sm11>
                    <item-component
                            :value="item"
                    >
                    </item-component>
                </v-flex>
                <v-flex sm1>
                    <v-btn icon @click="removeValue(index)">
                        <v-icon color="red">delete</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </template>
    </v-layout>
</template>
<script>
    import { SPPValues } from '@/config/spack';
    import itemComponent from "./itemComponent";


    export default {
        name: 'spackItemsComponent',
        components: {itemComponent},
        data() {
            return {
                loading: false,
            };
        },
        props: {
            value: Array,
            label: String,
        },
        computed: {
        },
        mounted() {
        },
        methods: {
            addValue() {
                this.value.push(Object.assign({},SPPValues));
            },
            removeValue(index) {
                this.value.splice(index, 1);
            },
        }
    }
</script>
