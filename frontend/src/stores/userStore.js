import {defineStore} from 'pinia'
import User from '../models/user'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: undefined,
    }),
    getters: {
        isLoggedIn(state) {
            return (typeof state.user !== 'undefined');
        },
        isAdmin(state) {
            return this.isLoggedIn && state.user.isAdmin;
        },
        getUser(state) {
            return state.user;
        }
    },
    actions : {
        login() {
            //TODO: implement real login
            this.user = new User(0, "AHHHHH", "BBBBBBBB", "hhfghhf", true);
        },
        signOut() {
            this.user = undefined;
        }
    },
    persist: true,
})