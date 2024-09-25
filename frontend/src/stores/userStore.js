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
        getUser(state) {
            return state.user;
        }
    },
    actions : {
        signOut() {
            this.state.user = undefined;
        }
    }
})