import {defineStore} from 'pinia'
import User from '../models/user'
import axios from "axios";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: undefined,
        favoriteBooks: [],
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
        },
        async fetchFavorites() {
            if (this.isLoggedIn && this.user.id) {
                const API_URL = "http://localhost:1234/api";
                const response = await axios.get(API_URL + '/users/' + this.user.id + '/favorites');
                this.favoriteBooks = response.data.favorites;
            }
        },
        async toggleFavorite(bookId) {
            const API_URL = "http://localhost:1234/api";
            const index = this.favoriteBooks.indexOf(bookId);
            if (index === -1) {
                this.favoriteBooks.push(bookId);
                await axios.post(API_URL + '/books/' + bookId + '/favorite', {}, {
                    headers: {
                        'Authorization': localStorage.getItem('authToken'),
                    }
                })
            } else {
                this.favoriteBooks.splice(index, 1);
                await axios.delete(API_URL + '/books/' + bookId + '/favorite', {
                    headers: {
                        'Authorization': localStorage.getItem('authToken'),
                    }
                })
            }
            // Update the server if necessary
            // axios.post or delete call here to update the backend
            //TODO
        },
        isFavorite(bookId) {
            return this.favoriteBooks.includes(bookId);
        }
    },
    persist: true,
})