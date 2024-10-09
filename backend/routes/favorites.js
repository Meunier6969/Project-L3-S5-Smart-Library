import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

import { doesUserExistId, getUserById } from './users.js'

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DBNAME
}).promise()

export async function getUsersFavorites(user_id) {
	try {
		if (!await getUserById(user_id)) throw new Error("User Not found");

		const sql = 'SELECT Favorites.book_id FROM Favorites INNER JOIN Book ON Book.book_id=Favorites.book_id WHERE Favorites.user_id=?;'
		let [favorites] = await pool.query(sql, [user_id]);

		favorites = favorites.map((book) => book.book_id)
	
		return {'favorites' : favorites}
	} catch (error) {
		throw error;
	}
}

export async function addBookToUsersFavorite(user_id, book_id) {
	try {
		if (!await doesUserExistId(user_id)) throw new Error("User does not exist");
		
		const sql = 'INSERT INTO Favorites (user_id, book_id) VALUES(?, ?);'
		const values = [user_id, book_id]
		
		const [result, fields] = await pool.execute(sql, values)

		return result
	} catch (error) {
		throw error
	}
}

export async function removeBookFromUsersFavorite(user_id, book_id) {
	try {
		if (!await doesUserExistId(user_id)) throw new Error("User does not exist");

		const sql = 'DELETE FROM Favorites WHERE user_id=? AND book_id=?;'
		const values = [user_id, book_id]

		const [result, fields] = await pool.execute(sql, values)

		return result
	} catch (error) {
		throw error
	}
}

export async function decrementBookFavoriteCount(id) {
	try {
		const sql = 'UPDATE Book SET favorites_count = favorites_count - 1 WHERE book_id=?'
		const [result] = await pool.execute(sql, [id]);

		return result
	} catch (error) {
		throw error
	}
}

export async function incrementBookFavoriteCount (id) {
	try {
		const sql = 'UPDATE Book SET favorites_count = favorites_count + 1 WHERE book_id=?'
		const [result] = await pool.execute(sql, [id]);

		return result
	} catch (error) {
		throw error
	}

}