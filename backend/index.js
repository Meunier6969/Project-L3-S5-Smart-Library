//==========================================
import express, { json } from "express";
import { config } from 'dotenv';

import jwtpkg from 'node-jsonwebtoken';
const { sign, verify } = jwtpkg;

import corspkg from 'cors'; // Fixing some potential network errors
const cors = corspkg;

import { getAllUsers, getUserById, addNewUser, getPassword, deleteUser } from "./routes/users.js"
import {addNewBook, getAllBooks, getNumberOfBooks, getBookById, deleteBook,  } from "./routes/books.js"
import { getUsersFavorites, addBookToUsersFavorite, removeBookFromUsersFavorite ,decrementBookFavoriteCount,incrementBookFavoriteCount} from "./routes/favorites.js"

//==========================================

const app = express()
const PORT = 1234

config() // Setup env variables

// Middleware
app.use(cors())
app.use(json())
app.use((req, res, next) => {
	console.log('%s %s %s', req.method, req.url, req.body)
	next()
})

//==========================================

// Running the api
app.listen(PORT, () => {
	console.log(`Listening on localhost:${PORT}`)
})

//==========================================

app.get("/api/test", async (req, res) => {
	const token = req.headers.authorization

	res.status(418).send({
		"tok": token,
		"val": isTokenValid(token),
		"adm": await isTokenAdmin(token),
		"usr": getUserByToken(token)
	})
})

// GET
app.get("/api/users/", async (req, res) => {
	await getAllUsers()
	.then((result) => {
		res.status(200).send(result)
	}).catch((err) => {
		sendError(res, 400, err)
	})
})

app.get("/api/users/:id", async (req, res) => {
	const { id } = req.params

	await getUserById(id)
	.then((result) => {
		res.status(200).send(result)
	}).catch((err) => {
		sendError(res, 404, err)
	})
})

app.get("/api/users/:id/favorites", async (req, res) => {
	const { id } = req.params

	await getUsersFavorites(id)
	.then((result) => {
		res.status(200).send(result)
	}).catch((err) => {
		sendError(res, 404, err)
	});

})

app.get("/api/books/", async (req, res) => {
	// If there are parameters, we will use them to filter the books
	if (Object.keys(req.query).length !== 0) {
		await getNumberOfBooks(req.query)
			.then((result) => {
				res.status(200).send(result);
			})
			.catch((err) => {
				sendError(res, 400, err);
			});
	} else {
		// If no query parameters, return all books
		await getAllBooks()
			.then((result) => {
				res.status(200).send(result);
			})
			.catch((err) => {
				sendError(res, 400, err);
			});
	}
});

app.get("/api/books/", async (req, res) => {
	try {
		// Default pagination settings
		const page = req.query.page ? parseInt(req.query.page) : 1; // Default to page 1 if not provided
		const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Default to 10 books per page if not provided
		const offset = (page - 1) * limit; // Calculate the offset

		if (Object.keys(req.query).length > 1) {
			// If there are other query parameters (like filters), handle them
			await getNumberOfBooks(req.query, limit, offset)
			.then((filterdBooks) => {
				res.status(200).json(filterdBooks);
			}).catch((err) => {
				sendError(res, 400, err);
				return
			});
		} else {
			// No filters, just return all books with pagination
			// const allBooks = await getAllBooks(limit, offset);
			// res.status(200).json(allBooks);
			await getAllBooks(limit, offset)
			.then((allBooks) => {
				res.status(200).json(allBooks);
			}).catch((err) => {
				sendError(res, 400, err);
				return
			});
		}
	} catch (err) {
		sendError(res, 400, err);  // Send an error response if something goes wrong
	}
});

app.get("/api/books/:id", async (req, res) => {
	const { id } = req.params

	await getBookById(id)
	.then((result) => {
		res.status(200).send(result)
	}).catch((err) => {
		sendError(res, 404, err)
	});
})

// POST
app.post("/api/users/register", async (req, res) => {
	const { pseudo, email, pwd } = req.body

	if (!pseudo || !email || !pwd) {
		sendError(res, 400, "Missing pseudo, email and/or pwd field.")
		return
	}

	await addNewUser(pseudo, email, pwd)
	.then((result) => {
		res.status(201).send({
			"message": "New user created",
			"user_id": result.insertId
		})
	}).catch((err) => {
		sendError(res, 400, err)
	});
})

