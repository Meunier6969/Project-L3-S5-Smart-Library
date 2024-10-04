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
        login(user_id, username, email, passwordHash, isAdmin) {
            this.user = new User(user_id, username, email, passwordHash, isAdmin);
        },
        signOut() {
            this.user = undefined;
        }
    },
    persist: true,
})