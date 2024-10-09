// Description: Main entry point for the backend server.

// Function: This file is the main entry point for the backend server. It sets up the server, connects to the database, and defines the routes for the API.
// GET /api/books/:title? - Get all books or search for books by title
// GET /api/books/:id - Get a book by its ID
// POST /api/books - Add a new book
// POST /api/books/:id/favorite - Add a book to the user's favorites
// DELETE /api/books/:id - Delete a book
// DELETE /api/books/:id/favorite - Remove a book from the user's favorites
// PUT /api/books/:id - Modify a book
// PUT /api/users/:id - Modify a user
// GET /api/users/ - Get all users
// GET /api/users/:id - Get a user by its ID
// GET /api/users/:id/favorites - Get a user's favorite books
// POST /api/users/register - Register a new user
// POST /api/users/login - Login a user
// DELETE /api/users/:id - Delete a user
// GET /api/test - Test route to check if the API is running


//==============IMPORT============================

import express, {json} from "express";
import {config} from 'dotenv';

import crypto from 'crypto'
import jwtpkg from 'node-jsonwebtoken';
import corspkg from 'cors'; // Fixing some potential network errors
import {
	addNewUser, 
	deleteUser, 
	editUser, 
	getAllUsers, 
	getPassword, 
	getUserById
} from "./routes/users.js"
import {
	addNewBook, 
	deleteBook, 
	editBook, 
	getBookById, 
	getNumberOfBooks,
} from "./routes/books.js"
import {
    addBookToUsersFavorite,
    decrementBookFavoriteCount,
    getUsersFavorites,
    incrementBookFavoriteCount,
    removeBookFromUsersFavorite
} from "./routes/favorites.js"

const {sign, verify} = jwtpkg;

const cors = corspkg;

//==============CONFIG============================

const app = express()
const PORT = 1234

config() // Setup env variables

// Middleware
app.use(cors())
app.use(json())
app.use((req, res, next) => {
    console.log('%s %s', req.method, req.url)
    next()
})

