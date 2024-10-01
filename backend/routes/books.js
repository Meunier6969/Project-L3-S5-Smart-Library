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
	const sql = 'SELECT * FROM Book'
	const [books] = await pool.query(sql);

	return books
}

export async function getBookById(id) {
	const sql = 'SELECT * FROM Book WHERE book_id=?'
	const [book] = await pool.query(sql, [id]);

	return book[0]
}

export async function getBookByTitle(title) {
	const sql = 'SELECT book_id, author, description, years, img FROM Book WHERE title=?'
	const [book] = await pool.query(sql, [title]);

	return book[0]
}

export async function addNewBook(title, author, description, year, img) {
	if (await getBookByTitle(title)) return -1

	const sql = "INSERT INTO Book (title, author, description, years, img) VALUES (?,?,?,?,?);"
	const values = [title, author, description, year, img]
	
	try {
		const [result, fields] = await pool.execute(sql, values);
		return result.insertId
	} catch (error) {
		return -2
	}
	
}

export async function deleteBook(book_id) {
	let data = {
		"error": "",
	}

	const sql = "DELETE FROM Book WHERE book_id=?"
	const values = [book_id]

	const [result, fields] = await pool.execute(sql, values);

	if (result.affectedRows == 0) data.error = "Book does not exist."

	return data
}