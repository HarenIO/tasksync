import pool from '../config/database.js'

const authModel = {
  checkUserExists: async (username) => {
    try {
      const [rows] = await pool.query('SELECT username FROM users WHERE username = ?', [username])
      console.log('rows:', rows)
      return rows.length > 0
    } catch (error) {
      throw error
    }
  },
  registerUser: async (user) => {
    try {
      const { username, hashedPassword } = user
      await pool.query('INSERT INTO users(username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, 2])
    } catch (error) {
      throw error
    }
  },
  loginUser: async (user) => {
    try {
      const { username } = user
      const [rows] = await pool.query('SELECT id, username, password, role FROM users WHERE username = ?', [username])
      return rows[0]
    } catch (error) {
      throw error
    }
  }
}

export default authModel
