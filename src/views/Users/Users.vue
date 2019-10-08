<template>
    <v-card>
        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
        <v-simple-table v-else>
            <thead>
            <tr>
                <th class="text-left">Имя</th>
                <th class="text-left">Email</th>
                <th class="text-left">Действия</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,id) in users" :key="item.email">
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td><v-btn icon @click="$router.push({name:'users.edit',params:{id:item._id}})"><v-icon>edit</v-icon></v-btn><v-btn icon><v-icon @click="removeUser(id)">delete</v-icon></v-btn></td>
            </tr>
            </tbody>
        </v-simple-table>
    </v-card>
</template>
<script>
    import {USER_ALL,UI_TOOLBAR_BTNS,UI_TOOLBAR_BTNS_CLEAR,USER_DELETE} from "@/store/mutation-types";
    export default {
        name:'UsersPage',
        metaInfo: {
            title: 'Список пользователей',
        },
        data(){
            return {
                loading:false,
                buttons:[
                    {
                        text:'Создать',
                        icon:'add',
                        click:()=>{
                            this.$router.push({name:'users.create'});
                        }
                    },
                ],
            }
        },
        computed:{
            users(){
                return this.$store.getters.users;
            },
        },
        mounted(){
            if(this.users.length<1){
                this.getAllUsers();
            }
            this.$store.commit(UI_TOOLBAR_BTNS,this.buttons);
        },
        beforeDestroy(){
            this.$store.commit(UI_TOOLBAR_BTNS_CLEAR);
        },
        methods:{
            getAllUsers(){
                this.loading = true;
                this.$store.dispatch(USER_ALL).then(()=>{
                    this.loading = false;
                }).catch(()=>{
                    this.loading = false;
                })
            },
            removeUser(id){
                this.$store.dispatch(USER_DELETE,id)
            }
        },
    }
</script>