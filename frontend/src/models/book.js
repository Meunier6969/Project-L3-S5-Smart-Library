export default class Book {
    constructor(id, title, author, cover, categories = [], description = '', isFav = false) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.cover = cover;
        this.categories = categories;
        this.description = description;
        this.isFav = isFav;
    }
}