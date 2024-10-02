export default class User {
    constructor(id, username, email, passwordHash, isAdmin, ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.isAdmin = isAdmin;
    }
}