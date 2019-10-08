<template>
    <v-card>
        <v-card-title title>Редактирование данных пользователя</v-card-title>
        <v-card-text>
            <v-form v-model="valid">
                <v-text-field v-model="user.name" label="Имя"
                              type="text"
                              name="name"
                              v-validate="'required|alpha_spaces'"
                              :error-messages="errors.collect('name')"
                ></v-text-field>
                <v-text-field v-model="user.email" label="Email"
                              type="text"
                              name="email"
                              v-validate="'required|email'"
                              :error-messages="errors.collect('email')"
                ></v-text-field>
                <v-text-field v-model="user.password" label="Пароль" type="password"
                              name="password"
                              v-validate="'min:8'"
                              ref="password"
                              :error-messages="errors.collect('password')"></v-text-field>
                <v-text-field v-model="password_confirm" label="Подтверждение пароля" type="password"
                              name="password_confirm"
                              v-validate="'required|confirmed:password'"
                              :error-messages="errors.collect('password_confirm')"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="green" @click="submit">Сохранить</v-btn>
            <v-btn color="red" @click="back">Отмена</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
    import {USER_UPDATE} from "@/store/mutation-types";
    import api from "@/api";

    export default {
        name: 'UsersEdit',
        data() {
            return {
                dialog: false,
                user: {
                    name: '',
                    email: '',
                    password: '',
                },
                password_confirm: '',
                valid: true,
            }
        },
        computed: {
            id() {
                return this.$route.params.id;
            },
        },
        mounted() {
            api.user.user(this.id).then((res) => {
                this.user = res.data;
            })
        },
        methods: {
            back() {
                this.$router.push({name: 'users'});
            },
            submit() {
                if (this.valid) {
                    this.$store.dispatch(USER_UPDATE, {id: this.id, data: this.user}).then(() => {
                        this.back();
                    })
                }
            }
        }
    }
</script>