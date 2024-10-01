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

export async function getUserById(user_id) {
	const sql = 'SELECT user_id, pseudo, email, role FROM Users WHERE user_id=?'
	const [user] = await pool.query(sql, [user_id]);

	return user[0]
}

export async function getUserByPseudo(pseudo) {
	const sql = 'SELECT user_id, pseudo, email, role FROM Users WHERE pseudo=?'
	const [user] = await pool.query(sql, [pseudo]);

	return user[0]
}

export async function addNewUser(pseudo, email, pwd) {
	if (await getUserByPseudo(pseudo)) return -1
	
	const sql = "INSERT INTO Users (pseudo, email, role, pwd) VALUES (?,?,?,?);"
	const values = [pseudo, email, 0, pwd]

	const [result, fields] = await pool.execute(sql, values);

	return result.insertId
}


export async function checkPassword(pseudo, pwd) {
	const sql = 'SELECT pwd FROM Users WHERE pseudo=?'
	const [user] = await pool.query(sql, [pseudo]);

	if (user == []) return false

	return user[0].pwd === pwd
}


