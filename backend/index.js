const express = require("express")
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const app = express()
const PORT = 1234

dotenv.config()

// MySQL 3306
// TODO: Replace all this with the database
let GLOBAL_USER_ID = 0
let GLOBAL_BOOK_ID = 0

let data = {
	// users: [],
	users: [
		createUser(0, "José", mail="bing@chilling.com", pwd="azerty"),
		createUser(1, "Micheal", mail="gabriel@atal.com", pwd="azerty"),
	],
	// books: [],
	books: [createBook(0, "L'art de la guerre", "Sun Tzu", "If you know the enemy and know yourself, you need not fear the result of a hundred battles.")]
}
data.users[1].admin = true
//==========================================

// Middleware
app.use(express.json())
app.use((req, res, next) => {
	console.log('%s %s %s', req.method, req.url, req.body)
	next()
	console.log('\t%s', res.statusCode)
	
})

// Running the api
app.listen(PORT, () => {
	console.log(`Listening on localhost:${PORT}`)
})

// Connect to MySQL database
var con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DBNAME
});

con.connect((err) => {
	if (err) throw err;
	console.log("Connected!");
});

//==========================================

app.get("/api/test", (req, res) => {
	const tok = req.headers.authorization

	res.status(200).send({
		"tok": tok,
		"auth": isTokenAdmin(tok)
	})
	
})

// GET
app.get("/api/users/", (req, res) => {

	let publicUsers = []

	data.users.forEach(user => {
		publicUsers.push(getPublicInfoFromUser(user))
	});

	res.status(200).send(publicUsers)
})

app.get("/api/users/:id", (req, res) => {
	const { id } = req.params

	let user = getUserByID(id)
	if (!user) {
		res.status(404).send({
			"message": "User not found"
		})
		return
	}

	res.status(200).send(getPublicInfoFromUser(user))
})

app.get("/api/books/", (req, res) => {
	res.status(200).send(data.books)
})

app.get("/api/books/:id", (req, res) => {
	const { id } = req.params

	let book = getBookByID(id)
	if (!book) {
		res.status(404).send({
			"message": "Book not found"
		})
		return
	}

	res.status(200).send(book)
})

// POST
app.post("/api/users/register", (req, res) => {
	const { name, mail, pwd } = req.body

	if (!name || !mail || !pwd) {
		res.status(400).send({
			"message": "Missing name, mail and/or password field."
		})
		return
	}

	let newUser = createUser(GLOBAL_USER_ID, name, mail, pwd)

	GLOBAL_USER_ID++

	data.users.push(newUser)

	res.status(201).send({
		"message": "New user created",
		"user": newUser
	})
})

app.post("/api/users/login", (req, res) => {
	const { username, pwd } = req.body

	if (!username || !pwd) {
		res.status(400).send({
			"message": "Missing username and/or password field."
		})
		return
	}

	let user = getUserByName(username)
	if (!user || user.pwd != pwd) {
		res.status(401).send({
			"message": "Incorrect login information"
		})
		return
	}

	let jwtSecretKey = process.env.JWT_SECRET_KEY
	let data = {
		time: Date(),
		user_id: user.id,
	}

	const token = jwt.sign(data, jwtSecretKey, {expiresIn: '10m'});

	res.status(200).send({
		"message": "Logged in 👍",
		"token": token
	})
})

app.post("/api/books", (req, res) => {
	// TODO: Auth admin
	const { name, author, description } = req.body
	const token = req.headers.authorization

	if (isTokenAdmin(token)) {
		res.status(405).send({
			"message": "You must be an administator to create a book.",
		})
		return
	}

	if (!name || !author || !description) {
		res.status(400).send({
			"message": "Missing name, author and/or description field."
		})
		return
	}

	let newBook = createBook(GLOBAL_BOOK_ID, name, author, description)

	GLOBAL_BOOK_ID++

	data.books.push(newBook)

	res.status(201).send({
		"message": "New book created",
		"book": newBook
	})
})

app.post("/api/books/:id/favorite", (req, res) => {
	// TODO: Auth user
	const { id } = req.params
	const { user_id } = req.body

	if (!id) {
		res.status(400).send({
			"message": "Missing book id."
		})
		return
	}

	if (!user_id) {
		res.status(400).send({
			"message": "You must be logged in."
		})
		return
	}
	
	let book = getBookByID(id)
	if (!book) {
		res.status(404).send({
			"message": "Book not found"
		})
		return
	}
	
	let user = getUserByID(user_id)
	if (!user) {
		res.status(404).send({
			"message": "User not found"
		})
		return
	}

	let infav = isBookInUsersFavorite(user_id, id);
	if (infav == true) {
		res.status(400).send({
			"message": "Book is already in users favorite.",
		})
		return
	}

	addBookToUsersFavorite(user_id, id)

	res.status(200).send({
		"message": "Book has been favorited.",
		"book": book,
		"usersFavorite": user.favorites
	})
})

