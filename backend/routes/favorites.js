import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DBNAME
}).promise()

export async function getUsersFavorites(user_id) {
	const sql = 'SELECT Favoris.book_id, Book.title FROM Favoris INNER JOIN Book ON Book.book_id=Favoris.book_id WHERE Favoris.user_id=?;'
	const [favorites] = await pool.query(sql, [user_id]);

	return favorites
}

export async function addBookToUsersFavorite(user_id, book_id) {
	let data = {
		"error": ""
	}

	const sql = 'INSERT INTO Favoris (user_id, book_id) VALUES(?, ?);'
	const values = [user_id, book_id]

	const [result, fields] = await pool.execute(sql, values)

	return {result, fields}
}

export async function removeBookFromUsersFavorite(user_id, book_id) {
	const sql = ''
	const values = [user_id, book_id]


}