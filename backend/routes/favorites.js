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
	const sql = 'SELECT * FROM Favoris WHERE user_id=?;'
	const [favorites] = await pool.query(sql, [user_id]);

	return favorites
}

export async function addBookToUsersFavorite(user_id, book_id) {
	const sql = 'INSERT INTO Favoris (user_id, book_id) VALUES(?, ?);'
	const values = [user_id, book_id]


}