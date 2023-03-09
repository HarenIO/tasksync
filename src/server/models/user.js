import pool from '../config/database.js'

const userModel = {
  getUserById: async (id) => {
      const [rows] = await pool.query('SELECT id, username, role FROM users WHERE id = ?', [id])
      return rows[0]
  },
}

export default userModel