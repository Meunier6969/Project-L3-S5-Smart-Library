import {defineStore} from 'pinia'

export const useFilterStore = defineStore('filterStore', {
    state: () => ({
        categories: {},
        favOnly: false,
    }),
    actions : {
        updateCategory(category, value) {
            this.categories[category] = value;
        },
        updateFaveOnly(value) {
            console.log(value);
            this.favOnly = value;
        }
    },
})