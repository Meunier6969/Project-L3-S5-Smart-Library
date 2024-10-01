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
	let data = {
		"error": "",
		"insertId": -1
	}

	if (await getUserByPseudo(pseudo)) { 
		data.error = "User already exist."
		return data
	}
	
	const sql = "INSERT INTO Users (pseudo, email, role, pwd) VALUES (?,?,?,?);"
	const values = [pseudo, email, 0, pwd]

	const [result, fields] = await pool.execute(sql, values);

	data.insertId = result.insertId

	return data
}

export async function deleteUser(user_id) {
	let data = {
		"error": "",
	}

	const sql = "DELETE FROM Users WHERE user_id=?"
	const values = [user_id]

	const [result, fields] = await pool.execute(sql, values);

	if (result.affectedRows == 0) data.error = "User does not exist."

	return data
}

export async function getPassword(pseudo) {
	let data = {
		"error": "",
		"user_id": "",
		"user_pwd": ""
	}

	const sql = 'SELECT user_id, pwd FROM Users WHERE pseudo=?'
	const [user] = await pool.query(sql, [pseudo]);
	
	if (!user[0]) {
		data.error = "User not found"
	} else {
		data.user_id = user[0].user_id
		data.user_pwd = user[0].pwd
	}

	return data
}


