import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DBNAME
}).promise()

export async function getAllBooks() {
	try {
		const sql = 'SELECT * FROM Book'
		const [books] = await pool.query(sql);
	
		return books
	} catch (error) {
		throw error
	}
}

export async function getNumberOfBooks(query) {
	try {
		const limit = parseInt(query.limit) || 10;  // Default limit
		const page = parseInt(query.page) || 1;     // Default page
		const offset = (page - 1) * limit;          // Calculate offset

		// Interpolating limit and offset directly in the query
		const sql = `SELECT * FROM book LIMIT ${limit} OFFSET ${offset}`;
		const [books] = await pool.query(sql); // No need to pass them as parameters

		return books;
	} catch (error) {
		throw error;
	}
}

export async function getBookById(id) {
	try {
		const sql = 'SELECT * FROM Book WHERE book_id=?'
		const [book] = await pool.query(sql, [id]);
	
		if (!book[0]) throw new Error("Book not found");

		return book[0]
	} catch (error) {
		throw error
	}
}
export async function addNewBook(title, author, description, years, imageUrl, category) {
	try {

		console.log('Step 1: Start adding book');
		console.log('Step 2: Checking if book exists...');
		if (await doesBookExist(title)) throw new Error("Book already exists.");

		console.log('Step 3: Preparing SQL...');
		const sql = 'INSERT INTO Book (title, author, description, years, img, category_id) VALUES (?, ?, ?, ?, ?, ?)';
		console.log('Step 4: Preparing values...');
		const values = [title, author, description, years, imageUrl, category];

		console.log('Step 5: Executing SQL query...');
		const [result, fields] = await pool.execute(sql, values);

		console.log('Step 6: SQL query executed successfully.');
		return result;

	} catch (error) {
		// Afficher plus de détails sur l'erreur
		console.log('MySQL error code:', error.code);
		console.log('MySQL error message:', error.sql);
		console.error("Error adding new book:", error.message, error.stack);
		throw error;
	}
}

export async function searchBooksByTitle(title) {
	// Récupérer tous les livres
	const allBooks = await getAllBooks();

	// Filtrer les livres par titre
	return allBooks.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
}


export async function deleteBook(book_id) {
	try {
		const sql = "DELETE FROM Book WHERE book_id=?"
		const values = [book_id]
	
		const [result, fields] = await pool.execute(sql, values);
		
		if (result.affectedRows === 0) throw new Error("Book does not exist.");

		return result
	} catch (error) {
		throw error
	}
}

async function doesBookExist(title) {
	try {
		const sql = 'SELECT book_id, author, description, years, img FROM Book WHERE title=?'
		const [book] = await pool.query(sql, [title]);

		return book[0];


	} catch (error) {
		return false
	}
}

export async function modifyBookById(bookId, updatedData) {
	try {
		const { title, author, description, years, imageUrl, category } = updatedData;

		// SQL pour mettre à jour le livre
		const sql = `
			UPDATE Book 
			SET title = ?, author = ?, description = ?, years = ?, img = ?, category_id = ?
			WHERE book_id = ?
		`;

		// Valeurs à mettre à jour
		const values = [title, author, description, years, imageUrl, category, bookId];

		const [result] = await pool.execute(sql, values); // Exécution de la requête

		// Vérifier si le livre a été modifié
		if (result.affectedRows === 0) throw new Error("Book not found or no changes made.");

		return result; // Retourner le résultat
	} catch (error) {
		// Gestion des erreurs
		console.error("Error modifying book:", error.message);
		throw error;
	}
}
