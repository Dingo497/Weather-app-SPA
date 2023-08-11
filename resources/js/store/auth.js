import { defineStore } from "pinia";
import { ref } from "vue";
import { login, register, getUser, logout } from "../http/auth-api";
import { editDefaultValues } from "../http/user-api";

export const useAuthStore = defineStore("authStore", {
    state: () => ({
        guestDefaultSettings: {
            name: 'Guest',
            location: 'EN',
            homeLocationName: 'Namestovo',
        },
        user: ref({}),
        errors: ref({}),
        userToken: ref(''),
    }),


    getters: {
        isLoggedIn() {
            if (Object.keys(this.user).length === 0 && this.userToken.length === 0) {
                this.user = this.guestDefaultSettings;
                return false;
            } else {
                return true;
            }
        },
    },


    actions: {
        // TODO z handleRegister a handleLogin spravit jednu funkciu s parametrom ci login/ci reg.
        async handleRegister(newUser) {
            try {
                const { data } = await register(newUser);
                if (data.token && data.user) {
                    this.userToken = data.token;
                    this.user = data.user;
                    localStorage.setItem('userData', JSON.stringify(data.user));
                    localStorage.setItem('userToken', JSON.stringify(data.token));
                    this.errors = {};
                }
            } catch (error) {
                if (error.response && error.response.data.errors) {
                    this.errors = error.response.data.errors;
                } else {
                    this.errors = 'Something went wrong';
                }
            }
        },

        async handleLogin(credentials){
            try {
                const { data } = await login(credentials);
                if (data.token && data.user) {
                    this.userToken = data.token;
                    this.user = data.user;
                    localStorage.setItem('userData', JSON.stringify(data.user));
                    localStorage.setItem('userToken', JSON.stringify(data.token));
                    this.errors = {};
                }
            } catch (error) {
                if (error.response && error.response.data.errors) {
                    this.errors = error.response.data.errors;
                } else {
                    this.errors = 'Something went wrong';
                }
            }
        },

        // TODO dat try catch
        async handleLogout() {
            try {
                const { data } = await logout(this.userToken);
                if (data.success) {
                    this.user = {};
                    this.userToken = '';
                    localStorage.removeItem('userData');
                    localStorage.removeItem('userToken');
                }
            } catch (error) {
                if (error.response && error.response.data.errors) {
                    this.errors = error.response.data.errors;
                } else {
                    this.errors = 'Something went wrong';
                }
            }
        },

        // Zmena zakladnych hodnot pouzivatela, ktore sa pouzivaju na vyhladavanie pocasia
        // TODO Mal by som to presunut do noveho store, kde budem riesit rozne ukony nad pouzivatelom.
        async handleEditDefaultValues() {
            try {
                const { data } = await editDefaultValues(this.userToken, {
                    location: this.user.location,
                    homeLocationName: this.user.homeLocationName
                });
            } catch (error) {
                if (error.response && error.response.data.errors) {
                    this.errors = error.response.data.errors;
                } else {
                    this.errors = 'Something went wrong';
                }
            }
        },

        async fetchUser(){
            try {
                const { data } = await getUser(this.userToken);
                this.user = data;
            } catch (error) {
                if (error.response && error.response.data.errors) {
                    this.errors = error.response.data.errors;
                } else {
                    this.errors = 'Something went wrong';
                }
            }
        },
    },
});
