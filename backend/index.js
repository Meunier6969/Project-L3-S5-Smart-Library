//==========================================
import express, {json} from "express";
import {config} from 'dotenv';

import jwtpkg from 'node-jsonwebtoken';
import corspkg from 'cors'; // Fixing some potential network errors
import {addNewUser, deleteUser, getAllUsers, getPassword, getUserById} from "./routes/users.js"
import {
	addNewBook,
	deleteBook,
	editBook,
	getAllBooks,
	getBookById,
	getNumberOfBooks,
	modifyBookById,
	searchBooksByTitle
} from "./routes/books.js"
import {
	addBookToUsersFavorite,
	decrementBookFavoriteCount,
	getUsersFavorites,
	incrementBookFavoriteCount,
	removeBookFromUsersFavorite
} from "./routes/favorites.js"

const { sign, verify } = jwtpkg;

const cors = corspkg;

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
app.get("/api/books/:title?", async (req, res) => {
	try {
		const title = req.params.title; // Get the title from the URL parameters

		// Default pagination settings
		const page = req.query.page ? parseInt(req.query.page) : 1; // Default to page 1 if not provided
		const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Default to 10 books per page if not provided
		const offset = (page - 1) * limit; // Calculate the offset

		if (title) {
			// If a title is provided, perform a search
			await searchBooksByTitle(title)
				.then((filteredBooks) => {
					res.status(200).json(filteredBooks);
				})
				.catch((err) => {
					sendError(res, 400, err);
				});
		} else {
			// No title provided, return all books with pagination
			if (Object.keys(req.query).length > 1) {
				// If there are other query parameters (like filters), handle them
				await getNumberOfBooks(req.query, limit, offset)
					.then((filteredBooks) => {
						res.status(200).json(filteredBooks);
					})
					.catch((err) => {
						sendError(res, 400, err);
					});
			} else {
				// Just return all books
				await getAllBooks(limit, offset)
					.then((allBooks) => {
						res.status(200).json(allBooks);
					})
					.catch((err) => {
						sendError(res, 400, err);
					});
			}
		}
	} catch (err) {
		sendError(res, 400, err);  // Send an error response if something goes wrong
	}
});

// Exemple de code pour l'API
app.get('/api/books/search/:query', async (req, res) => {
	const query = req.params.query.toLowerCase();
	const books = await getAllBooks(); // Fonction qui récupère tous les livres
	const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
	res.json(filteredBooks);
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

	let user_id
	let user

	await addNewUser(pseudo, email, pwd)
	.then((result) => {
		user_id = result.insertId
	}).catch((err) => {
		sendError(res, 400, err)

	});

	if (user_id === undefined) return
	
	await getUserById(user_id)
	.then((result) => {
		user = result
	}).catch((err) => {
		sendError(res, 500, err)

	});

	if (user === undefined) return
	
	const token = generateToken(user_id);

	res.status(201).send({
		"message": "New user created",
		"token": token,
		"user": user
	})
})

app.post("/api/users/login", async (req, res) => {
	const { email, pwd } = req.body

	if (!email || !pwd) {
		sendError(res, 400, "Missing email and/or password field.")
		return
	}
	
	let user

	await getPassword(email)
	.then((result) => {
		user = result
	}).catch((err) => {
		sendError(res, 404, err)
	});

	if (user === undefined) return;
	if (user.pwd !== pwd) {
		sendError(res, 400, "Wrong login information.")
		return
	}

	const token = generateToken(user.user_id);

	res.status(200).send({
		"token": token,
		"user": await getUserById(user.user_id)
	})
})

app.post("/api/books", async (req, res) => {
	const { title, author, description, years,imageURL,category } = req.body


	if (!title || !author || !description || !years || !imageURL || !category) {
		sendError(res, 400, "Missing name, author and/or description field.")
		return
	}

	await addNewBook(title, author, description, years, imageURL, category)
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

	});
	await addBookToUsersFavorite(user_id, id)
	.then(() => {
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

	if (getUserByToken(token) !== id && !await isTokenAdmin(token)) {
		sendError(res, 403, "You must be an administator to delete this user.")
		return
	}

	await deleteUser(id)
	.then(() => {
		res.status(200).send({
			"message": "User deleted"
		})
	}).catch((err) => {
		sendError(res, 400, err)
	});
})

app.delete("/api/books/:id", async (req, res) => {
	const { id } = req.params;

	try {
		// Vérifier si l'utilisateur est un administrateur


		// Suppression du livre
		const result = await deleteBook(id);

		// Vérification si un livre a été supprimé
		if (result.affectedRows === 0) {
			return sendError(res, 404, "Book does not exist.");
		}

		// Réponse de succès
		res.status(200).send({
			message: "Book deleted successfully."
		});
	} catch (error) {
		// Gestion des erreurs
		sendError(res, 400, error.message || "An error occurred while deleting the book.");
	}
});




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

	});
	await removeBookFromUsersFavorite(user_id, id)
	.then(() => {
		res.status(200).send({
			"message": "Book has been unfavorited.",
		})
	}).catch((err) => {
		throw err
	});

})

// UPDATE
app.patch("/api/users/:id", async (req, res) => {
	const { id } = req.params
	const { pseudo, email, pwd } = req.body
	const token = req.headers.authorization

	// Check id, just in case
	if (!id) {
		sendError(res, 400, "Missing user id.")
		return
	}

	// Check token -> either admin or user
	if (getUserByToken(token) !== id && !await isTokenAdmin(token)) {
		sendError(res, 403, "You must be an administator to update this user.")
		return
	}

	await editUser(id, pseudo, email, pwd)
		.then(() => {
			res.status(200).send({
				"message": "User updated succesfuly"
			})
		}).catch((err) => {
			sendError(res, 400, err)
		});
})
app.patch("/api/books/:id", async (req, res) => {
	const { id } = req.params;
	const { title, author, description, year } = req.body; // Extraction des champs


	if (!id) {
		sendError(res, 400, "Missing book id.");
		return;
	}



	await editBook(id, title, author, description, year)
		.then(() => {
			res.status(200).send({
				"message": "Book updated successfully"
			});
		}).catch((err) => {
			sendError(res, 400, err);
		});
});


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
	}).catch(() => {
		isAdmin = false
	});

	return isAdmin
}

function sendError(res, statuscode, error) {
	res.status(statuscode).send({
		"message": "" + error
	})
}

function generateToken(user_id) {
	let jwtSecretKey = process.env.JWT_SECRET_KEY

	let data = {
		time: Date(),
		user_id: user_id,
	}

	return sign(data, jwtSecretKey, {expiresIn: '24h'})
}



// PUT - Modifier un livre
app.put("/api/books/:id", async (req, res) => {
	const { id } = req.params;
	const { title, author, description, years, imageURL, category } = req.body;

	if (!title || !author || !description || !years || !imageURL || !category) {
		sendError(res, 400, "Missing fields for modification.");
		return;
	}

	try {
		const result = await modifyBookById(id, title, author, description, years, imageURL, category); // Remplacez par votre logique
		res.status(200).send({
			message: "Book modified successfully",
			result,
		});
	} catch (error) {
		sendError(res, 500, error);
	}
});
