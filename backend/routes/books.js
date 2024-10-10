//06/10/24

// Description:
// This file contains functions to manage books in the database.

// Functions:
// - getAllBooks: Retrieves all books from the database.
// - getNumberOfBooks: Retrieves a limited number of books with pagination.
// - getBookById: Retrieves a book by its ID.
// - addNewBook: Adds a new book to the database.
// - searchBooksByTitle: Searches for books by title.
// - deleteBook: Deletes a book by its ID.
// - editBook: Modifies the information of a book.
// - doesBookExist: Checks if a book exists in the database.
// - modifyBookById: Modifies the information of a book by its ID.

//==============IMPORT============================

import mysql from 'mysql2'
import dotenv from 'dotenv'

// Load environment variables from the .env file
dotenv.config()

//==============DATABASE====================

// Create a MySQL connection pool
const pool = mysql.createPool({
	host: process.env.DB_HOST,          // Database host
	user: process.env.DB_USERNAME,      // Username for the connection
	password: process.env.DB_PASSWORD,  // Password for the connection
	database: process.env.DB_DBNAME     // Database name
}).promise()


//==============FUNCTIONS===================

/**
 * Retrieves all books from the database.
 * @returns {Promise<Array>} - A promise that resolves to an array of objects representing the books.
 */
export async function getAllBooks() {
	try {
		const sql = 'SELECT * FROM Book'

		const [books] = await pool.query(sql);

		return books
	} catch (error) {
		throw error
	}
}

/**
 * Retrieves a limited number of books with pagination.
 * @param {Object} query - Object containing pagination parameters.
 * @param {number} query.limit - Maximum number of books to retrieve (default is 10).
 * @param {number} query.page - Page number to retrieve (default is 1).
 * @returns {Promise<Array>} - A promise that resolves to an array of objects representing the books.
 */
export async function getNumberOfBooks(query) {
	try {
		const limit = parseInt(query.limit) || 10;  // Default limit
		const page = parseInt(query.page) || 1;     // Default page
		const category = parseInt(query.category) || 0;     // Default category
		const title = query.title || "";          // Default title
		const sort = query.sort || "book_id";          // Default sorting
		const offset = (page - 1) * limit;          // Calculate the offset

		let sorting = 'book_id'
		switch (sort) {
			case 'search_count':
				sorting = 'search_count DESC'
				break;

			case 'atoz':
				sorting = 'title'
				break;

			case 'ztoa':
				sorting = 'title DESC'
				break;
		}
		
		let cat = ""
		if (category <= 5 && category > 0) {
			cat = "AND category_id=" + String(category)
		}

		const sql = `SELECT * FROM Book WHERE title LIKE CONCAT('%',?,'%') ${cat} ORDER BY ${sorting} LIMIT ? OFFSET ?`;

		const [books] = await pool.query(sql, [title, limit, offset]); 

		return books; 
	} catch (error) {
		throw error; 
	}
}

/**
 * Retrieves a book by its ID.
 * @param {number} id - The ID of the book to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to an object representing the book.
 * @throws {Error} - Throws an error if the book is not found.
 */
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

/**
 * Adds a new book to the database.
 * @param {string} title - Title of the book.
 * @param {string} author - Author of the book.
 * @param {string} description - Description of the book.
 * @param {number} years - Year of publication of the book.
 * @param {string} imageUrl - URL of the book's image.
 * @param {string} category - Category of the book.
 * @returns {Promise<Object>} - A promise that resolves to the object representing the result of the addition.
 * @throws {Error} - Throws an error if the book already exists.
 */
export async function addNewBook(title, author, description, years, imageUrl, category) {
	try {
		if (await doesBookExist(title)) throw new Error("Book already exists."); 

		const sql = 'INSERT INTO Book (title, author, description, years, img, category_id) VALUES (?, ?, ?, ?, ?, ?)'; 
		const values = [title, author, description, years, imageUrl, category]; 

		const [result, fields] = await pool.execute(sql, values); 

		return result; 
	} catch (error) {
		throw error; 
	}
}

/**
 * Searches for books by title.
 * @param {string} title - Title to search for.
 * @returns {Promise<Array>} - A promise that resolves to an array of objects representing the matching books.
 */
export async function searchBooksByTitle(title) {
	const allBooks = await getAllBooks();
	return allBooks.filter(book => book.title.toLowerCase().includes(title.toLowerCase())); // Filter books by title
}

/**
 * Deletes a book by its ID.
 * @param {number} book_id - The ID of the book to delete.
 * @returns {Promise<Object>} - A promise that resolves to the object representing the result of the deletion.
 * @throws {Error} - Throws an error if the book does not exist.
 */
export async function deleteBook(book_id) {
	try {
		const sql = "DELETE FROM Book WHERE book_id = ?"; 
		const values = [book_id]; 

		const [result] = await pool.execute(sql, values); 

		if (result.affectedRows === 0) {
			throw new Error("Book does not exist."); 
		}

		return result;
	} catch (error) {
		throw error
	}
}

function formatDateToMySQL(dateString) {
	const date = new Date(dateString);
	return date.toISOString().slice(0, 19).replace('T', ' '); // Format 'YYYY-MM-DD HH:MM:SS'
}
/**
 * Edits the information of a book.
 * @param {number} book_id - The ID of the book to edit.
 * @param {string} title - New title (optional).
 * @param {string} author - New author (optional).
 * @param {string} description - New description (optional).
 * @param {number} year - New year (optional).
 * @param {number} category - Category of the book (optional).
 * @returns {Promise<Object>} - A promise that resolves to the object representing the result of the edit.
 * @throws {Error} - Throws an error if no fields are provided or if the book does not exist.
 */
export async function editBook(book_id, title = undefined, author = undefined, description = undefined, year = undefined, category = undefined) {
	try {
		let sql = "UPDATE Book SET"; 
		let values = []; // Values to update

		if (title) {
			sql += " title=?, ";
			values.push(title);
		}
		if (author) {
			sql += " author=?, ";
			values.push(author);
		}
		if (description) {
			sql += " description=?, ";
			values.push(description);
		}
		if (year) {
			sql += " years=?, ";
			values.push(formatDateToMySQL(year));
		}
		if (category) {
			sql += " category_id=? ";
			values.push(category);
		} else {
			sql = sql.replace(/, $/, " ");
		}

		sql = sql.replace(/, $/, " ");

		sql += " WHERE book_id=?;";
		values.push(book_id);

		const [result] = await pool.execute(sql, values);
		if (result.affectedRows === 0) throw new Error("Book does not exist");

		return result;
	} catch (error) {
		throw error;
	}
}

/**
 * Checks if a book exists in the database.
 * @param {string} title - The title of the book to check.
 * @returns {Promise<Object|boolean>} - A promise that resolves to an object representing the book if it exists, otherwise false.
 */
async function doesBookExist(title) {
	try {
		const sql = 'SELECT * FROM Book WHERE title = ?';
		const [result] = await pool.query(sql, [title]);

		return result.length > 0; 
	} catch (error) {
		throw error; 
	}
}

