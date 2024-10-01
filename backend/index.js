//==========================================
import express, { json } from "express";
import { config } from 'dotenv';
import mysql from 'mysql2/promise';

import * as jwt from 'jsonwebtoken';

import pkg from 'cors'; // Fixing some potential network errors
const cors = pkg;

import { getAllUsers, getUserById } from "./routes/users.js"
import { getAllBooks, getBookById } from "./routes/books.js"

const app = express()
const PORT = 1234

config() // Setup env variables

//==========================================

// Middleware
app.use(cors())
app.use(json())
app.use((req, res, next) => {
	console.log('%s %s %s', req.method, req.url, req.body)
	next()
})

// Running the api
app.listen(PORT, () => {
	console.log(`Listening on localhost:${PORT}`)
})

// Connect to MySQL database
const con = await mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DBNAME
})

//==========================================

app.get("/api/test", (req, res) => {
	getUserByID(5)
	res.status(418).send({"message": "hi :D"})
})

// GET
app.get("/api/users/", async (req, res) => {
	let result = await getAllUsers()
	res.status(200).send(result)
})

app.get("/api/users/:id", async (req, res) => {
	const { id } = req.params

	let result = await getUserById(id)
	if (!result) {
		sendError(res, 404, "User not found")
		return
	}

	res.status(200).send(result)
})

app.get("/api/books/", async (req, res) => {
	let result = await getAllBooks()
	res.status(200).send(result)
})

app.get("/api/books/:id", async (req, res) => {
	const { id } = req.params

	let result = await getBookById(id)
	if (!result) {
		sendError(res, 404, "Book not found")
		return
	}

	res.status(200).send(result)
})

// POST
// TODO
app.post("/api/users/register", (req, res) => {
	const { pseudo, email, pwd } = req.body

	if (!pseudo || !email || !pwd) {
		sendError(res, 400, "Missing name, mail and/or password field.")
		return
	}

	// TODO: Check if email is already taken

	con.query(
		"INSERT INTO Users (pseudo, email, role, pwd) VALUES (?,?,?,?);", [pseudo, email, 0, pwd],
		(error, result, field) => {
			if (error) {
				sendError(res, 500, error)
				return
			}

			res.status(201).send({
				"message": "New user created",
				"user_id": result.insertId
			})
		}
	)

})

// TODO
app.post("/api/users/login", (req, res) => {
	const { pseudo, pwd } = req.body

	if (!pseudo || !pwd) {
		sendError(res, 400, "Missing name and/or password field.")
		return
	}

	let user = getUserByPseudo(pseudo)
	console.log("from outside:"+user)
	if (!user || user.pwd != pwd) {
		sendError(res, 401, "Incorrect login information")
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
		sendError(res, 405, "You are not an administrator.")
		return
	}

	if (!name || !author || !description) {
		sendError(res, 400, "Missing name, author and/or description field.")
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
		sendError(res, 400, "Missing book id.")
		return
	}

	if (!user_id) {
		sendError(res, 400, "You must be logged in.")
		return
	}
	
	let book = getBookByID(id)
	if (!book) {
		sendError(res, 404, "Book not found")
		return
	}
	
	let user = getUserByID(user_id)
	if (!user) {
		sendError(res, 404, "User not found")
		return
	}
	
	let infav = isBookInUsersFavorite(user_id, id);
	if (infav == true) {
		sendError(res, 400, "Book is already in users favorite.")
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
		sendError(res, 403, "You must be an administator to delete this user.")
		return
	}

	let user = data.users.find(obj => {
		return obj.id === sid
	})

	if (!user) {
		sendError(res, 404, "User not found")
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
		sendError(res, 403, "You must be an administator to delete this book.")
		return
	}

	let book = data.books.find(obj => {
		return obj.id === sid
	})

	if (!book) {
		sendError(res, 404, "Book not found")
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
		sendError(res, 400, "Missing book id.")
		return
	}
	
	if (!user_id) {
		sendError(res, 400, "You must be logged in.")
		return
	}
	
	let book = getBookByID(id)
	if (!book) {
		sendError(res, 404, "Book not found")
		return
	}
	
	let user = getUserByID(user_id)
	if (!user) {
		sendError(res, 404, "User not found")
		return
	}
	
	let infav = isBookInUsersFavorite(user_id, id);
	if (infav == false) {
		sendError(res, 400, "Book is not in users favorite")
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

function sendError(res, statuscode, error) {
	res.status(statuscode).send({
		"message": "There has been an error: " + error
	})
}

function getUserByPseudo(pseudo) {
	con.query("SELECT * FROM Users WHERE pseudo=?", [pseudo], (error, result, field) => {
		if (error) throw err;
		console.log("from inside:"+result)
		return result
	})
}

// Replaced by a database
function createBook(id, name, author, description) {
	return {
		"id": id,
		"name": name,
		"author": author,
		"description": description
	}
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
