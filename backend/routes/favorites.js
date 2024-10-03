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

		const sql = 'SELECT Favoris.book_id, Book.title FROM Favoris INNER JOIN Book ON Book.book_id=Favoris.book_id WHERE Favoris.user_id=?;'
		const [favorites] = await pool.query(sql, [user_id]);
	
		return favorites
	} catch (error) {
		throw error;
	}
}

export async function addBookToUsersFavorite(user_id, book_id) {
	try {
		if (!await doesUserExistId(user_id)) throw new Error("User does not exist");
		
		const sql = 'INSERT INTO Favoris (user_id, book_id) VALUES(?, ?);'
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

		const sql = 'DELETE FROM Favoris WHERE user_id=? AND book_id=?;'
		const values = [user_id, book_id]

		const [result, fields] = await pool.execute(sql, values)

		return result
	} catch (error) {
		throw error
	}
}

export async function decrementBookFavoriteCount(id) {
	try {
		const sql = 'UPDATE book SET favorites_count = favorites_count - 1 WHERE book_id=?'
		const [result] = await pool.execute(sql, [id]);

		return result
	} catch (error) {
		throw error
	}
}

export async function incrementBookFavoriteCount (id) {
	try {
		const sql = 'UPDATE book SET favorites_count = favorites_count + 1 WHERE book_id=?'
		const [result] = await pool.execute(sql, [id]);

		return result
	} catch (error) {
		throw error
	}

}