<template>
    <v-dialog v-model="dialog">
        <v-card>
            <v-card-title title>Создание нового пользователя</v-card-title>
            <v-card-text>
                <v-form ref="createNewUserForm" v-model="valid">
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
                                  v-validate="'required|min:8'"
                                  ref="password"
                                  :error-messages="errors.collect('password')"></v-text-field>
                    <v-text-field v-model="password_confirm" label="Подтверждение пароля" type="password"
                                  name="password_confirm"
                                  v-validate="'required|confirmed:password'"
                                  :error-messages="errors.collect('password_confirm')"
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions><v-btn color="green" @click="submit">Сохранить</v-btn><v-btn color="red" @click="dialog=false">Закрыть</v-btn></v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    import {USER_CREATE} from "@/store/mutation-types";
    export default {
        name: 'UsersCreate',
        data() {
            return {
                dialog:false,
                user: {
                    name: '',
                    email: '',
                    password: '',
                },
                password_confirm: '',
                valid:true,
            }
        },
        methods: {
            submit() {
                // this.$validator.validate().then(valid => {
                //     if (valid) {
                //         this.$store.dispatch(USER_CREATE, this.user).then(() => {
                //             this.$refs.createNewUserForm.reset();
                //             this.dialog = false;
                //         })
                //     }
                // });
                if (this.valid) {
                    this.$store.dispatch(USER_CREATE, this.user).then(() => {
                        this.$refs.createNewUserForm.reset();
                        this.dialog = false;
                    })
                }
            }
        }
    }
</script>