// DELETE
app.delete("/api/users/:id", (req, res) => {
	// TODO: Let the user kms
	if (isTokenAdmin(token)) {
		res.status(403).send({
			"message": "You must be an administator to delete this user.",
		})
		return
	}

	let user = data.users.find(obj => {
		return obj.id === sid
	})

	if (!user) {
		res.status(404).send({
			"message": "User not found"
		})
		return
	}

	let index = data.users.indexOf(user);
	if (index > -1) {
		data.users.splice(index, 1);
	}

	res.status(200).send({
		"message": "User deleted"
	})
})

app.delete("/api/books/:id", (req, res) => {
	if (isTokenAdmin(token)) {
		res.status(403).send({
			"message": "You must be an administator to delete this book.",
		})
		return
	}

	let book = data.books.find(obj => {
		return obj.id === sid
	})

	if (!book) {
		res.status(404).send({
			"message": "User not found"
		})
		return
	}

	let index = data.books.indexOf(book);
	if (index > -1) {
		data.books.splice(index, 1);
	}

	res.status(200).send({
		"message": "Book deleted"
	})
})

app.delete("/api/books/:id/favorite", (req, res) => {
	// TODO: Auth user
	const { id } = req.params
	const { user_id } = req.body

	if (!id) {
		res.status(400).send({
			"message": "Missing book id."
		})
		return
	}

	if (!user_id) {
		res.status(400).send({
			"message": "You must be logged in."
		})
		return
	}

	let book = getBookByID(id)
	if (!book) {
		res.status(404).send({
			"message": "Book not found"
		})
		return
	}
	
	let user = getUserByID(user_id)
	if (!user) {
		res.status(404).send({
			"message": "User not found"
		})
		return
	}

	let infav = isBookInUsersFavorite(user_id, id);
	if (infav == false) {
		res.status(400).send({
			"message": "Book is not in users favorite.",
		})
		return
	}

	removeBookFromUsersFavorite(user_id, id)

	res.status(200).send({
		"message": "Book has been unfavorited.",
		"book": book,
		"usersFavorite": user.favorites
	})


})

// Functions
function isTokenValid(token) {
	let jwtSecretKey = process.env.JWT_SECRET_KEY;

	try {
		jwt.verify(token, jwtSecretKey)
	} catch (error) {
		return false
	}

	return true
}

function isTokenAdmin(token) {
	if (!isTokenValid(token)) return false

	let jwtSecretKey = process.env.JWT_SECRET_KEY;

	try {
		var tk = jwt.verify(token, jwtSecretKey)
	} catch (error) {
		return false
	}
	let user = getUserByID(tk.user_id)

	return Boolean(user.admin)
}

// Replaced by a database
function createUser(id, name, mail, pwd) {
	return {
		"id": id,
		"name": name,
		"mail": mail,
		"pwd": pwd,
		"favorites": [],
		"admin": false,
	}
}

function createBook(id, name, author, description) {
	return {
		"id": id,
		"name": name,
		"author": author,
		"description": description
	}
}

function getUserByName(name) {
	return data.users.find(obj => {
		return obj.name === name
	})
}

function getUserByID(id) {
	sid = id * 1 // Convert id to a number
	return data.users.find(obj => {
		return obj.id === sid
	})
}

function getBookByID(id) {
	sid = id * 1 // Convert id to a number
	return data.books.find(obj => {
		return obj.id === sid
	})
}

function getPublicInfoFromUser(user) {
	const { id, name, mail } = user
	let data = {
		id: id,
		name: name,
		mail: mail
	}

	return data
}

function isBookInUsersFavorite(user_id, book_id) {
	// Assuming proper error handling beforehand by the caller
	let user = getUserByID(user_id)
	let book = getBookByID(book_id)
	
	if (!user || !book) return false

	let index = user.favorites.indexOf(book_id)
	if (index > -1) return true
	
	return false
}

function addBookToUsersFavorite(user_id, book_id) {
	// Assuming proper error handling beforehand by the caller
	let user = getUserByID(user_id)
	let book = getUserByID(book_id)

	if (!user || !book) return false

	user.favorites.push(book_id)
}

function removeBookFromUsersFavorite(user_id, book_id) {
	// Assuming proper error handling beforehand by the caller
	let user = getUserByID(user_id)
	let book = getUserByID(book_id)

	if (!user || !book) return false

	var index = user.favorites.indexOf(book_id);
	if (index > -1) {
		user.favorites.splice(index, 1);
	}
}