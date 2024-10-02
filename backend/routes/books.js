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

export async function addNewBook(title, author, description, year, img) {
	try {
		if (await doesBookExist(title)) throw new Error("Book already exists.");
		
		const sql = "INSERT INTO Book (title, author, description, years, img) VALUES (?,?,?,?,?);"
		const values = [title, author, description, year, img]
		
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
