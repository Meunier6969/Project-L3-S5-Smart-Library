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