app.post("/api/users/login", async (req, res) => {
	const { email, pwd } = req.body

	if (!pseudo || !pwd) {
		sendError(res, 400, "Missing name and/or password field.")
		return
	}
	
	await getPassword(email)
	.then((result) => {
		user = result
	}).catch((err) => {
		sendError(res, 404, err)
	});

	if (user.pwd !== pwd) {
		sendError(res, 400, "Wrong login information.")
		return
	}

	let jwtSecretKey = process.env.JWT_SECRET_KEY
	let data = {
		time: Date(),
		user_id: user.user_id,
	}

	const token = sign(data, jwtSecretKey, {expiresIn: '24h'});

	res.status(200).send({
		"token": token
	})
})

app.post("/api/books", async (req, res) => {
	const { title, author, description, year } = req.body
	const token = req.headers.authorization

	if (await isTokenAdmin(token)) {
		sendError(res, 405, "You are not an administrator.")
		return
	}

	if (!title || !author || !description) {
		sendError(res, 400, "Missing name, author and/or description field.")
		return
	}

	await addNewBook(title, author, description, year, "", category)
	.then((result) => {
		res.status(201).send({
			"message": "New book created",
			"book_id": result.insertId
		})
	}).catch((err) => {
		sendError(res, 404, err)
	});

})

app.post("/api/books/:id/favorite", async (req, res) => {
	// TODO: Auth user
	const { id } = req.params
	const token = req.headers.authorization

	if (!id) {
		sendError(res, 400, "Missing book id.")
		return
	}

	if (!isTokenValid(token)) {
		sendError(res, 400, "You must be logged in.")
		return
	}

	let user_id = getUserByToken(token)

	await incrementBookFavoriteCount(id)
	.catch((err) => {
		sendError(res, 400, err)
		return
	});
	await addBookToUsersFavorite(user_id, id)
	.then((result) => {
		res.status(200).send({
			"message": "Book has been favorited."
		})
	}).catch((err) => {
		sendError(res, 400, err)
	});
})

app.delete("/api/users/:id", async (req, res) => {
	const { id } = req.params
	const token = req.headers.authorization

	if (getUserByToken(token) != id && !await isTokenAdmin(token)) {
		sendError(res, 403, "You must be an administator to delete this user.")
		return
	}

	await deleteUser(id)
	.then((result) => {
		res.status(200).send({
			"message": "User deleted"
		})
	}).catch((err) => {
		sendError(res, 400, err)
	});
})

app.delete("/api/books/:id", async (req, res) => {
	const { id } = req.params
	const token = req.headers.authorization

	if (!await isTokenAdmin(token)) {
		sendError(res, 403, "You must be an administator to delete this book.")
		return
	}

	await deleteBook(id)
	.then((result) => {
		res.status(200).send({
			"message": "Book deleted"
		})
	}).catch((error) => {
		sendError(res, 400, error)
	});

})




app.delete("/api/books/:id/favorite", async (req, res) => {
	const { id } = req.params
	const token = req.headers.authorization

	if (!id) {
		sendError(res, 400, "Missing book id.")
		return
	}
	
	if (!isTokenValid(token)) {
		sendError(res, 400, "You must be logged in.")
		return
	}

	let user_id = getUserByToken(token)

	await decrementBookFavoriteCount(id)
	.catch((err) => {
		sendError(res, 400, err)
		return
	});
	await removeBookFromUsersFavorite(user_id, id)
	.then((result) => {
		res.status(200).send({
			"message": "Book has been unfavorited.",
		})
	}).catch((err) => {
		throw err
	});

})

// Functions
function isTokenValid(token) {
	let jwtSecretKey = process.env.JWT_SECRET_KEY;

	try {
		verify(token, jwtSecretKey)
	} catch (error) {
		return false
	}

	return true
}

function getUserByToken(token) {
	let jwtSecretKey = process.env.JWT_SECRET_KEY;

	let data

	try {
		data = verify(token, jwtSecretKey)
	} catch (error) {
		return -1
	}

	return data.user_id
}

async function isTokenAdmin(token) {
	if (!isTokenValid(token)) return false

	let jwtSecretKey = process.env.JWT_SECRET_KEY;

	try {
		var tk = verify(token, jwtSecretKey)
	} catch (error) {
		return false
	}

	let isAdmin = false

	await getUserById(tk.user_id)
	.then((result) => {
		isAdmin = Boolean(result.role)
	}).catch((err) => {
		isAdmin = false
	});

	return isAdmin
}

function sendError(res, statuscode, error) {
	res.status(statuscode).send({
		"message": "" + error
	})
}


