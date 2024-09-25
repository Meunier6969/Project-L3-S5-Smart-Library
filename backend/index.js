const express = require("express")
const app = express()
const PORT = 1234

// TODO: Replace all this with the database
let GLOBAL_USER_ID = 0
let GLOBAL_BOOK_ID = 0

let data = {
	users: [],
	books: [],
}
// let data = {
// 	users: [createUser(0, "José", "bing@chilling.com")],
// 	books: [createBook(0, "L'art de la guerre", "Sun Tzu", "If you know the enemy and know yourself, you need not fear the result of a hundred battles.")]
// }

// Middleware
app.use(express.json())
app.use((req, res, next) => {
	console.log('%s %s %s', req.method, req.url, req.body)
	next()
	console.log('\t%s %s', res.statusCode)

})

// GET
app.get("/api/users/", (req, res) => {
	res.status(200).send(data.users)
})

app.get("/api/users/:id", (req, res) => {
	const { id } = req.params

	sid = id * 1 // convert id to an number
	
	let user = data.users.find(obj => {
		return obj.id === sid
	})

	if (!user) {
		res.status(404).send({
			"message": "User not found"
		})
		return
	}

	res.status(200).send(data.users[sid])
})

app.get("/api/books/", (req, res) => {
	res.status(200).send(data.books)
})

app.get("/api/books/:id", (req, res) => {
	const { id } = req.params

	sid = id * 1 // convert id to an number

	let book = data.books.find(obj => {
		return obj.id === sid
	})

	if (!book) {
		res.status(404).send({
			"message": "Book not found"
		})
		return
	}

	res.status(200).send(data.book[sid])
})

// POST
app.post("/api/users/register", (req, res) => {
	const { name, mail } = req.body

	if (!name || !mail) {
		res.status(400).send({
			"message": "Missing name and/or mail field."
		})
		return
	}

	let newUser = createUser(GLOBAL_USER_ID, name, mail)

	GLOBAL_USER_ID++

	data.users.push(newUser)

	res.status(201).send({
		"message": "New user created",
		"user": newUser
	})
})

app.post("/api/books", (req, res) => {
	const { name, author, description } = req.body

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
	const { id } = req.params
	const { userId } = req.body

	if (!id) {
		res.status(400).send({
			"message": "Missing book id."
		})
		return
	}

	if (!userId) {
		res.status(400).send({
			"message": "You must be logged in."
		})
		return
	}

	sid = id * 1
	suid = userId * 1
	
	let book = data.books.find(obj => {
		return obj.id === sid
	})

	if (!book) {
		res.status(404).send({
			"message": "Book not found"
		})
		return
	}

	let index = data.users[suid].favorites.indexOf(sid);
	if (index > -1) {
		res.status(400).send({
			"message": "Book is already in users favorite.",
		})
		return
	}

	data.users[suid].favorites.push(sid)

	res.status(200).send({
		"message": "Book has been favorited.",
		"book": book,
		"usersFavorite": data.users[suid].favorites
	})


})

// TODO: Authorizations
// DELETE
app.delete("/api/users/:id", (req, res) => {
	// Check autorization (admin, user)
	let authorized = true

	if (authorized === false) {
		res.status(405).send({
			"message": "You must be an admin or the user to delete this user"
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
	// Check autorization (admin)
	let authorized = true

	if (authorized === false) {
		res.status(405).send({
			"message": "You must be an admin to delete this book"
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
	const { id } = req.params
	const { userId } = req.body

	if (!id) {
		res.status(400).send({
			"message": "Missing book id."
		})
		return
	}

	if (!userId) {
		res.status(400).send({
			"message": "You must be logged in."
		})
		return
	}

	sid = id * 1
	suid = userId * 1

	let book = data.books.find(obj => {
		return obj.id === sid
	})

	if (!book) {
		res.status(404).send({
			"message": "Book not found"
		})
		return
	}
	
	let index = data.users[suid].favorites.indexOf(sid);
	if (index <= -1) {
		res.status(400).send({
			"message": "Book is not in users favorite.",
		})
		return
	}

	data.users[suid].favorites.splice(index, 1);

	res.status(200).send({
		"message": "Book has been unfavorited.",
		"book": book,
		"usersFavorite": data.users[suid].favorites
	})


})

// Running the api
app.listen(PORT, () => {
	console.log(`Listening on localhost:${PORT}`)
})

// Functions
function createUser(id, name, mail) {
	return {
		"id": id,
		"name": name,
		"mail": mail,
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