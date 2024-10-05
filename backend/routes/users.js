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
	try {
		const sql = 'SELECT user_id, pseudo, email, role FROM Users'
		const [users] = await pool.query(sql);
		
		return users
	} catch (error) {
		throw error
	}

}

export async function getUserById(user_id) {
	try {
		const sql = 'SELECT user_id, pseudo, email, role FROM Users WHERE user_id=?;'
		const [user] = await pool.query(sql, [user_id]);
	
		if (user[0] === undefined) throw new Error("User Not found.");

		return user[0]
	} catch (error) {
		throw error
	}
}

export async function addNewUser(pseudo, email, pwd) {
	try {
		if (await doesUserExistEmail(email)) throw new Error("User already exist");
		
		
		const sql = "INSERT INTO Users (pseudo, email, role, pwd) VALUES (?,?,?,?);"
		const values = [pseudo, email, 0, pwd]
	
		const [result, fields] = await pool.execute(sql, values);
	
		return result
	} catch (error) {
		throw error
	}
}

export async function deleteUser(user_id) {
	try {
		const sql = "DELETE FROM Users WHERE user_id=?"
		const values = [user_id]
	
		const [result, fields] = await pool.execute(sql, values);
	
		if (result.affectedRows == 0) throw new Error("User does not exist.");
	
		return result
	} catch (error) {
		throw error
	}

}

export async function getPassword(email) {
	try {
		const sql = 'SELECT user_id, pwd FROM Users WHERE email=?'
		const [user] = await pool.query(sql, [email]);
		
		console.log(user)

		if (!user[0]) throw new Error("User not found");
	
		return user[0]
	} catch (error) {
		throw error
	}
}

export async function editUser(user_id, pseudo = undefined, email = undefined, pwd = undefined) {
	try {
		let sql = "UPDATE Users SET "
		let values = []

		if (!pseudo && !email && !pwd) throw new Error("No fields to change");

		if (pseudo) {
			sql += "pseudo=? "
			values.push(pseudo)
			if (email || pwd) sql += ", "
		}
		
		
		if (email) {
			sql += "email=? "
			values.push(email)
			if (pwd) sql += ", "
		}
		
		if (pwd) {
			sql += "pwd=? "
			values.push(pwd)
		}

		sql += "WHERE user_id=?;"
		values.push(user_id)

		const [result, fields] = await pool.execute(sql, values);

		if (result.affectedRows == 0) throw new Error("User does not exist.");

		return result
	} catch (error) {
		throw error
	}
}


export async function doesUserExistPseudo(pseudo) {
	try {
		const sql = 'SELECT user_id, pseudo, email, role FROM Users WHERE pseudo=?;'
		const [user] = await pool.query(sql, [pseudo]);

		if (!user[0]) return false;

		return true
	} catch (error) {
		return false
	}
}

export async function doesUserExistEmail(email) {
	try {
		const sql = 'SELECT user_id, pseudo, email, role FROM Users WHERE email=?;'
		const [user] = await pool.query(sql, [email]);

		if (!user[0]) return false;

		return true
	} catch (error) {
		return false
	}
}

export async function doesUserExistId(pseudo) {
	try {
		const sql = 'SELECT user_id, pseudo, email, role FROM Users WHERE user_id=?;'
		const [user] = await pool.query(sql, [pseudo]);

		if (!user[0]) return false;

		return true
	} catch (error) {
		return false
	}
}