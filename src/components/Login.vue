<template>
    <v-layout align-center justify-center fill-height>
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Форма входа</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form v-model="valid">
                        <v-text-field v-validate="'required|email'" prepend-icon="person" name="login" label="Login"
                                      type="text" v-model="user.email"
                                      :error-messages="errors.collect('login')"></v-text-field>
                        <v-text-field v-validate="'required'" prepend-icon="lock" name="password" label="Password"
                                      id="password" type="password" v-model="user.password"
                                      :error-messages="errors.collect('password')"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="submit">Войти</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import * as types from '../store/mutation-types'

    export default {
        name: 'Login',
        metaInfo: {
            title: 'Вход',
        },
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                },
                valid: true,
            }
        },
        methods: {
            submit() {
                if (this.valid) {
                    this.$store.dispatch(types.AUTH_REQUEST, this.user).then(() => {
                        this.$router.push('/')
                    })
                }
            }
        },
    }
</script>