// Running the api
app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`)
})

//==============TEST============================

app.get("/api/test", async (req, res) => {
    const token = req.headers.authorization

    console.log("efsderzegdfhgrtghfnbghfnhtrhgtrghgtrhgyghytrhgytrhj,jhtyjg,tgyrtj,hjhy")

    res.status(418).send({
        "tok": token,
        "val": isTokenValid(token),
        "adm": await isTokenAdmin(token),
        "usr": getUserByToken(token)
    })
})

//==============ROUTES============================

//--------------USERS-----------------------------

// USERS - GET

/**
 * @route GET /api/users/
 * @description Get all users
 * @access Public
 */
app.get("/api/users/", async (req, res) => {
    await getAllUsers()
        .then((result) => {
            res.status(200).send(result)
        }).catch((err) => {
            sendError(res, 500, err)
        })
})

/**
 * @route GET /api/users/:id
 * @description Get a user by its ID
 * @access Public
 */
app.get("/api/users/:id", async (req, res) => {
    const {id} = req.params

    await getUserById(id)
        .then((result) => {
            res.status(200).send(result)
        }).catch((err) => {
			if (err == "User Not found.")
	            sendError(res, 404, err)
			else 
				sendError(res, 500, err)
        })
})

/**
 * @route GET /api/users/:id/favorites
 * @description Get a user's favorite books
 * @access Public
 */
app.get("/api/users/:id/favorites", async (req, res) => {
    const {id} = req.params

    await getUsersFavorites(id)
        .then((result) => {
            res.status(200).send(result)
        }).catch((err) => {
			if (err == "User Not found.")
				sendError(res, 404, err)
			else
				sendError(res, 500, err)
        });

})

// USERS - POST
/**
 * @route POST /api/users/register
 * @description Register a new user
 * @access Public
 */
app.post("/api/users/register", async (req, res) => {

    const {pseudo, email, pwd, role} = req.body

    if (!pseudo || !email || !pwd) {
        sendError(res, 400, "Missing pseudo, email and/or pwd field.")
        return
    }

	let hashedpwd = crypto.createHash('sha256').update(pwd).digest('hex')

    let user_id
    let user

	await addNewUser(pseudo, email, hashedpwd, role)
        .then((result) => {
            user_id = result.insertId
        }).catch((err) => {
			if (err == "User already exist")
				sendError(res, 403, err)
			else
				sendError(res, 500, err)
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

/**
 * @route POST /api/users/login
 * @description Login a user
 * @access Public
 */
app.post("/api/users/login", async (req, res) => {
    const {email, pwd} = req.body

    if (!email || !pwd) {
        sendError(res, 400, "Missing email and/or password field.")
        return
    }

	let hashedpwd = crypto.createHash('sha256').update(pwd).digest('hex')

    let user

    await getPassword(email)
        .then((result) => {
            user = result
        }).catch((err) => {
			if (err == "User not found")
				sendError(res, 404, err)
			else
				sendError(res, 500, err)
        });

    if (user === undefined) return;
	if (user.pwd !== hashedpwd) {
        sendError(res, 403, "Wrong login information.")
        return
    }

    const token = generateToken(user.user_id);

    res.status(200).send({
        "token": token,
        "user": await getUserById(user.user_id)
    })
})

// USERS - DELETE
/**
 * @route DELETE /api/users/:id
 * @description Delete a user
 * @access Private
 */
app.delete("/api/users/:id", async (req, res) => {
    const {id} = req.params
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
			if (err == "User not found")
				sendError(res, 404, err)
			else
				sendError(res, 500, err)
        });
})

// USERS - PATCH
/**
 * @route PATCH /api/users/:id
 * @description Modify a user
 * @access Private
 */
app.patch("/api/users/:id", async (req, res) => {
    const {id} = req.params
    const {pseudo, email, pwd,role} = req.body
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

    await editUser(id, pseudo, email, pwd ,role)
        .then(() => {
            res.status(200).send({
                "message": "User updated succesfuly"
            })
        }).catch((err) => {
			if (err == "User not found")
				sendError(res, 404, err)
			else if (err == "No fields to change")
				sendError(res, 400, err)
			else
				sendError(res, 500, err)
        });
})


//--------------BOOKS-----------------------------

// BOOKS - GET

/**
 * @route GET /api/books/
 * @description Get all books or search for books by title
 * @access Public
 */
app.get("/api/books/", async (req, res) => {
    try {
        const title = req.query.title; // Get the title from the URL parameters
        const page = req.query.page ? parseInt(req.query.page) : 1; // Default to page 1 if not provided
        const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Default to 10 books per page if not provided
        const category = req.query.category ? parseInt(req.query.category) : 10; // Default to 10 books per page if not provided
        const sort = req.query.sort;

        await getNumberOfBooks(req.query)
            .then((filteredBooks) => {
                res.status(200).json(filteredBooks);
            })
            .catch((err) => {
                sendError(res, 500, err);
            });
    } catch (err) {
        sendError(res, 500, err);  // Send an error response if something goes wrong
    }
});

/**
 * @route GET /api/books/:id
 * @description Get a book by its ID
 * @access Public
 * @param {string} id - The ID of the book
 * @returns {object} - The book object
 */
app.get("/api/books/:id", async (req, res) => {
    const {id} = req.params

    await getBookById(id)
        .then((result) => {
            res.status(200).send(result)
        }).catch((err) => {
			if (err == "Book not found")
				sendError(res, 404, err)
			else
				sendError(res, 500, err)
        });
})

// BOOKS - POST

/**
 * @route POST /api/books
 * @description Add a new book
 * @access Private
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book
 * @param {string} description - The description of the book
 * @param {number} year - The year the book was published
 * @param {string} imageURL - The URL of the book's image
 * @param {string} category - The category of the book
 * @returns {object} - The new book object
 */
app.post("/api/books", async (req, res) => {
    const {title, author, description, years, imageURL, category} = req.body


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
			if (err == "Book already exists.")
				sendError(res, 403, err)
			else
				sendError(res, 500, err)
        });

})

/**
 * @route POST /api/books/:id/favorite
 * @description Add a book to the user's favorites
 * @access Private
 * @param {string} id - The ID of the book
 * @returns {object} - Success message
 */
app.post("/api/books/:id/favorite", async (req, res) => {
    // TODO: Auth user
    const {id} = req.params
    const token = req.headers.authorization

    if (!id) {
        sendError(res, 400, "Missing book id.")
        return
    }

    if (!isTokenValid(token)) {
        sendError(res, 401, "You must be logged in.")
        return
    }

    let user_id = getUserByToken(token)

	let error_check = false
    await incrementBookFavoriteCount(id)
        .catch((err) => {
            sendError(res, 500, err)
			error_check = true
        });

	if (error_check) return;

    await addBookToUsersFavorite(user_id, id)
        .then(() => {
            res.status(200).send({
                "message": "Book has been favorited."
            })
        }).catch((err) => {
            sendError(res, 500, err)
        });
})
// BOOKS - DELETE
app.delete("/api/books/:id", async (req, res) => {
    const {id} = req.params;
    const token = req.headers.authorization;

    try {
        // Vérifier si l'utilisateur est un administrateur
        if (!await isTokenAdmin(token)) {
            sendError(res, 403, "You must be an administator to update this user.")
            return
        }

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
        sendError(res, 500, error);
    }
});

app.delete("/api/books/:id/favorite", async (req, res) => {
    const {id} = req.params
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

	let error_check = false
    await decrementBookFavoriteCount(id)
        .catch((err) => {
            sendError(res, 500, err)
			error_check = true
        });

	if (error_check) return;
	
    await removeBookFromUsersFavorite(user_id, id)
        .then(() => {
            res.status(200).send({
                "message": "Book has been unfavorited.",
            })
        }).catch((err) => {
            sendError(res, 500, error)
        });
})

// BOOKS - PATCH
app.patch("/api/books/:id", async (req, res) => {
    const {id} = req.params;
    const {title, author, description, years, category_id} = req.body;

    if (!id) {
        return sendError(res, 400, "Missing book id.");
		return
    }
	
    await editBook(id, title, author, description, years, category_id)
    .then((result) => {
	    res.status(200).send({
	        "message": "Book updated successfully",
	    });
	}).catch((err) => {
		if (err == "Book does not exist")
	    	sendError(res, 404, err.message);
		else
			sendError(res, 500, err.message);
	});
});


//==============FUNCTIONS============================

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

    return String(data.user_id)
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



