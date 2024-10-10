import {defineStore} from 'pinia'

export const useFilterStore = defineStore('filterStore', {
    state: () => ({
        categories: {
            sf: false,
            mystery: false,
            history: false,
            education: false,
            children: false,
            fav:false,
        },
        favOnly: false,
        fromAtoZ: false,
        fromZtoA: false,
        selectedCategory: null,
    }),
    actions : {
        updateCategory(category, value) {
            this.selectedCategory = category;
            this.deleteCategory()
            this.categories[category] = value;

        },
        updateFaveOnly(value) {
            console.log(value);
            this.favOnly = value;
        },
        deleteCategory() {
            this.categories = {
                sf: false,
                mystery: false,
                history: false,
                education: false,
                children: false,
                fav:false,
            };
        }
    },
})