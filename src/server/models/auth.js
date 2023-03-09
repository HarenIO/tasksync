import pool from '../config/database.js'

const authModel = {
  checkUserExists: async (username) => {
      const [rows] = await pool.query('SELECT username FROM users WHERE username = ?', [username])
      return rows.length > 0
  },
  registerUser: async (user) => {
    const {username, hashedPassword} = user
    pool.query('INSERT INTO users(username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, 2])
  }
}

export default authModel
