import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DBNAME
}).promise()

export async function getAllUsers() {
	const sql = 'SELECT user_id, pseudo, email, role FROM Users'
	const [users] = await pool.query(sql);

	return users
}

export async function getUserById(id) {
	const sql = 'SELECT user_id, pseudo, email, role FROM Users WHERE user_id=?'
	const [user] = await pool.query(sql, [id]);

	return user[0]
}