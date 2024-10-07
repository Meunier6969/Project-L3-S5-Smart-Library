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
		const limit = parseInt(query.limit) || 10; // Default limit
		const page = parseInt(query.page) || 1;   // Default page
		const offset = (page - 1) * limit;         // Calculate offset

		// SQL query with parameters
		const sql = 'SELECT * FROM book LIMIT ? OFFSET ?;';
		const [books] = await pool.query(sql, [limit, offset]); // Pass parameters

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

export async function addNewBook(title, author, description, year, img, category_id) {
	try {
		if (await doesBookExist(title)) throw new Error("Book already exists.");
		
		const sql = "INSERT INTO Book (title, author, description, years, img, category_id) VALUES (?,?,?,?,?,?);"
		const values = [title, author, description, year, img, category_id]
		
		const [result, fields] = await pool.execute(sql, values);
		
		return result
	} catch (error) {
		throw error;
	}
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

export async function editBook(book_id, title = undefined, author = undefined, description = undefined, year = undefined, category_id = undefined) {
	try {
		let sql = "UPDATE Book SET "
		let values = []

		if (!title && !author && !description && !year && !category_id) throw new Error("No fields to change");

		if (title) {
			sql += "title=? "
			values.push(title)
			if (author || description || year || category_id) sql += ", "
		}

		if (author) {
			sql += "author=? "
			values.push(author)
			if (description || year || category_id) sql += ", "
		}

		if (description) {
			sql += "description=? "
			values.push(description)
			if (year || category_id) sql += ", "
		}
		
		if (year) {
			sql += "year=? "
			values.push(year)
			if (category_id) sql += ", "
		}
		
		if (category_id) {
			sql += "category_id=? "
			values.push(category_id)
		}
		
		sql += "WHERE book_id=?;"
		values.push(book_id)

		const [result, fields] = await pool.execute(sql, values);

		if (result.affectedRows == 0) throw new Error("Book does not exist.");

		return result
	} catch (error) {
		throw error
	}
}

async function doesBookExist(title) {
	try {
		const sql = 'SELECT book_id, author, description, years, img FROM Book WHERE title=?'
		const [book] = await pool.query(sql, [title]);

		if (!book[0]) return false

		return true
	} catch (error) {
		return false
	}
}

