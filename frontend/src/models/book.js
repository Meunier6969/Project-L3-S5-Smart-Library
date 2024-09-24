export default class Book {
    constructor(id, title, cover, categories = [], isFav = false) {
        this.id = id;
        this.title = title;
        this.cover = cover;
        this.categories = categories;
        this.isFav = isFav;
    }
}